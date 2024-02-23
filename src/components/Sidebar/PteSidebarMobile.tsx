import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// @ts-ignore
import logo from "src/assets/img/logo/pte_magic_logo.svg";

const drawerWidth2 = 256;
const shop = require("assets/img/gif/magicShop.gif")

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    magicShopIcon: {
      position: "absolute",
      right: "5px"
    },
    backgroundPractice: {
      marginLeft: "7px !important",
      backgroundColor: "#fc0",
      padding: "0px 0px 0px 15px",
      borderRadius: "5px",
      "&:hover": {
        color: "#000 !important"
      }
    },
    backgroundCategory: {
      marginLeft: "-10px !important",
      backgroundColor: "#fc0",
      padding: "5px 0px 5px 14px",
      borderRadius: "5px",
      "&:hover": {
        color: "#000 !important"
      }
    },
    fontTitle: {
      fontSize: "1rem",
      cursor: "pointer"
    },
    drawerPaper2: {
      width: drawerWidth2,
      overflow: "unset !important",
    },
    toggleButton: {
      position: "absolute",
      backgroundColor: "#ffbe2e",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      zIndex: 1,
      left: drawerWidth2 - 32,
      top: "calc(50% - 32px)",
      border: "2px solid #000000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    leftSidebarWrapper: {
      padding: 24,
    },
    rootCollapse: {
      width: "100%",
      height: "100% !important",
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
      "& .MuiTypography-displayBlock": {
        color: "black",
        textTransform: "uppercase",
        // fontSize: "14px",
        // fontWeight: 500,
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "unset !important",
        "&:hover": {
          color: "#1890ff",
        },
      },
    },
    nested: {
      paddingLeft: theme.spacing(4),
      "& .MuiTypography-displayBlock": {
        textTransform: "capitalize",
      },
    },
    // pointer: {
    //   cursor: "pointer"
    // },
    selected: {
      width: "5px",
      height: "15px",
      backgroundColor: "#000",
      marginRight: 10,
      // display: "none"
    },
    standout: {
      '&:hover': {
        "& $selected": {
          display: "block"
        }
      },
    },
    logo: {
      marginBottom: "10px !important",
      marginLeft: "2px !important",
      marginTop: "-5px !important"
    }
  })
);

export interface PteSidebarMobileProps {
  onClose: () => void;
  onToggle: () => void;
  open: boolean;
}

const PteSidebarMobile: React.FC<PteSidebarMobileProps> = (props) => {
  const classes = useStyles();
  const [openCollapse, setOpenCollapse] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [openOthers, setOpenOthers] = React.useState<boolean>(false);
  // const [, setOpen] = React.useState<boolean>(true);

  const { onClose, onToggle, open } = props;

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const handleOpenOthers = () => {
    setOpenOthers(!openOthers);
  };

   const handleClick = () => {
     setIsOpen(!isOpen);
   };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper2,
      }}
    >
      <div className={classes.leftSidebarWrapper}>
        <div className={classes.toggleButton} onClick={onToggle}>
          <ChevronLeftIcon />
        </div>
        <Grid container>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.rootCollapse}
          >
            <Link to="/platform/user/home">
              <ListItem>
                <img
                    src={logo}
                    alt=""
                    width={120}
                    className={classes.logo}
                />
              </ListItem>
            </Link>
            <Link to="/platform/user/home">
              <ListItem button={false}>
                <ListItemText
                  primary={
                  <div className={`font-family ${classes.fontTitle} ${window.location.pathname.indexOf("/platform/user/home") !== -1 ? `${classes.backgroundCategory}` : ""}`}>
                    Dashboard
                  </div>
                  }
                  />
              </ListItem>
            </Link>
            <ListItem button={false} onClick={handleClick} className={`${window.location.pathname.indexOf("/platform/user/banks") !== -1 ? classes.backgroundPractice : ""}`}>
              <ListItemText
                primary={
                  <div className={`font-family ${classes.fontTitle}`}>Practice</div>
                }
              />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/platform/user/banks/view-speaking">
                 <ListItem button={false} className={classes.nested}>
                    {window.location.pathname ==
                      "/platform/user/banks/view-speaking" && (
                       <div className={classes.selected}></div>
                    )}
                    <ListItemText
                      primary={
                      <div className={`font-family ${classes.fontTitle}`}>
                        Speaking
                      </div>
                    }
                    />
                  </ListItem>
                </Link>
                <Link to="/platform/user/banks/view-writing">
                  <ListItem button={false} className={classes.nested}>
                    {window.location.pathname ==
                    "/platform/user/banks/view-writing" && (
                        <div className={classes.selected}></div>
                    )}
                    <ListItemText
                        primary={
                          <div className={`font-family ${classes.fontTitle}`}>
                            Writing
                          </div>
                        }
                    />
                  </ListItem>
                </Link>
                <Link to="/platform/user/banks/view-reading">
                  <ListItem button={false} className={classes.nested}>
                    {window.location.pathname ==
                    "/platform/user/banks/view-reading" && (
                        <div className={classes.selected}></div>
                    )}
                    <ListItemText
                        primary={
                          <div className={`font-family ${classes.fontTitle}`}>
                            Reading
                          </div>
                        }
                    />
                  </ListItem>
                </Link>
                <Link to="/platform/user/banks/view-listening">
                  <ListItem button={false} className={classes.nested}>
                    {window.location.pathname ==
                      "/platform/user/banks/view-listening" && (
                      <div className={classes.selected}></div>
                    )}
                    <ListItemText
                      primary={
                        <div className={`font-family ${classes.fontTitle}`}>
                          Listening
                        </div>
                      }
                    />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Link to="/platform/user/mock_test/list">
              <ListItem button={false}>
                <ListItemText
                  primary={
                    <div className={`font-family ${classes.fontTitle} ${window.location.pathname.indexOf("/platform/user/mock_test") !== -1 ? classes.backgroundCategory : ""}`}>
                      Mock Tests
                    </div>
                  }
                />
              </ListItem>
            </Link>
            <Link to="/platform/user/shop">
              <ListItem button={false}>
                <ListItemText
                  primary={
                    <div className={`font-family ${classes.fontTitle} ${window.location.pathname.indexOf("/platform/user/shop") !== -1 ? (`${classes.backgroundCategory}`) : ""}`}>
                      Magic shop
                    </div>
                  }
                />
                <img
                    className={classes.magicShopIcon}
                    src={shop}
                    alt="shop"
                    width={55}
                />
              </ListItem>
            </Link>
            <Link to="/platform/user/checking_permission">
              <ListItem button={false}>
                <ListItemText
                    primary={
                      <div className={`font-family ${classes.fontTitle} ${window.location.pathname.indexOf("/platform/user/checking_permission") !== -1 ? classes.backgroundCategory : ""}`}>
                        Device test
                      </div>
                    }
                />
              </ListItem>
            </Link>

            {/* <Link to="/platform/user/games">
              <ListItem button={false}>
                <ListItemText
                    primary={
                      <div className={`font-family ${classes.fontTitle} ${window.location.pathname.indexOf("/platform/user/games") !== -1 ? classes.backgroundCategory : ""}`}>
                        Games
                      </div>
                    }
                />
              </ListItem>
            </Link> */}

            {/* <ListItem onClick={handleOpenOthers}>
              <ListItemText primary="OTHERS" className={classes.pointer}/>
              {openOthers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openOthers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className={classes.nested}>
                  <ListItemText primary="Vocab Books" className={classes.pointer}/>
                </ListItem>
                <ListItem className={classes.nested}>
                  <ListItemText primary="AI Study Tips" className={classes.pointer}/>
                </ListItem>
              </List>
            </Collapse> */}
          </List>
        </Grid>
      </div>
    </Drawer>
  );
};

export default PteSidebarMobile;
