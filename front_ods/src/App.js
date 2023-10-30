import './App.css';
import Header from './components/encabezado/header';
import Registro from './components/Registro/registro';
import SideBar from './components/sidebar/SideBar';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function App() {

  const [file, setFile] = useState('');

  const handleFileUpdate = (newFileValue) => {
    setFile(newFileValue);
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="2" className='px-0'>
          <SideBar onFileUpdate={handleFileUpdate} />
        </Col>
        <Col lg ='10' className='right px-0'>
          <div className="ods">
          <Row>
              <Header actualFile={file} />
          </Row>
          </div>
        </Col>
      </Row>
  </Container>
    
    
  );
}

export default App;
