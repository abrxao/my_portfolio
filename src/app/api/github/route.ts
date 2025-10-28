import { NextResponse } from "next/server";
import apiGitHubClient from "@/lib/apiGitHubClient";
import axios from "axios";

export async function GET() {
  const githubUsername = process.env.GITHUB_USERNAME;

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json(
      {
        status: "error",
        message: "Environment variable GITHUB_TOKEN is not set on the server.",
      },
      { status: 500 }
    );
  }

  if (!githubUsername) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Environment variable GITHUB_USERNAME is not set on the server.",
      },
      { status: 500 }
    );
  }

  try {
    await apiGitHubClient.get(`/users/${githubUsername}`);

    return NextResponse.json(
      {
        status: "ok",
        message: "Successfully connected to the GitHub API!",
      },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to the GitHub API.",
          details:
            error.response.data?.message ||
            "Invalid token or request limit exceeded.",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message:
          "An internal error occurred while trying to access the GitHub API.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
