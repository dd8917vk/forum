const getData = async ()=>{
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}
const getHtmlData = async ()=>{
    const response = await fetch('http://localhost:8000/api/command_list/'); //FOR LOCAL DEV
    //const response = await fetch('cleaned_data.json');  JSON DATA
    //take cors anywhere off once in production and add cors to whitelist in django settings
    // const response = await fetch('https://cors-anywhere.herokuapp.com/https://penguinbackend.herokuapp.com/api/command_list/');
    const data = await response.json();
    return data;
}
const getHtmlDataByCommand = async (command)=>{
    const response = await fetch(`http://localhost:8000/api/commandview/${command}/`); //FOR LOCAL DEV
    //const response = await fetch('cleaned_data.json'); #JSON DATA
    //take cors anywhere off once in production and add cors to whitelist in django settings
    // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://penguinbackend.herokuapp.com/api/commandview/${command}/`);
    const data = await response.json();
    return data;
}
const getRandomQuote = async () => {
  const response = await fetch('http://quotes.stormconsultancy.co.uk/random.json');
  const data = await response.json();
  return data;
}
// const getAsciiArt = async (text) = {
//   const response = await fetch(`https://artii.herokuapp.com/make?text=linux+rules`)
// }

const getAllFavorites = async (token)=>{
    const response = await fetch('http://localhost:8000/api/favorites_list/',
    {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `JWT ${token}`
      },
    }
    ); //FOR LOCAL DEV
    const data = await response.json();
    return data;
}
//auth
const login = async (userCredentials) => {
  let response = await fetch('http://localhost:8000/token-auth/', 
  {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(userCredentials)
  });
  console.log(userCredentials);
  return response;
}

const getLoggedInUser = async (token) => {
  let response = await fetch('http://localhost:8000/api/current_user/', 
  {
    headers: {
      'Content-Type':'application/json',
      'Authorization': `JWT ${token}`
    },
  });
  return response;
}

const signupUser = async (userCredentials) => {
  let response = await fetch('http://localhost:8000/api/users/',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  })
  return response;
}
export {
  getData,
  getHtmlData,
  getRandomQuote,
  getHtmlDataByCommand,
  getAllFavorites,
  login,
  getLoggedInUser,
  signupUser,
}
