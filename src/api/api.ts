import { Post } from "../types/types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};


export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {

  if (!newPost.title || typeof newPost.title !== 'string' || newPost.title.length > 28) {
    throw new Error("Title is required and must be a string with a max length of 28 characters.");
  }
  if (!newPost.body || typeof newPost.body !== 'string' || newPost.body.length > 240) {
    throw new Error("Body is required and must be a string with a max length of 240 characters.");
  }
  if (!newPost.userId || typeof newPost.userId !== 'number') {
    throw new Error("User ID is required and must be a number.");
  }
  
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