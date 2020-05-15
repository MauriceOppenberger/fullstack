import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { addPost, getPost, updatePost } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    maxWidth: "50vw",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // maxWidth: "150px",
    // float: "right"
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
  formControl: {
    margin: "8px 0",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewPost = (props) => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [postValues, updatePostValues] = useState({
    title: "",
    description: "",
    language: "",
  });
  const formik = useFormik({
    initialValues: postValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      language: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        const updatedPostId = props.match.params.id;

        const result = updatedPostId
          ? await updatePost(updatedPostId, values, props.user.id)
          : await addPost(values, props.user.id);

        if (result.status !== 200 && result.status !== 201) {
          const error = new Error("Faild to Post Data");
          setError(error.message);
          throw error;
        }
        props.history.push({ pathname: "/dashboard/open-posts" });
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    },
  });

  const getPostById = async (id) => {
    try {
      const { post } = await getPost(id);
      console.log(post);
      //Update From Data
      updatePostValues({
        title: post.title,
        description: post.description,
        language: post.language,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getpost by id
    getPostById(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {props.match.params.id ? "Update Post" : "New Post"}
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
              root: classes.helperText,
            },
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={
            formik.touched.language && formik.errors.language !== undefined
          }
          helperText={
            formik.touched.language && formik.errors.language
              ? formik.errors.language
              : ""
          }
          FormHelperTextProps={{
            classes: {
              root: classes.helperText,
            },
          }}
        >
          <InputLabel id="select-outlined-label">Language</InputLabel>
          <Select
            labelId="select-outlined-label"
            id="language"
            label="Language"
            name="language"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.language}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="javascript">javascript</MenuItem>
            <MenuItem value="python">python</MenuItem>
            <MenuItem value="ruby">ruby</MenuItem>
          </Select>
        </FormControl>
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
              root: classes.helperText,
            },
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
