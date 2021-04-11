import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';


export default function Fileupload(props) {

    const { user: currentUser } = useSelector((state) => state.auth);

    const[imgCollection,setimgCollection]=useState('')

const id =currentUser .id

console.log(id)



   const  onFileChange=(e)=> {
        

        setimgCollection(e.target.value)
    }

    const onSubmit=(e)=> {
        e.preventDefault()

        var formData = new FormData();
        for (const key of Object.keys(imgCollection)) {
            formData.append('imgCollection', imgCollection[key])
            formData.append('id',id)
        }
        axios.post("http://localhost:8080/fileUpload/upload-images", formData, {
        }).then(res => {
            console.log(res.data)
        })
    }


    

    return (
        <>
              <div className="container">
                <div className="row">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}


