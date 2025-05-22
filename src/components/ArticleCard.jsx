import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const specificLink = "/articles/" + article.article_id;
  return (
    <li className="article-card">
      <img className="article-card-img" src={article.article_img_url} alt="" />
      <div className="article-card-text">
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-author">{article.author}</p>
        <p className="article-card-category">{article.topic}</p>
      </div>

      <Link to={specificLink}>
        <button className="read-button">Read</button>
      </Link>
    </li>
  );
}

export default ArticleCard;
