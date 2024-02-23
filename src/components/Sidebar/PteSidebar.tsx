import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
//material-ui core
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"

//icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {loginUser, logout} from "src/reducers/authentication";
import {activeVoucher, getVoucherInfo, resetVoucher} from "src/reducers/voucher";

const coaching = require("assets/img/request_coaching.png")
const upgrade = require("assets/img/upgrade.png")
const shop = require("assets/img/gif/magicShop.gif")

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100% !important",
    maxWidth: 200,
    backgroundColor: "f8f8f8",
    "& .MuiTypography-displayBlock": {
      color: "black",
      textTransform: "uppercase",
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
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-displayBlock": {
      textTransform: "capitalize",
    },
  },
  selected: {
    width: "5px",
    height: "15px",
    backgroundColor: "#000",
    marginRight: 10,
  },
  fontTitle: {
    fontSize: "1rem",
    cursor: "pointer"
  },
  fontText: {
    fontSize: "0.825rem",
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
  backgroundUpgrade: {
    marginLeft: "-10px !important",
    backgroundColor: "#ff4d4d",
    padding: "5px 0px 5px 14px",
    border: "1px solid black",
    borderRadius: "5px",
    color: "white",
    "&:hover": {
      color: "white !important"
    }
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
  magicShopIcon: {
    position: "absolute",
    right: "5px"
  },
  coaching: {
    width: "100%",
    height: "210px"
  },
  upgradeButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 600,
    marginTop: "-50px",
    height: "30px"
  }
}));

const PteSidebar: React.FC<any> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(true);
  // React.useEffect(() => {
  //
  // }, [window.location.pathname])
  console.log(window.location.pathname)
  const handleClick = () => {
    setOpen(!open);
  };

  // React.useEffect(() => {
  //   props.resetVoucher();
  // }, [])

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
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
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
      
      {props.acl && (
          // <Link to={props.acl.accountType === "ROLE_FREE_MEMBER" ? "/platform/user/shop" : "/platform/user/contact"}>
          <Link to={props.acl.accountType === "ROLE_FREE_MEMBER" ? "/platform/user/shop" : "/platform/user/shop"}>
            <ListItem button={false}>
              {props.acl.accountType === "ROLE_FREE_MEMBER" ? (
                  <ListItemText
                      primary={
                        <>
                          <img
                              src={upgrade}
                              alt="upgrade"
                              className={classes.coaching}
                          />
                          <div style={{display: "flex", justifyContent: "center"}}>
                            <Button className={classes.upgradeButton}>
                              GO NOW !!!
                            </Button>
                          </div>
                        </>
                      }
                  />
              ) : (
                  <ListItemText
                      primary={
                        <>
                          <img
                              src={coaching}
                              alt="coaching"
                              className={classes.coaching}
                          />
                          <div style={{display: "flex", justifyContent: "center"}}>
                            <Button className={classes.upgradeButton}>
                              GO NOW !!!
                            </Button>
                          </div>
                        </>
                      }
                  />
              )}
            </ListItem>
          </Link>
      )}
    </List>
  );
};

const mapStateToProps = ({ acl }) => {
  return {
    acl: acl.acl,
  };
};

// const mapDispatchToProps = {
//   getVoucherInfo,
//   activeVoucher,
//   resetVoucher,
// };

export default connect(mapStateToProps, null)(PteSidebar);