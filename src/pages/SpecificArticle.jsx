import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleByID, fetchArticleComments } from "../fetchData";
import CommentCard from "../components/CommentCard";

function specificArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const { article_id } = useParams();
  const [shortDate, setShortDate] = useState("");
  const [comments, setComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);

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

  return (
    <>
      {isArticleLoading ? (
        <p>Article loading</p>
      ) : (
        <div className="article">
          <h2 className="article-title">{singleArticle.title}</h2>
          <p className="article-info">Author: {singleArticle.author}</p>
          <p className="article-info">Date published: {shortDate}</p>
          <p className="article-info">Votes: {singleArticle.votes}</p>
          <p className="article-body">{singleArticle.body}</p>
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
    </>
  );
}

export default specificArticle;
