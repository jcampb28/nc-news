import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles, fetchTopics } from "../fetchData";
import { Link, useParams, useSearchParams } from "react-router-dom";

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topicList, setTopicList] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);

  const { topic } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order");

  useEffect(() => {
    fetchArticles(topic, sortByQuery, orderByQuery).then(({ articles }) => {
      setArticleList(articles.resultsArr);
      setIsLoading(false);
    });
  }, [topic, sortByQuery, orderByQuery]);

  useEffect(() => {
    fetchTopics().then(({ topics }) => {
      setTopicList(topics);
    });
  }, []);

  function handleFilterDrawer() {
    if (filterDrawerOpen) {
      setFilterDrawerOpen(false);
    } else {
      setFilterDrawerOpen(true);
    }
  }

  function handleSortDrawer() {
    if (sortDrawerOpen) {
      setSortDrawerOpen(false);
    } else {
      setSortDrawerOpen(true);
    }
  }

  function handleSortOrder(direction) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  }

  function handleSortBy(value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", value);
    setSearchParams(newParams);
  }

  return (
    <>
      {topic ? <h2>All {topic}</h2> : <h2>All articles</h2>}
      <button className="query-button" onClick={handleFilterDrawer}>
        Filter articles
      </button>
      {filterDrawerOpen ? (
        <button className="query-list-option" key="all-articles">
          <Link to="/articles">All articles</Link>
        </button>
      ) : null}
      {filterDrawerOpen
        ? topicList.map((topic) => {
            const filterLink = "/" + topic.slug;
            return (
              <button className="query-list-option" key={topic.slug}>
                <Link to={filterLink}>
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </Link>
              </button>
            );
          })
        : null}
      {topic ?  null: <button className="query-button" onClick={handleSortDrawer}>
        Sort articles
      </button>}
      {sortDrawerOpen ? (
        <>
          <button
            className="query-list-option"
            onClick={() => handleSortBy("comment_count")}
          >
            Comments
          </button>
          <button
            className="query-list-option"
            onClick={() => handleSortBy("created_at")}
          >
            Date
          </button>
          <button
            className="query-list-option"
            onClick={() => handleSortBy("votes")}
          >
            Votes
          </button>
          <button
            className="query-list-option-direction"
            onClick={() => handleSortOrder("asc")}
          >
            ↑
          </button>
          <button
            className="query-list-option-direction"
            onClick={() => handleSortOrder("desc")}
          >
            ↓
          </button>
        </>
      ) : null}
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
