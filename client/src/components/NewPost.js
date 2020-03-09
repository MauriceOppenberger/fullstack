import React, { useState } from "react";
import Validator from "../utils/validator";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { addPost } from "../utils/api";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    maxWidth: "50vw"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "150px",
    float: "right"
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
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        New Post
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          error={showError("title")}
          helperText={error ? "field is required" : ""}
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          value={form.formState["title"].value}
          onChange={e => {
            handleInput(e.target.name, e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          name="description"
          label="Description"
          type="description"
          id="description"
          error={showError("description")}
          helperText={error ? "field is required" : ""}
          value={form.formState["description"].value}
          onChange={e => {
            handleInput(e.target.name, e.target.value);
          }}
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          rows="10"
          InputProps={{
            style: {
              padding: "0px"
            }
          }}
        />
        {error && <p className={classes.error}>{error}</p>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
