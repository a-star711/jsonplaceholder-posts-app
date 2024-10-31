import React from "react";
import { Post } from "../../types/types";
import styles from "../PostItem/PostItem.module.css";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const getUserAvatar = (userId: number) =>
    `https://api.dicebear.com/9.x/adventurer/svg?seed=user${userId}`;

  return (
    <div className={styles.post}>
      <img
        src={getUserAvatar(post.userId)}
        alt={`Avatar of User ${post.userId}`}
        className={styles.avatar}
      />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostItem;
