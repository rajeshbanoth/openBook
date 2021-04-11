import React, { useEffect, useState } from 'react'
import MentorBoard from './MentorBoard'
import StudentBoard from './studentBoard'
import { clearMessage } from "../actions/message";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../helpers/history";

export default function Homepage(props) {


    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
  
    const [showstudentBoard, setShowStudentBoard] = useState(false);
   const [showmentorBoard,setshowmentorBoard]=useState(false)
  


    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
          dispatch(clearMessage()); // clear message when changing location
        });
      }, [dispatch]);
    
      useEffect(() => {
        if (currentUser) {
          setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
          setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
          setShowStudentBoard(currentUser.roles.includes("ROLE_STUDENT"))
          setshowmentorBoard(currentUser.roles.includes("ROLE_MENTOR"))
        
        }
      }, [currentUser]);




    
    

    return (
        <>

{showstudentBoard && (
       <StudentBoard />
      )}


    {/* {currentUser && (
              <MentorBoard />
            )}  */}


{showmentorBoard && (
              <MentorBoard />
            )} 


            
        </>
    )
}
