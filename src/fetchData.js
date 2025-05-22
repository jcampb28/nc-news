import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-jc28.onrender.com/api",
  timeout: 1000,
});

export function fetchArticles(articleTopic) {
  return apiClient
    .get("/articles", {params: {topic: articleTopic}})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function fetchArticleByID(article_id) {
  return apiClient
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function fetchArticleComments(article_id) {
  return apiClient
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function patchArticleVotes(article_id, inc_votes) {
  return apiClient
    .patch(`/articles/${article_id}`, {
      inc_votes: inc_votes,
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function postCommentOnArticle(article_id, comment) {
  return apiClient
    .post(`/articles/${article_id}/comments`, {
      username: comment.username,
      body: comment.body,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function deleteComment(comment_id) {
  return apiClient
  .delete(`/comments/${comment_id}`)
  .catch((err) => {
    return Promise.reject(err);
  })
}

export function fetchTopics() {
  return apiClient
  .get("/topics")
  .then((response) => {
    return response.data
  })
  .catch((err) => {
    return Promise.reject(err);
  })
}