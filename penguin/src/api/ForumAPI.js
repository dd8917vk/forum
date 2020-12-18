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


export { getAllPosts, deleteFavorite };


