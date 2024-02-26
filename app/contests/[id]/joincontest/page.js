"use client";

import React, { useState, useEffect } from "react";

import supabase from "@/lib/SupabaseClient";
import {
  TextField,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { TikTokEmbed } from "react-social-media-embed";

const JoinContest = ({ params }) => {
  const contestId = params.id;
  const [videoLink, setVideoLink] = useState("");
  const [title, setTitle] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [contestTopic, setContestTopic] = useState("");

  useEffect(() => {
    const fetchContestTopic = async () => {
      const { data, error } = await supabase
        .from("contest_topics")
        .select("topic, description")
        .eq("contest_id", contestId)
        .single();

      if (!error && data) {
        setContestTopic(`${data.topic} - ${data.description}`);
      }
    };

    fetchContestTopic();
  }, [contestId]);

  const isYouTubeLink = (url) => /youtu(be.com|\.be|be.com\/shorts)/.test(url);
  const isTikTokLink = (url) => /tiktok\.com/.test(url);

  const renderVideoEmbed = (url) => {
    let videoId;

    if (isYouTubeLink(url)) {
      if (url.includes("/shorts/")) {
        const parts = url.split("/shorts/");
        videoId = parts[1];
      } else {
        videoId = url.split("v=")[1].split("&")[0];
      }

      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      );
    } else if (isTikTokLink(url)) {
      return <TikTokEmbed url={url} />;
    }

    return <Typography>Unsupported video platform</Typography>;
  };

  const handleVideoSubmission = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("You must accept the terms and conditions.");
      return;
    }
    if (!videoLink || (!isYouTubeLink(videoLink) && !isTikTokLink(videoLink))) {
      alert("Please enter a valid YouTube or TikTok video URL.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("videos").insert([
      {
        contest_id: contestId,
        user_id: supabase.auth.getUser()?.id,
        video_url: videoLink,
        title: title,
      },
    ]);

    if (error) {
      alert(`Submission failed: ${error.message}`);
    } else {
      alert("Your video has been submitted successfully!");
      setVideoLink("");
      setTitle("");
    }

    setSubmitting(false);
  };

  const handlePreview = () => {
    if (!videoLink || (!isYouTubeLink(videoLink) && !isTikTokLink(videoLink))) {
      alert("Please enter a valid YouTube or TikTok video URL.");
      return;
    }
    setShowPreview(true);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Join Contest
      </Typography>
      {contestTopic && (
        <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
          This week's topic: {contestTopic}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Enter video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
        }
        label="I agree to the contest's Terms and Conditions"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePreview}
        style={{ marginRight: "10px" }}
      >
        Preview
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleVideoSubmission}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Upload"}
      </Button>

      {showPreview && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Preview Submission</Typography>
          <Typography>
            <b>Video title:</b> {title}
          </Typography>
          {renderVideoEmbed(videoLink)}
        </div>
      )}
    </Container>
  );
};

export default JoinContest;
