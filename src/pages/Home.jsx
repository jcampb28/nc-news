import { useEffect, useState } from "react";
import { getArticles } from "../fetchData";

function Home() {
const [articles, setArticles] = useState([])

    useEffect(() => {
    getArticles().then(({articles}) => {
      setArticles(articles)
    });
  }, []);

  return <p>This is a random article</p>
}

export default Home