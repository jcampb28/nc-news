import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles } from "../fetchData";

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchArticles().then(({ articles }) => {
      setArticleList(articles.resultsArr);
      setIsLoading(false);
    });
  }, []);

  return (
    <ul className="article-list">
      {isLoading ? (
        <p>Cool articles incoming!</p>
      ) : (
        articleList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })
      )}
    </ul>
  );
}

export default ArticleList;
