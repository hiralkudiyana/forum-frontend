import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CommentBox from "../components/CommentBox";
import PostCard from "../components/PostCard";
import axios from "../api/api";
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
    const [isloading, setLoading] = useState(false);
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const user = JSON.parse(localStorage.getItem("user"));

    //     setIsLoggedIn(!!token);
    //     setIsBanned(user?.is_banned == true);

    //  }, []);
       useEffect(() => {
        
        const fetchProfile = async () => {
          setLoading(true);
          const token = localStorage.getItem("token");
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (!token || !localUser?.id){
          setLoading(false);
          return;
        } 

        try {
          const res =  await axios.get(`/user/${localUser.id}`);
          const serverUser = res.data.data;
          // 🔥 If ban status changed → logout
          if (localUser.is_banned !== serverUser.is_banned) {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(serverUser));
          }

        } catch (err) {
          localStorage.clear();
          window.location.href = "/login";
        }
        
          const token1 = localStorage.getItem("token");
          const user = JSON.parse(localStorage.getItem("user"));
          setIsLoggedIn(!!token1);
          setIsBanned(user?.is_banned == 1);
          setLoading(false);
        }
        fetchProfile()
        

      }, []);
  return (
    <Container className="mt-4">
      <h4 className="mb-4">Anouncment</h4>

      {/* 🔹 Comment Section */}
      <CommentBox isLoggedIn={isLoggedIn} isBanned={isBanned} isloading={isloading} />

      {/* 🔹 Existing Posts */}
      {dummyPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </Container>
  );
}
