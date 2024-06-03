import React, { useState, useEffect } from "react";
import { FaHeart, FaPlus } from 'react-icons/fa';
import { getDatabase, ref, onValue, update, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function DiscussionPage(props) {
  const db = getDatabase();
  const navigate = useNavigate();
  const [newCommentText, setNewCommentText] = useState("");
  const [discussionComments, setDiscussionComments] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const [lastCommentTime, setLastCommentTime] = useState(0);

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

  const forbiddenPatterns = [
    /\b(?:shit|fuck|damn)\b/i,
  ];

  const containsForbiddenWords = (text) => {
    return forbiddenPatterns.some(pattern => pattern.test(text));
  };

  const handleSubmit = () => {
    if (!props.currentUser || !props.currentUser.userId) {
      alert('Please log in to post a comment.');
      navigate('/login');
      return;
    }

    const currentTime = Date.now();
    if (currentTime - lastCommentTime < 30000) {
      alert("You are commenting too frequently. Please wait a while before commenting again.");
      return;
    }

    if (newCommentText.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    if (newCommentText.trim().length < 10) {
      alert("Comment is too short. Please write a more detailed comment.");
      return;
    }

    if (containsForbiddenWords(newCommentText)) {
      alert("Comment contains inappropriate language.");
      return;
    }

    const newComment = {
      userId: props.currentUser.userId,
      userName: props.currentUser.userName,
      userImg: iconImg,
      commentText: newCommentText.trim(),
      likes: [],
      replies: []
    };

    const commentsRef = ref(db, 'discussionComments');
    push(commentsRef, newComment);
    setNewCommentText("");
    setLastCommentTime(currentTime);
  };

  const handleReply = (commentId) => {
    if (!props.currentUser || !props.currentUser.userId) {
      alert('Please log in to post a reply.');
      navigate('/login');
      return;
    }

    const replyText = replyTexts[commentId]?.trim();
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
      userId: props.currentUser.userId,
      userName: props.currentUser.userName,
      userImg: iconImg,
      commentText: replyText,
      likes: []
    };

    const repliesRef = ref(db, `discussionComments/${commentId}/replies`);
    push(repliesRef, reply);
    setReplyTexts({ ...replyTexts, [commentId]: "" });
  };

  const handleLike = (commentId, replyId = null) => {
    if (!props.currentUser || !props.currentUser.userId) {
      alert('Please log in to like a comment or reply.');
      navigate('/login');
      return;
    }

    const userId = props.currentUser.userId;
    const path = replyId ? `discussionComments/${commentId}/replies/${replyId}` : `discussionComments/${commentId}`;
    const commentRef = ref(db, path);

    onValue(commentRef, (snapshot) => {
      const comment = snapshot.val();
      if (!comment) return;

      const likes = comment.likes || [];
      const userLiked = likes.includes(userId);
      const updatedLikes = userLiked
          ? likes.filter(id => id !== userId)
          : [...likes, userId];

      update(commentRef, { likes: updatedLikes });
    }, { onlyOnce: true });
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
            <FaHeart style={{ color: (comment.likes || []).includes(props.currentUser.userId) ? "red" : "grey" }} />
            {(comment.likes || []).length}
          </button>
          <div className="reply-popup">
            <textarea
                placeholder="Write your reply here..."
                value={replyTexts[comment.id] || ""}
                onChange={(e) => handleReplyChange(e, comment.id)}
            />
            <br />
            <div className="reply-buttons">
              <button className="button" onClick={() => handleReply(comment.id)}>Reply</button>
            </div>
          </div>

          {comment.replies && Object.entries(comment.replies).map(([replyId, reply]) => (
              <div key={replyId} className="comment reply">
                <div className="me-2">
                  <img src={iconImg} alt="User Icon" />
                </div>
                <div className="commentContent">
                  <p className="username">{reply.userName}</p>
                  <p>{reply.commentText}</p>
                  <button className="like-button" onClick={() => handleLike(comment.id, replyId)}>
                    <FaHeart style={{ color: (reply.likes || []).includes(props.currentUser.userId) ? "red" : "grey" }} />
                    {(reply.likes || []).length}
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
