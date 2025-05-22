import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticleByID, patchArticleVotes } from "../fetchData";
import ArticleBlock from "../components/ArticleBlock";
import CommentBlock from "../components/CommentBlock";

function specificArticle() {
  const { article_id } = useParams();

  const [singleArticle, setSingleArticle] = useState({});

  const [isArticleLoading, setIsArticleLoading] = useState(true);

  const [hasVoted, setHasVoted] = useState(false);
  const [newVoteCount, setNewVoteCount] = useState(0);

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    fetchArticleByID(article_id).then(({ article }) => {
      setSingleArticle(article);
      setIsArticleLoading(false);
    }).catch((err) => {
      if (err.message.includes("timeout")) {
        navigate("/timeout")
      } else {
      navigate("/article-not-found")
      }
    });
  }, [article_id]);

  function handleArticleUpVote() {
    const newVote = 1;
    if (!hasVoted) {
      setHasVoted(true);
      setNewVoteCount(singleArticle.votes + 1);
      patchArticleVotes(article_id, newVote).catch((err) => {
        setIsError(true);
        setNewVoteCount(singleArticle.votes - 1);
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
        setNewVoteCount(singleArticle.votes + 1);
        setHasVoted(false);
      });
    }
  }

  return (
    <>
      {isArticleLoading ? (
        <p>Article loading</p>
      ) : (
        <div className="article">
          <ArticleBlock
            singleArticle={singleArticle}
            hasVoted={hasVoted}
            newVoteCount={newVoteCount}
          />
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

          <CommentBlock article_id={article_id} />
        </div>
      )}
    </>
  );
}

export default specificArticle;
