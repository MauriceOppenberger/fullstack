import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  helperText: {
    margin: 0,
    padding: "3px 14px 0px",
  },
}));
const CustomTextField = (props) => {
  const classes = useStyles();
  const { formik, label, field, lineheigth } = props;

  return (
    <TextField
      {...props}
      variant="outlined"
      margin="normal"
      fullWidth
      id={field}
      label={label}
      name={field}
      type="text"
      autoComplete={field}
      error={formik.touched[field] && formik.errors[field] !== undefined}
      helperText={
        formik.touched[field] && formik.errors[field]
          ? formik.errors[field]
          : ""
      }
      FormHelperTextProps={{
        classes: {
          root: classes.helperText,
        },
      }}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[field]}
    />
  );
};
export default CustomTextField;
