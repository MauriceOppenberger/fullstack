import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FileUploader from "../FormElements/FileUploader";
import CustomTextField from "../FormElements/TextField";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    maxWidth: "50vw",
  },
  welcome: {
    textTransform: "capitalize",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "150px",
    float: "right",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user, updateUser] = useState(null);
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(null);

  useEffect(() => {
    if (loading) {
      // fetch all user information and update component state
      axios
        .get("/admin/user/profile")
        .then(({ data }) => {
          if (!data) {
            const error = new Error("failed to fetch data, try again later");
            throw error;
          }
          updateUser({ ...data.data });
        })
        .catch((err) => updateError("failed to fetch data, try again later"));
    }
    // wait for receiving data from database
    // set timeout to wait for component to populate with data before returning
    const id = setTimeout(() => {
      updateLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [loading]);

  // populate component with existing data
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user,
    // Set Required fields
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: (values) => {
      // formData has binary and text data
      // use formData with multipart/form-data
      let formData = new FormData();
      formData.append("updatedFirstName", values.firstName);
      formData.append("updatedLastName", values.lastName);
      formData.append("updatedEmail", values.email);
      formData.append("file", values.file);
      axios
        .post("/admin/user/profile", formData)
        .then((res) => console.log(res));
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (!loading && error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className={classes.paper}>
      <h1 className={classes.welcome}>Welcome back {user.firstName},</h1>
      <h2>Complete your profile</h2>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <CustomTextField
          formik={formik}
          required={true}
          field="firstName"
          label="First Name"
        />
        <CustomTextField
          formik={formik}
          required={true}
          field="lastName"
          label="Last Name"
        />
        <CustomTextField
          formik={formik}
          required={true}
          field="email"
          label="Email"
        />
        <FileUploader
          file={formik.values.resume}
          id="file"
          setFieldValue={formik.setFieldValue}
        />
        <Button
          type="submit"
          fullWidth
          disabled={Object.keys(formik.errors).length > 0}
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
export default Profile;
