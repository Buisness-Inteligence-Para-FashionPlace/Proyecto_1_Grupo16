import './SideBar.css';
import HistoryCard from '../historycard/HistoryCard';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { getHistory } from "../../backend/backend";


function SideBar(props) {

  const [historyList, setHistoryList] = useState([]);
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    
    getHistory().then((response) => response.json())
    .then((data) => {
      
      setHistoryList(data);
      if (data.length === 0) {
        setEmpty("No hay historial");
      } else {
        setEmpty("");
      }
      setEmpty(false);
    }).catch((err) => { setEmpty("No hay conexión con el back") });
    
  }, [])

  const handleButtonClick = () => {
    console.log('');
    props.onFileUpdate('')
  }

  return (
    <div className="text-center sidebar">
      <Button className='custom-button' size="lg" onClick={handleButtonClick}>
        Crear Nueva
      </Button>
      <div className="card-container mt-3">
        { historyList.map((history) => <HistoryCard key={history.archivo} text={history.texto} archivo={history.archivo} onClick={() => props.onFileUpdate(history.archivo)} />) }
        { (empty !== "") && <p style={{ color: 'white' }}>{empty}</p>}
      </div>
    </div>
  );
}

export default SideBar;