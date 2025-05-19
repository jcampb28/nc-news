import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-jc28.onrender.com/api",
  timeout: 1000,
});

export function getArticles() {
  return apiClient.get("/articles").then((response) => {
    return response.data
  }).catch((err) => {
    console.log(err)
  });
}
