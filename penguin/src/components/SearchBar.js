import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { getData, getHtmlData } from '../api/API'
import MasterTable from './MasterTable'
import Stats from './Stats'
import { atom, useRecoilState } from 'recoil'
import { createHtmlDataState } from '../globalstate/atom'
import Quote from './Quote'
import styles from './SearchBar.module.css'

const SearchBar = styled.input`
    display:block;
    margin: auto auto;
    margin-bottom: 20px;
    width: 96%;
    height: 5rem;
    font-size: 2.2rem;
    text-align: center;
    border: 0;
    outline: none;
    color: #00FF41;
    border: 2px solid #00FF41;
    background-color: #0D0208;
    border-radius: 5px;
`


export default function SearchData(props) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    //Need one of these (either recoil or standard useState to fetch json html locally)
    //const [htmlData, setHtmlData] = useState([])
    //const [htmlData, setHtmlData] = useRecoilState(createHtmlDataState)

    const handleSearch = (event, text) => {
        console.log(text);
        // setSearchText(event.target.value.toLowerCase()); 
        setSearchText(text.toLowerCase()); 
        // if (searchText !== ""){
        setFilteredData(data.filter(item=>{
            //change item.description to item.command to search command instead
            const description = item.description.toLowerCase();
            const command = item.command.toLowerCase();
            return command.includes(text)||description.includes(text);
        }).sort((a,b)=>a.command.length-b.command.length));
        // }
    }
    useEffect(async ()=>{
        let isMounted = true;
        if(isMounted){
            const result = await getData();
            setData(result);
            setFilteredData([]);
            //fetches all html data below from local json
            //const htmlResult = await getHtmlData()
            //setHtmlData(htmlResult)
        }
        return function cleanup(){
            isMounted = false;
        }
      },[])

    return (
    <div id="smaller" style={{marginTop:"50px"}}>
    <form className="inputPlain">
        <SearchBar onChange={(event) => handleSearch(event, event.target.value)} placeholder={'->MY MAN LINNY<-'}/>
        <Stats dataLength={searchText === '' ? 0 : filteredData.length}/>
        <MasterTable id={props.id} rows={filteredData.slice(0,40)} searchText={searchText}/>
        <Quote searchText={searchText}/>
    </form>
    </div>
    )
}
