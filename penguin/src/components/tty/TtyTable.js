import React from 'react';
import { Table } from "react-bootstrap";


const TtyTable = (props) => {
    return (
        <div style={{marginLeft: 50}}>
            <Table striped bordered hover variant="dark" size="sm">
				<thead>
					<tr style={{ color: "#008F11" }}>
						<th>title</th>
						<th>author</th>
						<th>answers</th>
					</tr>
				</thead>
					<tbody>
                        {props.posts?.map((post, index)=> { return (
                        <tr>
                            <td style={{maxWidth: "50%", wordWrap: "break-word"}}>{post.title}</td>
                            <td style={{maxWidth: "25px", wordWrap: "break-word"}}>{post.author}</td>
                            <td style={{maxWidth: "25px", wordWrap: "break-word"}}>Replys</td>
                        </tr>
                        )})}
                    </tbody>
			</Table> 
        </div>
    )
}

export default TtyTable
