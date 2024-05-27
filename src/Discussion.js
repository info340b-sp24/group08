import React, { useState } from "react";
import iconImg from './img/icon.jpg';
import huskyImg from './img/Husky.jpg';
import snowImg from './img/snow.jpg';
import { FaHeart, FaPlus } from 'react-icons/fa';

function DiscussionPage(props) {
  const [newCommentText, setNewCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [discussionComments, setDiscussionComments] = useState([
    {
      id: "Hello",
      username: "Hello",
      commentText: "I want to become the resident of the America, do you guys know what kinds of job position will help me to achieve this goal?",
      imageUrl: iconImg,
      liked: false,
      replies: []
    },
    {
      id: "Dawg",
      username: "Dawg",
      commentText: "I am an international undergraduate computer science student, is software engineer a good position for me to stay here working?",
      imageUrl: huskyImg,
      liked: false,
      replies: []
    },
    {
      id: "Snow",
      username: "Snow",
      commentText: "I want to be an UIUX designer in the future, what companies will support the international students for this position?",
      imageUrl: snowImg,
      liked: false,
      replies: []
    }
  ]);

  const handleSubmit = () => {
    if (newCommentText.trim() !== "") {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        username: "New User",
        commentText: newCommentText,
        imageUrl: iconImg,
        liked: false,
        replies: []
      };

      setDiscussionComments([...discussionComments, newComment]);
      setNewCommentText("");
    }
  };

  const handleReply = (index) => {
    if (replyTexts[index]?.trim() !== "") {
      const updatedComments = [...discussionComments];
      updatedComments[index].replies.push({
        id: Math.random().toString(36).substr(2, 9),
        username: "New User",
        commentText: replyTexts[index],
        imageUrl: iconImg,
        liked: false
      });
      setDiscussionComments(updatedComments);
      setReplyTexts({ ...replyTexts, [index]: "" });
    }
  };

  const handleLike = (commentIndex, replyIndex) => {
    const updatedComments = [...discussionComments];
    if (replyIndex === undefined) {
      updatedComments[commentIndex].liked = !updatedComments[commentIndex].liked;
    } else {
      updatedComments[commentIndex].replies[replyIndex].liked = !updatedComments[commentIndex].replies[replyIndex].liked;
    }
    setDiscussionComments(updatedComments);
  };

  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleReplyChange = (e, index) => {
    setReplyTexts({ ...replyTexts, [index]: e.target.value });
  };

  const handleCancelReply = (index) => {
    setReplyTexts({ ...replyTexts, [index]: "" });
  };

  const handleCancelComment = () => {
    setNewCommentText("");
  };

  const commentElements = discussionComments.map((comment, commentIndex) => (
    <div key={commentIndex} className="comment">
      <div className="me-2">
        <img src={comment.imageUrl} alt="User Icon" />
      </div>
      <div className="commentContent">
        <p className="username">{comment.username}</p>
        <p>{comment.commentText}</p>
        <button className="like-button" onClick={() => handleLike(commentIndex)}>
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
            id={`commentText-${commentIndex}`}
            placeholder="Write your reply here..."
            value={replyTexts[commentIndex] || ""}
            onChange={(e) => handleReplyChange(e, commentIndex)}
          ></textarea>
          <div className="reply-buttons">
            <button className="button" onClick={() => handleReply(commentIndex)}>
              Reply
            </button>
            <button className="button" onClick={() => handleCancelReply(commentIndex)}>
              Cancel
            </button>
          </div>
        </div>

        {comment.replies.map((reply, replyIndex) => (
          <div key={replyIndex} className="comment reply">
            <div className="me-2">
              <img src={reply.imageUrl} alt="User Icon" />
            </div>
            <div className="commentContent">
              <p className="username">{reply.username}</p>
              <p>{reply.commentText}</p>
              <button className="like-button" onClick={() => handleLike(commentIndex, replyIndex)}>
                <span style={{ color: reply.liked ? "red" : "grey" }}>
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
