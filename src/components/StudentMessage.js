import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Paper, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    

  },
  style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop:'1%'
  },
  style1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop:'7%'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MultilineTextFields(props) {



  const [opensnack,setopensnack]=useState(false)

  const [snackMessage,setsnackmessage]=useState('')
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setopensnack(false);
    };
  



    const { user: currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [subject, setSubject] = React.useState('');
  
  const [messagetext,setmessagetext]=useState("")

  const handleChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange =(e)=>{
      setmessagetext(e.target.value);
  }


  const postQuery=()=>{
const email=currentUser.email




const messageid=Math.random().toString(36).substring(2, 30) + Math.random().toString(36).substring(2, 30);
console.log(messageid)

const values ={
  email:email,
  subject:subject,
  messagetext:messagetext,
  messageid:messageid
}


    
  Axios.post('http://localhost:8080/api/postquerymessage',{values}).then(response=>{
      console.log(response)

      if(response.status==200){
        setsnackmessage("Message Sent")

        setopensnack(true)


   
    }



  })

  }





  return (

    <>

    
    
    <form className={classes.root}   noValidate autoComplete="off" >
   
      <div className={classes.style1}>
        <Typography
            variant="h4"
            align="center"
            >
          Post Your Query
          </Typography>
        </div>
      <div className={classes.style}>
        <TextField
          id="standard-multiline-flexible"
          label="Course"
          fullWidth
          value={subject}
          onChange={handleChange}
          variant="outlined"
        />
        
      </div>
     
      <div className={classes.style}>
        <TextField
          id="outlined-multiline-static"
          label="Post your Query here"
          multiline
          rows={5}
          variant="outlined"
          onChange={handleMessageChange}
        />
      </div>


        <div className={classes.style}>
        <Button  variant='contained' color='primary' onClick={postQuery} >Send</Button>
        
        </div>
    
     
        

    </form>
    <Snackbar open={opensnack} autoHideDuration={6000} onClose={handleClose}
            
            anchorOrigin={{ vertical:'top', horizontal:"center" }}>
        <Alert onClose={handleClose} severity="success">
          {snackMessage}
        </Alert>
      </Snackbar>


    </>
    
  );
}