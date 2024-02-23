import React from "react";
// import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import hangManStyle from "../../../assets/jss/components/games/hangManStyle";
import "../../../assets/css/howToUseAnimation.css";
import Button from "../CustomButtons/Button";

const useStyles = makeStyles(hangManStyle);

export default function AlphabetButton(props) {
  const classes = useStyles();
  const { handleClick, playWord, checkLetter, guessWord, handleDisableButton, toBeDisabled} = props;
  const arr = [...Array(26).keys()].map((_, i) => String.fromCharCode(i + 97));

  const sendLetter = (word) => {
    checkLetter(word);
    guessWord(word);
    handleDisableButton(word);
  };

  const handleClickDisable = (word) => {
    handleClick();
    handleDisableButton(word)

  }

  return (
    <div>
      {arr.map((char) => {
        return (
          <>
            {playWord.word.includes(char) ? (
              <Button
                disableRipple
                disabled = {toBeDisabled[char]}
                className={classes.buttonAlpha}
                onClick={() => {
                  sendLetter(char);
                }}
              >
                {char}
              </Button>
            ) : (
              <Button
                disableRipple
                disabled = {toBeDisabled[char]}
                className={classes.buttonAlpha}
                onClick={()=>{
                  handleClickDisable(char);
                }}
              >
                {char}
              </Button>
            )}
          </>
        );
      })}
    </div>
  );
}
