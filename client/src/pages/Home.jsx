import Card from "../components/Card";
import React, {useEffect} from "react";
import {getUserDetails, httpCall} from "../services/networkService";
import Modal from 'react-modal'

export default function Home({setShow}) {

    const [userDetails, setUserDetails] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [newPostData, setNewPostData] = React.useState({
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        setLoading(true)
        setShow(true)
        loadPosts()
    }, []);

    function loadPosts() {
        getUserDetails().then(userData => {
            if (userData) {
                setUserDetails(userData)
                getAllPosts().then(allPosts => {
                    setPosts(allPosts)
                })
            } else {
                setError(true)
            }
        })
    }

    async function getAllPosts() {
        const res = await httpCall('posts/', {})
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

    function generateCards() {
        const postRender = []
        for (let post of posts) {
            postRender.push(
                <Card
                    userName={userDetails.userName}
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
                    isOpen={showModal}
                    onRequestClose={() => {setShowModal(false)}}
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