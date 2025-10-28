import apiGitHubClient from "@/lib/apiGitHubClient";

// Define a type for the GitHub user profile data we expect
export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

/**
 * Fetches a user's public profile from the GitHub API.
 * @returns A promise that resolves to the user's profile data.
 */
export async function getUserProfile(): Promise<GitHubProfile> {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error("GITHUB_USERNAME environment variable is not set.");
  }

  try {
    const response = await apiGitHubClient.get<GitHubProfile>(
      `/users/${username}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch GitHub profile:", error);
    // Re-throw the error to be handled by the calling component
    throw new Error(
      "Could not fetch GitHub profile. Please check the username and token."
    );
  }
}
