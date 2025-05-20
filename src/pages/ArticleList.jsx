import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles } from "../fetchData";

function ArticleList() {
const [articleList, setArticleList] = useState([])

    useEffect(() => {
    fetchArticles().then(({articles}) => {
      setArticleList(articles.resultsArr)
    });
  }, []);
  
    return (
    <ul className="article-list">
        {articleList.map((article) => {
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
  )
}

export default ArticleList;
