import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles, Menu, MenuItem, Fade, Button } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/auth";
// import MentorMessages from './MentorMessages'

import StudentMessage from './StudentMessage'
import StudentMessagePanel from './StudentMessagePanel'

import { useHistory } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { TrainOutlined } from '@material-ui/icons';

import {
    STUDENT_MESSAGE
  } from "../actions/types"


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#ede102',


    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },

    header: {
        paddingBottom: theme.spacing(10)

    },
    container: {

    }
}))

export default function Header(props) {

    let history = useHistory();

    const [notification, setNotification] = useState('')

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [openMessage, setOpenMessage] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const [openMessageTextBox,setOpenMessageBox]=useState(false)






    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


  const   OpenProfilePage =()=>{
      setOpenProfile(true)
      setOpenMessage(false)
    
  }


  
const OpenMessagePanel =() =>{
 setOpenMessage(true)
 setOpenProfile(false)
}



const openMessageBox  =()=>{

    setOpenMessageBox(true)

}

const closeMessageBox =()=>{
    setOpenMessageBox(false)

}




    useEffect(() => {

        const studentemail = currentUser.email

        console.log(studentemail)

        Axios.post('http://localhost:8080/api/get/retrievemessage', { studentemail }).then(response => {

            console.log(response)


            dispatch({
                type:STUDENT_MESSAGE ,
                payload:{response},
              });






            setNotification(response.data.length)


        })

    }, [])


    const logOut = () => {
        dispatch(logout());

        history.push("/login")


    };



    const classes = useStyles();

    return (

        <div>

            <div className={classes.header}>
                <AppBar position="fixed" className={classes.root}>
                    <Toolbar>
                        <Grid container
                            alignItems="center">
                            <Grid item>
                                <InputBase
                                    placeholder="Search topics"
                                    className={classes.searchInput}
                                    startAdornment={<SearchIcon fontSize="small" />}
                                />
                            </Grid>
                            <Grid item sm></Grid>
                            <Grid item>

                                <IconButton>
                                    <Badge badgeContent={notification} color="secondary">
                                        <NotificationsNoneIcon fontSize="small" />
                                    </Badge>
                                </IconButton>
                                <IconButton onClick={OpenMessagePanel}>
                                    <Badge badgeContent={notification} color="primary">
                                        <ChatBubbleOutlineIcon fontSize="small" />
                                    </Badge>
                                </IconButton>

                                <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                    <AccountCircleIcon />
                                </IconButton>

                                <Menu
                                    id="fade-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={OpenProfilePage}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

            </div>


            <div >





                {(openProfile) && <>
                    <StudentMessage />
                
                 </>}

               


                {(openMessage) &&  <> 


                    <Button  onClick={openMessageBox}>Post Your Query</Button>

         {(openMessageTextBox) && <StudentMessage    closeMessageBox={closeMessageBox}/>}



                    <StudentMessagePanel  />
                
                </>}

            </div>


        </div>
    )
}