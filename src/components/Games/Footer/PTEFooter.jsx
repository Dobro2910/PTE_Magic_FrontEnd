import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../../Games/CustomButtons/Button";
import footerImg from "../../../assets/img/pte-footer.png";
import GridContainer from "../../Games/Grid/GridContainer";
import GridItem from "../../Games/Grid/GridItem";
import Footer from "../../Games/Footer/Footer";
import makeStyles from "@material-ui/core/styles/makeStyles";

const PTEFooter = () => {
  const styles = theme => ({
    wrapper: {
      margin: "auto",
      maxWidth: 720,
      [theme.breakpoints.up(992)]: {
        maxWidth: 960,
      },
      [theme.breakpoints.up(1200)]: {
        maxWidth: 1140,
      },
    },
    footer: {
      background: "#f5f5fa",
      paddingTop: 80
    },
    footerImg: {
      background: `url(${footerImg}) no-repeat scroll center 0`,
      width: "100%",
      height: 266
    },
    list: {
      padding: 0
    },
    inlineBlock: {
      display: "inline-block",
      padding: 0,
      paddingRight: 12,
      width: "auto",
    },
    footerWrapper: {
      display: "flex",
      justifyContent: "space-between"
    },
    socialButtons: {
      display: "flex"
    },
  })
  const useStyles = makeStyles(styles);

  const classes = useStyles()
  return (
    <Footer
      theme="dark"
      content={
        <div className={classes.footerWrapper}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a
                  className={classes.block}
                >
                  Home
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  className={classes.block}
                >
                  Blog
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="#pablito"
                  onClick={(e) => e.preventDefault()}
                  className={classes.block}
                >
                  Ebook
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="#pablito"
                  onClick={(e) => e.preventDefault()}
                  className={classes.block}
                >
                  PTE Course
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  className={classes.block}
                >
                  Contact us
                </a>
              </ListItem>
            </List>
          </div>
          <div className={classes.right}>
            Copyright &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://benit.io/"
              target="_blank"
              className={classes.aClasses}
            >
              BENIT
            </a>{" "}
            All Rights Reserved.
          </div>
        </div>
      }
    >
      <GridContainer>
        <GridItem xs={12} sm={4} md={4}>
          <h5>Getting Started</h5>
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
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <h5>PTE Practice Test Resources</h5>
          <ul className={classes.linksVertical}>
            <li>
              <a href="#pablo">PTE Practice Test</a>
            </li>
            <li>
              <a href="#pablo">Exam Tips</a>
            </li>
            <li>
              <a href="#pablo">PTE Speaking</a>
            </li>
            <li>
              <a href="#pablo">PTE Reading</a>
            </li>
            <li>
              <a href="#pablo">PTE Listening</a>
            </li>
          </ul>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <h5>Follow Us</h5>
          <ul className={classes.socialButtons}>
            <li>
              <Button justIcon simple href="#pablo" color="twitter">
                <i className="fab fa-twitter" />
              </Button>
            </li>
            <li>
              <Button justIcon simple href="#pablo" color="facebook">
                <i className="fab fa-facebook-square" />
              </Button>
            </li>
            <li>
              <Button justIcon simple href="#pablo" color="dribbble">
                <i className="fab fa-dribbble" />
              </Button>
            </li>
            <li>
              <Button justIcon simple href="#pablo" color="google">
                <i className="fab fa-google-plus-g" />
              </Button>
            </li>
            <li>
              <Button justIcon simple href="#pablo" color="instagram">
                <i className="fab fa-instagram" />
              </Button>
            </li>
          </ul>
          <h5>Numbers Don{"'"}t Lie</h5>
          <h4>
            120,000+ <small>members</small>
          </h4>
        </GridItem>
      </GridContainer>
    </Footer>

  )
}

export default PTEFooter;