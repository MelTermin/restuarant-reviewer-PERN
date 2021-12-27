import React,{useState,useContext} from 'react'
import axios from 'axios';
import {RestaurantsContext} from "../Context/RestuarantContext"
import "../styles/AddRestuarant.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function AddRestuarant() {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  
  const handleSubmit= async(e) => {
    e.preventDefault();
    try{
      const response= await axios.post("http://localhost:3004/api/v1/restaurants",{
        name,
        location,
        price_range: priceRange,
      })
      toast.success("Added succesfully")
      addRestaurants(response.data.data.restuarants);
      
      setName("");
      setLocation("")
      setPriceRange("")
    }catch(err) {
      console.log(err)
    }

  }
  
  
  return (
    <div className="add-restuarant-container">
      <form onSubmit={handleSubmit}>
        <label>Restuarant Name:</label>
        <input type="text" placeholder="Please type a restaurant" value={name}
        onChange={(e) => setName(e.target.value)} />
         <label>Location:</label>
        <input type="text" placeholder=" Please type location" value={location}
        onChange={(e) => setLocation(e.target.value)} />
        <select  value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
        </select>
        <br/>
        <button className="btn-add">ADD</button>
      </form>
    </div>
  )
}

export default AddRestuarant
