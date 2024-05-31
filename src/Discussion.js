import React, { useState, useEffect } from "react";
import { FaHeart, FaPlus } from 'react-icons/fa';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function DiscussionPage(props) {
  const db = getDatabase();
  const navigate = useNavigate();
  const [newCommentText, setNewCommentText] = useState("");
  const [discussionComments, setDiscussionComments] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    const commentsRef = ref(db, "discussionComments");
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setDiscussionComments(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
    });
    return () => unsubscribe();
  }, [db]);

  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleReplyChange = (e, commentId) => {
    setReplyTexts({ ...replyTexts, [commentId]: e.target.value });
  };

  const iconImg = require('./img/icon.jpg');

  const handleSubmit = () => {
    if (!props.currentUser || !props.currentUser.userId) {
      alert('Please log in to post a comment.');
      navigate('/login');
      return;
    }
    if (newCommentText.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    const newComment = {
      userId: props.currentUser.userId,
      userName: props.currentUser.userName,
      userImg: iconImg,
      commentText: newCommentText.trim(),
      liked: false,
      replies: []
    };

    const commentsRef = ref(db, 'discussionComments');
    push(commentsRef, newComment);
    setNewCommentText("");
  };

  const handleReply = (commentId) => {
    if (!props.currentUser) {
      alert('Please log in to post a reply.');
      navigate('/login');
      return;
    }
    const replyText = replyTexts[commentId]?.trim();
    if (!replyText) {
      alert("Reply cannot be empty.");
      return;
    }

    const reply = {
      userId: props.currentUser.userId,
      userName: props.currentUser.userName,
      userImg: iconImg,
      commentText: replyText,
      liked: false
    };

    const repliesRef = ref(db, `discussionComments/${commentId}/replies`);
    push(repliesRef, reply);
    setReplyTexts({ ...replyTexts, [commentId]: "" });
  };

  const handleLike = (commentId, replyId = null) => {
    if (!props.currentUser) {
      alert('Please log in to like a comment or reply.');
      navigate('/login');
      return;
    }
    const path = replyId ? `discussionComments/${commentId}/replies/${replyId}/liked` : `discussionComments/${commentId}/liked`;
    const commentRef = ref(db, path);
    set(commentRef, !discussionComments.find(comment => comment.id === commentId).liked);
  };

  const renderComments = () => discussionComments.map((comment) => (
    <div key={comment.id} className="comment">
      <div className="me-2">
        <img src={iconImg} alt="User Icon" />
      </div>
      <div className="commentContent">
        <p className="username">{comment.userName}</p>
        <p>{comment.commentText}</p>
        <button className="like-button" onClick={() => handleLike(comment.id)}>
          <FaHeart style={{ color: comment.liked ? "red" : "grey" }} />
        </button>
        <textarea
          placeholder="Write your reply here..."
          value={replyTexts[comment.id] || ""}
          onChange={(e) => handleReplyChange(e, comment.id)}
        />
        <br />
        <button className="button" onClick={() => handleReply(comment.id)}>Reply</button>
      </div>

      {comment.replies && Object.values(comment.replies).map((reply, index) => (
        <div key={index} className="comment reply">
          <div className="me-2">
            <img src={iconImg} alt="User Icon" />
          </div>
          <div className="commentContent">
            <p className="username">{reply.userName}</p>
            <p>{reply.commentText}</p>
            <button className="like-button" onClick={() => handleLike(comment.id, reply.id)}>
              <FaHeart style={{ color: reply.liked ? "red" : "grey" }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  ));

  return (
    <main>
      <div>
        <h2 className="text-center">Discussion Board</h2>
        <div id="submitComment">
          <textarea
            id="commentText"
            placeholder="Write your comment here..."
            value={newCommentText}
            onChange={handleCommentChange}
          />
          <button className="button" onClick={handleSubmit}>Submit</button>
        </div>
        <div id="discussion">{renderComments()}</div>
      </div>
    </main>
  );
}

export default DiscussionPage;
