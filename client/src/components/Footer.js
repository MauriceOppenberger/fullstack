import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#1976d2"
  }
}));

const Footer = () => {
  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link className={classes.link} color="inherit" to="/">
          {`< fulstak />`}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };
  const classes = useStyles();
  return (
    <div className="footer">
      <Copyright />
    </div>
  );
};
export default Footer;
