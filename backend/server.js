// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { use } = require("react");

// const app = express();


// app.use(cors());

// app.get("url",async(req,res)=>{
  
//   //to get the value from url
//   const keyword = req.query.q;

// try{
//  const respons = await fetch( `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);

//  const data =  await respons.json();

//  res.json(data);

// }
// catch(error){
//  console.log("ERROR OCCURE DURING FETCH");
// }
 
// })

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });