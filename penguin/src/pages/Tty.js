import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { getAllPosts } from '../api/ForumAPI';
import styled from 'styled-components';
import TtyComponents from '../components/tty/TtyComponents';
import { deleteFavorite } from '../api/ForumAPI';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 10em;
`

const Tty = () => {
    
    let token = localStorage.getItem('user');
    
    const [allPosts, setAllPosts] = useState([])

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
            <Container>
                {allPosts ? <TtyComponents posts={allPosts} delete={initiateDelete}/> : null}
            </Container>
        </div>
    )
}

export default Tty
