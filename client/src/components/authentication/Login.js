import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validator from "../../utils/validator";
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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  helperText: {
    margin: 0,
    padding: "3px 14px 0px"
  },

  link: {
    textDecoration: "none",
    color: "#1976d2"
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1rem"
  }
}));

const Login = props => {
  const classes = useStyles();

  const [form, updateForm] = useState({
    formState: {
      email: {
        value: "",
        valid: false
      },
      password: {
        value: "",
        valid: false
      }
    }
  });
  const [formIsValid, updateFormIsValid] = useState(false);
  const [error, setError] = useState();

  const handleInput = (name, value) => {
    setError(false);

    const valid = Validator(name, value);

    updateForm(prevState => ({
      formState: {
        ...prevState.formState,
        [name]: {
          ...prevState.formState[name],
          value: value,
          valid: valid
        }
      }
    }));
    let formIsValid = true;
    for (const inputName in form.formState) {
      formIsValid = formIsValid && form.formState[inputName].valid;
    }
    updateFormIsValid(formIsValid);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!formIsValid) {
      setError(true);
      return console.log("Form not validated");
    }

    login(form.formState.email.value, form.formState.password.value)
      .then(result => {
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
      .then(res => {
        console.log(res.user);
        props.auth(res.user);
        props.history.push({
          pathname: "/dashboard/",
          state: { user: res.message }
        });
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  };
  const showError = name => {
    return error
      ? error
      : !form.formState[name].valid && form.formState[name].value.length > 0;
  };

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
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={showError("email")}
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            value={form.formState["email"].value}
            onChange={e => {
              handleInput(e.target.name, e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={showError("password")}
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            value={form.formState["password"].value}
            onChange={e => {
              handleInput(e.target.name, e.target.value);
            }}
          />
          {error && <p className={classes.error}>{error}</p>}
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

// (
//     <Container component="main" maxWidth="xs">
//     <CssBaseline />
//     <div className={classes.paper}>
//       <Avatar className={classes.avatar}>
//         <LockOutlinedIcon />
//       </Avatar>
//       <Typography component="h1" variant="h5">
//         Login Page!
//       </Typography>
//       {props.location.state && (
//         <p>You must be logged in to visit this page</p>
//       )}
//       <form
//         className={classes.form}
//         onSubmit={handleSubmit}
//         noValidate
//         // autoComplete="off"
//       >
//         <TextField
//           required
//           id="outlined-full-width"
//           label="Email Address"
//
//           className={classes.textField}
//           error={showError("email")}
//           helperText={error ? "field is required" : ""}
//           FormHelperTextProps={{
//             classes: {
//               root: classes.helperText
//             }
//           }}
//           fullWidth
//           margin="normal"

//           variant="outlined"
//           name="email"
//           value={form.formState["email"].value}
//           onChange={e => {
//             handleInput(e.target.name, e.target.value);
//           }}
//         />
//         <TextField
//           required
//           id="outlined-password-input"
//           label="Password"
//           type="password"
// error={showError("password")}
//           helperText={error ? "field is required" : ""}
//           FormHelperTextProps={{
//             classes: {
//               root: classes.helperText
//             }
//           }}
//           autoComplete="current-password"
//           value={form.formState["password"].value}
//           onChange={e => {
//             handleInput(e.target.name, e.target.value);
//           }}
//         />
//         {error && <p className="error">{error}</p>}

//         <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Remember me"
//         />
//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           className={classes.submit}
//           type="submit"
//         >
//           Login
//         </Button>
//       </form>
//     </div>
//   </Container>
// );

export default Login;
