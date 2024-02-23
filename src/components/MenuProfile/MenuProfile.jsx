import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';

//icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HomeIcon from "../Icons/MenuProfileIcons/HomeIcon";
import ProfileIcon from "../Icons/MenuProfileIcons/ProfileIcon";
import ProIcon from "../Icons/MenuProfileIcons/ProIcon";
import QuestionIcon from "../Icons/MenuProfileIcons/QuestionIcon";
import SettingIcon from "../Icons/MenuProfileIcons/SettingIcon";

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

export default function MenuProfile(props) {

    return (
        <div>
            <Accordion square>
                <Typography>
                    <div className="menu-padding">
                        <div className="space-bottom" onClick={props.handleMenu}>
                            <span>
                                <ArrowBackIosIcon/>
                            </span>
                            <span>
                                Full Menu
                            </span>
                        </div>
                        <div>
                            <div className="menu-title">
                                {props.username}
                            </div>
                            <div className="mini-part">
                               <span>
                                    <ProfileIcon/>
                                </span>
                                <span className="space-title">Profile</span>
                            </div>
                            <div className="mini-part">
                               <span>
                                    <SettingIcon/>
                                </span>
                                <span className="space-title">Account + Billing</span>
                            </div>
                            <div className="mini-part">
                               <span>
                                    <HomeIcon/>
                                </span>
                                <span className="space-title">My Home</span>
                            </div>
                            <div className="mini-part">
                               <span>
                                    <ProIcon/>
                                </span>
                                <span className="space-title">Give Pro, Get Pro</span>
                            </div>
                            <div className="mini-part">
                               <span>
                                    <QuestionIcon/>
                                </span>
                                <span className="space-title">Help Center</span>
                            </div>
                        </div>
                    </div>
                    <div className="menu-padding">
                        Log out
                    </div>
                </Typography>
            </Accordion>
        </div>
    );
}
