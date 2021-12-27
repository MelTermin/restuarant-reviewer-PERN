import React from 'react'
import AddRestuarant from './AddRestuarant';
import RestuarantList from './RestuarantList';
import "../styles/Home.css";

function Home() {

  return (
    <div className="home-container">
      <h1 style={{textAlign:"center",marginBottom:"50px"}}>Restuarant Reviewer</h1>
      <AddRestuarant/>
      <br/>
      <RestuarantList/>
    </div>
  )
}

export default Home
