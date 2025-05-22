import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./pages/ArticleList";
import Home from "./pages/Home";
import SpecificArticle from "./pages/SpecificArticle";
import ArticleNotFound from "./pages/ArticleNotFound";
import PageNotFound from "./pages/PageNotFound";
import Timeout from "./pages/Timeout";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<SpecificArticle />} />
          <Route path="/:topic?" element={<ArticleList />} />
          <Route path="/article-not-found" element={<ArticleNotFound />}/>
          <Route path="page-not-found" element={<PageNotFound />} />
          <Route path="/timeout" element={<Timeout />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
