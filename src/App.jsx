import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./pages/ArticleList";
import Home from "./pages/Home";
import SpecificArticle from './pages/SpecificArticle';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<SpecificArticle/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
