import React, { useContext, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {RestaurantsContext} from "../Context/RestuarantContext"
import axios from "axios"
import AddReview from './AddReview';
import StarRating from './StarRating';
import Reviews from './Reviews';
import "../styles/Detail.css"

function RestuarantDetail() {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/v1/restaurants/${id}`);
        console.log(response);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  },[])
  return (
    <div className="detail-wrapper">
      {selectedRestaurant && 
      <>
      <h1 className="restuarant-name">{selectedRestaurant.restuarants.name}</h1>
      <div className="text-center">
          <StarRating rating={selectedRestaurant.restuarants.average_rating} />
                <span className="review-number">
                  {selectedRestaurant.restuarants.count
                    ? `(${selectedRestaurant.restuarants.count})`
                    : "(0)"}
                </span>
        </div>
      <AddReview/>
      <Reviews reviews={selectedRestaurant.reviews}/>
      </>
      }
    </div>
  )
}

export default RestuarantDetail
