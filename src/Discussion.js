import React, { useState } from "react";
import iconImg from './img/icon.jpg';
import huskyImg from './img/Husky.jpg';
import snowImg from './img/snow.jpg';
import { FaHeart } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

function DiscussionPage(props) {
  const [newCommentText, setNewCommentText] = useState("");
  const [discussionComments, setDiscussionComments] = useState([
    {
      id: "Hello",
      username: "Hello",
      commentText: "This is the first comment.",
      imageUrl: iconImg,
      liked: false // Added liked state
    },
    {
      id: "Dawg",
      username: "Dawg",
      commentText: "This is the second comment.",
      imageUrl: huskyImg,
      liked: false // Added liked state
    },
    {
      id: "Snow",
      username: "Snow",
      commentText: "This is the third comment.",
      imageUrl: snowImg,
      liked: false // Added liked state
    }
  ]);

  const handleSubmit = () => {
    if (newCommentText.trim() !== "") {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9), // Generate random ID
        username: "New User",
        commentText: newCommentText,
        imageUrl: iconImg,
        liked: false // Set liked to false for new comments
      };

      setDiscussionComments([...discussionComments, newComment]);
      setNewCommentText(""); // Clear the input field
    }
  };

  const handleLike = (index) => {
    const updatedComments = [...discussionComments];
    updatedComments[index].liked = !updatedComments[index].liked;
    setDiscussionComments(updatedComments);
  };

  return (
    <main>
      <div>
        <h2 className="text-center">Discussion Board</h2>
        {/* SubmitComment component */}
        <div id="submitComment">
          {/* Popup for submitting comment */}
          <div className="reply-popup">
            <textarea
              id="commentText"
              placeholder="Write your comment here..."
              value={newCommentText} // Bind textarea value to state
              onChange={(e) => setNewCommentText(e.target.value)} // Handle textarea change
            ></textarea>
            <div className="reply-buttons">
              <button id="submitBtn" className="button" onClick={handleSubmit}>
                Submit
              </button>
              <button id="cancelBtn" className="button">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Render discussion comments */}
        <div id="discussion">
          {discussionComments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="me-2">
                <img src={comment.imageUrl} alt="User Icon" />
              </div>
              <div className="commentContent">
                <p className="username">{comment.username}</p>
                <p>{comment.commentText}</p>
                <button className="like-button" onClick={() => handleLike(index)}>
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
                    id={`commentText-${index}`}
                    placeholder="Write your comment here..."
                  ></textarea>{" "}
                  <div className="reply-buttons">
                    <button className="button">Reply</button>
                    <button className="button">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default DiscussionPage;