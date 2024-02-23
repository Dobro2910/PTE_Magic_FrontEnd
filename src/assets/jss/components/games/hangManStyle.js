// import {
//     container,
//     title,
//     main,
//     mainRaised,
//     mrAuto,
//     whiteColor,
//     mlAuto
//   } from "assets/jss/nextjs-material-kit-pro.js";

const hangManStyle = {
  header:{
    color: "#222d39",
    fontWeight: 600,
    lineHeight: 1.6,
    fontSize: "30px",
    textAlign: 'center',
    marginBottom: "30px",
  },
  banner:{
    "&>div>div>div>h1":{
      fontWeight: 700,
    }
  },
  hangManImg:{
    marginTop: "20px",
    width: "200px",
    height: "300px",
  },
  imgContainer:{
    textAlign: "center",
  },
  wordHolderContainer:{
    height: "inherit",
  },
  wordHolder:{
    // borderBottom: "1px solid rgb(102, 102, 102)",
    marginRight: "10px",
    marginLeft: "11px",
    fontWeight: "bold",
    fontSize: "26px",
    textTransform: "uppercase",
  },
  spaceHolder:{
    marginRight: "15px",
  },
  buttonAlpha:{
    textTransform: "uppercase",
    color: "#525f7f",
    background: "#FFF",
    cursor: "pointer",
    padding: "10px 10px",
    fontSize: "20px",
    boxShadow: "none",
    "&:hover":{
      color: "#525f7f",
      background: "#FFF",
      boxShadow: "none",
    },
    "&:focus":{
      color: "#525f7f",
      background: "#FFF",
      boxShadow: "none",
    }
  },
  gameName:{
    fontFamily: "inherit",
    fontWeight: 600,
    lineHeight: 1.5,
    color: "#32325d",
  },
  gameContainer:{
    padding: "1.5rem",
  },
  bad:{
    fontSize: "26px",
    margin: "0px",
    lineHeight: 1.6,
  },
  another:{
    fontSize: "24px",
    color: "black",
    fontFamily: "Neucha, sans-serif",
  },
  meaning: {
    marginLeft: "11px",
    marginBottom: ".5rem",
    fontWeight: 600,
    lineHeight: 1.6,
    color: "#32325d",
    fontSize: "1.0625rem",
  },
  answer:{
    color: "red",
    fontSize: "24px",
    fontFamily: "Neucha, sans-serif",
  }
};

export default hangManStyle;
