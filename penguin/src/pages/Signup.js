import React, { useState } from 'react';
import styled from 'styled-components';
import { signupUser } from '../api/API';
import { Link, useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  margin: auto auto;
  color: ${props => props.inputColor || "#00FF41"};
  background: black;
  border: none;
  border-radius: 3px;
  display:block;
  text-align:center;
  margin-bottom:20px;
  height: 5em;
  font-size: 1.5em;
`;

const Button = styled.button`
  margin: auto;
  text-align:center;
  color: #00FF41;
  font-size: 2em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00FF41;
  border-radius: 3px;
  display: inline-block;
  height: 2em;
  width: 8em;
  background-color:black;
`
const Signup = () => {

  const [isVerified, setIsVerified] = useState(false);
  const hist = useHistory();
      const recaptchaLoaded = () =>{
      console.log('captcha loaded');
    }
    window.recaptchaLoaded = recaptchaLoaded;
    const recaptchaVerify = () =>{
      console.log('captcha verified');
      setIsVerified(true);
    } 

  const handleSignup = async (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    let password1 = event.target.password1.value;
    let password2 = event.target.password2.value;
    let email = event.target.email.value;
    if (password1 !== password2){
      alert("Passwords do not match.")
    } else {
    let userCredentials = {
      username: username,
      password: password1,
      email: email,
    }
    let response = await signupUser(userCredentials);
    let data = await response.json();
    console.log(data);
    data ? hist.push('/login') : <div>Something went wrong with account creation</div>
    }
  }

    return (
        <div style={{paddingTop:"100px"}}>
          <form onSubmit={handleSignup}>
            <Input placeholder={"username"} type="text" name="username" />
            <Input placeholder={"password"}  type="password" inputColor="whitesmoke" name="password1"/>
            <Input placeholder={"password"}  type="password" inputColor="whitesmoke" name="password2"/>
            <Input placeholder={"email"}  type="email" inputColor="whitesmoke" name="email"/>
            {isVerified ? <Button style={{display:"block", margin:"auto auto"}}type="submit">submit</Button> : null}
             <div style={{display:"inline-block", paddingTop:"0px"}}>
            <Recaptcha  sitekey='6LehagkaAAAAAPjxnoyAT5kymTs1hROfZCtMNCQM' render='explicit' onloadCallback={recaptchaLoaded} 
            verifyCallback={recaptchaVerify} theme="dark"/>
            </div>
          </form>
        </div>
    )
}

export default Signup


