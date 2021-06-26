import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
function NotFound() {
  return (
    <>
      <Container style={{ marginTop: "100px" }} maxWidth="sm">
        <Grid container className="mt10 p-10 not-found">
          <Grid item className="w-100">
            <h1 className="text-align-center font-404">404</h1>
            <h3 className="text-align-center">Page Not Found</h3>
            <p className="text-align-center mt-10">
              {" "}
              The page you are looking for doesn't exist or an other error
              occurred
            </p>
            <div className="flex-box mt-10 justify-content-center">
              <Link to="/" className="flex-box ">
                <HomeIcon />
                Home
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default NotFound;
