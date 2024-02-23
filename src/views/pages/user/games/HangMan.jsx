import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//core components
import Header from "../../../../components/Games/Header/Header"
import HeaderLinksPTE from "../../../../components/Games/Header/HeaderLinksPTE";
import PTEFooter from "../../../../components/Games/Footer/PTEFooter";
import GridContainer from "../../../../components/Games/Grid/GridContainer";
import GridItem from "../../../../components/Games/Grid/GridItem";
import Banner from "../../../../components/Games/Parallax/Banner";
import HangManGame from "../../../../components/Games/HangMan/hang-man-game"

// icon
import hangMan0 from "../../../../assets/img/games/hang-man.png";
import hangMan1 from "../../../../assets/img/games/hang-man1.png";
import hangMan2 from "../../../../assets/img/games/hang-man2.png";
import hangMan3 from "../../../../assets/img/games/hang-man3.png";
import hangMan4 from "../../../../assets/img/games/hang-man4.png";
import hangMan5 from "../../../../assets/img/games/hang-man5.png";
import hangMan6 from "../../../../assets/img/games/hang-man6.png";
import hangMan7 from "../../../../assets/img/games/hang-man7.png";
import goodJob from "../../../../assets/img/games/good-job.jpg";
import playAgainIcon from "../../../../assets/img/games/play-again-button.png";
import logo from "../../../../assets/img/games/New-pte-magic-logo-1.png";

import "../../../../assets/css/howToUseAnimation.css"
import hangManStyle from "../../../../assets/jss/components/games/hangManStyle";

const styles = {
    ...hangManStyle,
    section: {
        maxWidth: "1240px",
        marginTop: 100,
        marginBottom: 100
    },
    container: {
        display: "flex",
        justifyContent: "center",
    },
    categoryTitle: {
        marginTop: "-70px"
    }
}

const useStyles = makeStyles(styles);


export default function HangMan(props) {
    const classes = useStyles();

    const keyWords = {
        word1: {
            word: "apple",
            meaning: "quả táo",
        },
        word2: {
            word: "orange",
            meaning: "quả cam",
        },
        word3: {
            word: "computer science",
            meaning: "khoa học máy tính",
        },
        word4: {
            word: "keyboard",
            meaning: "bàn phím",
        },
        word5:{
            word: "basketball",
            meaning: "bóng rổ",
        }
    };

    const getRandomWord = () => {
        let randomIndex = Math.floor(Math.random() * Object.keys(keyWords).length);
        return keyWords[Object.keys(keyWords)[randomIndex]];
    };

    const [playWord, setPlayWord] = React.useState(getRandomWord());

    const toArray = (word) => {
        let array = [];
        for (let i = 0; i < word.length; i++) {
            array.push(word[i]);
        }
        return array;
    };

    const [guess, setGuess] = React.useState(
        toArray(playWord.word).map((char) => {
            if (char !== " ") {
                return "_";
            } else if (char === " ") {
                return " ";
            }
        })
    );

    const handleChangeGuess = (changedGuess, win) => {
        setGuess(changedGuess);
        setWin(win);
    };

    const [wrongAnswer, setWrongAnswer] = React.useState(0);

    const handleClick = () => {
        // e.preventDefault();
        setWrongAnswer((prev) => prev + 1);
    };

    const [playAble, setPlayAble] = React.useState(true);

    const [win, setWin] = React.useState(false);

    const arr = [...Array(26).keys()].map((_, i) => String.fromCharCode(i + 97));

    const disableCharButton = () => {
        let charDisabled = {};
        arr.map((char) => {
            charDisabled[char] = false;
        });
        return charDisabled;
    };

    const [toBeDisabled, setToBeDisabled] = React.useState(disableCharButton());

    const handleDisableButton = (word) => {
        setToBeDisabled({
            ...toBeDisabled,
            [word]: true,
        });
    };

    const handlePlayAgain = () => {
        setPlayWord(getRandomWord());
        setWin(false);
        setPlayAble(true);
        setWrongAnswer(0);
        setGuess(
            toArray(playWord.word).map((char) => {
                if (char !== " ") {
                    return "_";
                } else if (char === " ") {
                    return " ";
                }
            })
        );
        setToBeDisabled(disableCharButton());
    };
    React.useEffect(() => {
        if (wrongAnswer >= 7 || guess.includes("_") === false) {
            setPlayAble(false);
        }
    });

    return (
        <div className={classes.categoryTitle}>
            {/*<Banner title={"Hang Man"} className={classes.banner} />*/}
            <div className={classes.container}>
                <GridItem className={classes.gameContainer}>
                    <div className={classes.gameName}>Guess the word</div>

                    {playAble && wrongAnswer < 7 && guess.includes("_") && (
                        <GridItem>
                            <div className={classes.imgContainer}>
                                {wrongAnswer === 0 && (
                                    <img
                                        src={hangMan0}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                                {wrongAnswer === 1 && (
                                    <img
                                        src={hangMan1}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                                {wrongAnswer === 2 && (
                                    <img
                                        src={hangMan2}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                                {wrongAnswer === 3 && (
                                    <img
                                        src={hangMan3}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                                {wrongAnswer === 4 && (
                                    <img
                                        src={hangMan4}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                                {wrongAnswer === 5 && (
                                    <img
                                        src={hangMan5}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                                {wrongAnswer === 6 && (
                                    <img
                                        src={hangMan6}
                                        alt="Hang Man Picture"
                                        className={classes.hangManImg}
                                    />
                                )}
                            </div>
                            <HangManGame
                                handleClick={handleClick}
                                playWord={playWord}
                                guess={guess}
                                handleChangeGuess={handleChangeGuess}
                                toArray={toArray}
                                handleDisableButton={handleDisableButton}
                                toBeDisabled={toBeDisabled}
                            />
                        </GridItem>
                    )}

                    {wrongAnswer >= 7 && (
                        <GridContainer style={{ display: "flex", justifyContent: "center" }}>
                            <GridItem xs={4} style={{ textAlign: "center" }}>
                                <GridContainer>
                                    <GridItem
                                        xs={6}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div className={classes.bad}>
                                            Too bad you did not get that one
                                        </div>
                                    </GridItem>
                                    <GridItem xs={6}>
                                        <div className={classes.another}>Another one?</div>
                                        <img
                                            src={playAgainIcon}
                                            alt="Play Again"
                                            style={{
                                                cursor: "pointer",
                                                marginTop: "5px",
                                                width: "25%",
                                            }}
                                            onClick={handlePlayAgain}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <div className={classes.answer}>Answer: {playWord.word}</div>
                                <img
                                    src={hangMan7}
                                    alt="Hang Man Picture"
                                    className={classes.hangManImg}
                                />
                            </GridItem>
                        </GridContainer>
                    )}

                    {win && (
                        <GridContainer style={{ display: "flex", justifyContent: "center" }}>
                            <GridItem xs={4} style={{ textAlign: "center" }}>
                                <GridContainer>
                                    <GridItem
                                        xs={6}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div className={classes.bad}>You WIN</div>
                                    </GridItem>
                                    <GridItem xs={6}>
                                        <div className={classes.another}>Another one?</div>
                                        <img
                                            src={playAgainIcon}
                                            alt="Play Again"
                                            style={{
                                                cursor: "pointer",
                                                marginTop: "5px",
                                                width: "25%",
                                            }}
                                            onClick={handlePlayAgain}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <img
                                    src={goodJob}
                                    alt="Hang Man Picture"
                                    className={classes.hangManImg}
                                />
                            </GridItem>
                        </GridContainer>
                    )}
                </GridItem>
            </div>
            {/*<PTEFooter />*/}
        </div>
    );
}

