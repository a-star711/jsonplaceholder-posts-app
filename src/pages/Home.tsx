import React, { useState } from "react";
import PostList from "../components/PostList/PostList";
import CreatePost from "../components/CreatePost/CreatePost";
import { Post } from "../types/types";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [newPost, setNewPost] = useState<Post | null>(null);

  const handlePostCreated = (post: Post) => {
    setNewPost(post);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <PostList newPost={newPost} />
        <CreatePost onPostCreated={handlePostCreated} />
      </div>
    </div>
  );
};

export default Home;
