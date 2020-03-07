import React, { useState } from "react";
import FromWrapper from "../styles/FormWrapper";

import Validator from "../../utils/validator";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    // width: "90vmin",
    maxWidth: "500px",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: ".5rem",
    marginRight: ".5rem",
    marginBottom: "2rem",
    backgroundColor: "#fff"
  },
  helperText: {
    margin: 0,
    padding: "3px 14px 0px"
  },

  margin: {
    margin: theme.spacing(1)
  }
}));

const Login = props => {
  console.log(props);
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

  const handleInput = e => {
    e.persist();
    setError(false);
    const input = e.target.name;
    const value = e.target.value;
    const valid = Validator(input, value);
    updateForm(prevState => ({
      formState: {
        ...prevState.formState,
        [input]: {
          ...prevState.formState[input],
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
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: form.formState.email.value,
        password: form.formState.password.value
      })
    })
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
        props.auth();
        props.history.push({ pathname: "/", state: { user: res.message } });
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  };
  const showError = name => {
    return (
      (!form.formState[name].valid && form.formState[name].value.length > 0) ||
      error
    );
  };
  const classes = useStyles();
  return (
    <FromWrapper>
      <h1>Login Page!</h1>
      {props.location.state && (
        <h3>You must be logged in to visit this page</h3>
      )}
      <form
        className="authForm"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div className={classes.root}>
          <TextField
            required
            id="outlined-full-width"
            label="Email Address"
            // style={{ margin: 8 }}
            className={classes.textField}
            error={showError("email")}
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            fullWidth
            margin="normal"
            // InputLabelProps={{
            //   shrink: true
            // }}
            variant="outlined"
            name="email"
            value={form.formState["email"].value}
            onChange={handleInput}
          />
          <TextField
            required
            error={showError("password")}
            id="outlined-password-input"
            label="Password"
            type="password"
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            fullWidth
            margin="normal"
            className={classes.textField}
            autoComplete="current-password"
            variant="outlined"
            name="password"
            value={form.formState["password"].value}
            onChange={handleInput}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          {error && <p className="error">{error}</p>}
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </FromWrapper>
  );
};

export default Login;
