import React from "react";
import { Post } from "../../types/types";
import styles from "../PostItem/PostItem.module.css";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Id: {post.id}</p>
    </div>
  );
};

export default PostItem;
