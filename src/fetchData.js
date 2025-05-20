import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-jc28.onrender.com/api",
  timeout: 1000,
});

export function fetchArticles() {
  return apiClient
    .get("/articles")
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
    }).catch((err) => {
        console.log(err)
    });
}

export function fetchArticleComments(article_id) {
  return apiClient
  .get(`/articles/${article_id}/comments`)
  .then((response) => {
    return response.data
  }).catch((err) => {
        console.log(err)
    });
}