function ArticleCard(article) {
  const articleToList = article.article;

  return (
    <li className="article-card">
      <img
        className="article-card-img"
        src={articleToList.article_img_url}
        alt=""
      />
      <div className="article-card-text">
        <h3 className="article-card-title">{articleToList.title}</h3>
        <p className="article-card-author">{articleToList.author}</p>
        <p className="article-card-category">{articleToList.topic}</p>
      </div>

      <button className="read-button">Read</button>
    </li>
  );
}

export default ArticleCard;
