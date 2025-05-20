function CommentBox(props) {    

    return (
        <form className="comment-box" action="post-comment">
            <label className="comment-box-label" htmlFor="comment-box">Enter comment</label>
            <textarea className="comment-input" type="text" id="comment-box" onChange={props.handleChange}/>
            <button className="post-comment-button" onClick={props.handleSubmit}>Post</button>
        </form>
    )
}

export default CommentBox