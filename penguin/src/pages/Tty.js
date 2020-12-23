import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../api/ForumAPI';
import styled from 'styled-components';
import TtyComponents from '../components/tty/TtyComponents';
import { deleteFavorite } from '../api/ForumAPI';
import TtyNav from '../components/tty/TtyNav';
import { atom, useRecoilState } from 'recoil';
import { createAllPostState, createAllCategoriesState, createCategoryIdState, createFilteredPostState } from '../globalstate/atom';
import TtySideBar from '../components/tty/TtySideBar';

const ContainerNav = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 1em;
`
const ContainerSide = styled.div`
    display:flex;
    flex-direction: row;
    float:left;
    width: 20%;
`
const ContainerBody = styled.div`
    display:flex;
    flex-direction: column;
    width: 80%;
    margin-left: 20%;
`

const Tty = () => {
    let token = localStorage.getItem('user');
    
    //global state for posts
    const [allPosts, setAllPosts] = useRecoilState(createAllPostState);
    const [allCategories, setAllCategories] = useRecoilState(createAllCategoriesState);
    const [categoryState, setCategoryState] = useRecoilState(createCategoryIdState);
    const [filteredPosts, setFilteredPosts] = useRecoilState(createFilteredPostState);
    // const [allPosts, setAllPosts] = useState([])

    const result = async (token) => {
        let data = await getAllPosts(token);
        setAllPosts(data)
    }

    const initiateDelete = (event, id) => {
        let isDelete = deleteFavorite(event, token, id);
        isDelete ? setAllPosts(allPosts.filter(post => post.id !== id)) : alert('Could not delete');
    }

    useEffect(()=>{

        result(token);

    }, [])


    const getFilteredPosts = () => {
        let filteredPosts = allPosts.filter(item=>item.category === categoryState);
        setFilteredPosts(filteredPosts);
        console.log(filteredPosts);
    }

    const getCategoryState = (categoryId) => {
        setCategoryState(categoryId);
        console.log(categoryState);
        getFilteredPosts();
    }

    return (
        <div>
            <ContainerNav>
                <TtyNav/>
            </ContainerNav>
            <ContainerSide>
                <TtySideBar currentCategory={getCategoryState}/>
            </ContainerSide>
            <ContainerBody>
                {filteredPosts ? <TtyComponents posts={filteredPosts} delete={initiateDelete}/> : null}
            </ContainerBody>
        </div>
    )
}

export default Tty
