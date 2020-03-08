import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormWrapper from "./styles/FormWrapper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90vmin",
    maxWidth: "500px",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    margin: "1rem 0",
    backgroundColor: "#fff"
    // width: 200
  },

  helperText: {
    // position: "absolute",
    margin: 0,
    padding: "3px 14px 0px",
    background: "#eee"
  },
  input: {
    display: "none"
  },
  margin: {
    margin: "1rem 0"
  }
}));

const NewIssueForm = props => {
  const classes = useStyles();

  React.useEffect(() => {}, []);

  console.log(props);
  return (
    <FormWrapper>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-full-width"
          label="Title"
          className={classes.textField}
          placeholder=""
          fullWidth
          margin="normal"
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          variant="outlined"
          name="title"
        />
        <TextField
          multiline
          rows="4"
          id="outlined-multiline-static"
          label="Description"
          className={classes.textField}
          placeholder=""
          fullWidth
          margin="normal"
          FormHelperTextProps={{
            classes: {
              root: classes.helperText
            }
          }}
          InputProps={{
            style: {
              padding: "0px"
            }
          }}
          variant="outlined"
          name="description"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={() => props.history.push("/open-issues")}
          className={classes.margin}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </FormWrapper>
  );
};

export default NewIssueForm;
