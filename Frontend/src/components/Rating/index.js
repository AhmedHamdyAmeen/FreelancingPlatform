import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Rating({ rating, color, action }) {
  const ratingStars = [];
  const [rate, setRate] = useState(rating);
    
    const handleRating = (value) => {
        setRate(value)
        action(value);
    }
    
    for (let index = 0; index < 5 ; index++) {
        ratingStars.push(
          <section className="d-inline" onClick={() => handleRating(index + 1)} key={index}>
            <FontAwesomeIcon icon={faStar} color={(index+1) <= rate? "var(--goldenYellow)":"var(--grey)"} />
          </section>
        );
    }

    return (<section>{ ratingStars }</section>);
}