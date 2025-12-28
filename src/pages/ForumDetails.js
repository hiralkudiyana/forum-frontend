import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommentBox from "../components/CommentBox";
import PostCard from "../components/PostCard";

const dummyPosts = [
  {
    user: "harshitharlalka",
    role: "TF Select",
    date: "Oct 21, 2025",
    content: "Hope this is not sarcasm",
  },
  {
    user: "drsel",
    role: "TF Prestige",
    date: "Oct 24, 2025",
    content: "OG is original gangster?",
  },
  {
    user: "harshitharlalka",
    role: "TF Select",
    date: "Oct 24, 2025",
    content: "Yes it is!",
  },
];

export default function ForumDetails() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isBanned, setIsBanned] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        setIsLoggedIn(!!token);
        setIsBanned(user?.is_banned === true);

     }, []);

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Anouncment</h4>

      {/* 🔹 Comment Section */}
      <CommentBox isLoggedIn={isLoggedIn} isBanned={isBanned} />

      {/* 🔹 Existing Posts */}
      {dummyPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </Container>
  );
}
