import styled from 'styled-components';
import Header1 from "./Header1";
import BlueButton from "./BlueButton";
import Input from './Input';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import ReactTags from 'react-tag-autocomplete';
import PostBodyTextarea from "./PostBodyTextarea";
import axiosInstance from '../axios';

const Container = styled.div`
  padding: 30px 20px;
`;

export default function AskPage() {
  const [redirect, setRedirect] = useState('');

  const [value1, setValue] = useState("")

  function handlechange(e) {
    setValue(e.target.value)
    console.log(value1)
  }
  const handleSubmit=(e)=>{
      e.preventDefault()
  
      axiosInstance.post('questions/',{
          text:value1
        }).then((response)=>{
          console.log(response)
          setRedirect(true);
      })
  }

  return (
    <Container>
      {redirect && (
        <Navigate to={'/'} />
      )}
      <Header1 style={{marginBottom:'20px'}}>Ask a public question</Header1>
      
        <input type="text"
               value={value1}
               onChange={handlechange}
              //  placeholder="Your question" 
               />
        <BlueButton onClick={handleSubmit}>Post question</BlueButton>
      
    </Container>
  );

}