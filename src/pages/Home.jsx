import { useEffect, useState } from "react";
import { fetchArticles } from "../fetchData";

function Home() {
const [articles, setArticles] = useState([])

    useEffect(() => {
    fetchArticles().then(({articles}) => {
      setArticles(articles)
    });
  }, []);

  return <p>This is a random article</p>
}

export default Home