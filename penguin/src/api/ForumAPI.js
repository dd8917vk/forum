//get all posts, must be authenticated
const getAllPosts = async (token) => {
	const response = await fetch("http://localhost:8000/forum/posts/", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `JWT ${token}`,
		},
	});
	const data = await response.json();
	return data;
};

const deleteFavorite = async (event, token, id) => {

	event.preventDefault();
	const rawResponse = await fetch(`http://localhost:8000/forum/post/${id}/`, {
	method: 'DELETE',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `JWT ${token}`
	}});
	const content = await rawResponse.json();
	console.log(rawResponse);
	if (rawResponse.status === 200) {
		return true;
	} else {
		return false;
	}
}

const makePost = async (postObj, token, categoryId) => {
  let response = await fetch(`http://localhost:8000/forum/create-post/${categoryId}/`, 
  {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
	  'Authorization': `JWT ${token}`
    },
    body: JSON.stringify(postObj)
  });
  if (response.status === 200){
	  return true;
  } else {
	  return false;
  }
}

const updatePost = async (obj, token, postid) => {
  console.log(postid);
  let response = await fetch(`http://localhost:8000/forum/post/${postid}/`, 
  {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
	  'Authorization': `JWT ${token}`
    },
    body: JSON.stringify(obj)
  });
  if (response.status === 200){
	  return true;
  } else {
	  return false;
  }
}

export { getAllPosts, deleteFavorite, makePost, updatePost };


