import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { getAllPosts } from '../api/ForumAPI';
import styled from 'styled-components'
import TtyComponents from '../components/tty/TtyComponents'    

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

    useEffect(()=>{

        result(token);

    }, [])

    return (
        <div>
            <Container>
                {allPosts ? <TtyComponents posts={allPosts}/> : null}
            </Container>
        </div>
    )
}

export default Tty
