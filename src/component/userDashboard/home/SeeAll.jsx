import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import Logo from "../../../../public/image/da.png";
import Loader from "../../Loaders/Loader";

// ✅ Fake data simulating API response
const fakeMediaData = [
  {
    title: "التحليل الجيني",
    subtitle: "The Science Of Crime",
    image: Logo,
    isNew: false,
  },
  {
    title: "العالم السفلي",
    subtitle: "Under World",
    image: Logo,
    isNew: false,
  },
  {
    title: "قارتنا",
    subtitle: "The Continents",
    image: Logo,
    isNew: false,
  },
  {
    title: "قائد المجد",
    subtitle: "efef",
    image: Logo,
    isNew: true,
  },
  {
    title: "العمال البريون",
    subtitle: "Wild Workers",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
];

// ✅ Simulated async API function
const fetchFakeMedia = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeMediaData);
    }, 1500); // 1.5 seconds delay to simulate loading
  });
};

const MediaGrid = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await fetchFakeMedia();
        setMediaItems(data);
      } catch (error) {
        console.error("Error fetching fake media:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            px: { xs: 2, sm: 7, md: 10, lg: 20 },
            flexGrow: 1,
            minHeight: "100vh",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            mt={5}
            mb={5}
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            wedding cakes
          </Typography>
          <Grid container spacing={2}>
            {mediaItems.map((item, index) => (
              <Grid item xs={6} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  {item.isNew && (
                    <Chip
                      label="جديد"
                      color="error"
                      size="small"
                      sx={{ position: "absolute", top: 8, left: 8, zIndex: 2 }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ height: { xs: 250, sm: 280, md: 320, lg: 350 } }}
                  />
                  <CardContent
                    sx={{ backgroundColor: "#1c1c1c", color: "#fff" }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    {item.subtitle && (
                      <Typography variant="body2" color="gray">
                        {item.subtitle}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default MediaGrid;
