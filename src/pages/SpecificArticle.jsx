import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleByID } from "../fetchData";

function specificArticle() {
    const [singleArticle, setSingleArticle] = useState({});
    const {article_id} = useParams();
    const [shortDate, setShortDate] = useState("")

    useEffect(() => {
        fetchArticleByID(article_id).then(({article}) => {
            setSingleArticle(article)
            setShortDate(article.created_at.slice(0, 10))
        })
    }, [article_id])

   
    return (
        <div className="article">
        <h2 className="article-title">{singleArticle.title}</h2>
        <p className="article-info">Author: {singleArticle.author}</p>
        <p className="article-info">Date Published {shortDate}</p>
        <p className="article-info">Votes: {singleArticle.votes}</p>
        <p className="article-body">{singleArticle.body}</p>
        <p className="article-info">Comments: {singleArticle.comment_count}</p>
        </div>
        

    )
}

export default specificArticle