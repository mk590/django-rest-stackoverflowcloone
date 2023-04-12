// import {Component} from 'react';
import Header1 from "./Header1";
import styled from "styled-components";
import Input from "./Input";
import BlueButton from "./BlueButton";
import axiosInstance from '../axios';
import UserContext from "./UserContext";
import {Navigate } from 'react-router-dom';
import ErrorBox from "./ErrorBox";
import {Helmet} from "react-helmet";
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const Container = styled.div`
  padding: 30px 20px;
`;

export default function SignIn() {
  const [credentials, setCredentials]= useState({username:'',password:''});
  const [appstate, setAppstate]= useState({redirectToHomePage:false,error:false});
	const handleChange=(e)=>{
		setCredentials({
			...credentials,
			[e.target.name]:e.target.value
		})
	}

	const handleSubmit=(e)=>{
		e.preventDefault()

		axiosInstance.post('login/',{
			username:credentials.username,
			password:credentials.password,

		}).then((response)=>{
			console.log(response)
			localStorage.setItem('access_token',response.data.access);
			localStorage.setItem('refresh_token',response.data.refresh);
			axiosInstance.defaults.headers['Authorization']='JWT '+localStorage.getItem('access');
      setAppstate({redirectToHomePage:true,error:false})
		}).catch(() => setAppstate({error:true}));
	}
  
    return (<>
      <Helmet>
        <title>StackOvercloned - login</title>
      </Helmet>
      {appstate.redirectToHomePage && (
        <Navigate  to={'/'} />
      )}
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Login</Header1>
        {appstate.error && (
          <ErrorBox>Login failed</ErrorBox>
        )}
        <form onSubmit={handleSubmit}>
          {/* <Input placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} /> */}
          {/* <Input placeholder={'username'} type="text" id="username"
						label="Username"
						name="username"
                 onChange={handleChange} />
          <Input placeholder={'password'} name="password"
						label="Password"
						type="password"
						id="password"
                 onChange={handleChange} /> */}

<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>

          <BlueButton type={'submit'}>Login</BlueButton>
        </form>
      </Container>
    </>);
  

}

// LoginPage.contextType = UserContext;

