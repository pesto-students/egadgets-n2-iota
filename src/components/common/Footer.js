import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import "../../styles/components/Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";

function Footer() {
  const categoryState = useSelector((state) => state.categories);
  return (
    <footer className="footer-background">
      <Container>
        <div>
          <Grid container>
            <Grid item md={6} sm={6} className="p-10">
              <h3 className="logo pt-10">EGadgets</h3>
              <Typography
                variant="body2"
                className="py-10 d-block font-color-gray"
              >
                Ecommerce, also known as electronic commerce or internet
                commerce, refers to the buying and selling of goods or services
                using the internet, and the transfer of money and data to
                execute these transactions. Ecommerce is often used to refer to
                the sale of physical products online, but it can also describe
                any kind of commercial transaction that is facilitated through
                the internet.
              </Typography>
              <div className="py-10 font-color-green">
                <Typography variant="body2">
                  CONTACT US : +911234123412
                </Typography>
                <Typography variant="body2">
                  EMAIL : xyz@egadgets.com
                </Typography>
                <Typography variant="body2">
                  ADDRESS : 1st floor , 2nd cross, hsr layout, bangalore
                </Typography>
              </div>
            </Grid>

            <Grid item md={2} sm={6} className="p-10 ">
              <h3 className="p-10">Quick Links</h3>

              <div className="p-5 pl-10">
                <Link className="link font-color-gray" to="/">
                  Home
                </Link>
              </div>
              <div className="p-5 pl-10">
                <Link
                  className="link font-color-gray"
                  to={
                    categoryState.categoryData &&
                    categoryState.categoryData.length > 0
                      ? "/shop/" + categoryState.categoryData[0]["objectId"]
                      : ""
                  }
                >
                  Shop
                </Link>
              </div>
              <div className="p-5 pl-10">
                <Link className="link font-color-gray" to="/cart">
                  Cart
                </Link>
              </div>
              <div className="p-5 pl-10">
                <Link className="link font-color-gray" to="/signin">
                  Login
                </Link>
              </div>
              <div className="p-5 pl-10">
                <Link className="link font-color-gray" to="/signup">
                  Register
                </Link>
              </div>
            </Grid>

            <Grid item md={4} sm={10} xs={12} className="p-10">
              <div className="p-10 border-bottom">
                <Typography
                  variant="body2"
                  className="font-color-gray letter-spacing-point5 text-justify"
                >
                  {" "}
                  Margot is a content marketing specialist at WordStream and
                  nutrition graduate student at Framingham State. She loves all
                  things digital, learning about nutrition, running, traveling,
                  and cooking.
                </Typography>
                <div className="pt-10">
                  <Typography variant="body2" className="bold">
                    Alenly Edward
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-color-gray italic"
                  >
                    Co founder
                  </Typography>
                </div>
              </div>
              <div className="pt-10">
                <a href="https://www.twitter.com">
                  <TwitterIcon className="m-10 white-font-color"></TwitterIcon>{" "}
                </a>
                <a href="https://www.facebook.com">
                  <FacebookIcon className="m-10 white-font-color" />
                </a>
                <a href="https://www.instagram.com">
                  <InstagramIcon className="m-10 white-font-color" />
                </a>
                <a href="https://www.pinterest.com">
                  <PinterestIcon className="m-10 white-font-color" />
                </a>
                <a href="https://www.youtube.com">
                  <YouTubeIcon className="m-10 white-font-color" />
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="border-bottom"></div>
        <div className="w-100 ">
          <Grid container>
            <Grid item md className="font-color-gray">
              <Typography variant="body1" className="font-size-14 ">
                <Link
                  className="p-10 font-color-gray d-inline-block"
                  to="/terms-and-condition"
                >
                  Terms and Condition
                </Link>
                <Link
                  className="p-10 font-color-gray d-inline-block"
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                <Link
                  className="p-10 font-color-gray d-inline-block"
                  to="/refund-and-exchange-policy"
                >
                  Refund & Exchange Policy
                </Link>
              </Typography>
            </Grid>
            <Grid item md className="font-color-gray ">
              <Typography
                variant="body1"
                className="font-size-14 text-align-right p-10 "
              >
                <span>&#169;</span>
                <span> 2021 EGadgets All Rights Reserved</span>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
