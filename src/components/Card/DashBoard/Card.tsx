import React from 'react'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
      fontSize: 20,
      fontWeight: 600
    },
    content: {
        height: "105px",
        fontSize: "15px",
        marginTop: "50px",
        textTransform: "none",
    },
    button: {
        width: "140px",
        border: "1px solid black"
    },
    buttonContainer: {},
    img: {}
});

export default function DashBoardCard(props) {
    const classes = useStyles()
    return (
        <div className="dashboard-card">
            <Card className="element-card-question" style={{backgroundColor: `${props.backgroundColor}`}}>
                <Grid container className="card-question-practice">
                    <Grid item xs={12} className="text-uppercase text-dark mb-0">
                        <Grid container>
                            <Grid xs={9} className={classes.title}>
                                {props.title}
                            </Grid>
                            <Grid className = {classes.img} xs={3}>
                                <img src={props.img} alt="" width={90} style={{paddingRight:"30px"}}/>
                            </Grid>
                        </Grid>
                        <Grid className={classes.content}>
                            {props.content}
                        </Grid>
                        <Grid className={classes.buttonContainer}>
                            <Button style={{backgroundColor: `${props.color}`}} className={classes.button}>
                                {props.button}
                            </Button>
                        </Grid>
                        {/* <div*/}
                        {/*    style={{*/}
                        {/*        textTransform: "none",*/}
                        {/*        display: "flex",*/}
                        {/*        flexDirection: "row",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <div style={{ paddingRight: 5 }}>*/}
                        {/*        <FiberManualRecordIcon className="dot-small" />*/}
                        {/*        <FiberManualRecordIcon className="dot-small" />*/}
                        {/*        <FiberManualRecordIcon className="dot-small" />*/}
                        {/*    </div>*/}
                        {/*</div> */}
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}