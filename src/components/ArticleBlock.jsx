function ArticleBlock({ singleArticle, hasVoted, newVoteCount }) {
  return (
    <>
      <h2 className="article-title">{singleArticle.title}</h2>
      <p className="article-info">Author: {singleArticle.author}</p>
      <p className="article-info">
        Date published: {singleArticle.created_at.slice(0, 10)}
      </p>

      {hasVoted ? (
        <p className="article-info">Votes: {newVoteCount}</p>
      ) : (
        <p className="article-info">Votes: {singleArticle.votes}</p>
      )}

      <p className="article-body">{singleArticle.body}</p>
    </>
  );
}

export default ArticleBlock;
