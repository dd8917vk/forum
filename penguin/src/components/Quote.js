import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getRandomQuote } from '../api/API'

const QuoteBox = styled.div`
    background-color:#0D0208;
    display:flex;
    margin: auto auto;
    justify-content:center;
    width: 500px;
    height: 200px;
    border: 3px solid #00FF41;
    border-radius: 6px;
    word-wrap: break-word;
    margin-top: 50px;
`
const QuoteText = styled.p`
    align-items: center;
    align-self: center;
    color:whitesmoke;
    width: 400px;
`
const Quote = (props) => {
    const [randomQuote, setRandomQuote] = useState({})

    useEffect(async ()=> {
        const quote = await getRandomQuote();
        setRandomQuote(quote)
        
    }, [])


    return (
        <div>
            {props.searchText.length < 0 ? null :
            <QuoteBox>
                <QuoteText>
                    {randomQuote?.quote}
                    <br/>
                    <br/>
                    -{randomQuote?.author}
                </QuoteText>
            </QuoteBox>}
        </div>
    )
}

export default Quote
