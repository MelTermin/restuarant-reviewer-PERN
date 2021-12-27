import React,{useState} from 'react'
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios"
import "../styles/AddReview.css"
import { toast } from "react-toastify";
toast.configure();

function AddReview() {
  const { id } = useParams();
  // console.log(id);
  
  const location = useLocation();
  // console.log(location);
  
  const history = useHistory();
  

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");
  
  const handleSubmit= async(e) => {
    e.preventDefault();
    try{
      const response= await axios.post(`http://localhost:3004/api/v1/restaurants/${id}/addReview`,{
        name,
        review:reviewText,
        rating,
      })
      
        
      setName("")
      setReviewText("")
      setRating("")
      history.push("/");
      history.push(location.pathname);
      

    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit} >
        <h2 style={{paddingLeft:"200px"}}>ADD A REVIEW</h2>
      
        <label>Name:</label>
        <input type="text" placeholder="Please type a name" value={name}
              onChange={(e) => setName(e.target.value)}/>
      
        <label>Rating:</label>
          <select  value={rating}
              onChange={(e) => setRating(e.target.value)}>
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
      

            <label>Review:</label>
            <textarea placeholder="Please share your thoughts with us" value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}></textarea>
            <button className="btn-add-review">Submit</button>
      </form>
      
    </div>
  )
}

export default AddReview
