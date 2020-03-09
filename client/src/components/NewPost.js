import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const classes = useStyles();
  const [error, setError] = useState();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required")
    }),
    onSubmit: values => {
      addPost(values.title, values.description, props.user.id)
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
    }
  });

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        New Post
      </Typography>

      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          type="text"
          autoComplete="title"
          autoFocus
          error={formik.touched.title && formik.errors.title !== undefined}
          helperText={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ""
          }
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          name="description"
          label="Description"
          type="text"
          id="description"
          rows="10"
          error={
            formik.touched.description &&
            formik.errors.description !== undefined
          }
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ""
          }
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />

        {error && (
          <div className={classes.error}>
            <p>{error}</p>{" "}
          </div>
        )}
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
