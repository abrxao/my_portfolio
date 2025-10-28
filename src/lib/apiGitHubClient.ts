import axios from "axios";

const githubToken = process.env.GITHUB_TOKEN;

const apiGitHubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
    ...(githubToken && { Authorization: `Bearer ${githubToken}` }),
  },
});

export default apiGitHubClient;
