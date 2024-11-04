import React, { useEffect, useMemo, useState } from "react";
import { fetchPosts } from "../../api/api";
import PostItem from "../PostItem/PostItem";
import UserIdFilter from "../UserIdFilter/UserIdFilter";
import { Post } from "../../types/types";
import styles from "../PostList/PostList.module.css";

interface PostListProps {
  newPost?: Post | null;
}

const PostList: React.FC<PostListProps> = ({ newPost }) => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setAllPosts(data);
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (newPost) {
      setAllPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  const filteredPosts = useMemo(() => {
    const posts = userId
      ? allPosts.filter((post) => post.userId === userId)
      : allPosts;
    return posts.slice(-20);
  }, [allPosts, userId]);

  return (
    <div className={styles.container}>
      <UserIdFilter userId={userId} onUserIdChange={setUserId} />

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
