"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "@/lib/SupabaseClient";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import Countdown from "react-countdown";
import { TikTokEmbed } from "react-social-media-embed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";

const ContestPage = ({ params }) => {
  const contestId = params.id;
  const [topVideos, setTopVideos] = useState([]);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    fetchContest();
    fetchTopVideos();
  }, [contestId]);

  const fetchContest = async () => {
    try {
      const { data, error } = await supabase
        .from("contests")
        .select("*")
        .eq("id", contestId)
        .single();

      if (error) throw error;
      setContest(data);
    } catch (error) {
      console.error("Error fetching contest", error);
    }
  };

  const fetchTopVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("contest_id", contestId)
        .order("votes", { ascending: false })
        .limit(3);

      if (error) throw error;
      setTopVideos(data);
    } catch (error) {
      console.error("Error fetching top videos", error);
    }
  };

  const renderVideoEmbed = (videoUrl) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${
            videoUrl.split("v=")[1].split("&")[0]
          }`}
          frameBorder="0"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      );
    } else if (videoUrl.includes("tiktok.com")) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  const countdownRenderer = ({ days, hours, minutes, seconds }) => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <AccessTimeIcon color="action" />
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          {days}d {hours}h {minutes}m {seconds}s left
        </Typography>
      </Box>
    );
  };

  const getBorderColor = (index) => {
    switch (index) {
      case 0:
        return "gold";
      case 1:
        return "silver";
      case 2:
        return "bronze";
      default:
        return "grey";
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom component="div">
        {contest?.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {contest?.description}
      </Typography>
      {contest?.start_time && (
        <Box my={2} sx={{ backgroundColor: "#008000", p: 2, borderRadius: 2 }}>
          <Countdown
            date={
              new Date(contest.start_time).getTime() + 12 * 24 * 60 * 60 * 1000
            }
            renderer={countdownRenderer}
          />
        </Box>
      )}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item>
          <Button
            component={Link}
            href={`/contests/${contestId}/joincontest`}
            variant="contained"
            color="primary"
          >
            Join Contest
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            href={`/contests/${contestId}/submissions`}
            variant="outlined"
            color="secondary"
          >
            All Submissions
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom component="div">
        Top Videos
      </Typography>
      <Grid container spacing={2}>
        {topVideos.map((video, index) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 3,
                borderColor: getBorderColor(index),
                position: "relative",
              }}
            >
              {renderVideoEmbed(video.video_url)}
              <CardContent>
                <Typography variant="h6" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </CardContent>
              <Box
                position="absolute"
                top={16}
                right={16}
                bgcolor="background.paper"
                p={0.5}
                borderRadius={2}
              >
                <Typography variant="subtitle1">{index + 1}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContestPage;
