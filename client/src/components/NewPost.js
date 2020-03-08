import React, { useState } from "react";
import FromWrapper from "../components/styles/FormWrapper";

import Validator from "../utils/validator";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { addPost } from "../utils/api";

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

const NewPost = props => {
  const [form, updateForm] = useState({
    formState: {
      title: {
        value: "",
        valid: false
      },
      description: {
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

    const valid = Validator(e.target.name, e.target.value);

    updateForm(prevState => ({
      formState: {
        ...prevState.formState,
        [e.target.name]: {
          ...prevState.formState[e.target.name],
          value: e.target.value,
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
    console.log("submit");
    console.log(props);
    // fetch("http://localhost:3000/admin/post", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: form.formState.title.value,
    //     description: form.formState.description.value,
    //     userId: props.user.id
    //   })
    // })
    addPost(
      form.formState.title.value,
      form.formState.description.value,
      props.user.id
    )
      .then(result => {
        console.log(result);
        if (result.status !== 200 && result.status !== 201) {
          const error = new Error("Faild to Post Data");
          setError(error.message);
          throw error;
        }
        return result.json();
      })
      .then(res => {
        props.history.push({ pathname: "/dashboard/open-issues" });
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

  const classes = useStyles();
  return (
    <FromWrapper>
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
            label="title"
            // style={{ margin: 8 }}
            className={classes.textField}
            error={showError("title")}
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            type="text"
            fullWidth
            margin="normal"
            // InputLabelProps={{
            //   shrink: true
            // }}
            variant="outlined"
            name="title"
            value={form.formState["title"].value}
            onChange={handleInput}
          />
          <TextField
            required
            error={showError("description")}
            multiline
            rows="4"
            id="outlined-multiline-static"
            label="description"
            type="text"
            helperText={error ? "field is required" : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            fullWidth
            InputProps={{
              style: {
                padding: "0px"
              }
            }}
            margin="normal"
            className={classes.textField}
            autoComplete="current-password"
            variant="outlined"
            name="description"
            value={form.formState["description"].value}
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
            submit
          </Button>
        </div>
      </form>
    </FromWrapper>
  );
};

export default NewPost;
