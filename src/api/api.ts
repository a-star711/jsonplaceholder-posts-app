import { Post } from "../types/types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array of posts");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};


export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {

  if (!newPost.title) {
    throw new Error("Title is required");
  }
  if (!newPost.body) {
    throw new Error("Body is required");
  }
  if (!newPost.userId) {
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