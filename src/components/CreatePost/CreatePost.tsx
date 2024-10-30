import React, { useState } from "react";
import DOMPurify from "dompurify";
import { createPost } from "../../api/api";
import { Post } from "../../types/types";
import styles from "../CreatePost/CreatePost.module.css";
import Notification from "../Notification/Notification";

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({
    title: "",
    body: "",
    userId: 1,
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof Omit<Post, "id">,
    value: string | number
  ) => {
    setNewPost((prevPost) => ({
      ...prevPost,
      [field]: value,
    }));
  };

  const handleCreatePost = async () => {
    const sanitizedTitle = DOMPurify.sanitize(newPost.title);
    const sanitizedBody = DOMPurify.sanitize(newPost.body);

    try {
      const post = await createPost({
        title: sanitizedTitle,
        body: sanitizedBody,
        userId: newPost.userId,
      });

      const clientSidePost = { ...post, id: Date.now() };
      onPostCreated(clientSidePost);
      setNewPost({
        title: "",
        body: "",
        userId: 1,
      });

      setNotification("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
      setNotification("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
      {notification && (
        <Notification
          message={notification}
          type={notification.includes("successfully") ? "success" : "error"}
          onClose={() => setNotification(null)}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePost();
        }}
        className={styles.form}
      >
        <h2>Create a New Post</h2>
        <div className={styles.field}>
          <label>Title:</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Body:</label>
          <textarea
            value={newPost.body}
            onChange={(e) => handleInputChange("body", e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Create Post As:</label>
          <select
            value={newPost.userId}
            onChange={(e) =>
              handleInputChange("userId", parseInt(e.target.value, 10))
            }
            className={styles.select}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Add Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
