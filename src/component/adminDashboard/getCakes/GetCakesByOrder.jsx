import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Loader from "../../Loaders/Loader";
import theme from "../../../../src/theme";

export default function GetCakesByOrder() {
    const { state } = useLocation();
    const cakes = state?.cakes || [];
    const [loading, setLoading] = React.useState(false); // Optional if you want a loader

    const total = cakes.reduce(
        (sum, item) => sum + item.cake.finalPrice * item.quantity,
        0
    );

    return (
        <>
            {loading ? (
                <Loader />
            ) : cakes.length > 0 ? (
                <Box maxWidth={900} mx="auto" p={{ xs: 1, sm: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight="bold">
                            Cakes in Order
                        </Typography>
                        <Typography variant="h6">{total} ₪</Typography>
                    </Grid>

                    {cakes.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                display: "flex",
                                mb: 2,
                                boxShadow: "none",
                                border: "1px solid #eee",
                                borderRadius: 2,
                            }}
                        >
                            {/* Cake Image */}
                            <Box display="flex" alignItems="center" pl={1} pr={{ xs: 1, sm: 4 }}>
                                <Box
                                    component="img"
                                    src={item.cake.basecake?.secure_url || "/image/testCake/2.png"}
                                    alt="Cake"
                                    sx={{ width: { xs: 68, sm: 140 }, transform: "translateY(-10%)" }}
                                />
                            </Box>

                            {/* Cake Info */}
                            <Box flex={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                <CardContent sx={{ py: 1, pl: 0, pr: 0 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: { xs: "10px", sm: "15px" }, mt: 0.5 }}
                                    >
                                        Price: {item.cake.finalPrice} ₪
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: { xs: "10px", sm: "15px" }, mt: 0.5 }}
                                    >
                                        Quantity: {item.quantity}
                                    </Typography>
                                </CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: "10px", sm: "15px" }, mt: 0.5, mr: 3 }}
                                >
                                    Final Price: {item.quantity * item.cake.finalPrice}₪
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Box textAlign="center" mt={5}>
                    <Typography variant="h6" color="text.secondary">
                        No cakes found for this order.
                    </Typography>
                </Box>
            )}
        </>
    );
}
