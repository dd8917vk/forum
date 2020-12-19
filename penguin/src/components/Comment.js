import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

const CardInput = styled.input`
  width: 90%;
  color:black;
`;

const CardTitle = styled.p`
`;

// const boardObject = { title: "Your Card", items: ["item1", "item2"] };

export default function Comment(props) {

    console.log(props.userId)
    let token = localStorage.getItem('user');
    const text = props.text
    const [textContent, setTextContent] = useState(text);
    const [showTitle, setShowTitle] = useState(true);
    const inputEl = useRef(null);
  
    const handleAddItem = (e) => {
      const item = "initial";
      setTextContent((prevState) => {
        return { ...prevState, items: prevState.items.concat(item) };
      });
    };
  
    const handleTitleValue = (event) => {
      const value = event.target.value;
      setTextContent((prevState) => {
        return {
          ...prevState,
          title: value,
        };
      });
    };
    const handleShowTitle = () => {
      setShowTitle(!showTitle);
      setTextContent(textContent)
      console.log(textContent)
      updateFavorite(textContent.title)
    };
  
    const handleSelectText = (event) => inputEl.current.select();


	const updateFavorite = async (newText) => {
		let command = props.cmd;
        let description = props.desc;
        let id = props.id;
		console.log(id,command,description);
		const rawResponse = await fetch(`http://localhost:8000/api/favorites_update/${id}/`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
		},
		body: JSON.stringify({command: command, description: description, comment: newText, author: props.userId})
		});
		const content = await rawResponse.json();
		console.log(rawResponse);
		// rawResponse.status === 200 ? notify() : alert('Unable to add favorite.'); 
	}

    return (
      <div>
          {showTitle ? (
            <CardTitle onClick={handleShowTitle}>{textContent?.title}</CardTitle>
          ) : (
            <CardInput
            //   autoFocus={true}
              ref={inputEl}
              onChange={handleTitleValue}
              onBlur={handleShowTitle}
              onFocus={handleSelectText}
              value={textContent?.title}
            ></CardInput>
          )}
      </div>
    );
  }