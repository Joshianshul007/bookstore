const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//add back to favourites
router.put("/add-book-to-favourites",authenticateToken,async(req,res)=>{
   try {
    const {bookid,id}=req.headers;
    const userData=await User.findById(id);
    const isBookFavourite=userData.favourites.includes(bookid);
    if(isBookFavourite){
        return res.status(200).json({message:"book is already in favourites"});
    }
    await User.findByIdAndUpdate(id,{
        $push:{
            favourites:bookid
        }
    });
    return res.status(200).json({message:"book added to favourites"});
   } catch (error) {
     res.status(500).json({message: "internal server error"});
   }
}); 

module.exports=router 