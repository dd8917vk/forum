import React, { useState, useEffect } from 'react';
import { Table, Container, Row } from "react-bootstrap";
import { getAllFavorites } from '../api/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from '../components/Comment';


const FavoriteTable = (props) => {
    let token = localStorage.getItem('user');
    console.log(props)
    //This is command and description in props obj
    //localStorage
    //const [favorites, setFavorites] = useState([]) 
    const [favorites, setFavorites] = useState([]);
    useEffect(()=>{
        const data = async () => await getAllFavorites(token);
        let results = data().then(resp => {
            setFavorites(resp);
            console.log(favorites)
        })

        //localStorage
        //renderFavorites()
    }, [])

	const notify = () => toast.dark('🐧 DELETED!', {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
        });

	const deleteFavorite = async (event) => {
		event.preventDefault();
		let command = event.target.parentElement.parentElement.children[0].innerText;
        let description = event.target.parentElement.parentElement.children[1].innerText;
        let id = (favorites.find(element => element.command === command)).id;
		const rawResponse = await fetch(`http://localhost:8000/api/favorites_delete/${id}/`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
		}});
		const content = await rawResponse.json();
		console.log(rawResponse);
        if (rawResponse.status === 200) {
            setFavorites(favorites.filter(e => e.id !== id));
            // let index = favorites.findIndex(e => e.id === id);
            // favorites.splice(index, 1);
            notify()
        } else {
            alert("Unable to delete!")
        }
	}
    //localStorage
    // const deleteFavorite = (event) => {
    //     event.preventDefault()
    //     let oldItems = JSON.parse(localStorage.getItem("commandsArray")) || [];
    //     let command = event.target.id//.childNodes[2].innerText;
    //     const checkExists = obj => obj.command === command;
    //     const result = oldItems.filter(item=>item.command !== command)
    //     setFavorites(result)
    //     localStorage.setItem("commandsArray", JSON.stringify(result))
    //     console.log(localStorage)
	// 	    // if (oldItems.some(checkExists)) {
    //         //     console.log(oldItems[item])
	// 	    // }
    // }

    //localStorage
    // const renderFavorites = () => {
    //     let oldItems = JSON.parse(localStorage.getItem("commandsArray")) || [];
    //     setFavorites(oldItems)
    //     console.log(favorites)
    // }
    return (
        <div style={{marginTop:"80px"}}>
            <Table striped bordered hover variant="dark" size="sm">
				<thead>
					<tr style={{ color: "#008F11" }}>
						<th>command</th>
						<th>description</th>
						<th>click edit comments</th>
						<th>delete</th>
					</tr>
				</thead>
					<tbody>
                        {favorites.length > 0 ? favorites.map((item, index)=>{
                            return ( 
                            <tr key={index}>
                                <td style={{maxWidth: "50px", wordWrap: "break-word"}}>{item.command}</td>
                                <td style={{maxWidth: "30px", wordWrap: "break-word"}}>{item.description}</td>
                                <td style={{maxWidth: "200px", wordWrap: "break-word", cursor:"pointer"}}><Comment userId={props.id} id={item.id} cmd={item.command} desc={item.description} text={{title:item.comment}}/></td>
                                {/* <td>{item.comment}</td> */}
                                <td><button id={item.command} style={{color:"black"}} onClick={deleteFavorite}>remove</button></td>
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
                            </tr>)
                        }) : <div style={{textAlign:"center"}}>You must login to view favorites. If you're already logged in, add some favorites.</div>}
                    </tbody>
			</Table>
        </div>
    )
}

export default FavoriteTable
