import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import RateandReview from "../RateandReview/RateandReview";
import CakePreview from "../customCake/CakePreview";
import Theme from "../../../../src/theme.js";
import { api } from "../../../api/api.js";
import { UserContext } from "../../context/User";
import { toast } from "react-toastify";
import Loader from "../../Loaders/Loader";
import ConfDelete from "../../Conformation/ConfDelete";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107",
  },
  "& .MuiRating-iconHover": {
    color: "#ffb300",
  },
});

export default function CakeDetails() {
  const [loadingCake, setLoadingCake] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const { userToken, userInfo } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id: cakeId } = useParams();

  const [from, setFrom] = useState(null);
  const isUnchanged =
    location?.state?.isEdit !== undefined ? location.state.isEdit : true;
  const [originalDetails, setOriginalDetails] = useState(
    location?.state?.originalDetails || null
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const [orderDetails, setOrderDetails] = useState({
    cakeId: null,
    shape: null,
    flavor: null,
    topping: null,
    color: null,
    file: null,
    cakeMessage: null,
    instructions: null,
    price: 0,
  });

  const handleClose = () => {
    setOpen(false);
    setReviewToEdit(null);
  };

  useEffect(() => {
    const { orderDetails, from: sourceFrom } = location?.state || {};
    setFrom(sourceFrom || null);
    if (orderDetails) {
      setOrderDetails(orderDetails);
    } else if (cakeId && sourceFrom) {
      (async () => {
        try {
          setLoadingCake(true);
          const { data } = await api.get(`/cake/${cakeId}`);
          setOrderDetails(data.cake);
          setOriginalDetails(data.cake);
        } catch {
          toast.error("Failed to load cake details.");
          navigate("/");
        } finally {
          setLoadingCake(false);
        }
      })();
    } else {
      toast.warn("No cake information provided.");
      navigate("/custom-cake");
    }
  }, [location]);

  useEffect(() => {
    if (!cakeId) return;

    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/rate/cake/${cakeId}`);
        const fetchedReviews = data?.reviews || [];
        setReviews(fetchedReviews);
        const average =
          fetchedReviews.length > 0
            ? (
                fetchedReviews.reduce((sum, r) => sum + r.rating, 0) /
                fetchedReviews.length
              ).toFixed(1)
            : 0;

        setAvgRating(Number(average));
      } catch {
        toast.error("Failed to load reviews");
      }
    };

    fetchReviews();
  }, [cakeId]);

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  const handleCart = async () => {
    if (!userToken) {
      toast.warn("You need to log in before adding to cart.");
      navigate("/login", {
        state: { from: location, orderDetails },
        replace: true,
      });
      return;
    }

    const [ width, height] = orderDetails.shape.viewBox
      .split(" ")
      .map(Number);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    try {
      const shapeImg = await loadImage(orderDetails.shape.image.secure_url);
      ctx.drawImage(shapeImg, 0, 0, width, height);

      if (orderDetails.color && orderDetails.shape.d) {
        const path = new Path2D(orderDetails.shape.d);
        ctx.save();
        ctx.clip(path);
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = orderDetails.color;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
      } else if (orderDetails.flavor?.image?.secure_url) {
        const flavorImg = await loadImage(orderDetails.flavor.image.secure_url);
        ctx.drawImage(flavorImg, 0, 0, width, height);
      }

      if (orderDetails.topping?.image?.secure_url) {
        const toppingImg = await loadImage(
          orderDetails.topping.image.secure_url
        );
        ctx.drawImage(toppingImg, 0, 0, width, height);
      }

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (blob) {
        const file = new File([blob], "custom-cake.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("shape", orderDetails.shape._id);
        formData.append("flavor", orderDetails.flavor._id);
        formData.append("topping", orderDetails.topping._id);
        formData.append("color", orderDetails.color);
        if (orderDetails.file) {
          formData.append("file", orderDetails.file);
        }
        formData.append("cakeMessage", orderDetails.cakeMessage);
        formData.append("instructions", orderDetails.instructions);
        formData.append("basecake", file);

        if (!isUnchanged && from === "cart" && originalDetails._id) {
          await api.put(`/cake/custom/${originalDetails._id}`, formData);
          toast.success("Cake updated successfully!");
        } else {
          formData.append("type", "custom");
          const { data } = await api.post("/cake/custom/new", formData);
          const payload = {
            userId: userInfo._id,
            cakeId: data.cake,
            quantity: 1,
          };
          await api.post("/cart/add", payload);
          toast.success("Custom cake added to cart successfully!");
        }

        const url = URL.createObjectURL(file);
        window.open(url);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add cake to cart.");
    }
  };

  const handleDeleteReview = async () => {
    if (!userToken) {
      toast.warn("Login required to delete a review.");
      return;
    }
    try {
      await api.delete(`/rate/delete`, { data: { reviewId: reviewToDelete } });
      setReviews((prev) => {
        const updated = prev.filter((r) => r._id !== reviewToDelete);
        const average =
          updated.length > 0
            ? (
                updated.reduce((sum, r) => sum + r.rating, 0) / updated.length
              ).toFixed(1)
            : 0;
        setAvgRating(Number(average));
        return updated;
      });
      toast.success("Review deleted successfully.");
    } catch {
      toast.error("Failed to delete the review.");
    } finally {
      setOpenDelete(false);
      setReviewToDelete(null);
    }
  };

  if (loadingCake) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Loader />
      </Box>
    );
  }

  return (
    <>
      <RateandReview
        open={open}
        onClose={handleClose}
        cakeId={cakeId}
        reviewToEdit={reviewToEdit}
        onReviewAdded={(newReview) => {
          const isEditing = !!reviewToEdit;

          setReviews((prev) =>
            isEditing
              ? prev.map((r) => (r._id === newReview._id ? newReview : r))
              : [...prev, newReview]
          );

          const updated = isEditing
            ? reviews.map((r) => (r._id === newReview._id ? newReview : r))
            : [...reviews, newReview];

          const updatedAvg = (
            updated.reduce((sum, r) => sum + r.rating, 0) / updated.length
          ).toFixed(1);

          setAvgRating(Number(updatedAvg));
        }}
      />

      <ConfDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteReview}
        title="Delete Review"
        description="Are you sure you want to delete this review?"
      />

      <Box py={4} sx={{ px: { xs: 6, md: 2 }, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CakePreview
              selectedShape={orderDetails.shape}
              selectedFlavor={orderDetails.flavor}
              selectedTopping={orderDetails.topping}
              selectedColor={orderDetails.color}
              value={2}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Customized Cake
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={3}>
              A delicious customizable cake for any occasion. Choose your
              favorite shape, flavor, topping, and color!
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt={2}
              gap={1}
            >
              <StyledRating
                name="avg-rating"
                value={Number(avgRating)}
                precision={0.5}
                readOnly
                size="medium"
              />
              <Typography variant="subtitle2" color="text.secondary">
                {avgRating} / 5
              </Typography>
            </Box>

            <Box mt={6} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">
                Shape:
              </Typography>
              <Typography>{orderDetails?.shape?.name}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">
                Flavor:
              </Typography>
              <Typography>
                {orderDetails?.flavor?.name?.split("_")[1]}
              </Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">
                Color:
              </Typography>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: orderDetails?.color,
                  borderRadius: "50%",
                }}
              />
              {!orderDetails.color && (
                <Typography variant="subtitle2">None</Typography>
              )}
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">
                Topping:
              </Typography>
              <Typography>
                {orderDetails?.topping?.name?.split("_")[1]}
              </Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">
                Price:
              </Typography>
              <Typography
                sx={{ color: Theme.palette.primary.main }}
                variant="subtitle2"
                fontWeight="bold"
              >
                {orderDetails?.price} ₪
              </Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">
                Review:
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(true)}
                sx={{
                  color: Theme.palette.primary.main,
                  borderColor: Theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                Write Review
              </Button>
            </Box>

            <Box mt={3} display="flex" justifyContent="space-between" gap={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: Theme.palette.primary.main,
                  color: "white",
                  borderRadius: 2,
                }}
                onClick={() => {
                  if (from === "cart" && isUnchanged) {
                    navigate(-1);
                  } else {
                    handleCart();
                  }
                }}
              >
                {from === "cart"
                  ? !isUnchanged
                    ? "Update Cake in Cart"
                    : "Return to Cart"
                  : "Add to Cart"}
              </Button>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: Theme.palette.primary.main,
                  color: "white",
                  borderRadius: 2,
                }}
                onClick={() =>
                  navigate("/custom-cake", {
                    state: {
                      orderDetails,
                      originalDetails,
                      from,
                    },
                  })
                }
              >
                Custom Cake
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Customer Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography color="text.secondary">No reviews yet.</Typography>
          ) : (
            reviews.map((review, idx) => (
              <Box
                key={idx}
                mb={2}
                p={2}
                sx={{ background: "#f9f9f9", borderRadius: 2 }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" gap={2}>
                    <Typography fontWeight="bold">
                      {review?.user?.username || "User"}
                    </Typography>
                    <StyledRating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </Box>

                  {userInfo?._id === review?.user?._id && (
                    <Box display="flex" gap={1}>
                      <Edit
                        fontSize="small"
                        sx={{
                          cursor: "pointer",
                          color: Theme.palette.primary.main,
                        }}
                        onClick={() => {
                          setReviewToEdit(review);
                          setOpen(true);
                        }}
                      />
                      <Delete
                        fontSize="small"
                        sx={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          setReviewToDelete(review._id);
                          setOpenDelete(true);
                        }}
                      />
                    </Box>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
