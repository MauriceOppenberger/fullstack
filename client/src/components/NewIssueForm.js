import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormWrapper from "./styles/FormWrapper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

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

  const [priority, setPriority] = React.useState("Medium");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setPriority(event.target.value);
  };

  console.log(props);
  return (
    <FormWrapper>
      <form noValidate autoComplete="off">
        <FormControl variant="outlined">
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={priority}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value={"High"}>High</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            className={classes.margin}
            component="span"
          >
            Upload Supporting Documents
          </Button>
        </label>

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
