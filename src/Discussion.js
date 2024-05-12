import React, { useState } from "react";

function DiscussionPage(props) {
  const [newCommentText, setNewCommentText] = useState("");

  const discussionComments = [
    {
      id: "Hello",
      username: "Hello",
      commentText: "This is the first comment.",
      imageUrl: "./public/icon.jpg"
    },
    {
      id: "Dawg",
      username: "Dawg",
      commentText: "This is the second comment.",
      imageUrl: "./public/Husky.jpg"
    },
    {
      id: "Snow",
      username: "Snow",
      commentText: "This is the third comment.",
      imageUrl: "./public/snow.jpg"
    }
  ];

  const handleSubmit = () => {
    if (newCommentText.trim() !== "") {
      setNewCommentText("");
    }
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
                <img src={require(comment.imageUrl)} alt="User Icon" />
              </div>
              <div className="commentContent">
                <p className="username">{comment.username}</p>
                <button className="like-button">
                  <span className="material-icons" style={{ color: "grey" }}>
                    Like
                  </span>
                </button>
                <button className="save-button">
                  <span className="material-icons" style={{ color: "grey" }}>
                    Save
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
