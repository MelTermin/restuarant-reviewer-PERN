import React ,{useEffect,useContext}from 'react'
import "../styles/RestuarantList.css"
import axios from "axios"
import {RestaurantsContext} from "../Context/RestuarantContext"
import { useHistory } from "react-router-dom";
import StarRating from './StarRating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function RestuarantList(props) {
  let history = useHistory();

  const {restaurants, setRestaurants}=useContext(RestaurantsContext)
  useEffect(()=> {
    getRestaurants();
  },[])

  const getRestaurants= async () => {
    const response= await axios.get("http://localhost:3004/api/v1/restaurants")
    console.log(response.data.data)
    setRestaurants(response.data.data.restuarants)
  }

  const handleDelete= async(e,id) => {
    e.stopPropagation();
    try{
      const response= await axios.delete(`http://localhost:3004/api/v1/restaurants/${id}`)
      
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
       
        )
        toast.success("Deleted succesfully")
    }catch(err){
      console.log(err)
    }

  }

  const handleEdit = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const renderRating = (item) => {
    if (!item.count) {
      return <span >0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={item.id} />
        <span >({item.count})</span>
      </>
    );
  };

 
  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };
  

  return (
    <div style= {{marginTop:"100px"}}>
    <table className="styled-table">
      <thead>
        <tr >
          <th style= {{textAlign:"center"}}>Restuarant</th>
          <th style= {{textAlign:"center"}}>Location</th>
          <th style= {{textAlign:"center"}}>Price Range</th>
          <th style= {{textAlign:"center"}}>Ratings</th>
          <th style= {{textAlign:"center"}}>Edit</th>
          <th style= {{textAlign:"center"}}>Delete</th>
        </tr>
      </thead>
      <tbody >
        {restaurants && restaurants.map((item=>{
          return(
            <tr key={item.id} onClick={()=>handleRestaurantSelect(item.id)}>
            <td>{item.name}</td>
            <td>{item.location}</td>
            <td>{"$".repeat(item.price_range)}</td>
            <td>{renderRating(item)}</td>
            <td><button onClick={(e) =>handleEdit(e,item.id)}  className="btn btn-view">Edit</button></td>
            <td><button  onClick={(e) =>handleDelete(e,item.id)}className="btn btn-delete">Delete</button></td>
            </tr>
          )
        }))}

      </tbody>
    </table>
  
  </div>
  )
}

export default RestuarantList
