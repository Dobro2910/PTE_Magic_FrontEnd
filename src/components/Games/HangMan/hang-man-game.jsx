import React from "react";
// import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import hangManStyle from "../../../assets/jss/components/games/hangManStyle";
import "../../../assets/css/howToUseAnimation.css";
import AlphabetButton from "./alphabetButton";

const useStyles = makeStyles(hangManStyle);

export default function HangManGame(props) {
  const classes = useStyles();
  const { handleClick, playWord, guess, handleChangeGuess, toArray,handleDisableButton, toBeDisabled} = props;


  const [letter, setLetter] = React.useState("");

  const checkLetter = (l) => {
    setLetter(l);
  };

  //set up guessed words

  const letterToIndex = (arr) => {
    const duplicate = {};
    for (let i=0; i<arr.length; i++){
      if (duplicate.hasOwnProperty(arr[i])){
        duplicate[arr[i]].push(i);
      }
      else{
        duplicate[arr[i]] = [i];
      }
    }
    return duplicate;
  }

  const guessWord = (character) => {
    const arrayGuess = guess; //lay guess
    const indexObj = letterToIndex(toArray(playWord.word));
    if (indexObj.hasOwnProperty(character)) {
      indexObj[character].map(element=>{
        arrayGuess[element] = character
      })
      if (guess.includes("_")){
        handleChangeGuess(arrayGuess, false);
      }
      else if (guess.includes("_") === false){
        handleChangeGuess(arrayGuess, true);
      }
    }
  };

  return (
    <div style={{padding: "1.5rem"}}>
      <div className={classes.wordHolderContainer}>
        {guess.map((char) => {
          return <span className={classes.wordHolder}>{char}</span>;
        })}

        <AlphabetButton
          handleClick={handleClick}
          playWord={playWord}
          checkLetter={checkLetter}
          guessWord={guessWord}
          handleDisableButton={handleDisableButton}
          toBeDisabled={toBeDisabled}
        />
        <div className={classes.meaning}>{playWord.meaning}</div>
      </div>
    </div>
  );
}