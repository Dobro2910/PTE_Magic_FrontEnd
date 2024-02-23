import React, {useState} from 'react'
import ReactRecord from 'react-record';
import { useBetween } from 'use-between';
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

//material-ui core
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

//core components
import AudioWaveform from "src/components/AudioWaveform/AudioWaveform";

const RecordDialog = (props) => {
    const {
        onClose,
        selectedValue,
        open,
        reStartRecording
    } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleRestart = () => {
        reStartRecording()
        onClose(selectedValue)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">
                Are you sure that you want to restart ?
                Your previous record will be lost
                <div>
                    <span>
                        <button onClick={handleClose}>
                            Cancel
                        </button>
                    </span>

                    <span>
                        <button onClick={handleRestart}>
                            Do it again
                        </button>
                    </span>
                </div>
            </DialogTitle>
        </Dialog>
    );
}

const Record = () => {
    let [blobURL, setBlobURL] = React.useState(null)
    let [isRecording, setIsRecording] = React.useState(false)
    let [timer, setTimer] = React.useState(false)
    let [openTimer, setOpenTimer] = React.useState(false)
    let [openDialog, setOpenDialog] = React.useState(false)
    let [selectedValue, setSelectedValue] = React.useState()
    // let [startButton, setStartButton] = useState(true)

    // React.useEffect(() => {
    //     if(startButton === false && blobURL) {
    //         setStartButton(true)
    //     }
    //     if(startButton === true && isRecording) {
    //         setStartButton(false)
    //     }
    // }, [blobURL])

    React.useEffect(() => {
        if(isRecording){
            setTimeout(() => {
                setIsRecording(false)
                setOpenTimer(false)
            }, 15000)
        }
    }, [isRecording])


    const startRecording = () => {
        if (!blobURL) {
            setIsRecording(true)
            setOpenTimer(!openTimer)
            setTimer(!timer)
            // setStartButton(!startButton)
        } else {
            setOpenDialog(true)
        }
    }

    const reStartRecording = () => {
        setBlobURL(null)
        setIsRecording(true)
        setOpenTimer(!openTimer)
        setTimer(true)
    }

    const stopRecording = () => {
        setIsRecording(false)
        setOpenTimer(!openTimer)
    }

    const onStop = blobObject => {
        setBlobURL(blobObject.blobURL)
    }

    const closeDialog = (value) => {
        setOpenDialog(false);
        setSelectedValue(value);
    };
    return {
        blobURL,
        isRecording,
        timer,
        openTimer,
        openDialog,
        selectedValue,
        // startButton,
        startRecording,
        reStartRecording,
        stopRecording,
        onStop,
        closeDialog
    }
}
export const useRecord = () => useBetween(Record)

export const RecordVoice = () => {
    let {
        blobURL,
        isRecording,
        timer,
        openTimer,
        openDialog,
        selectedValue,
        // startButton,
        startRecording,
        reStartRecording,
        stopRecording,
        onStop,
        closeDialog
    } = useRecord()

    return (
        <>
            <ReactRecord
                record={isRecording}
                onStop={onStop}
            >
                <div>
                    {openTimer ? (
                      // <span>
                      //   Recording... Maximum of 15 seconds
                      //   <Timer
                      //       active={timer}
                      //       duration={15000}
                      //   >
                      //     <Timecode />
                      //   </Timer>
                      // </span>
                        ''
                    ) : (
                        blobURL ? (
                            <AudioWaveform source={blobURL} allowDownload/>
                        ) : (
                            <></>
                        )
                    )}
                </div>
                {/*{!isRecording &&*/}
                {/*<button*/}
                {/*    onClick={startRecording}*/}
                {/*    type="button"*/}
                {/*    style={{pointerEvents: startButton ? "auto" : "none"}}*/}
                {/*>*/}
                {/*    {blobURL ? "Restart" : "Start"}*/}
                {/*</button>}*/}

                {/*{!blobURL &&*/}
                {/*isRecording &&*/}
                {/*<button onClick={stopRecording} type="button">*/}
                {/*    Stop*/}
                {/*</button>}*/}
                <RecordDialog
                    selectedValue={selectedValue}
                    open={openDialog}
                    onClose={closeDialog}
                    reStartRecording={reStartRecording}
                />
            </ReactRecord>
        </>
    )
}