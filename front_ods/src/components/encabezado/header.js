import {React, useEffect, useState} from "react";
import styled from 'styled-components';
import "./header.css";
import { Card, Row } from "react-bootstrap";




function Header() {
    const [inputValue, setInputValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [file, setFile] = useState(null);
    const [upload, setUpload] = useState(false);
    const [ods, setOds] = useState('');
    const fetchApi = async () => {
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: inputValue})
        });
        const data = await response.json();
        setOds(data.ods);
    };
    useEffect(() => {
        if (submitted) {
            fetchApi();
        }
    }, []
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
    };
    const handleUpload = (e) => {
        e.preventDefault();
        setUpload(true);
    };
    const setFileHandler = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };
    const Titulo = styled.h2`
        font-family: 'Bitter', serif;
        font-size: 36px;
        font-weight: bolder;
        text-align: center;
        font-style: normal;
    `;
    return (
        <div className="banner">
            <Titulo>WELCOME TO ODS CLASSIFIER</Titulo>
<<<<<<< Updated upstream
            <div className="form-control">
                <input className="input input-alt" placeholder="Type something intelligent" required="" type="text"/>
                <span className="input-border input-border-alt"></span>
=======
            
            <div className= 'form-control'>
                <form  className="form">
                    <input 
                    className="input input-alt" 
                    placeholder="Type something intelligent" 
                    required=""
                    type="text"
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}/>
                    <span class="input-border input-border-alt"></span>
                    <button className="button-send" type="submit" onClick={handleSubmit}>
                        Send
                        <div class="arrow-wrapper">
                            <div class="arrow"></div>

                        </div>
                    </button>
                    <button className="button-upload" type="submit" onClick={handleUpload}>
                        <b>Add file</b>
                    </button>

                </form>
>>>>>>> Stashed changes
            </div>
            
            {upload && file == null ? (
            <Row>
            <label for="file" class="custum-file-upload">
            <div class="icon">
            <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
            </div>
            <div class="text">
               <span>Click to upload a file</span>
               </div>
               <input 
               id="file" 
               type="file"
               accept=".csv"
               onChange={setFileHandler} />
            </label>
            </Row>
            ) : null
            }
            {submitted &&
            <Row className="row-result">
            <Card className="card-result">
                <Card.Body>
                    <Card.Title>Texto</Card.Title>
                    <Card.Text>
                        {inputValue}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="card-result">
                <Card.Body>
                    <Card.Title>ODS</Card.Title>
                    <Card.Text>
                        {ods}
                    </Card.Text>
                </Card.Body>
            </Card>
            </Row>
            }
        </div>

    );
}
export default Header;
