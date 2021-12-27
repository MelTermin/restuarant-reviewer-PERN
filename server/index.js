const express=require("express");
const app=express();
const cors=require("cors");
const env=require('dotenv')
const db= require("./db")
env.config();

app.use(cors());
app.use(express.json());

//routes//

//get all restuarants//
app.get("/api/v1/restaurants", async (req, res) => {
    try{
     const results= await db.query("select * from restuarants left join (select restuarant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restuarant_id) reviews on  restuarants.id = reviews.restuarant_id")
    // console.log(results)
    res.status(200).json({
      status:"success",
      results:results.rows.length,
      data:{
        restuarants:results.rows,
      }
    })
    }catch(err) {
      console.log(err)
    }
});

//get a restuarants

app.get("/api/v1/restaurants/:id", async (req, res) => {
  const{id}=req.params
  try{
   const results= await db.query("select * from restuarants left join (select restuarant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restuarant_id) reviews on  restuarants.id = reviews.restuarant_id where id = $1",[id])
  // console.log(results)
  const reviews= await db.query("select * from reviews where restuarant_id=$1",[id])
  
  
  res.status(200).json({
    status:"success",
    data:{
      restuarants:results.rows[0],
      reviews:reviews.rows

    }
  })
  }catch(err) {
    console.log(err)
  }
});

//create a restuarant//

app.post("/api/v1/restaurants", async (req, res) => {
  const{name,location,price_range}=req.body
  // console.log(req.body)
  try{
   const results= await db.query("insert into restuarants (name,location,price_range) values ($1,$2,$3) returning *" ,[name,location,price_range])
  //  console.log(results)
  res.status(200).json({
    status:"success",
    data:{
      restuarants:results.rows[0],
    }
  })
  }catch(err) {
    console.log(err)
  }
});

//update a restuarant//
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const{id}=req.params
  const{name,location,price_range}=req.body
  
  try{
   const results= await db.query("update restuarants set name= $1, location=$2, price_range= $3 where id=$4  returning *",[name,location,price_range,id])
  //  console.log(results)
  res.status(200).json({
    status:"success",
    data:{
      restuarants:results.rows[0],
    }
  })
  }catch(err) {
    console.log(err)
  }
});


//delete a restuarant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  const{id}=req.params
  try{
   const results= await db.query("delete from restuarants  where id=$1 ",[id])
  //  console.log(results)
  res.status(200).json("record deleted")
  }catch(err) {
    console.log(err)
  }
});

// add a review//

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {

  try{
    const{id}=req.params
    const{name,review,rating}=req.body
    const newReview = await db.query(
      "INSERT INTO reviews (restuarant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [id, name, review, rating]
    );
    console.log(newReview)
    res.status(200).json({
      status: "succes",
      data: {
        review: newReview.rows[0],
      },
    });

  }catch(err){
    console.log(err)
  }

})

app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})