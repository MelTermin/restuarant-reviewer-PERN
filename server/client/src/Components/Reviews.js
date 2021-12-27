import React from 'react'
import StarRating from './StarRating'
import "../styles/Review.css"

function Reviews({reviews}) {
  return (
    <div className="container" >
    
      {reviews.map((item)=> {
        return(
        <div key={item.id} className="review-container" >
          <div className="review-first-container" >
            <p>{item.name}</p>
            <p><StarRating rating={item.rating}/></p>
          </div>
          <p>{item.review}</p>
        </div> 
        )
 

      })}


    
    </div>
  )
}

export default Reviews
