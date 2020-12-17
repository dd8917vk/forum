//get all posts, must be authenticated
const getAllPosts = async (token)=>{
    const response = await fetch('http://localhost:8000/post/',
    {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `JWT ${token}`
      },
    }
    ); 
    const data = await response.json();
    return data;
}

export {
    getAllPosts,
}