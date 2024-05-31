import React, { useState, useEffect } from "react";
import iconImg from './img/icon.jpg';
import huskyImg from './img/Husky.jpg';
import snowImg from './img/snow.jpg';
import { FaHeart, FaPlus } from 'react-icons/fa';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import { Link, Navigate, useNavigate} from 'react-router-dom';

function DiscussionPage(props) {
  const db = getDatabase(); //"the database"
  const currentUser = props.currentUser;
  const userObj = currentUser;
  const [newCommentText, setNewCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [discussionComments, setDiscussionComments] = useState([
    {
      userId: "Hello",
      userName: "Hello",
      userImg: iconImg,
      commentText: "I want to become the resident of the America, do you guys know what kinds of job position will help me to achieve this goal?",
      liked: false,
      replies: []
    },
    {
      userId: "Dawg",
      userName: "Dawg",
      userImg: huskyImg,
      commentText: "I am an international undergraduate computer science student, is software engineer a good position for me to stay here working?",
      liked: false,
      replies: []
    },
    {
      userId: "Snow",
      userName: "Snow",
      userImg: snowImg,
      commentText: "I want to be an UIUX designer in the future, what companies will support the international students for this position?",
      liked: false,
      replies: []
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const commentsRef = ref(db, "discussionComments");
    const offFunction = onValue(commentsRef, (snapshot) => {   //when db value changes
      const valueObj = snapshot.val();
      const objKeys = Object.keys(valueObj); //convert object into array
      const objArray = objKeys.map((keyString) => {
      const theMessageObj = valueObj[keyString];
          theMessageObj.key = keyString;
          return theMessageObj;
        })
        setDiscussionComments(objArray);
    })

    function cleanup() {
      console.log("component is being removed");
    offFunction();     //when the component goes away, we turn off the listener
    }
    return cleanup; //return instructions on how to turn off lights
  }, [])

  // useEffect(() => {
  //   const commentsRef = ref(db, 'discussionComments');
    
  //   onValue(commentsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const commentsArray = Object.keys(data).map(key => ({
  //         id: key,
  //         ...data[key]
  //       }));
  //       setDiscussionComments(commentsArray);
  //     }
  //   });
  // }, []);

  const handleSubmit = () => {
    if (!userObj || !userObj.userId) {
      alert('Please log in to post a comment.');
      navigate('/login');
      return;
    }

    if (newCommentText.trim() !== "") {
      const newComment = {
        "userId": userObj.userId,
        "userName": userObj.userName,
        "userImg": userObj.userImg,
        "commentText": newCommentText,
        "liked": false,
        "replies": []
      }

      const commentsRef = ref(db, 'discussionComments');
      push(commentsRef, newComment);
      setNewCommentText("");
    }
  };

  const handleReply = (commentId) => {
    if (!userObj || !userObj.userId) {
      alert('Please log in to post a comment.');
      navigate('/login');
    }

    if (replyTexts[commentId]?.trim() !== "") {
      const reply = {
        "userId": userObj.userId,
        "userName": userObj.userName,
        "userImg": userObj.userImg,
        "commentText": replyTexts[commentId],
        "userImg": iconImg,
        "liked": false
      };

      const repliesRef = ref(db, `discussionComments/${commentId}/replies`);
      push(repliesRef, reply);
      setReplyTexts({ ...replyTexts, [commentId]: "" });
    }
  };

  const handleLike = (commentId, replyId) => {
    const commentRef = replyId === undefined 
      ? ref(db, `discussionComments/${commentId}/liked`)
      : ref(db, `discussionComments/${commentId}/replies/${replyId}/liked`);

      set(commentRef, !discussionComments.find(comment => comment.id === commentId).liked);
  };

  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleReplyChange = (e, commentId) => {
    setReplyTexts({ ...replyTexts, [commentId]: e.target.value });
  };

  const handleCancelReply = (commentId) => {
    setReplyTexts({ ...replyTexts, [commentId]: "" });
  };

  const handleCancelComment = () => {
    setNewCommentText("");
  };

  const commentElements = discussionComments.map((comment) => (
    <div key={comment.id} className="comment">
      <div className="me-2">
        <img src={comment.userImg} alt="User Icon" />
      </div>
      <div className="commentContent">
        <p className="username">{comment.username}</p>
        <p>{comment.commentText}</p>
        <button className="like-button" onClick={() => handleLike(comment.id)}>
          <span style={{ color: comment.liked ? "red" : "grey" }}>
            <FaHeart />
          </span>
        </button>
        <button className="save-button">
          <span style={{ color: "grey" }}>
            <FaPlus />
          </span>
        </button>

        <div className="reply-popup">
          <textarea
            id={`commentText-${comment.id}`}
            placeholder="Write your reply here..."
            value={replyTexts[comment.id] || ""}
            onChange={(e) => handleReplyChange(e, comment.id)}
          ></textarea>
          <div className="reply-buttons">
            <button className="button" onClick={() => handleReply(comment.id)}>
              Reply
            </button>
            <button className="button" onClick={() => handleCancelReply(comment.id)}>
              Cancel
            </button>
          </div>
        </div>

        {comment.replies && Object.keys(comment.replies).map((replyId) => (
          <div key={replyId} className="comment reply">
            <div className="me-2">
              <img src={comment.replies[replyId].userImg} alt="User Icon" />
            </div>
            <div className="commentContent">
              <p className="username">{comment.replies[replyId].username}</p>
              <p>{comment.replies[replyId].commentText}</p>
              <button className="like-button" onClick={() => handleLike(comment.id, replyId)}>
                <span style={{ color: comment.replies[replyId].liked ? "red" : "grey" }}>
                  <FaHeart />
                </span>
              </button>
              <button className="save-button">
                <span style={{ color: "grey" }}>
                  <FaPlus />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));

  return (
    <main>
      <div>
        <h2 className="text-center">Discussion Board</h2>

        <div id="submitComment">
          <div className="reply-popup">
            <textarea
              id="commentText"
              placeholder="Write your comment here..."
              value={newCommentText}
              onChange={handleCommentChange}
            ></textarea>
            <div className="reply-buttons">
              <button id="submitBtn" className="button" onClick={handleSubmit}>
                Submit
              </button>
              <button id="cancelBtn" className="button" onClick={handleCancelComment}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div id="discussion">
          {commentElements}
        </div>
      </div>
    </main>
  );
}

export default DiscussionPage;
