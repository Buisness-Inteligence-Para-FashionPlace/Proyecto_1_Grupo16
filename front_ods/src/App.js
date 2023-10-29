import './App.css';
import Header from './components/encabezado/header';
import Registro from './components/Registro/registro';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col lg="4">
          <div className="ods">
            <Header />
          </div>
        </Col>
        <Col lg = '8'>
          <div className="ods">
          <Row>
              <Header />
          </Row>
          <Row>
              <Registro />
          </Row>
          </div>
        </Col>
      </Row>
  </Container>
    
    
  );
}

export default App;
