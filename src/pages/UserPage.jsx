import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticles, fetchUser } from "../fetchData";
import NavBar from "../components/NavBar"
import ArticleCard from "../components/ArticleCard";

function UserPage() {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [areArticlesLoading, setAreArticlesLoading] = useState(true)
  const [articleList, setArticleList] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetchUser(username)
      .then(({user}) => {
        setUser(user)
        setIsUserLoading(false)
      })
      .catch((err) => {
        if (err.message.includes("timeout")) {
          navigate("/timeout");
        } else {
          navigate("/page-not-found");
        }
      });
  }, []);

  useEffect(() => {
    fetchArticles()
    .then(({articles}) => {
      setArticleList(articles.resultsArr)
      setAreArticlesLoading(false)
    }).catch((err) => {
      if (err.message.includes("timeout")) {
        navigate("/timeout")
      } else {
        navigate("/page-not-found")
      }
    })
  }, [])

  return (
    <>
    <NavBar />
    <h2 className="user-profile-header">My Profile</h2>
    {isUserLoading ? null : <p className="user-profile-paragraph">Name: {user.name}</p>}
    {isUserLoading ? null : <p className="user-profile-paragraph">Username: {user.username}</p>}
    <h2 className="user-profile-header">My Articles</h2>
    <ul className="article-list">
        {areArticlesLoading ? (
          <p>Your articles incoming!</p>
        ) : (
          articleList.map((article) => {
            if (article.author === username) {
              return <ArticleCard key={article.article_id} article={article} />;
            }
          })
        )}
      </ul>
    </>
  );
}

export default UserPage;
