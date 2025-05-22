import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles, fetchTopics } from "../fetchData";
import { Link, useParams } from "react-router-dom";

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topicList, setTopicList] = useState([]);
  const [filterDrawerOpen, setFilterListOpen] = useState(false);
  const { topic } = useParams();

  //add selection options for dynamic filtering!

  useEffect(() => {
    fetchArticles(topic).then(({ articles }) => {
      setArticleList(articles.resultsArr);
      setIsLoading(false);
    });
  }, [topic]);

  useEffect(() => {
    fetchTopics().then(({ topics }) => {
      setTopicList(topics);
    });
  }, []);

  function handleFilterList() {
    if (filterDrawerOpen) {
      setFilterListOpen(false);
    } else {
      setFilterListOpen(true);
    }
  }

  return (
    <>
      {topic ? <h2>All {topic}</h2> : <h2>All articles</h2>}
      <button className="filter-button" onClick={handleFilterList}>
        Filter articles
      </button>
      {filterDrawerOpen ? (
        <button className="filter-list-option" key="all-articles">
          <Link to="/articles">All articles</Link>
        </button>
      ) : null}
      {filterDrawerOpen
        ? topicList.map((topic) => {
            const filterLink = "/" + topic.slug;
            return (
              <button className="filter-list-option" key={topic.slug}>
                <Link to={filterLink}>
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </Link>
              </button>
            );
          })
        : null}

      <ul className="article-list">
        {isLoading ? (
          <p>Cool articles incoming!</p>
        ) : (
          articleList.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })
        )}
      </ul>
    </>
  );
}

export default ArticleList;
