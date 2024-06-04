import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, push, update } from 'firebase/database';
import { FaHeart } from 'react-icons/fa';

const DiscussionDetail = ({ currentUser }) => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});
  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    const commentRef = ref(db, `discussionComments/${id}`);
    onValue(commentRef, (snapshot) => {
      setComment(snapshot.val());
    });
  }, [id, db]);

  const handleReplyChange = (e) => {
    setReplyTexts({ ...replyTexts, [id]: e.target.value });
  };

  const iconImg = require('./img/icon.jpg');

  const forbiddenPatterns = [
    /\b(?:shit|fuck|damn)\b/i,
  ];

  const containsForbiddenWords = (text) => {
    return forbiddenPatterns.some(pattern => pattern.test(text));
  };

  const handleReply = () => {
    if (!currentUser || !currentUser.userId) {
      alert('Please log in to post a reply.');
      navigate('/login');
      return;
    }

    const replyText = replyTexts[id]?.trim();
    if (!replyText) {
      alert("Reply cannot be empty.");
      return;
    }

    if (replyText.length < 10) {
      alert("Reply is too short. Please write a more detailed reply.");
      return;
    }

    if (containsForbiddenWords(replyText)) {
      alert("Reply contains inappropriate language.");
      return;
    }

    const reply = {
      userId: currentUser.userId,
      userName: currentUser.userName,
      userImg: iconImg,
      commentText: replyText,
      likes: []
    };

    const repliesRef = ref(db, `discussionComments/${id}/replies`);
    push(repliesRef, reply);
    setReplyTexts({ ...replyTexts, [id]: "" });
  };

  const handleLike = (replyId = null) => {
    if (!currentUser || !currentUser.userId) {
      alert('Please log in to like a comment or reply.');
      navigate('/login');
      return;
    }

    const userId = currentUser.userId;
    const path = replyId ? `discussionComments/${id}/replies/${replyId}` : `discussionComments/${id}`;
    const commentRef = ref(db, path);

    onValue(commentRef, (snapshot) => {
      const commentData = snapshot.val();
      if (!commentData) return;

      const likes = commentData.likes || [];
      const userLiked = likes.includes(userId);
      const updatedLikes = userLiked
        ? likes.filter(id => id !== userId)
        : [...likes, userId];

      update(commentRef, { likes: updatedLikes });
    }, { onlyOnce: true });
  };

  const renderReplies = (replies) => {
    return Object.entries(replies).map(([replyId, reply]) => (
      <div key={replyId} className="comment reply">
        <div className="me-2">
          <img src={iconImg} alt="User Icon" />
        </div>
        <div className="commentContent">
          <p className="username">{reply.userName}</p>
          <p>{reply.commentText}</p>
          <button className="like-button" onClick={() => handleLike(replyId)}>
            <FaHeart style={{ color: (reply.likes || []).includes(currentUser.userId) ? "red" : "grey" }} />
            {(reply.likes || []).length}
          </button>
        </div>
      </div>
    ));
  };

  if (!comment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Discussion Detail</h2>
      <div key={id} className="comment">
        <div className="me-2">
          <img src={iconImg} alt="User Icon" />
        </div>
        <div className="commentContent">
          <p className="username">{comment.userName}</p>
          <p>{comment.commentText}</p>
          <button className="like-button" onClick={() => handleLike()}>
            <FaHeart style={{ color: (comment.likes || []).includes(currentUser.userId) ? "red" : "grey" }} />
            {(comment.likes || []).length}
          </button>
          <div className="reply-popup">
            <textarea
              placeholder="Write your reply here..."
              value={replyTexts[id] || ""}
              onChange={handleReplyChange}
            />
            <br />
            <div className="reply-buttons">
              <button className="button" onClick={handleReply}>Reply</button>
            </div>
          </div>
          {comment.replies && renderReplies(comment.replies)}
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
