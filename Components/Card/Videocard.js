import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const VideoCard = ({ videoUrl, description, title, votes }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 4 }}>
      <CardMedia
        component="iframe"
        height="200"
        src={videoUrl} // Assuming 'videoUrl' is a direct link to a video embed
        title={`Video for ${title}`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Votes: {votes}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
