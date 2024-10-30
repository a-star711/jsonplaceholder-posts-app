import React, { useEffect, useState } from "react";
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
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      const latestPosts = data.slice(-20);
      setAllPosts(data);
      setFilteredPosts(latestPosts);
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (userId) {
      const userPosts = allPosts
        .filter((post) => post.userId === userId)
        .slice(-20);
      setFilteredPosts(userPosts);
    } else {
      setFilteredPosts(allPosts.slice(-20));
    }
  }, [userId, allPosts]);

  useEffect(() => {
    if (newPost) {
      setAllPosts((prevPosts) => [newPost, ...prevPosts]);
      setFilteredPosts((prevPosts) => [newPost, ...prevPosts].slice(-20));
    }
  }, [newPost]);

  return (
    <div className={styles.container}>
      <UserIdFilter userId={userId} onUserIdChange={setUserId} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p>No posts available for this user.</p>
      )}
    </div>
  );
};

export default PostList;
