import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/Games/CustomButtons/Button";
import headerLinksStyle from "../../../assets/jss/components/games/headerLinksStyle";
import CustomDropdown from "../../../components/Games/CustomDropdown/CustomDropdown";

export default function HeaderLinksPTE(props) {
  const styles = (theme) => ({
    ...headerLinksStyle(theme),
    signIn: {
      // background: "#fadb06",
      padding: "0 28px",
      lineHeight: "45px",
      textTransform: "unset",
      fontSize: 16,
      fontWeight: 500,
      color: "#333",
      "&:hover": {
        color: "#333",
      },
    },
    blankLink: {
      color: "#333",
    },
    headCenter: {
      [theme.breakpoints.up("lg")]: {
        margin: "0 100px",
      },
    },
  });

  const useStyles = makeStyles(styles);

  const classes = useStyles();
  return (
    <div className={classes.collapse} style={{ justifyContent: "flex-end" }}>
      <List className={classes.list}>
        <div className={classes.headCenter}>
          <ListItem className={classes.listItem}>
            <Button
              className={classes.navLink}
              onClick={(e) => e.preventDefault()}
              color="transparent"
            >
              home
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              hoverColor="warning"
              buttonText="PTE Course"
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
                <a
                  className={classes.dropdownLink}
                  href="https://course.ptemagicpractice.com/express"
                  target="_blank"
                >
                  Video Course
                </a>,
                <a
                  className={classes.dropdownLink}
                  href="https://offer.ptemagicpractice.com/ebook"
                  target="_blank"
                >
                  Ebook
                </a>,
                <a
                  className={classes.dropdownLink}
                  href="https://ptemagic.com.au/online-pte-training-courses/"
                  target="_blank"
                  rel="nofollow"
                >
                  Online Training Course
                </a>
              ]}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              hoverColor="warning"
              buttonText="Getting Started"
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
              ]}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              hoverColor="warning"
              buttonText="PTE Practice Test"
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
              ]}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              className={classes.navLink}
              onClick={(e) => e.preventDefault()}
              color="transparent"
            >
            </Button>
          </ListItem>
        </div>
        <div className={classes.signInArea}>
          <ListItem className={classes.listItem}>
          </ListItem>
        </div>
      </List>
    </div>
  );
}
