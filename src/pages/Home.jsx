import { useEffect, useState } from "react";
import { fetchArticles } from "../fetchData";
import { useNavigate } from "react-router-dom";

function Home() {
const [articles, setArticles] = useState([])
const [isError, setIsError] = useState(false)
const navigate = useNavigate()

    useEffect(() => {
    fetchArticles().then(({articles}) => {
      setArticles(articles)
    }).then(() => {
      navigate("/articles")
    }).catch((err) => {
      setIsError(true)
    });
  }, []);

  return (<>
  {isError ? <p>Sorry, something went wrong. Please try again later.</p> : null}
  <p>Loading cool articles...</p>
  </>)
  
}

export default Home
