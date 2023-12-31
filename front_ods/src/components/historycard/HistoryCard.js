import React from "react";
import { Card } from 'react-bootstrap';
import './HistoryCard.css';

function HistoryCard(props) {
  const limitedText = limitStringCharacters(props.text);
  const file = limitStringCharacters(props.archivo);

  const handleCardClick = () => {
    console.log(file);
    props.onClick();
  }
  
  return (
    <Card className="mt-3 custom-card" onClick={handleCardClick}>
        <Card.Body>
            <Card.Title className="m-0">{limitedText}</Card.Title>
        </Card.Body>
    </Card>
  );
}

function limitStringCharacters(inputString) {
  const limit = 15;
  if (inputString.length <= limit) {
    return inputString;
  } else {
    return inputString.slice(0, limit) + "...";
  }
}

export default HistoryCard;