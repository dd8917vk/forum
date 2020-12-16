import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import ManualPage from './pages/ManualPage';
import { BrowserRouter as Router, Switch, Route, Link, useParams, Redirect } from "react-router-dom";
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Hr from './components/Hr'
import Feedback from './pages/Feedback'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { login, getLoggedInUser } from './api/API'
import AuthenticatedRoute from './components/AuthenticatedRoute'
//cat wines.json | heroku run --no-tty -a wineapi1983 -- python manage.py loaddata --format=json -
//http://quotes.stormconsultancy.co.uk/random.json


function App(props) {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect (()=>{
    getUser()
  },[]);

  const getUser = async () => {
    if(localStorage.getItem('user') !== null) {
    let response = await getLoggedInUser(localStorage.getItem('user'));
    let data = await response.json();
    if(data.username){
      setIsLoggedIn(true);
      setUser(data)
    }
  }
  }
  const renderLoginPage = () => {
    return (
      <Login
      isLoggedIn={isLoggedIn}
      user={user}
      handleLogin={handleLogin}
      />
    )
  }
  console.log(isLoggedIn);
  console.log(user);

  const handleLogin = async (event) => {
    event.preventDefault()
    let userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    let response = await login(userCredentials)
    console.log(response)
    if(response.status === 400){
      alert('Bad username or password, try again')
    }
    let data = await response.json()
    if (data.token) {
      localStorage.setItem('user', data.token);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }
  
  const goHome = () => {
    return (
      <Home
         user={user}
      />
    )
  }
  const goFavorites = () => {
    return (
      <Favorites
         user={user}
      />
    )
  }
  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} className="navbar" style={{paddingTop:"100px"}}/>
        <Route exact path="/login" render={renderLoginPage} />
        <Route exact path="/signup" component={Signup} />
        {/* change component to render to call function */}
        <Route exact path="/" render={goHome} />
        <Route exact path="/manpage/:command" component={ManualPage} />
        <Route exact path="/about" component={Home} />
        <AuthenticatedRoute exact path="/favorites" render={goFavorites} component={Favorites} />
        <Route exact path="/feedback" component={Feedback} />
      </Router>
    </div>
    
  );
}

export default App;
