import {
  Container,
  FormControl,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../styles/Style.css";
import "../styles/components/SignIn.css";
import StyledButton from "../components/common/form/StyledButton";
import "../styles/components/SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import { SignUpAPI } from "../apis/AuthAPI";
import { useDispatch } from "react-redux";
import { fetchingAuthData } from "../actions/AuthAction";
import { Link } from "react-router-dom";
require("yup-phone");
require("yup-password")(Yup);

function SignUp(props) {
  const [showPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneIds = ["+91", "+1", "+92", "+94"];
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "The name is too short.")
      .max(50, "The name is too long.")
      .required("The name is required"),
    mobile: Yup.string().phone().required("The mobile is required."),
    email: Yup.string()
      .email("The email is invalid.")
      .required("The email is required."),
    password: Yup.string().password().required("The password is required."),
  });

  const cookies = new Cookies();
  const sessionToken = cookies.get("sessionToken");
  if (sessionToken) {
    NotificationManager.success("Already loggedin ", "success", 200);
    props.history.push("/");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
      mobileCountryCode: "+91",
    },
    validationSchema: validationSchema,
    onSubmit(values) {
      setLoading(true);
      let user = values;
      user.username = user.email;

      SignUpAPI(user)
        .then((resp) => {
          setLoading(false);
          if (resp.error) {
            if (resp.code) {
              NotificationManager.error(
                "Email already exists",
                resp.code,
                "Error"
              );
            }
          } else {
            const cookies = new Cookies();
            cookies.set("sessionToken", resp.sessionToken);
            if (resp.sessionToken) {
              dispatch(
                fetchingAuthData({
                  apiType: "userMe",
                  sessionToken: resp.sessionToken,
                })
              );

              props.history.push("/");
            }
            NotificationManager.success(
              "The user is created successfully",
              "Success"
            );
            formik.resetForm();
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error && error?.response) {
            const data = error.response.data;
            if (data.code === 202) {
              NotificationManager.error("Email already exists", "Error");
            }
          }
        });
    },
  });

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container className="mt10">
          <Grid item>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="border p10 p1em">
                <div className="mt-20  mr-10">
                  <Typography variant="h5" className="text-align-center">
                    Register
                  </Typography>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                  name="name"
                  className="w-100 mt-20  mr-10"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <div className="w-100 mt-20 mr-10 flex-box align-items-unset">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Code"
                    name="mobileCountryCode"
                    value={formik.values.mobileCountryCode}
                    onChange={formik.handleChange}
                    variant="outlined"
                  >
                    {phoneIds.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined-basic"
                    label="Your mobile Number"
                    variant="outlined"
                    name="mobile"
                    className="ml-10 flex-1"
                    value={formik.values.mobile}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    onChange={formik.handleChange}
                  />
                </div>

                <TextField
                  id="outlined-basic"
                  label="Your Email Address"
                  variant="outlined"
                  name="email"
                  className="w-100 mt-20  mr-10"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                />

                <FormControl variant="outlined" className="w-100 mt-20  mr-10">
                  {/* <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel> */}
                  <TextField
                    label="Enter you password"
                    id="outlined-adornment-password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    labelwidth={70}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <StyledButton
                  text="Register"
                  customStyle={{
                    width: "100%",
                    backgroundColor: "#FF8A00",
                    borderRadius: "5px",
                    marginTop: "15px",
                  }}
                  loading={loading}
                  disabled={loading}
                />

                <Typography variant="body2" className="mt-20">
                  Already have an account ?
                  <Link className="link" to="/signin">
                    Signin
                  </Link>
                </Typography>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SignUp;
