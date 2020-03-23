import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { addComment } from "../utils/api";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  form: {
    width: "100%",
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

const NewComment = props => {
  const classes = useStyles();
  const [error, setError] = useState();
  // keeping local state of comment values in order
  // to prepopulate values with exsiting values from database
  // when editing comments
  const [commentValues, updateCommentValues] = useState({
    comment: "",
    code: ""
  });

  const formik = useFormik({
    initialValues: commentValues,
    // important for prepoulation of values in editing mode
    enableReinitialize: true,
    validationSchema: Yup.object({
      comment: Yup.string().required("Required"),
      code: Yup.string()
    }),

    onSubmit: async values => {
      try {
        const postId = props.id;
        const result = await addComment(values, postId);

        if (result.status !== 200 && result.status !== 201) {
          const error = new Error("Faild to Post Data");
          setError(error.message);
          throw error;
        }
        const newComment = await result.json();
        // handle ui update with new comments in parent component (POST)
        props.handleNewComment(newComment);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    }
  });

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        New Comment
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          name="comment"
          label="Comment"
          type="comment"
          id="comment"
          rows="5"
          error={formik.touched.comment && formik.errors.comment !== undefined}
          helperText={
            formik.touched.comment && formik.errors.comment
              ? formik.errors.comment
              : ""
          }
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          name="code"
          label="Code"
          type="code"
          id="code"
          rows="5"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
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

export default NewComment;
