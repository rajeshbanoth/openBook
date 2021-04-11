import Axios from "axios";
import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import CardComponent from './cardComponent'

const Home = () => {
  const [content, setContent] = useState("");
  const [responseData,setresponseData]=useState([])


  useEffect(()=>{
    Axios.get('http://localhost:8080/fileUpload/queries').then((response=>{
      console.log(response)

       setresponseData(response.data.users)
    }))

  },[])



var  images=[]


  for(const  dataObj of responseData){

   
    // valuese.push(dataObj)

      images.push(dataObj.imgCollection)
    
    
     

  }

  console.log(images)

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
    
      </header>
    <div>
      
    </div>

    
 {images.map(item=>(
   <>
   <CardComponent  images={item}/>

   </>
 ))}

    </div>
  );
};

export default Home;
