"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { TikTokEmbed } from "react-social-media-embed";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import supabase from "@/lib/SupabaseClient";

const ReviewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoReviews, setVideoReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const videosPerPage = 10;

  useEffect(() => {
    fetchVideoReviews();
  }, [selectedCategory, page]);

  const fetchVideoReviews = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("categories", selectedCategory === "All" ? null : selectedCategory)
      .range(page * videosPerPage, (page + 1) * videosPerPage - 1);

    if (error) {
      console.error("Error fetching video reviews:", error);
      setHasMore(false);
    } else {
      setVideoReviews((prev) => [...prev, ...data]);
      setHasMore(data.length === videosPerPage);
      setPage(page + 1);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFilterClick = () => {
    setVideoReviews([]);
    setPage(0);
    fetchVideoReviews();
  };

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

  return (
    <Container>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" gutterBottom component="div">
          Video Reviews
        </Typography>
        <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {/* Add categories dynamically if needed */}
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Tech & Gadgets">Tech & Gadgets</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFilterClick}>
          Filter
        </Button>
      </Box>
      <InfiniteScroll
        dataLength={videoReviews.length}
        next={fetchVideoReviews}
        hasMore={hasMore}
        loader={<Typography>Loading...</Typography>}
        endMessage={
          <Typography style={{ textAlign: "center" }}>
            You have seen all video reviews
          </Typography>
        }
      >
        {videoReviews.map((review) => (
          <Card key={review.id} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {review.title}
              </Typography>
              {renderVideoEmbed(review.video_url)}
              <Typography variant="body2" color="text.secondary">
                {review.description}
              </Typography>
              {/* Add voting buttons or other components as needed */}
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default ReviewPage;
