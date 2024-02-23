import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerBox: {
      bottom: 0,
      width: "100%",
      // background: "#ffbe2e3d",
      background: "#000000",
      color: "#FFD700",
    },
    footerContent: {
      background: "transparent!important",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      maxWidth: "1140px",
      margin: "0px auto",
      padding: "24px 10px",
      fontSize: "14px",
      fontWeight: 400,
      [theme.breakpoints.down('md')]: {
        paddingLeft: 10,
        paddingRight: 10
      },
    },
  })
);

const Footer: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerBox}>
      <footer className={classes.footerContent}>
        {/* <span>Privacy Policy Do Not Sell My Personal Information Terms</span> */}
        <div>
          <span>PTE Magic @2021.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
