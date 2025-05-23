import { useState } from "react";
import { deleteComment } from "../fetchData";

function CommentCard({ comment, username }) {
  const [deleted, setDeleted] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState("")
  const [isDeleteError, setIsDeleteError] = useState(false);

  function handleDelete(e) {     
    setCommentToDelete(<p>Comment deleted!</p>)
    setDeleted(true)
    deleteComment(comment.comment_id)
      .then(() => {
        setIsDeleteError(false);
      })
      .catch(() => {
        setDeleted(false);
        setIsDeleteError(true);
      });
  }

  return (
    <div className="comment-card">
      {deleted ? commentToDelete : <>
        <p className="comment-info">On {comment.created_at}</p>
        <p className="comment-info">{comment.author} said:</p>
        <p className="comment-body">{comment.body}</p>
        <p className="comment-info">Votes: {comment.votes}</p>
        {username === comment.author ? (
          <button className="delete-comment-button" onClick={handleDelete}>Delete</button>
        ) : null}
      </>}

      {isDeleteError ? (
        <p className="comment-error">
          Something went wrong. Please try again later.
        </p>
      ) : null}
    </div>
  );
}

export default CommentCard;
