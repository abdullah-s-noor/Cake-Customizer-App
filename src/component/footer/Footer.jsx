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
  backgroundColor: "#723d46",
  padding: theme.spacing(0,7, 0),
  borderTop: "1px solid #e0e0e0",
  marginTop: "auto",
  color: 'white'
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "white",
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
      <Container maxWidth="lg"  sx={{ mt: 2, color: 'white', p: 3 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box mb={2} >
              <img
                src="image/footer-logo.png"
                alt="Company Logo"
                style={{ height: "100px", marginBottom: "1rem" }}
              />
            </Box>
            <Typography variant="body2"  paragraph>
              Creating delicious moments with our handcrafted cakes and pastries
              since 1995.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2"  mb={1}>
              <FooterLink href="/">Home</FooterLink>
            </Typography>
            <Typography variant="body2"  mb={1}>
              <FooterLink href="/custom-cake">Make Cake</FooterLink>
            </Typography>
            <Typography variant="body2"  mb={1}>
              <FooterLink href="/home">About Us</FooterLink>
            </Typography>
            <Typography variant="body2"  mb={1}>
              <FooterLink href="/home">Contact Us</FooterLink>
            </Typography>
            
            
           
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6"  gutterBottom>
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
              <Typography variant="body2" >
                Palestine-Tulkarm-Attil 
              </Typography>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6"  gutterBottom>
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
                color="primary"
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
                color="secondary"
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
                color="inherit"
              >
                <PinterestIcon />
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mb={1} textAlign="center">
          <Typography variant="body2" >
            © {new Date().getFullYear()} Sweet Bakery. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;