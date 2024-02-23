import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/CustomButton/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerBox: {
      bottom: 0,
      width: "100%",
      background: "radial-gradient(ellipse at center,#585858 0,#232323 100%)",
      backgroundSize: "550% 450%",
      color: "#ffffff",
    },
    footerContent: {
      background: "transparent!important",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      maxWidth: "1300px",
      margin: "0px auto",
      padding: "24px 10px",
      fontSize: "14px",
      fontWeight: 400,
      [theme.breakpoints.down("md")]: {
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
    linksVertical: {
      listStyleType: "none",
      paddingLeft: "0px !important",
      "& li": {
        margin: "10px 0px",
        "& a": {
          color: "#ffffff",
        },
      },
    },
    headerFooter: {
      color: "#ffffff !important",
      fontSize: "17px",
      margin: "10px 0px 15px",
    },
    socialButtons: {
      listStyleType: "none",
      display: "flex",
      paddingLeft: "0px !important",
    },
    footerWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inlineBlock: {
      display: "inline-block",
      padding: 0,
      paddingRight: 12,
      width: "auto",
      "& a": {
        color: "#ffffff"
      }
    },
    right: {
      textAlign: "right",
      [theme.breakpoints.down("xs")]: {
        textAlign: "left"
      },
    },
    left: {
      textAlign: "left"
    }
  })
);

const StudyCenterFooter: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerBox}>
      <footer className={classes.footerContent}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <h5 className={classes.headerFooter}>Getting Started</h5>
            <ul className={classes.linksVertical}>
              <li>
                <a href="#pablo">How To Use Magic Platform</a>
              </li>
              <li>
                <a href="#pablo">About Us</a>
              </li>
              <li>
                <a href="#pablo">FAQs</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <h5 className={classes.headerFooter}>
              PTE Practice Test Resources
            </h5>
            <ul className={classes.linksVertical}>
              <li>
                <a href="#pablo">PTE Practice Test</a>
              </li>
              <li>
                <a href="#pablo">PTE Reading</a>
              </li>
              <li>
                <a href="#pablo">PTE Speaking</a>
              </li>
              <li>
                <a href="#pablo">PTE Writing</a>
              </li>
              <li>
                <a href="#pablo">PTE Listening</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <h5 className={classes.headerFooter}>Follow us</h5>
            <ul className={classes.socialButtons}>
              <li>
                <Button justIcon simple href="#pablo" color="#ffffff">
                  <i className="fab fa-twitter" />
                </Button>
              </li>
              <li>
                <Button justIcon simple href="#pablo" color="#ffffff">
                  <i className="fab fa-facebook-square" />
                </Button>
              </li>
              <li>
                <Button justIcon simple href="#pablo" color="#ffffff">
                  <i className="fab fa-dribbble" />
                </Button>
              </li>
              <li>
                <Button justIcon simple href="#pablo" color="#ffffff">
                  <i className="fab fa-google-plus-g" />
                </Button>
              </li>
              <li>
                <Button justIcon simple href="#pablo" color="#ffffff">
                  <i className="fab fa-instagram" />
                </Button>
              </li>
            </ul>
            <h5 className={classes.headerFooter}>Numbers Don{"'"}t Lie</h5>
            <h4 className={classes.headerFooter}>
              120,000+ <small style={{ color: "#777777" }}>members</small>
            </h4>
          </Grid>
        </Grid>
        <hr style={{ borderColor: "#ffffff", width: "100%" }} />
        <Grid container className={classes.footerWrapper}>
          <Grid item xs={12} md={6} className={classes.left}>
            <List>
              <ListItem className={classes.inlineBlock}>
                <a>Home</a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a>Blog</a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="#pablito"
                  onClick={(e) => e.preventDefault()}
                >
                  Ebook
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="#pablito"
                  onClick={(e) => e.preventDefault()}
                >
                  PTE Course
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a>Contact us</a>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6} className={classes.right} style={{textAlign: "right"}}>
            Copyright &copy; {1900 + new Date().getFullYear()}{" "}
            <a
              href="https://benit.io/"
              target="_blank"
              style={{color: "#ffffff"}}
            >
              BENIT
            </a>{" "}
            All Rights Reserved.
          </Grid>
        </Grid>
      </footer>
    </div>
  );
};

export default StudyCenterFooter;
