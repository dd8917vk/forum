import React, { useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import styles from "./MasterTable.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MasterTable = (props) => {
	let token = localStorage.getItem('user');

	const [favorite, setFavorite] = useState(false);

	const ascify = (event) => {
		let baseUrl = "https://artii.herokuapp.com/make?text=";
		let siblingNode =
			event.target.nextSibling.children[0].childNodes[0].nodeValue;
		console.log(siblingNode);
		let apiCall = `${baseUrl}+${siblingNode}`;
		window.open(apiCall, "_blank");
	};

	const addFavorite = async (event) => {
		event.preventDefault();
		let command = event.target.parentElement.parentElement.children[1].innerText;
		let description = event.target.parentElement.parentElement.children[2].innerText;
		console.log(command,description);
		const rawResponse = await fetch('http://localhost:8000/api/favorites_create/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `JWT ${token}`
		},
		body: JSON.stringify({command: command, description: description, comment: 'Click to enter comment', author: props.id})
		});
		const content = await rawResponse.json();
		console.log(rawResponse);
		rawResponse.status === 200 ? notify() : alert('Unable to add favorite.'); 
	}

	const notify = () => toast.dark('🐧 FAVORITE ADDED!', {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		});
// If you want localstorage for favorites
// 	const isFavorite = (event) => {
// 		//get command when favorite clicked
// 		let oldItems = JSON.parse(localStorage.getItem("commandsArray")) || [];
// 		let command = event.target.parentNode.childNodes[1].innerText;
// 		let description = event.target.parentNode.childNodes[2].innerText;
// 		console.log(oldItems)
// 		let entry = {
// 			"command": command,
// 			"description": description,
// 		};
// 		const checkExists = obj => obj.command === command;
// 		if (!(oldItems.some(checkExists))) {
// 			oldItems.push(entry)
// 		}
// 		localStorage.setItem("commandsArray", JSON.stringify(oldItems));
// 		console.log(localStorage)
//   };

	return (
		<Container fluid>
			<Table striped bordered hover variant="dark" size="sm">
				<thead>
					<tr style={{ color: "#008F11" }}>
						<th>ascify</th>
						<th>command</th>
						<th>description</th>
						<th>favorite</th>
					</tr>
				</thead>
				{props.searchText.length > 0 ? (
					<tbody>
						{props.rows?.map((item, index) => (
							<tr key={index}>
								<td style={{ cursor: "pointer" }} onClick={ascify}>
									ascify
								</td>
								<td>
									<Link to={`/manpage/${item?.command}`}>{item?.command}</Link>
								</td>
								<td>{item?.description}</td>
								<td style={{ cursor: "pointer"}}><button style={{color:"whitesmoke", backgroundColor:"#0D0208", borderRadius:"2px"}} onClick={addFavorite}>favorite</button>
								<ToastContainer
								position="bottom-right"
								autoClose={3000}
								hideProgressBar={true}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								></ToastContainer>
								</td>
							</tr>
						))}
					</tbody>
				) : null}
			</Table>
		</Container>
	);
};
export default MasterTable;
