import React,{useState, useEffect }  from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/Update.css"


function UpdateRestuarants(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  
  const { id } = useParams();
  let history = useHistory();

  useEffect(()=> {
    getRestuarant();

  },[])

  const getRestuarant= async () => {
    const response= await axios.get(`http://localhost:3004/api/v1/restaurants/${id}`)
    // console.log(response.data.data)
    setName(response.data.data.restuarants.name);
    setLocation(response.data.data.restuarants.location);
    setPriceRange(response.data.data.restuarants.price_range);
  }

 
  const handleSubmit= async (e) =>{
    e.preventDefault();
    const response= await axios.put(`http://localhost:3004/api/v1/restaurants/${id}`,{
      name,
      location,
      price_range: priceRange,
    })
    history.push("/");

  }
  
  return (
    <div className="wrapper">
    <div className="update-container">
      <h1>Update Restuarant</h1>
    <form onSubmit={handleSubmit}>
        <label>Restuarant Name:</label>
        <input type="text"  value={name}
        onChange={(e) => setName(e.target.value)} />
        
        <label>Location:</label>
        <input type="text"  value={location}
        onChange={(e) => setLocation(e.target.value)} />
        
        <label>Price Range:</label>
        <input type="number"  value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)} />
        
        <button className="btn-edit">Edit</button>
    </form>
    </div>
    </div>
  )
}

export default UpdateRestuarants
