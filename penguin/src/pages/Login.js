import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, Route, Link, useHistory } from 'react-router-dom';


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
const Login = (props) => {
    
    let hist = useHistory()
    if (props.isLoggedIn){
        hist.push('/');
    }

    return (
        <div style={{paddingTop:"100px"}}>
            <form onSubmit={props.handleLogin}>
            <Input placeholder={"username"} type="text" name="username"/>
            <Input placeholder={"password"}  type="password" name="password" inputColor="whitesmoke" />
            <Button type="submit">submit</Button>
            </form>
            <p style={{color:"whitesmoke"}}>YOU KNOW THE DRILL</p>
        </div>
    )
}

export default Login


