import Card from "../components/Card";
import React, {useEffect} from "react";
import {getUserDetails, httpCall} from "../services/networkService";
import Modal from 'react-modal'

export default function Home({setShow, searchTerm}) {

    const [userDetails, setUserDetails] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    const [showOtherProfile, setShowOtherProfile] = React.useState(false)
    const [otherUserData, setOtherUserData] = React.useState({})
    const [otherUserId, setOtherUserId] = React.useState('');

    const [newPostData, setNewPostData] = React.useState({
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        setShowOtherProfile(false)
        setShowModal(false)
        setShow(true)
        loadPosts()
    }, [searchTerm]);

    useEffect(() => {
        setOtherUserData(
            {
                userName: '',
                firstName: '',
                lastName: '',
                email: '',
                bio: '',
                creationDate: 0
            }
        )
        if (otherUserId.length > 0) {
            httpCall('users/userDetails', {userId: otherUserId}, 'POST').then(otherUser => {
                if (otherUser) {
                    setOtherUserData(otherUser)
                    setShowOtherProfile(true)
                }
            })
        }
    }, [otherUserId])

    function loadPosts() {
        getUserDetails().then(userData => {
            if (userData) {
                setUserDetails(userData)
                getAllPosts().then(allPosts => {
                    setPosts(allPosts)
                })
            }
        })
    }

    async function handleEditUser() {
        const editBody = {
            userId: otherUserId,
            userName: otherUserData.userName,
            firstName: otherUserData.firstName,
            lastName: otherUserData.lastName,
            bio: otherUserData.bio,
        }
        httpCall('users/edit', editBody, 'PATCH')
        setShowOtherProfile(false)
        setOtherUserId('')
        alert('Profile Updated')
    }

    async function getAllPosts() {
        const res = await httpCall('posts/', {searchTerm: searchTerm}, 'POST')
        return res ? res : []
    }

    async function handleCreatePost() {
        const res = await httpCall('posts/create', newPostData, 'POST')
        if (res) {
            alert("Post Created")
        } else {
            alert('Error Creating Post')
        }
        setShowModal(false)
        loadPosts()
    }

    function adjustOtherProfileDetails(entry, value) {
        const details = {...otherUserData}
        details[entry] = value
        setOtherUserData(details)
    }

    function generateCards() {
        const postRender = []
        for (let post of posts) {
            postRender.push(
                <Card
                    userId={post.owner}
                    setOtherUserId={setOtherUserId}
                    userName={post.userName}
                    postImg={post.imageUrl}
                    likes={post.likes}
                    userComment={post.description}
                    comments={post.comments}
                    postTime={(new Date(post.creationDate)).toLocaleString()}
                    userData={userDetails}
                    postId={post._id}
                />
            )
        }
        return postRender
    }

    return (
            <div className="container">
                <Modal
                     isOpen={showOtherProfile}
                     onRequestClose={() => {setShowOtherProfile(false)}}
                     shouldCloseOnOverlayClick={false}
                     style={{
                         content: {
                             top: '50%',
                             left: '50%',
                             right: 'auto',
                             bottom: 'auto',
                             marginRight: '-50%',
                             transform: 'translate(-50%, -50%)',
                             padding: '20px 50px 20px 50px',
                             backgroundColor: '#cbdcff',
                             border: 'black solid 1px',
                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                         },
                         overlay: {
                             background: "rgba(99,99,99,0.67)"
                         }
                     }}>
                    <h2>{otherUserData.userName}'s Profile</h2>
                    <div id={'newPostModal'} style={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexDirection: 'column',
                        height: 'fit-content'
                    }}>
                        <label>
                            Username
                            <input disabled={otherUserId !== userDetails._id && userDetails.permissionLevel !== 'admin'} value={otherUserData.userName} onChange={event => adjustOtherProfileDetails('userName', event.target.value)}/>
                        </label>
                        <label>
                            First Name
                            <input disabled={otherUserId !== userDetails._id && userDetails.permissionLevel !== 'admin'} value={otherUserData.firstName} onChange={event => adjustOtherProfileDetails('firstName', event.target.value)}/>
                        </label>
                        <label>
                            Last Name
                            <input disabled={otherUserId !== userDetails._id && userDetails.permissionLevel !== 'admin'}
                                   value={otherUserData.lastName ? otherUserData.lastName : ''}
                                   onChange={event => adjustOtherProfileDetails('lastName', event.target.value)}/>
                        </label>
                        <label>
                            Email
                            <input disabled={true}
                                   value={otherUserData.email}/>
                        </label>
                        <label>
                            Biography
                            <textarea disabled={otherUserId !== userDetails._id && userDetails.permissionLevel !== 'admin'} value={otherUserData.bio}onChange={event => adjustOtherProfileDetails('bio', event.target.value)}/>
                        </label>
                        <div style={{
                            width: '100%',
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <button style={{width: '30%', height: '30px'}} onClick={() => {
                                setShowOtherProfile(false)
                                setOtherUserId('')
                            }}>
                                Cancel
                            </button>
                            <button disabled={otherUserId !== userDetails._id && userDetails.permissionLevel !== 'admin'} style={{width: '30%', height: '30px'}}
                                    onClick={handleEditUser}>
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={showModal}
                    onRequestClose={() => {
                        setShowModal(false)
                    }}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#cbdcff',
                            border: 'black solid 1px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                        },
                        overlay: {
                            background: "rgba(99,99,99,0.67)"
                        }
                    }}>
                    <h2>Create Post</h2>
                    <div id={'newPostModal'} style={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexDirection: 'column',
                        height: 'fit-content'
                    }}>
                        <label>
                            Image Link
                            <input value={newPostData.imageUrl} onChange={event => {
                                const data = {...newPostData}
                                data.imageUrl = event.target.value
                                setNewPostData(data)
                            }}/>
                        </label>
                        <label>
                            Description
                            <textarea value={newPostData.description} onChange={(event) => {
                                const data = {...newPostData}
                                data.description = event.target.value
                                setNewPostData(data)
                            }}/>
                        </label>
                        <div style={{
                            width: '100%',
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <button style={{width: '30%', height: '30px'}} onClick={handleCreatePost}>
                                Submit
                            </button>
                            <button style={{width: '30%', height: '30px'}} onClick={() => {
                                setShowModal(false)
                                setNewPostData({
                                    description: '',
                                    imageUrl: '',
                                })
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>

                <div className="col-9">
                    <button style={{marginBottom: '20px'}} className={'createPost shadow'} onClick={() => setShowModal(true)}>
                        Create Post
                    </button>
                    {generateCards()}
                </div>
            </div>
    )
}