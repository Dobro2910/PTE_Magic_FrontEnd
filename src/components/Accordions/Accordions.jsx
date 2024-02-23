import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuProfile from '../../components/MenuProfile/MenuProfile'
//constants
import {AVATAR_DEFAULT, AVATAR_TICTOK} from '../../config/constants';
//icons
import MoneyIcon from '../Icons/AccordionIcons/MoneyIcon'

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "white",
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function Accordions(props) {
    const [expanded, setExpanded] = React.useState('panel1');
    let [profile, setProfile] = React.useState(false)

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleMenu = () => {
        setProfile(!profile)
    }

    return (
        <>
            {profile === false ? (
                <div>
                    <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}> 
                        <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            // expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography className="accordion-title">Home</Typography>
                         </AccordionSummary>
                    </Accordion>
                        {/* <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Help Center
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Community
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Product Updates
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Expert Marketplace
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                API & Developers
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Partner Program
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                System status
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Success by livechat
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Customer Service Report
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Local Benchmark
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Webinars
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails className="accordion-border">
                            <Typography className="accordion-mini-title">
                                Privacy Policy Generator
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>*/}
                        <AccordionSummary
                            aria-controls="panel2d-content"
                            id="panel2d-header"
                            // expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography className="accordion-title">E-Book</Typography>
                        </AccordionSummary>
                    {/*    <AccordionDetails>
                            <Typography className="accordion-mini-title">
                                No data
                            </Typography>
                        </AccordionDetails> 
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}> */}
                        <AccordionSummary
                            aria-controls="panel3d-content"
                            id="panel3d-header"
                            // expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography className="accordion-title">Online Training Courses</Typography>
                        </AccordionSummary>
                        {/* <AccordionDetails>
                            <Typography className="accordion-mini-title">
                                No data
                            </Typography>
                        </AccordionDetails> 
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}> */}
                        <AccordionSummary
                            aria-controls="panel3d-content"
                            id="panel4d-header"
                            // expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography className="accordion-title">Blog</Typography>
                        </AccordionSummary>
                        {/* <AccordionDetails>
                            <Typography className="accordion-mini-title">
                                No data
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            aria-controls="panel3d-content"
                            id="panel5d-header"
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography className="accordion-title">Contact Us</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="accordion-mini-title">
                                No data
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <div onClick={handleMenu}>
                        <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary
                                aria-controls="panel3d-content"
                                id="panel5d-header"
                            >
                                <Typography className="accordion-mini-title align-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img src={props.user.avatar || AVATAR_TICTOK} alt=""/>
                                </span>
                                    <span className="accordion-mini-title">
                                  { props.user.fullName }
                                </span>
                                </Typography>
                            </AccordionSummary>
                        {/* </Accordion>  */}
                    {/* </div> */}
                </div> 
            ) : (
                <MenuProfile username={props.user.fullName} handleMenu={handleMenu}/>
            )}
        </>
    );
}
