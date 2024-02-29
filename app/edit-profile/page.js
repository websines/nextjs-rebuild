"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography } from "@mui/material";
import supabase from "@/lib/SupabaseClient";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = supabase.auth.getUser();
      if (!user) {
        router("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("user_id", user.id)
        .single();

      if (error && error.message !== "No rows found") {
        console.error("Error fetching profile:", error.message);
      }

      setUsername(data?.username || "");
      setAvatarUrl(data?.avatar_url || "");
      setIsLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ user_id: user.id, username, avatar_url: avatarUrl });

      if (error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.log("Profile updated:", data);
      }
    }
    setIsLoading(false);
    navigate("/profile");
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        Edit Profile
      </Typography>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default EditProfile;
