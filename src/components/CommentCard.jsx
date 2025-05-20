function CommentCard({comment}) {
    const shortDate = comment.created_at.slice(0, 10)
    return (
        <div className="comment-card">
        <p className="comment-info">On {shortDate}</p>
        <p className="comment-info">{comment.author} said:</p>
        <p className="comment-body">{comment.body}</p>
        <p className="comment-info">Votes: {comment.votes}</p>
</div>
    )
}

export default CommentCard