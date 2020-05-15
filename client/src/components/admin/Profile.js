import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

import FileUploader from "../FormElements/FileUploader";
import ImageUploader from "../FormElements/ImageUploader";
import CustomTextField from "../FormElements/TextField";
import Loading from "../Loading";
import ProfileWrapper from "./styles/ProfileWrapper";

const Profile = ({ user }) => {
  const [profile, updateProfile] = useState({
    title: "",
    location: "",
    skills: "",
    summary: "",
    social: {
      github: "",
      linkedIn: "",
      website: "",
    },
    file: "",
  });
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(null);

  useEffect(() => {
    if (loading) {
      // fetch all user information and update component state
      axios
        .get("/profile")
        .then(({ data }) => {
          if (!data) {
            const error = new Error();
            throw error;
          }

          //destructer and update state with flat object
          //

          updateProfile({ ...data.profile });
        })
        .catch((err) =>
          updateError(
            err.response.status === 400
              ? err.response.data.message
              : err.message
          )
        );
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
    initialValues: {
      title: profile.title,
      location: profile.location,
      skills: profile.skills,
      summary: profile.summary,
      github: profile.social.github,
      linkedIn: profile.social.linkedIn,
      website: profile.social.website,
      file: profile.file ? profile.file : "",
    },
    // Set Required fields
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      // formData has binary and text data
      // use formData with multipart/form-data

      const {
        title,
        location,
        skills,
        summary,
        github,
        website,
        linkedIn,
        file,
      } = values;

      console.log(values);
      let formData = new FormData();
      formData.append("updatedTitle", title);
      formData.append("updatedLocation", location);
      formData.append("updatedSkills", skills);
      formData.append("updatedSummary", summary);
      formData.append("updatedGithub", github);
      formData.append("updatedLinkedIn", linkedIn);
      formData.append("updatedWebsite", website);
      formData.append("file", file);
      axios.post("/profile", formData).then((res) => console.log(res));
    },
  });
  if (loading) {
    return <Loading />;
  }
  console.log(formik.values);
  return (
    <ProfileWrapper>
      <p className="welcome">Welcome back {user.firstName},</p>
      <ImageUploader id="file" />
      <h2>{error ? error : "Complete your profile"}</h2>
      <form className="form" noValidate onSubmit={formik.handleSubmit}>
        <section className="about-me">
          <p className="title">About you</p>
          <CustomTextField
            formik={formik}
            field="title"
            required
            label="Title"
          />
          <CustomTextField
            formik={formik}
            required
            field="location"
            label="Location"
          />
          <CustomTextField
            formik={formik}
            field="skills"
            placeholder="eg. Ruby, Marketing, SEO"
            label="Skills (5 max)"
          />
        </section>

        <section className="summary">
          <p className="title">Summary</p>
          <CustomTextField
            formik={formik}
            multiline
            rows="10"
            field="summary"
            label="Tell us a little bit about yourself"
          />
        </section>
        <section className="summary">
          <p className="title">Social</p>
          <CustomTextField
            formik={formik}
            field="github"
            label="Link to your github profile (or equivalent)"
          />
          <CustomTextField
            formik={formik}
            field="linkedIn"
            label="Link to your LinkedIn profile (or equivalent)"
          />
          <CustomTextField
            formik={formik}
            field="website"
            label="Link to your persoanl website (or any other relevant project)"
          />
        </section>

        <FileUploader
          file={formik.values.file}
          id="file"
          setFieldValue={formik.setFieldValue}
        />
        <Button
          type="submit"
          fullWidth
          disabled={Object.keys(formik.errors).length > 0}
          variant="contained"
          color="primary"
          className="submit"
        >
          Save
        </Button>
      </form>
    </ProfileWrapper>
  );
};
export default Profile;
