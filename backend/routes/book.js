const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");
const book= require("..\models\book");
//add book ---admin
router.post("\/add-book",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const user=await user.findByid(id);
        if(user.role!="admin"){
             res.status(400).json({message:"you are not having access to perform admin work "});
        }
        const book=new book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price : req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        await book.save();
        res.status(200).json({message:"book added successfully"});
    } catch (error) {
        res.status(500).json("internal server error");
    }
})
module.exports=router;