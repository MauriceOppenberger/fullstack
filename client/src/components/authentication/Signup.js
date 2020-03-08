import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Validator from "../../utils/validator";
import SignupWrapper from "./styles/SignupWrapper";

import FormWrapper from "../styles/FormWrapper";
import { signup } from "../../utils/api";

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

const Signup = props => {
  // const [form, updateForm] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: ""
  // });

  const [form, updateForm] = useState({
    formState: {
      email: {
        value: "",
        valid: false
      },
      firstName: {
        value: "",
        valid: false
      },
      lastName: {
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
      // setError(true);
      console.log("Form not validated");
      return;
    }
    // fetch("http://localhost:3000/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     firstName: form.formState.firstName.value,
    //     lastName: form.formState.lastName.value,
    //     email: form.formState.email.value,
    //     password: form.formState.password.value
    //   })
    // })
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
  return (
    <FormWrapper>
      <h1>Sign Up!</h1>
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
            placeholder=""
            fullWidth
            margin="normal"
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            variant="outlined"
            name="email"
            value={form.formState["email"].value}
            onChange={handleInput}
          />
          <TextField
            error={showError("firstName")}
            required
            id="outlined-full-width"
            label="First Name"
            // style={{ margin: 8 }}
            className={classes.textField}
            placeholder=""
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
            name="firstName"
            value={form.formState["firstName"].value}
            onChange={handleInput}
          />
          <TextField
            required
            id="outlined-full-width"
            label="Last Name"
            error={showError("lastName")}
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            // style={{ margin: 8 }}
            className={classes.textField}
            placeholder=""
            fullWidth
            margin="normal"
            variant="outlined"
            name="lastName"
            value={form.formState["lastName"].value}
            onChange={handleInput}
          />

          <TextField
            required
            error={showError("password")}
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            id="outlined-password-input"
            label="Password"
            type="password"
            // helperText={error ? "field is required" : ""}
            // InputLabelProps={
            //   error
            //     ? {
            //         shrink: true
            //       }
            //     : null
            // }
            // placeholder="field is required"
            fullWidth
            margin="normal"
            className={classes.textField}
            autoComplete="current-password"
            variant="outlined"
            name="password"
            value={form.formState["password"].value}
            onChange={handleInput}
          />
          {error && <p className="error">{error}</p>}
        </div>
        <div>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            type="submit"
          >
            Sign up
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Signup;
