import React from 'react';
import Navbar from "scenes/navbar";
import img404 from "img/permissions_dark_mode.png";
import { useNavigate  } from "react-router-dom";
import {
    useTheme,
    Button,
} from "@mui/material";

const NotFound = () => {
    const { palette } = useTheme();
    let history = useNavigate();
    const handleClickBtn = () => {
        history('/')
    }
    return (
        <>
            <Navbar />
            <center>
            <div className="position-relative" style={{ minHeight: 'calc(100vh - 70px)' }}>
                <div className="position-absolute text-secondary" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img src={img404} width="112"/>
                    <h2 style={{margin:`0px`}}>404 | Not Found.</h2>
                    <br></br>
                    <h4 style={{margin:`0px`}}>You are currently unable to view this content</h4>
                    <p style={{margin:`0px`, padding: `0 15%`}}>This error is often caused by the owner sharing the content with a small group of people, changing who can see it, or deleting the content.</p>
                    <br></br>
                    <Button
                        onClick={handleClickBtn}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem",
                        }}
                        >
                        Go HomePage
                    </Button>
                </div>
            </div>
            </center>
        </>
    )
}

export default NotFound