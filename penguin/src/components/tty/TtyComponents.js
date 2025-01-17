import styled from "styled-components";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, Redirect } from "react-router-dom";


const PostBox = styled.div`
	background-color: #0d0208;
	height: auto;
	border: 3px solid #00ff41;
	border-radius: 6px;
	word-wrap: break-word;
	padding: 10px 10px 10px 10px;
	margin-right: 10px;
	margin-bottom: 10px;
	margin-left: 10%;
`;
const Button = styled.button`
	margin: auto;
	text-align: center;
	color: whitesmoke;
	font-size: 10px;
	margin: 5px;
	padding: 5px 5px;
	border: 2px solid #00ff41;
	border-radius: 3px;
	height: 3em;
	width: 7em;
	background-color: black;
`;
const PostControl = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: 100%;
	height: 20%;
	bottom: 0;
`;
const Meta = styled.div`
	margin-left: auto;
`;
const TitleControl = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 20%;
	top: 0;
`;
const PostText = styled.p`
	padding-top: 10px;
	align-items: center;
	align-self: center;
	color: whitesmoke;
`;
const PostComment = styled.p`
	align-items: center;
	align-self: center;
	color: whitesmoke;
	width: 400px;
`;

const TtyComponents = (props) => {
	let userId = localStorage.getItem('userId');
	return (
		<div>
			{props.posts?.map((post, index) => {
				return (
					<PostBox key={index}>
						<TitleControl>{post?.title}</TitleControl>
						<PostText>{post?.body}</PostText>
						<PostControl>
							{userId === post.author.toString() ? <Link to={`/edit/${post?.id}/${post?.category}`}>
     	                		<Button >edit</Button>
							</Link> : null}
							{userId === post.author.toString() ? <Button onClick={(e)=>{return props.delete(e, post?.id)}}>del</Button> : null }

							<Meta>{post?.author.toString()}</Meta>
							<Meta>{post?.date_posted.split("T")[0]}</Meta>
						</PostControl>
					</PostBox>
				);
			})}
		</div>
	);
};

export default TtyComponents;
