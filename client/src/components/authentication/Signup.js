import React, { useState } from "react";
import Validator from "../../utils/validator";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { signup } from "../../utils/api";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
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

const Signup = props => {
  const [form, updateForm] = useState({
    formState: {
      firstName: {
        value: "",
        valid: false
      },
      lastName: {
        value: "",
        valid: false
      },
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
  const [error, setError] = useState(null);

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
    // validate form
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
      console.log("Form not validated");
      return;
    }

    signup(
      form.formState.firstName.value,
      form.formState.lastName.value,
      form.formState.email.value,
      form.formState.password.value
    )
      .then(result => {
        if (result.status === 403) {
          const error = new Error(
            "email already exists, please use a valid email address"
          );
          setError(error.message);
          throw error;
        }
        if (result.status !== 200 && result.status !== 201) {
          const error = new Error("sign up failed");
          setError(error.message);
          throw error;
        }
        return result.json();
      })
      .then(res => {
        console.log(res);
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      });
  };
  const showError = name => {
    return (
      (!form.formState[name].valid && form.formState[name].value.length > 0) ||
      error
    );
  };
  const classes = useStyles();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link className={classes.link} to="/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={showError("firstName")}
                helperText={error ? "field is required" : ""}
                FormHelperTextProps={{
                  classes: {
                    root: classes.helperText
                  }
                }}
                value={form.formState["firstName"].value}
                onChange={e => {
                  handleInput(e.target.name, e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={showError("lastName")}
                helperText={error ? "field is required" : ""}
                FormHelperTextProps={{
                  classes: {
                    root: classes.helperText
                  }
                }}
                value={form.formState["lastName"].value}
                onChange={e => {
                  handleInput(e.target.name, e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            {error && <p className={classes.error}>{error}</p>}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

// return (
//   <FormWrapper>
//     <div className="fullwidth-container">
//       <h1>Sign Up!</h1>
//       <form
//         className="authForm"
//         onSubmit={handleSubmit}
//         noValidate
//         // autoComplete="off"
//       >
//         <div className={classes.root}>
//           <TextField
//             required
//             id="outlined-full-width"
//             label="Email Address"
//             // style={{ margin: 8 }}
//             className={classes.textField}
//             error={showError("email")}
//             placeholder=""
//             fullWidth
//             margin="normal"
//             helperText={error ? "field is required" : ""}
//             FormHelperTextProps={{
//               classes: {
//                 root: classes.helperText
//               }
//             }}
//             variant="outlined"
//             name="email"
//             value={form.formState["email"].value}
//             onChange={e => {
//               handleInput(e.target.name, e.target.value);
//             }}
//           />
//           <TextField
//             error={showError("firstName")}
//             helperText={error ? "field is required" : ""}
//             FormHelperTextProps={{
//               classes: {
//                 root: classes.helperText
//               }
//             }}
//             value={form.formState["firstName"].value}
//             onChange={e => {
//               handleInput(e.target.name, e.target.value);
//             }}
//           />
//           <TextField
//             required
//             id="outlined-full-width"
//             label="Last Name"
//             error={showError("lastName")}
//             helperText={error ? "field is required" : ""}
//             FormHelperTextProps={{
//               classes: {
//                 root: classes.helperText
//               }
//             }}
//             // style={{ margin: 8 }}
//             className={classes.textField}
//             placeholder=""
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             name="lastName"
//             value={form.formState["lastName"].value}
//             onChange={e => {
//               handleInput(e.target.name, e.target.value);
//             }}
//           />

//           <TextField
//             required
//             error={showError("password")}
//             helperText={error ? "field is required" : ""}
//             FormHelperTextProps={{
//               classes: {
//                 root: classes.helperText
//               }
//             }}
//             id="outlined-password-input"
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             className={classes.textField}
//             autoComplete="current-password"
//             variant="outlined"
//             name="password"
//             value={form.formState["password"].value}
//             onChange={e => {
//               handleInput(e.target.name, e.target.value);
//             }}
//           />
//           {error && <p className="error">{error}</p>}
//         </div>
//         <div>
//           <Button
//             variant="contained"
//             size="large"
//             color="primary"
//             className={classes.margin}
//             type="submit"
//           >
//             Sign up
//           </Button>
//         </div>
//       </form>
//     </div>
//   </FormWrapper>
// );

export default Signup;
