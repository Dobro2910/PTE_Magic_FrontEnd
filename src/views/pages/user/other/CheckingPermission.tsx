import React from "react";
import { browserName, osVersion, osName, isSafari } from "react-device-detect";
import MaterialTable from "material-table";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import { confirmAlert } from "react-confirm-alert";
//core components
import { RecordVoice, useRecord } from "src/components/RecordVoice/RecordVoice";
import { createAudioContext, downSampleRate } from "src/utils/audio-utils";
//material-ui core
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from '@material-ui/core/CircularProgress';

const { detect } = require("detect-browser");
const browser = detect();

var gumStream; //stream from getUserMedia()
var input; //MediaStreamAudioSourceNode we'll be recording
var audioContext;

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function CheckingPermission() {
  let [width, height] = useWindowSize();
  let [microphone, setMicrophone] = React.useState();
  let [resolution, setResolution] = React.useState();
  let [loadingBrowser, setLoadingBrowser] = React.useState(true)
  let [loadingMicrophone, setLoadingMicrophone] = React.useState(true)
  let [loadingResolution, setLoadingResolution] = React.useState(true)
  let [loadingOsSystem, setLoadingOsSystem] = React.useState(true)
  let [loadingRecord, setLoadingRecord] = React.useState(true)

  const initAudioRecoder = () => {
    console.log("PTE Recorder initAudioRecoder ...");
    var constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        console.log(
          "getUserMedia() success, stream created, initializing Recorder.js ..."
        );
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
      })
      .catch((err) => {
        console.error("Device or microphone not active", err);
        setMicrophone(false);
        console.error(
          "Device not active, can not recording.",
          "",
          "DEVICE_NOT_ACTIVE"
        );
        // Show confirm dialog
        confirmPermission();
      });
  };

  const onConfirmActiveAudio = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Additional permissions</h1>
            <div>
              Click the <strong>Allow</strong> button to enable record audio.{" "}
            </div>
            <div className="confirm-div-btn">
              <button
                onClick={() => {
                  activeAudioContext();
                  onClose();
                  setMicrophone(true);
                }}
              >
                Allow
              </button>
            </div>
          </div>
        );
      },
      closeOnClickOutside: false,
    });
  };

  const confirmPermission = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Additional permissions for Chrome</h1>
            <div>
              Click the <strong>allow</strong> button to enable microphone
              permissions.{" "}
            </div>
            <div>
              {" "}
              If the button is not displayed, refer to{" "}
              <a
                className="confirm-link"
                href="https://www.youtube.com/watch?feature=youtu.be&v=2hJqHR42Fk0"
                target="_blank"
              >
                this guide
              </a>
              .
            </div>
            <div className="confirm-div-btn">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        );
      },
      closeOnClickOutside: false,
    });
  };

  const activeAudioContext = () => {
    console.log(`activeAudioContext`);
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        initAudioRecoder();
      });
    }
  };

  React.useEffect(() => {
    if (!isSafari) {
      window.navigator.getUserMedia(
          { audio: true },
          () => {
            setMicrophone(true);
          },
          () => {
            setMicrophone(false);
          }
      );
    } else {
      audioContext = createAudioContext(16000);
      if (audioContext.state === "running") {
        initAudioRecoder();
        setMicrophone(true);
      } else if (audioContext.state === "suspended") {
        onConfirmActiveAudio();
      }
    }
    if (width < 1024 || height < 600) {
      setResolution(false);
    } else {
      setResolution(true);
    }
  }, [resolution, width, height]);

  React.useEffect(() => {
    setTimeout(() => {
      setLoadingBrowser(false)
    }, 700)
    setTimeout(() => {
      setLoadingMicrophone(false)
    }, 1400)
    setTimeout(() => {
      setLoadingResolution(false)
    }, 2100)
    setTimeout(() => {
      setLoadingOsSystem(false)
    }, 2800)
    setTimeout(() => {
      setLoadingRecord(false)
    }, 3500)
  }, [])

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
    closeDialog,
  } = useRecord();
  let info = [
    {
      title: "Browser",
      description: browserName,
    },
    {
      title: "Microphone",
      description: microphone,
    },
    {
      title: "Resolution",
      description: {
        resolution: resolution,
        width: width,
        height: height,
      },
    },
    {
      title: "OS System",
      description: {
        osName: osName,
        osVersion: osVersion,
      },
    },
    {
      title: "Record",
      description: "",
    },
  ];
  const columns = [
    {
      title: "TITLE",
      field: "title",
      render: (record) => <div>{record.title}</div>,
    },
    {
      title: "DESCRIPTION",
      field: "description",
      render: (record) => (
        <div>
          {!loadingBrowser && (
              record.title === "Browser" &&
              (record.description === "Chrome" ? (
                  <span>{record.description}</span>
              ) : (
                  <span>
                You're using {record.description}. It's much better to use
                chrome
              </span>
              ))
          )}
          {!loadingMicrophone && (
              record.title === "Microphone" &&
              (record.description ? (
                  <span>Microphone is ready to record</span>
              ) : (
                  <span>Please check your microphone</span>
              ))
          )}
          {!loadingResolution && (
              record.title === "Resolution" &&
              (record.description.resolution ? (
                  <span>
                {width} x {height} px
              </span>
              ) : (
                  <>
                    {width} x {height} px
                    <div style={{ color: "red" }}>
                      <span>Minimum of 1024 x 768 px is required</span>
                    </div>
                  </>
              ))
          )}
          {!loadingOsSystem && (
              record.title === "OS System" && (
                  <>
                    {record.description.osName}: {record.description.osVersion}
                  </>
              )
          )}
          {!loadingRecord && (
              record.title === "Record" &&
              (microphone ? (
                  <>
                    <div>
                      {openTimer ? (
                          <span>
                      Recording... Maximum of 15 seconds
                      <Timer active={timer} duration={15000}>
                        <Timecode />
                      </Timer>
                    </span>
                      ) : (
                          ""
                      )}
                    </div>
                    {!isRecording && (
                        <button
                            onClick={startRecording}
                            type="button"
                            className="next-button"
                            // style={{pointerEvents: startButton ? "auto" : "none"}}
                        >
                          {blobURL ? "Restart" : "Start"}
                        </button>
                    )}

                    {!blobURL && isRecording && (
                        <button
                            onClick={stopRecording}
                            type="button"
                            className="next-button"
                        >
                          Stop
                        </button>
                    )}
                  </>
              ) : (
                  <span>Error</span>
              ))
          )}
        </div>
      ),
    },
    {
      title: "STATUS",
      field: "status",
      render: (record) => (
        <div style={{ marginLeft: "15px" }}>
          {record.title === "Browser" && (
            loadingBrowser ? (
                <CircularProgress size={20} className="loading-device" />
            ) : (
                (record.description === "Chrome" ? (
                    <>
                      <i className="fas fa-check color-answer-correct"></i>
                    </>
                ) : (
                    <>
                      <i className="fas fa-times color-answer-wrong"></i>
                    </>
                ))
            )
          )}
          {record.title === "Microphone" && (
              loadingMicrophone ? (
                  <CircularProgress size={20} className="loading-device" />
              ) : (
                  (record.description ? (
                      <>
                        <i className="fas fa-check color-answer-correct"></i>
                      </>
                  ) : (
                      <>
                        <i className="fas fa-times color-answer-wrong"></i>
                      </>
                  ))
              )
          )}
          {record.title === "Resolution" && (
              loadingResolution ? (
                  <CircularProgress size={20} className="loading-device" />
              ) : (
                  (record.description.resolution ? (
                      <>
                        <i className="fas fa-check color-answer-correct"></i>
                      </>
                  ) : (
                      <>
                        <i className="fas fa-times color-answer-wrong"></i>
                      </>
                  ))
              )
          )}
          {record.title === "OS System" && (
              loadingOsSystem ? (
                  <CircularProgress size={20} className="loading-device" />
              ) : (
                <>
                  <i className="fas fa-check color-answer-correct"></i>
                </>
              )
          )}
          {record.title === "Record" && (
              loadingRecord ? (
                  <CircularProgress size={20} className="loading-device" />
              ) : (
                  microphone ? (
                      <>
                        <i className="fas fa-check color-answer-correct"></i>
                      </>
                  ) : (
                      <>
                        <i className="fas fa-times color-answer-wrong"></i>
                      </>
                  )
              )
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-profile-payment top-spacing">
        <div className="card-payment-head">
          <h5 className="h3 mb-0">Device's info</h5>
        </div>
        <CardContent>
          <MaterialTable
            title={null}
            data={info}
            columns={columns}
            options={{
              paging: false,
              pageSize: 6,
              search: false,
              toolbar: false,
              sorting: false,
            }}
          />
          <RecordVoice />
        </CardContent>
      </Card>
    </div>
  );
}
