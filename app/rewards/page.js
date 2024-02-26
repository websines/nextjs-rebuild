"use client";
import React, { useState } from "react";
import RewardsData from "./rewardsdata.js";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

function RewardsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const categories = Object.keys(RewardsData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BalanceInfo points={5700} />
      <AppBar position="static" color="default" sx={{ marginY: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {categories.map((category, index) => (
            <Tab label={category} key={category} />
          ))}
        </Tabs>
      </AppBar>
      {categories.map((category, index) => (
        <TabPanel value={activeTab} index={index} key={category}>
          <RewardsList rewards={RewardsData[category] || []} />
        </TabPanel>
      ))}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function BalanceInfo({ points }) {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Rewards Balance
      </Typography>
      <Typography variant="h4">{points} pts</Typography>
    </Box>
  );
}

function RewardsList({ rewards }) {
  return (
    <Grid container spacing={2}>
      {rewards.map((reward) => (
        <Grid item xs={12} sm={6} md={4} key={reward.id}>
          <RewardCard reward={reward} />
        </Grid>
      ))}
    </Grid>
  );
}

function RewardCard({ reward }) {
  // Add additional checks for reward properties to prevent undefined errors
  if (!reward || !reward.image || !reward.description || !reward.points) {
    return null; // Handle the case where reward data is incomplete
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={reward.image}
        alt={reward.description}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {reward.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {reward.points}pts
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Redeem prize
        </Button>
      </CardActions>
    </Card>
  );
}

export default RewardsPage;
