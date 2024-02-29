"use client";

// Profile.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import supabase from "@/lib/SupabaseClient";
import { useAuth } from "@/Providers/AuthProvider";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar_url: "",
    points: 0,
  });
  const [userVideos, setUserVideos] = useState([]);
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = await supabase.auth.user();
      if (!user?.id) {
        router("/auth");
        return;
      }

      try {
        const profileResponse = await supabase
          .from("profiles")
          .select("username, avatar_url, points")
          .eq("user_id", user.id)
          .single();

        if (profileResponse.error) throw profileResponse.error;

        const userProfileData = profileResponse.data;
        setUserProfile(userProfileData);

        const videosResponse = await supabase
          .from("videos")
          .select("*")
          .eq("user_id", user.id);

        if (videosResponse.error) throw videosResponse.error;
        setUserVideos(videosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Avatar
          src={userProfile.avatar_url || "/static/images/avatar/default.jpg"}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5" mt={2}>
          {userProfile.username}
        </Typography>
        <Typography variant="body1">Points: {userProfile.points}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>

      <Typography variant="h6" mt={4}>
        Your Videos
      </Typography>
      <List>
        {userVideos.map((video) => (
          <ListItem key={video.id}>
            <ListItemText
              primary={video.title}
              secondary={`Posted on: ${new Date(
                video.created_at
              ).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Profile;
