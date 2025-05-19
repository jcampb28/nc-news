import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../fetchData";

function ArticleList() {
const [articles, setArticles] = useState([])

    useEffect(() => {
    getArticles().then(({articles}) => {
      setArticles(articles.resultsArr)
    });
  }, []);
  
    return (
    <ul className="article-list">
        {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
  )
}

export default ArticleList;
