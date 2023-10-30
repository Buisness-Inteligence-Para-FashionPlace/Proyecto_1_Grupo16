import { React, useEffect, useState } from "react";
import styled from 'styled-components';
import "./header.css";
import { Card, Row } from "react-bootstrap";
import { postPredict, getPredicts } from "../../backend/backend";




function Header(props) {
    const [inputValue, setInputValue] = useState('');
    const [uploadfile, uploadsetFile] = useState(props.file);
    const [upload, setUpload] = useState(false);

    const [update, setUpdate] = useState(false);
    const [fileName, setFileName] = useState("");
    const [resultList, setResultList] = useState([]);
    const [textoPredecir, setTextoPredecir] = useState([]);

    useEffect(() => {
        setFileName(props.actualFile);
        gettearResultados();
    }, [props.actualFile]);

    useEffect(() => {
        console.log(resultList)
    }, [update]);
  
    const gettearResultados = () => {
        getPredicts(fileName).then((response) => response.json()).then((data) => {
            setResultList(data);
            setUpdate(!update);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue !== '') {
            textoPredecir.push(inputValue);
        }
        postPredict(fileName, textoPredecir)
            .then((responsePost) => responsePost.json())
            .then((dataPost) => {
                setFileName(dataPost.archivo);
                gettearResultados()
            })
            .catch((err) => { console.log(err) });
        setInputValue('');
        setTextoPredecir([]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setUpload(!upload);
    };

    const fileReader = ( e ) => {
        
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsText(file);
        setUpload(false);

        reader.onload = () => {
            for (let i = 1; i < reader.result.split('\n').length; i++) {
                let line = reader.result.split('\n')[i].trim();
                if (line !== '') {
                    // En caso de que se mande un csv donde inicia con " la cadena elimina todo hasta el final de la cadena que se limita por el " de cierre
                    line = line.replace(/"([^"]*)$/, '');
                    line = line.replace(/^"/, '').replace(/"$/, '');
                    textoPredecir.push(line);
                }
            }
        }

        reader.onerror = () => {
            console.log(reader.error)
        }
        
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
            <div className='form-control'>
                <form className="form">
                    <input
                        className="input input-alt"
                        placeholder="Type something intelligent"
                        required=""
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
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
            </div>

            {upload ? (
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
                            multiple={false}
                            accept=".txt, .csv"
                            onChange={fileReader} />
                    </label>
                </Row>
            ) : null
            }
            <div className="scrolp">  
                { resultList.map((history) => {
                    if (history.sdg !== "sdg") {
                        return <>
                            <Row>
                                <Card className="card-result">
                                    <Card.Body>
                                        <Card.Title>Me</Card.Title>
                                        <Card.Text>
                                            {history.texto}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card className="card-result">
                                    <Card.Body>
                                        <Card.Title>Predictor ODS </Card.Title>
                                        <Card.Text>
                                            Según el texto ingresado, se considera que la clasificación ODS adecuada es: {history.sdg}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </>
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>

    );
}
export default Header;
