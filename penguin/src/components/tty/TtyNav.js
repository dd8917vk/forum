import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Link, useHistory, Redirect } from 'react-router-dom';


const PostBox = styled.div`
    /* background-color: #0d0208; */
    display:flex;
	background-color:  black;
	justify-content: flex-end;
	margin-right: 10px;
	margin-left: 10px;
	height: 80%;
	border: 3px solid #00ff41;
	border-radius: 6px;
	word-wrap: break-word;
	padding: 10px 10px 10px 10px;
`;
const Button = styled.button`
    margin: auto;
	color: whitesmoke;
	font-size: 10px;
	margin: 5px;
	padding: 5px 5px;
	border: 2px solid #00ff41;
	border-radius: 3px;
	height: 3em;
	width: 7em;
	background-color: #003B00;
`;


const TtyNav = () => {
    return (
        <div>
            <PostBox>
                <Link to="/post">
                    <Button>post</Button>
                </Link>
            </PostBox>
        </div>
    )
}

export default TtyNav
