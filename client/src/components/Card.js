import React, {useState} from 'react';
import {httpCall} from "../services/networkService";

// This should be refactored to just take a post object
function Card({
                  userName,
                  postImg,
                  likes,
                  userComment,
                  comments,
                  postTime,
                  postId,
                  userData
              }) {
    const [hasLiked, setHasLiked] = useState(likes.includes(userData._id));

    function toggleLike() {
        setHasLiked(!hasLiked)
        httpCall('posts/like', {postId: postId}, 'POST')
    }

    return (
        <div className="card">
            <div className="top">
                <div className="userDetails">
                    <h3>{userName}</h3>
                </div>
                <div>
                    <span className="dot"><i className="fas fa-ellipsis-h"></i></span>
                </div>
            </div>
            <div className="imgBx">
                <img src={postImg} alt="Post" className="cover"/>
            </div>
            <div className="bottom">
                <div className="actionBtns">
                    <div className="left">
                        <div>
                            <span className="like" onClick={() => {toggleLike()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={hasLiked ? 'red' : '#000000'}  xmlns="http://www.w3.org/2000/svg"
                                     className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                  <path
                                      d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                </svg>
                            </span>
                            <span className="likes">{
                                likes.length + (likes.includes(userData._id) ? (hasLiked ? 0 : -1) : (hasLiked ? 1 : 0))
                            }</span>
                        </div>
                        <div>
                            <span className="comment" onClick={() => { /* addcomment() */}}>
                                <svg aria-label="Comment"
                                     className="_8-yf5 "
                                     color="#262626"
                                     fill="#262626"
                                     height="24"
                                     role="img"
                                     viewBox="0 0 48 48"
                                     width="24">
                                        <path clip-rule="evenodd"
                                              d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5
                                            11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0
                                            7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0
                                            4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1
                                            8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10
                                            2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5
                                            44.5 12.7 44.5 24z"
                                              fill-rule="evenodd">
                                        </path>
                                    </svg>
                                </span>
                            <span className="commentCount">{comments}</span>
                        </div>
                    </div>
                </div>
                <h4 className="postName">{userName}</h4>
                <p className="description">
                    <span>{userComment}</span>
                </p>

                <h4 className="viewComments">View all {comments} comments </h4>
                <h5 className="postTime">{postTime}</h5>
                <div className="comment">
                </div>
            </div>
        </div>
    );
}

export default Card;
