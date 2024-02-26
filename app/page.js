"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { TikTokEmbed } from "react-social-media-embed";
import supabase from "@/lib/SupabaseClient";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const MainContent = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [topVideos, setTopVideos] = useState([]);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        fetchPoints(currentUser);
      }
    };

    const fetchPoints = async (currentUser) => {
      const { data } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", currentUser.id)
        .single();

      if (data) {
        setPoints(data.points);
      }
    };

    const fetchTopVideos = async () => {
      const { data } = await supabase
        .from("videos")
        .select(
          `
          id,
          title,
          video_url,
          contests (title),
          description
        `
        )
        .order("votes", { ascending: false })
        .limit(3);

      if (data) {
        setTopVideos(data);
      }
    };

    checkUser();
    fetchTopVideos(); // Fetch top videos
  }, []);

  const isYouTubeLink = (url) => /youtu(be.com|\.be)/.test(url);
  const isTikTokLink = (url) => /tiktok\.com/.test(url);

  const renderVideoEmbed = (videoUrl) => {
    if (isYouTubeLink(videoUrl)) {
      const videoId = videoUrl.split("v=")[1].split("&")[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <iframe
          width="100%"
          height="315"
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      );
    } else if (isTikTokLink(videoUrl)) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  const renderVideoGrid = (videos, title) => (
    <>
      <Typography variant="h5" gutterBottom component="div">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {video.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontStyle: "italic" }}
                >
                  {video.contests && video.contests.title}
                </Typography>
              </CardContent>

              {renderVideoEmbed(video.video_url)}

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom component="div">
          Welcome to CURATRS
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Join exciting video contests and earn rewards!
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            maxWidth: isMobile ? "100%" : "300px",
            margin: "auto",
            backgroundColor: "rgba(255,65,108,0.9)",
            color: "white",
          }}
        >
          {user ? (
            <Typography variant="body1" component="div">
              Your Points: {points}
            </Typography>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" component="div">
                Please log in to see your points
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  /* Add login logic here */
                }}
              >
                Log In
              </Button>
            </Box>
          )}
        </Paper>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom component="div">
            🎁 Newest Features 🎁
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-around",
              alignItems: "center",
              gap: isMobile ? 2 : 0,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                width: isMobile ? "100%" : "250px",
                backgroundColor: "rgba(245,245,245,0.9)",
              }}
            >
              <YouTubeIcon fontSize="large" />
              <Typography variant="body1" gutterBottom>
                Lower-level prizes include exclusive discount codes to our
                retail partners, unlocking amazing deals for our winners.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                width: isMobile ? "100%" : "250px",
                backgroundColor: "rgba(245,245,245,0.9)",
              }}
            >
              <LoyaltyIcon fontSize="large" />
              <Typography variant="body1" gutterBottom>
                Brands can now sponsor the theme of our weekly contests,
                bringing you exciting challenges and rewards tailored by your
                favorite companies.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                width: isMobile ? "100%" : "250px",
                backgroundColor: "rgba(245,245,245,0.9)",
              }}
            >
              <EmojiEventsIcon fontSize="large" />
              <Typography variant="body1" gutterBottom>
                Enjoy subscription rewards for consistent engagement and
                creativity! More contests, more fun, and more exclusive perks
                await you.
              </Typography>
            </Paper>
          </Box>
        </Box>
        {renderVideoGrid(topVideos, "Top Videos")}
      </Container>
    </Box>
  );
};

export default MainContent;
