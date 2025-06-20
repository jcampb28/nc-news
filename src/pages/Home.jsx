import { useEffect, useState } from "react";
import { fetchArticleByID, fetchArticles } from "../fetchData";
import { Link, useNavigate } from "react-router-dom";
import ArticleBlock from "../components/ArticleBlock";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [randomArticle, setRandomArticle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles()
      .then(({ articles }) => {
        setArticles(articles);
        const randomNum = Math.floor(Math.random() * (articles.total_count - 1) + 1)
        fetchArticleByID(randomNum).then(({ article }) => {
          setRandomArticle(article);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading cool articles...</p>
      ) : (
        <div className="article">
          <ArticleBlock singleArticle={randomArticle} />
          <Link to={`/articles/${randomArticle.article_id}`}>View full article</Link>
        </div>
      )}
    </>
  );
}

export default Home;
