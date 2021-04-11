import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useSelector } from 'react-redux';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function StateTextFields() {




    const [opensnack,setopensnack]=useState(false)

    const [snackMessage,setsnackmessage]=useState('')
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setopensnack(false);
      };
    


  const classes = useStyles();
  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const { user: currentUser } = useSelector((state) => state.auth);


const  [values,setvalues]= useState({
    email:currentUser.email,
    proffession:'',
    organisation:'',
     experience:'',
     interest1:'',
     interest2:'',
     interest3:'',
     interest4:'',
     interest5:'',

})




const sumbitdata =()=>{
    console.log(values)

Axios.post("http://localhost:8080/api/personaldata",{values}).then(response=>{
    console.log(response)


    if(response.status==200){

        setsnackmessage("Profile Update Succesfully")

        setopensnack(true)

    }
})



}


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField  label="Proffession" variant="outlined" 
       values={values.proffession}
       onChange={(e)=>{
           setvalues({
               ...values,proffession:e.target.value
           })
       }} />
      <TextField  label="Organisation" variant="outlined"
             values={values.organisation}
             onChange={(e)=>{
                 setvalues({
                     ...values,organisation:e.target.value
                 })
             }} />
      </div>
      <div>
      <TextField label="Total Experience " variant="outlined" 
             values={values.experience}
             onChange={(e)=>{
                 setvalues({
                     ...values,experience:e.target.value
                 })
             }}/>
      
      </div>

      <div>
          <Typography  color='secondary'> Please select any five interest of your own to  provide mentorship</Typography>
      </div>
      <div>
      <TextField  label="Interest1" variant="outlined" 
             values={values.interest1}
             onChange={(e)=>{
                 setvalues({
                     ...values,interest1:e.target.value
                 })
             }} />
      <TextField  label="Interest2" variant="outlined"
                   values={values.interest2}
                   onChange={(e)=>{
                       setvalues({
                           ...values,interest2:e.target.value
                       })
                   }} />
      </div>

      <div>
      <TextField  label="Interest3" variant="outlined" 
                   values={values.interest3}
                   onChange={(e)=>{
                       setvalues({
                           ...values,interest3:e.target.value
                       })
                   }}/>
      <TextField  label="Interest4" variant="outlined"
                   values={values.interest4}
                   onChange={(e)=>{
                       setvalues({
                           ...values,interest4:e.target.value
                       })
                   }} />
      </div>
      <div>
      
      <TextField  label="Interest5" variant="outlined" 
                   values={values.interest5}
                   onChange={(e)=>{
                       setvalues({
                           ...values,interest5:e.target.value
                       })
                   }}/>
      </div>

      <div>
          <Button onClick={sumbitdata}>Submit</Button>
      </div>

      
      <Snackbar open={opensnack} autoHideDuration={6000} onClose={handleClose}
            
            anchorOrigin={{ vertical:'top', horizontal:"center" }}>
        <Alert onClose={handleClose} severity="success">
          {snackMessage}
        </Alert>
      </Snackbar>
     
    </form>
  );
}
