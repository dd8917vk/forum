import React, { Component, useParams, useEffect } from 'react';
import Navbar from '../components/Navbar'
import SearchData from '../components/SearchBar'   
import Hr from '../components/Hr'
import { RecoilRoot, useRecoilState } from 'recoil';
import { createHtmlDataState } from '../globalstate/atom'
import { getHtmlData } from '../api/API'
import styles from './Home.module.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Home = (props) => {
    return (
        <div>
            <SearchData id={props?.user?.id}/>
        </div>
    )
}
export default Home
