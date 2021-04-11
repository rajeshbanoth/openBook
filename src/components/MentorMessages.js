import { Button, List, ListItem, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Messages(props) {



    const [opensnack,setopensnack]=useState(false)

    const [snackMessage,setsnackmessage]=useState('')
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setopensnack(false);
      };
    
  




    const [currentmessage, setcurrentmessage] = useState('')

    const responsedata = useSelector((state) => state.mentormessages)

    const [displaymessagelist, setdisplaymessagelist] = useState(false)

const [replybox,setreplybox]=useState(false)

    const messagedata = responsedata.totalmessagedata.response.data

    const [currentIndex, setCurrentIndex] = useState(-1);



    const[values,setvalues]=useState('')

    console.log(messagedata)



    const setactivemessage = (messagedata, index) => {

        setcurrentmessage(messagedata)
        setCurrentIndex(index);

        console.log(messagedata, index)


        setdisplaymessagelist(!displaymessagelist)

      




    }


    const GotoBackMenu =()=>{

        setdisplaymessagelist(false)
        setcurrentmessage('')

    }

    const replymessage = ()=>{

        setreplybox(!replybox)

    }

    const cancel = ( )=>{
        setreplybox(false)
    }


    const SumitMessage =()=>{
        

        const data={

            replytext:values,
            mentoremail:currentmessage.mentoremail,
            studentemail:currentmessage.studentemail,
            messageid:currentmessage.messageid

        }

        console.log(data)

        Axios.put("http://localhost:8080/api/post/querydataforreply",{data}).then(response=>{
    console.log(response)

    if(response.status==200){
        setsnackmessage("Message Sent")

        setopensnack(true)
    }

       

    })}

    

    return (
        <>


        {!(displaymessagelist) ? (<> 



            <List>
                {messagedata &&
                    messagedata.map((messagedata, index) => (


                        <>

                            <ListItem button key={messagedata}
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")

                                }
                                onClick={() => setactivemessage(messagedata, index)}
                                key={index}
                                style={(index === currentIndex ? { backgroundColor: '#b1d9ab' } : null)}
 

                            >
                                {messagedata.studentemail}  {messagedata.createdAt}
                            </ListItem>
                        </>
                    ))}
            </List>
        
        
        </>) 
        
        
        :( <> </>)}



           


            { currentmessage ? (<>



<Button onClick={GotoBackMenu}>back</Button>

<div >


   
<div>

    
   <Typography color='primary'  style={{fontSize:"20px"}}>{currentmessage.studentemail}</Typography>

</div>

<div style={{flexDirection:'row',display:'flex',paddingBottom:'10px'}}>

<Typography   style={{fontSize:"15px",paddingRight:'10px'}}>{currentmessage.messagesubject} </Typography>

<Typography  color='primary' style={{fontSize:"15px"}}>{currentmessage.createdAt}</Typography>
</div>

<div>
<Typography  color='primary'  style={{fontSize:"26px",paddingBottom:'10px'}}> {currentmessage.messagetext}</Typography>

</div>


<Button  variant='outlined'  color='primary' style={{paddingBottom:'10px'}}  onClick={replymessage}>Reply</Button>



{(replybox) && <>

<div>
    <div>
<TextField

        style={{width:'100%'}}
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={13}
          defaultValue="Default Value"
          variant="outlined"
          onChange={(e)=>{
              setvalues(e.target.value)
          }}

        />
        </div>

<div>
        <Button onClick={SumitMessage}>Send</Button>

        <Button onClick={cancel}>Cancel</Button>
        </div>
        </div>

 </>}






</div>

           



            </>) : (<>


            </>)}



            <Snackbar open={opensnack} autoHideDuration={6000} onClose={handleClose}
            
            anchorOrigin={{ vertical:'top', horizontal:"center" }}>
        <Alert onClose={handleClose} severity="success">
          {snackMessage}
        </Alert>
      </Snackbar>


        </>
    )
}
