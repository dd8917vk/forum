import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { renderCategory } from '../../api/ForumAPI'
import { atom, useRecoilState } from 'recoil';
import { createCategoryIdState } from '../../globalstate/atom'
const SideBox = styled.div`
	/* background-color: #0d0208; */
	display: flex;
	flex-direction: column;
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
	color: whitesmoke;
	font-size: 10px;
	margin: 1px;
	border: 2px solid #00ff41;
	border-radius: 3px;
	height: 3em;
	width: 100%;
	background-color: #003b00;
`;


const TtySideBar = (props) => {
	const [categories, setCategories] = useState([]);
	const [categoryState, setCategoryState] = useRecoilState(createCategoryIdState);

	let token = localStorage.getItem('user');

	useEffect(()=>{
		const data = async () => await renderCategory(token);
        let results = data().then(resp => {
			setCategories(resp);
        });
	}, [])

	const displayCategory = (event, itemId) => {
		event.preventDefault();
		setCategoryState(itemId);
		console.log(itemId)
		console.log(categoryState)
		props.currentCategory(itemId);
		// console.log(categoryState);
	}
    return (
        <div>
            <SideBox>
				{categories.map((item, index)=> 
					<Button onClick={(e)=>{displayCategory(e, item?.id)}} key={index}>{item?.title}</Button>
				)}
            </SideBox>
        </div>
    )
}

export default TtySideBar
