import {Component} from 'react';
import Header1 from "./Header1";
import styled from "styled-components";
import Input from "./Input";
import BlueButton from "./BlueButton";
import axiosInstance from '../axios';
import UserContext from "./UserContext";
import {Redirect} from 'react-router-dom';
import ErrorBox from "./ErrorBox";
import {Helmet} from "react-helmet";
import React, { useState } from 'react';

const Container = styled.div`
  padding: 30px 20px;
`;

export default function SignIn() {
  const [credentials, setCredentials]= useState({username:'',password:''});
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

		})
	}
  render() {
    return (<>
      <Helmet>
        <title>StackOvercloned - login</title>
      </Helmet>
      {this.state.redirectToHomePage && (
        <Redirect to={'/'} />
      )}
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Login</Header1>
        {this.state.error && (
          <ErrorBox>Login failed</ErrorBox>
        )}
        <form onSubmit={ev => this.login(ev)}>
          <Input placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <Input placeholder={'password'} type="password" value={this.state.password}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <BlueButton type={'submit'}>Login</BlueButton>
        </form>
      </Container>
    </>);
  }

}

LoginPage.contextType = UserContext;

