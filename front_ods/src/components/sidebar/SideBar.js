import './SideBar.css';
import HistoryCard from '../historycard/HistoryCard';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { getHistory } from "../../backend/backend";


function SideBar() {

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

  return (
    <div className="text-center sidebar">
      <Button className='custom-button' size="lg" onClick={() => console.log("Crear Nueva")}>
        Crear Nueva
      </Button>
      <div className="card-container mt-3">
        { historyList.map((history) => <HistoryCard text={history.texto}/>) }
        { (empty !== "") && <p style={{ color: 'white' }}>{empty}</p>}
      </div>
    </div>
  );
}

export default SideBar;