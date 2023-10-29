import HistoryCard from '../historycard/HistoryCard';
import './SideBar.css';
import { Button } from 'react-bootstrap';

function SideBar() {
  return (
    <div className="text-center sidebar">
      <Button className='custom-button' size="lg" onClick={() => console.log("Crear Nueva")}>
        Crear Nueva
      </Button>
      <div className="card-container mt-3">
        <HistoryCard text="fdsfsafsafsafsaff"/>
      </div>
    </div>
  );
}

export default SideBar;