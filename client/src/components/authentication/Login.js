import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { login } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  helperText: {
    margin: 0,
    padding: "3px 14px 0px",
  },

  link: {
    textDecoration: "none",
    color: "#1976d2",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1rem",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(/^(?=.*\d)(?=.*[a-z])\w{5,}$/, "Invalid password"),
    }),

    onSubmit: (values) => {
      login(values.email, values.password)
        .then((result) => {
          if (result.status === 401 || result.status === 403) {
            const error = new Error("Email or Password invalid");
            setError(error.message);
            throw error;
          }
          if (result.status !== 200) {
            const error = new Error("Faild to Fetch Data from Server");
            setError(error.message);
            throw error;
          }
          return result.json();
        })
        .then((res) => {
          console.log(res.user);
          props.auth(res.user);
          props.location.state
            ? props.history.push({
                pathname: props.location.state.from.pathname,
                state: { user: res.message },
              })
            : props.history.push({
                pathname: "/dashboard/profile",
                state: { user: res.message },
              });
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    },
  });

  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link className={classes.link} color="inherit" to="/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {props.location.state && (
          <p>You must be logged in to visit this page</p>
        )}
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            error={formik.touched.email && formik.errors.email !== undefined}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            FormHelperTextProps={{
              classes: {
                root: classes.helperText,
              },
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            error={
              formik.touched.password && formik.errors.password !== undefined
            }
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
            FormHelperTextProps={{
              classes: {
                root: classes.helperText,
              },
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {error && (
            <div className={classes.error}>
              <p>{error}</p>{" "}
            </div>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.link} to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
