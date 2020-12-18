import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SideBox = styled.div`
	/* background-color: #0d0208; */
	display: flex;
	background-color: black;
	justify-content: flex-start;
	margin-right: 10px;
	margin-left: 10px;
	height: 100vh;
	border: 3px solid #00ff41;
	border-radius: 6px;
	word-wrap: break-word;
    padding: 10px 10px 10px 10px;
    width:25%;
    position: absolute;
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
	width: 100%;
	background-color: #003b00;
`;


const TtySideBar = () => {
    return (
        <div>
            <SideBox>
                <Button>category</Button>
            </SideBox>
        </div>
    )
}

export default TtySideBar
