import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  styled,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(0,7, 0),
  borderTop: "1px solid #e0e0e0",
  marginTop: "auto",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#424242",
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const Footer = () => {
  return (
    <FooterContainer 
// @ts-ignore
    component="footer">
      <Container maxWidth="lg"  sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box mb={2}>
              <img
                src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e"
                alt="Company Logo"
                style={{ height: "60px", marginBottom: "1rem" }}
              />
            </Box>
            <Typography variant="body2" color="textSecondary" paragraph>
              Creating delicious moments with our handcrafted cakes and pastries
              since 1995.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <FooterLink href="/home">Home</FooterLink>
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <FooterLink href="/custom-cake">Make Cake</FooterLink>
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <FooterLink href="/home">About Us</FooterLink>
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <FooterLink href="/home">Contact Us</FooterLink>
            </Typography>
            
            
           
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
              <FooterLink href="tel:+972595857463" variant="body2">
                +972 595 857 463
              </FooterLink>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon fontSize="small" sx={{ mr: 1 }} />
              <FooterLink href="mailto:yousefghawi13@gmail.com" variant="body2">
                yousefghawi13@gmail.com
              </FooterLink>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                Palestine-Tulkarm-Attil 
              </Typography>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <SocialIcon
                aria-label="Facebook"
                // @ts-ignore
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon
                aria-label="Instagram"
                // @ts-ignore
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon
                aria-label="Pinterest"
                // @ts-ignore
                component="a"
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PinterestIcon />
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mb={1} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Sweet Bakery. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;