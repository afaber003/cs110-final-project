import React from 'react';

function Card({ profileImg, userName, location, postImg, likes, userComment, comments, postTime }) {
  return (
    <div className="card">
      <div className="top">
        <div className="userDetails">
          <div className="profilepic">
            <div className="profile_img">
              <div className="image">
                <img src={profileImg} alt="Profile" />
              </div>
            </div>
          </div>
          <h3>{userName}<br /><span>{location}</span></h3>
        </div>
        <div><span className="dot"><i className="fas fa-ellipsis-h"></i></span></div>
      </div>
      <div className="imgBx">
        <img src={postImg} alt="Post" className="cover" />
      </div>
      <div className="bottom">
        <div className="actionBtns">
          <div className="left">
            <span className="heart" onClick={() => { /* addlike() */ }}>
              <svg aria-label="Like" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
              </svg>
            </span>
            <svg aria-label="Comment"
									class="_8-yf5 "
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
            <svg aria-label="Share Post" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
              <path d="M46.5 3c-.6-.1-1.2 0-1.7.3L3.6 24.4c-1.2.6-1.7 2.1-1.1 3.3.5 1.1 1.7 1.6 2.9 1.2l11.3-3.5 1.7 1.6c-1.8 2.5-4.3 4.9-8.5 7.7-1.1.8-1.4 2.3-.6 3.5.8 1.1 2.3 1.4 3.5.6 7.8-5.3 11-9.6 12.9-12.2 3.1-.1 6.2-1.1 9.1-3.3 4.3-3.2 7.1-7.5 8.2-12.2 1-4.1.7-7.9-.7-11.3-.6-1.1-1.6-1.8-2.8-2zm-2.4 6.4c.7 2.8.5 5.8-.4 8.9-.9 3.4-3.1 6.6-6.5 9-2.4 1.8-5.1 2.6-7.6 2.4-.7-.1-1.5.2-1.9.8-1.4 2-3.8 5.2-8.2 8.5l-1.6-1.5c-.5-.5-1.2-.7-1.9-.5l-7.1 2.2 18-9.1c.3-.2.7-.3 1-.5 4.4-.8 8.6-3.1 11.9-6.5 2.6-2.6 4.6-5.7 5.6-8.8.9-2.8 1-5.4.5-7.8z" />
            </svg>
          </div>
          <div className="right">
            <svg aria-label="Save" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
              <path d="M43 3H5c-1.1 0-2 .9-2 2v40c0 .6.4 1.2 1 1.4.6.2 1.2.1 1.6-.3l16.8-14.9 3.1 3.1c.6.6 1.6.6 2.2 0l3.1-3.1L42.5 46c.4.4 1 .5 1.6.3.6-.2 1-.8 1-1.4V5c0-1.1-.9-2-2-2zm-1 37.9l-15.7-14c-.6-.5-1.5-.5-2.1 0l-15.7 14V6h33.5v34.9z" />
            </svg>
          </div>
        </div>
        <h4 className="likes">{likes}</h4>
        <h4 className="comments">{userComment}</h4>
        <p className="description"><span>{userComment}</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <h4 className="comments">{comments}</h4>
        <h5 className="post-time">{postTime}</h5>
        <div className="comment">
          <div className="comment-box">
            <svg aria-label="Emoji" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
              <path d="M24 47.5c-6.2 0-12.1-2.4-16.5-6.8S.7 30.2.7 24 3 11.9 7.5 7.5 17.8.5 24 .5s12.1 2.4 16.5 6.8 6.8 10.3 6.8 16.7-2.4 12.1-6.8 16.5-10.3 6.8-16.5 6.8zm0-43C12.7 4.5 4.5 12.7 4.5 24s8.2 19.5 19.5 19.5S43.5 35.3 43.5 24 35.3 4.5 24 4.5zm0 34c-4.6 0-8.9-2-11.8-5.5-.4-.5-.3-1.2.2-1.6.5-.4 1.2-.3 1.6.2 2.6 3 6.4 4.8 10.1 4.8 3.7 0 7.2-1.7 9.8-4.7.4-.5 1.1-.5 1.6-.2.5.4.5 1.1.2 1.6-3 3.6-7.4 5.4-11.7 5.4zM15.5 20c0-1.4 1.1-2.5 2.5-2.5S20.5 18.6 20.5 20s-1.1 2.5-2.5 2.5S15.5 21.4 15.5 20zm10 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5z" />
            </svg>
            <input type="text" className="comment-area" placeholder="Add a comment" />
            <button className="comment-btn">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
