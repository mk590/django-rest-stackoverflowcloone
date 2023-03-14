import React from 'react'
import { useState } from 'react'
import axiosInstance from '../axios';

const Add_ques = () => {
    const [value, setValue] = useState("")

    function handlechange(e) {
        console.log(e.target.value)
        setValue(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    
        axiosInstance.post('questions/',{
            text:value
          }).then((response)=>{
            console.log(response)
        })
    }
  return (
    <>
    <input 
    type='text'
    value={value}
    onChange={handlechange}
    className="border-2 border-green-500 p-2 rounded-lg"
    />
    <button
    onClick={handleSubmit}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    />
    </>
    
  )
}

export default Add_ques



