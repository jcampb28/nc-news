function CommentBox(props) {
  return (
    <>
      <label className="comment-box-label" htmlFor="comment-box">
        Enter comment
      </label>
      <textarea
        className="comment-input"
        type="text"
        id="comment-box"
        onChange={props.handleChange}
      />
      {props.formSubmitted ? (
        <p>Thanks!</p>
      ) : (
        <button className="post-comment-button" type="submit">
          Post
        </button>
      )}
    </>
  );
}

export default CommentBox;
