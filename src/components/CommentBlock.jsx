import { useEffect, useState } from "react";
import { fetchArticleComments, postCommentOnArticle } from "../fetchData";
import CommentCard from "./CommentCard";
import CommentBox from "./CommentBox";

function CommentBlock({ article_id }) {
  const username = "tickle122";
  const [comments, setComments] = useState([]);
  const [areCommentsLoading, setAreCommentsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loginError, setLoginError] = useState(false)

  useEffect(() => {
    setAreCommentsLoading(true);
    fetchArticleComments(article_id).then(({ comments }) => {
      setComments(comments);
      comments.map((comment) => {
        comment.created_at = comment.created_at.slice(0, 10);
      });
      setAreCommentsLoading(false);
    });
  }, [article_id]);

  function handleChange(e) {
    e.preventDefault();
    setNewCommentInput({ username: username, body: e.target.value });
  }

  function handleSubmit() {
    setFormSubmitted(true);
    setNewComment(
      <div className="comment-card">
        <p className="comment-info">Just now</p>
        <p className="comment-info">{newCommentInput.username} said:</p>
        <p className="comment-body">{newCommentInput.body}</p>
        <p className="comment-info">Votes: 0</p>
      </div>
    );
    postCommentOnArticle(article_id, newCommentInput)
      .then(({ comment }) => {
        comment.created_at = comment.created_at.slice(0, 10);
        setNewCommentInput({});
      })
      .catch((err) => {
        setFormSubmitted(false);
        if (!username) {
          setLoginError(true)
        } else {
          setCommentError(true);
        }
      });
    
  }

  return (
    <>{areCommentsLoading ? null : (
        <p className="article-info">Comments: {comments.length}</p>
      )}
      {commentError ? (
        <p className="comment-error">
          Something went wrong. Please try again later.
        </p>
      ) : null}
      {loginError ? (
        <p className="comment-error">
          You must be logged in to post a comment.
        </p>
      ) : null}
      {formSubmitted ? (
        newComment
      ) : (
        <form action={handleSubmit} className="comment-box">
          <CommentBox
            article_id={article_id}
            formSubmitted={formSubmitted}
            handleChange={handleChange}
          />
        </form>)}
        
      {areCommentsLoading ? (
        <p>Comments loading</p>
      ) : (
        comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              username={username}
            />
          );
        })
      )}
      
    </>
  );
}

export default CommentBlock;
