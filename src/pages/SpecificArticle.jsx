import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleByID,
  fetchArticleComments,
  patchArticleVotes,
  postCommentOnArticle,
} from "../fetchData";
import CommentCard from "../components/CommentCard";
import CommentBox from "../components/CommentBox";

function specificArticle() {
  const username = "tickle122";
  const { article_id } = useParams();

  const [singleArticle, setSingleArticle] = useState({});
  const [shortDate, setShortDate] = useState("");
  const [comments, setComments] = useState([]);

  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);

  const [hasVoted, setHasVoted] = useState(false);
  const [newVoteCount, setNewVoteCount] = useState(0);

  const [newComment, setNewComment] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [newCommentPosted, setNewCommentPosted] = useState({});

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchArticleByID(article_id).then(({ article }) => {
      setSingleArticle(article);
      setShortDate(article.created_at.slice(0, 10));
      setIsArticleLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    fetchArticleComments(article_id).then(({ comments }) => {
      setComments(comments);
      setIsCommentLoading(false);
    });
  }, [article_id]);

  function handleArticleUpVote() {
    const newVote = 1;
    if (!hasVoted) {
      setHasVoted(true);
      setNewVoteCount(singleArticle.votes + 1);
      patchArticleVotes(article_id, newVote).catch((err) => {
        setIsError(true);
        setNewVoteCount(singleArticle.votes - 1)
        setHasVoted(false);
      });
    }
  }

  function handleArticleDownVote() {
    const newVote = -1;
    if (!hasVoted) {
      setHasVoted(true);
      setNewVoteCount(singleArticle.votes - 1);
      patchArticleVotes(article_id, newVote).catch((err) => {
        setIsError(true);
        setNewVoteCount(singleArticle.votes + 1)
        setHasVoted(false);
      });
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setNewComment({ username: username, body: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postCommentOnArticle(article_id, newComment)
      .then(({ comment }) => {
        setFormSubmitted(true);
        setNewCommentPosted(comment);
      })
      .catch((err) => {
        setCommentError(true);
      });
  }

  return (
    <>
      {isArticleLoading ? (
        <p>Article loading</p>
      ) : (
        <div className="article">
          <h2 className="article-title">{singleArticle.title}</h2>
          <p className="article-info">Author: {singleArticle.author}</p>
          <p className="article-info">Date published: {shortDate}</p>

          {hasVoted ? (
            <p className="article-info">Votes: {newVoteCount}</p>
          ) : (
            <p className="article-info">Votes: {singleArticle.votes}</p>
          )}

          <p className="article-body">{singleArticle.body}</p>
          {hasVoted ? (
            <p className="vote-thanks">Thanks for voting!</p>
          ) : isError ? (
            <p className="vote-error">
              Something went wrong. Please try again later.
            </p>
          ) : (
            <p className="article-vote-buttons">
              Enjoyed this article?
              <button className="vote-button" onClick={handleArticleUpVote}>
                👍
              </button>
              <button className="vote-button" onClick={handleArticleDownVote}>
                👎
              </button>
            </p>
          )}

          <p className="article-info">
            Comments: {singleArticle.comment_count}
          </p>
        </div>
      )}
      {isCommentLoading ? (
        <p>Comments loading</p>
      ) : (
        comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })
      )}
      {commentError ? (
        <p className="post-comment-error">Something went wrong. Please try again later.</p>
      ) : null}
      {formSubmitted ? (
        <CommentCard
          key={newCommentPosted.comment_id}
          comment={newCommentPosted}
        />
      ) : (
        <CommentBox
          newComment={newComment}
          article_id={article_id}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}      
    </>
  );
}

export default specificArticle;
