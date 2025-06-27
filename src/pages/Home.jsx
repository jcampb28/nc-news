import { useEffect, useState } from "react";
import { fetchArticleByID, fetchArticles } from "../fetchData";
import { Link } from "react-router-dom";
import ArticleBlock from "../components/ArticleBlock";
import NavBar from "../components/NavBar";

function Home() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [randomArticle, setRandomArticle] = useState({});

  useEffect(() => {
    fetchArticles()
      .then(({ articles }) => {
        const randomNum = Math.floor(
          Math.random() * (articles.total_count - 1) + 1
        );
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
      <NavBar />
      <h2 className="random-read-header">Current Random Read</h2>
      {isLoading ? (
        <p>Loading cool articles...</p>
      ) : (
        <div className="random-article">
          <ArticleBlock singleArticle={randomArticle} />
          <Link
            to={`/articles/${randomArticle.article_id}`}
            className="full-article-button"
          >
            View full article
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
