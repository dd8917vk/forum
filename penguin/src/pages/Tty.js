import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../api/ForumAPI';
import styled from 'styled-components';
import TtyComponents from '../components/tty/TtyComponents';
import { deleteFavorite } from '../api/ForumAPI';
import TtyNav from '../components/tty/TtyNav';
import { atom, useRecoilState } from 'recoil';
import { createAllPostState } from '../globalstate/atom';
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

    // const [allPosts, setAllPosts] = useState([])

    console.log(allPosts)
    const result = async (token) => {
        let data = await getAllPosts(token);
        setAllPosts(data)
    }

    const initiateDelete = (event, id) => {
        console.log(event);
        console.log(id);
        let isDelete = deleteFavorite(event, token, id);
        isDelete ? setAllPosts(allPosts.filter(post => post.id !== id)) : alert('Could not delete');
        
    }

    useEffect(()=>{

        result(token);

    }, [])

    return (
        <div>
            <ContainerNav>
                <TtyNav/>
            </ContainerNav>
            <ContainerSide>
                <TtySideBar/>
            </ContainerSide>
            <ContainerBody>
                {allPosts ? <TtyComponents posts={allPosts} delete={initiateDelete}/> : null}
            </ContainerBody>
        </div>
    )
}

export default Tty
