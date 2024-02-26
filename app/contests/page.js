import { Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";

import OpinionsIcon from "@/public/opinions-icon.svg";
import TechAndGadgetsIcon from "@/public/TechAndGadgetsIcon.svg";
import HomeAndKitchenIcon from "@/public/HomeAndKitchenIcon.svg";
import BeautyAndHealthIcon from "@/public/BeautyAndHealthIcon.svg";
import AutoAndTravelIcon from "@/public/AutoIcon.svg";
import BooksAndMediaIcon from "@/public/BooksAndMediaIcon.svg";
import FashionIcon from "@/public/FashionIcon.svg";
import SportsAndOutdoorsIcon from "@/public/SportsAndOutdoorsIcon.svg";
import ToysAndGamesIcon from "@/public/ToysAndGamesIcon.svg";
import LuxuryItemsIcon from "@/public/luxuryItemsIcon.svg";
import HighEndTechIcon from "@/public/HighEndTechIcon.svg";
import FineArtIcon from "@/public/FineArtIcon.svg";

const contestsData = [
  {
    id: "bronze-category-contests",
    label: "Bronze (100pts)",
    contests: [
      {
        id: "2a4dd854-186a-4a46-a150-d97b8ade9f8f",
        label: "Opinions",
        icon: OpinionsIcon,
        description: "Broadcast your thoughts, engage in debate.",
      },
      {
        id: "f62df48b-eb05-4fe8-950a-c0d6267d5a0f",
        label: "Tech & Gadgets",
        icon: TechAndGadgetsIcon,
        description: "Explore, review, discuss latest technology.",
      },
      {
        id: "8b5c1868-6e6f-4221-8b73-1a70c0bad430",
        label: "Home & Kitchen",
        icon: HomeAndKitchenIcon,
        description: "Share insights on domestic essentials.",
      },
    ],
  },
  {
    id: "silver-category-contests",
    label: "Silver (200pts)",
    contests: [
      {
        id: "8732fa01-9e7b-4ddd-b114-fa99ae610746",
        label: "Beauty & Health",
        icon: BeautyAndHealthIcon,
        description: "Experience wellness with superior products.",
      },
      {
        id: "868e3e9e-6af0-4607-bd14-ddf57ded1222",
        label: "Auto & Travel",
        icon: AutoAndTravelIcon,
        description: "Navigate the world, one review at a time.",
      },
      {
        id: "02ebb63e-2e9d-40ac-acfe-f0e9bd8080e1",
        label: "Books & Media",
        icon: BooksAndMediaIcon,
        description: "Unveil literary gems and entertainment.",
      },
    ],
  },
  {
    id: "gold-category-contests",
    label: "Gold (500pts)",
    contests: [
      {
        id: "5d74efe8-e15f-4d9c-9b7f-4c531cdae13d",
        label: "Fashion",
        icon: FashionIcon,
        description: "Stay trendy with stylish updates.",
      },
      {
        id: "67e6c2d4-bcf1-4686-be0a-61fc40a1c9cf",
        label: "Sports & Outdoors",
        icon: SportsAndOutdoorsIcon,
        description: "Join in athletic gear showdowns.",
      },
      {
        id: "683ce9e4-5212-4560-bfc4-4d39973be8c7",
        label: "Toys & Games",
        icon: ToysAndGamesIcon,
        description: "Share the fun with toy and game showdowns.",
      },
    ],
  },
  {
    id: "platinum-category-contests",
    label: "Platinum (1000pts)",
    contests: [
      {
        id: "0697422c-d511-4e09-a6a2-3b1f47723f50",
        label: "Luxury Items",
        icon: LuxuryItemsIcon,
        description: "Review and rate the finest luxuries.",
      },
      {
        id: "48ff86f0-79f4-41ff-8e04-cc226a6f8485",
        label: "High-End Tech",
        icon: HighEndTechIcon,
        description: "Experience technological innovation.",
      },
      {
        id: "48f3598a-8c2d-42de-ac66-7bbab658295a",
        label: "Fine Art",
        icon: FineArtIcon,
        description: "Appraise and discuss exquisite art pieces.",
      },
    ],
  },
  // Add more categories if needed
];
// Contest Card Component
const ContestCard = ({ contest }) => (
  <Card sx={{ maxWidth: 345, m: 2 }}>
    <CardMedia
      component="img"
      height="200" // Increased height
      image={contest.icon}
      alt={contest.label}
      sx={{ objectFit: "contain" }} // Ensures the icon is contained within the bounds
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {contest.label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {contest.description}
      </Typography>
    </CardContent>
  </Card>
);
// Main Contests Page Component
const Contests = () => {
  return (
    <div>
      {contestsData.map((category) => (
        <section key={category.id} className="my-5">
          <Typography variant="h4" gutterBottom textAlign="center">
            {category.label}
          </Typography>
          <Grid container justifyContent="center">
            {category.contests.map((contest) => (
              <Link
                href={`/contests/${contest.id}`}
                key={contest.id}
                style={{ textDecoration: "none" }}
              >
                <ContestCard contest={contest} />
              </Link>
            ))}
          </Grid>
        </section>
      ))}
    </div>
  );
};

export default Contests;
