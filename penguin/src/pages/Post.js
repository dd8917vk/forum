import React from 'react';
import styled from 'styled-components';
import { atom, useRecoilState } from 'recoil';
import { createAllPostState } from '../globalstate/atom'
import { makePost } from '../api/ForumAPI'

const PostInput = styled.textarea`
    margin-top:10em;
    padding-top:0;
    display:block;
    margin: auto auto;
    width: 90%;
    height: 20em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 1em;
    border: 0;
    outline: none;
    color: #00FF41;
    border: 2px solid #00FF41;
    background-color: #0D0208;
    border-radius: 5px;
    margin-bottom: 10px;
`
const PostContainer = styled.div`
    margin-right: 30px;
    display:flex;
`
const Category = styled.select`
    background-color: #0D0208;
    border-radius: 5px;
    border: 2px solid #00FF41;
    color: #00FF41;
    font-size: 1em;
    width: 25%;
    height: 5em;
`
const TitleInput = styled.input`

    margin-top:1em;
    padding-top:0;
    display:block;
    margin: auto auto;
    width: 65%;
    height: 5em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 1em;
    border: 0;
    outline: none;
    color: #00FF41;
    border: 2px solid #00FF41;
    background-color: #0D0208;
    border-radius: 5px;
    margin-bottom: 10px;
`
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



const handlePost = (event) => {
    event.preventDefault();
    let titleText = event.target.form[0].value;
    let postText = event.target.form[1].value;

}

const Post = () => {
    
const [allPosts, setAllPosts] = useRecoilState(createAllPostState);

    return (
        <div style={{marginTop:"10em"}}>
            <form>
                <PostContainer>
                    <TitleInput placeholder="Title"/>
                    <Category><option>1</option></Category>
                </PostContainer>
                    <PostInput /> 
                <Button onClick={handlePost}>Submit</Button>
            </form>
        </div>
    )
}

export default Post
