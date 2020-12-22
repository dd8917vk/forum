import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { atom, useRecoilState } from 'recoil';
import { createAllPostState, createAllCategoriesState } from '../globalstate/atom';
import { makePost, getAllPosts, renderCategory } from '../api/ForumAPI';
import { Link, useHistory } from "react-router-dom";

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

const Post = () => {
    const [selectMenuId, setSelectMenuId] = useState('');
    const [allPosts, setAllPosts] = useRecoilState(createAllPostState);
    const hist = useHistory();
    const token = localStorage.getItem('user');
    const [allCategories, setAllCategories] = useRecoilState(createAllCategoriesState);

    const handlePost = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('user');
        let postTitle = event.target.form[0].value;
        // let postCategory = event.target.form[1].value;
        let postCategory = selectMenuId;
        console.log(selectMenuId)
        let postText = event.target.form[2].value;
        let postObj = {
            title : postTitle,
            body : postText
        }
        let postIt = makePost(postObj, token, postCategory);
        if (postIt) {
            setAllPosts(await getAllPosts(token));
            hist.push("/tty");
        } else {
            alert("Your post did not go through.");
        }
    }

    
    useEffect(()=> {
        const data = async () => await renderCategory(token);
        let results = data().then(resp => {
            setAllCategories(resp);
            console.log(allCategories)
        });
    }, [])

    const selectedChange = (event) =>{
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        setSelectMenuId(id);
        console.log(selectMenuId);
    }
    return (
        <div style={{marginTop:"10em"}}>
            <form>
                <PostContainer>
                    <TitleInput placeholder="Title"/>
                    <Category onChange={selectedChange}>
                        {allCategories.map((item, index)=>{
                            return <option id={item.id}>{item?.title}</option> 
                        })}
                    </Category>
                </PostContainer>
                    <PostInput /> 
                <Button onClick={handlePost}>Submit</Button>
            </form>
        </div>
    )
}

export default Post
