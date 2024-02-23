import React from "react";
// import { FilePond, registerPlugin } from "react-filepond";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";

//material-ui core
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

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

const useStyles = makeStyles((theme) => ({
    textArea: {
        border: "none",
        outline: "none",
        padding: "10px",
        width: "100%"
    },
    inputArea: {
        marginTop: "-10px",
        border: "1px solid #ddd !important",
        borderRadius: "2px !important",
        width: "650px",
        overflow: "auto"
    }
}));

// registerPlugin(FilePondPluginImagePreview);

export default function Contact() {
    let classes = useStyles()
    let [width, height] = useWindowSize();
    let [file, setFile] = React.useState()

    const handleOnChange = e => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <Card className="card-profile-payment top-spacing">
                <div className="card-payment-head">
                    <h5 className="h3 mb-0">Request form</h5>
                </div>
                <CardContent>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <p>Name</p>
                            <div className={classes.inputArea}>
                                <input
                                    required
                                    className={classes.textArea}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <p>E-mail</p>
                            <div className={classes.inputArea}>
                                <input
                                    required
                                    className={classes.textArea}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <p>Phone number</p>
                            <div className={classes.inputArea}>
                                <input
                                    required
                                    className={classes.textArea}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <p>Description</p>
                            <div
                                className={classes.inputArea}
                                style={{
                                    resize: "vertical",
                                    height: "240px"
                                }}>
                                <input
                                    required
                                    className={classes.textArea}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <p>Relevant URL</p>
                            <div className={classes.inputArea}>
                                <input
                                    required
                                    className={classes.textArea}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <p>Categorize your reason for writing in.</p>
                            <div className={classes.inputArea}>
                                <input
                                    required
                                    className={classes.textArea}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <p>Attachments</p>
                            <div className={classes.inputArea}>
                                <form>
                                    <input
                                        type="file"
                                        name="photo"
                                        id="upload-file"
                                        onChange={handleOnChange}
                                        className={classes.textArea}
                                        // style={{display: "none"}}
                                    />
                                    <label htmlFor="upload-file" style={{display: "flex", justifyContent: "center"}}>Pick file</label>
                                </form>
                            </div>
                        </Grid>
                        <Grid item>
                            <Button className="submit-button" style={{width: "100px", backgroundColor: "#fc0"}}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
