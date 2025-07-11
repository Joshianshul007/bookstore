const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");
const {verifyToken}=require("./userAuth");
const Book= require("../models/book");
router.post("/add-book",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const user=await User.findById(id);
        if(user!=null && user.role!=="admin"){
             res.status(400).json({message:"you are not having access to perform admin work "});
        }
        const book=new Book({
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
      console.error("Error adding book:", error);
        res.status(500).json("internal server error");
    }
});
//update book
router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
    const {bookid}=req.headers;
    await book.findByIdAndUpdate(bookid,{
        url: req.body.url,
        title:req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language
    })
    return res.status(200).json({message:"book updated successfully"})
    }
    catch(err){
        res.status(500).json({message:"an error occured"});
    }
}); 
//delete book
router.delete("/delete-book",authenticateToken,async (req,res)=>{
    try {
        const {bookid}=req.headers;
        await book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"book deleted successfully"});
    } catch (error) {
        return res.status(500).json({message:"an error occured"});
        
    }
});
//get all books
router.get("/get-all-books",authenticateToken, async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occured"
    });
  }
});
//get recently books
router.get("/get-recent-books",authenticateToken, async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
     message:"an error occured"
    });
  }
});
//get book by id
router.get("/get-book-by-id/:id",authenticateToken, async (req,res) => {
    try {
        const {id}=req.params;
        console.log(id);
        const book=await Book.findById(id);
        return res.json({
            status: 'success',
            data: book
        })
    } catch (error) {
        console.error("Error fetching book by id:", error);
        return res.status(500).json({message: "an error occured"})
    }
});
module.exports=router;