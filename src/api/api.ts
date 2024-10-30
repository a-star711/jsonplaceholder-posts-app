import { Post } from "../types/types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};


export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })

  const data = await response.json();
  return data;
};