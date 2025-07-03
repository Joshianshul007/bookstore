const router=require("express").Router();
//sign up
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");


router.post("/sign-up",async(req,res)=>{
    try {
        const {username,email,password,address}=req.body;
        //check username length is more than 4
        if(username.length<4){
            return res.status(400).json({message: "username length should be greater than 3"});
        }
        //check username already exists/
const existingUserName=await User.findOne({username : username});
if(existingUserName){
    return res.status(400).json({message: "username already exists"});
}
const existingEmail=await User.findOne({email : email});
if(existingEmail){
    return res.status(400).json({message: "Email already exists"});
}
//check pas
// password's length
if(password.length<=5){
    return  res.status(404).json({message: "password length should be greater than 5"});
}
const hashPass=await bcrypt.hash(password,10);
const newUser=new User({
    username:username,
    email:email,
    password:hashPass,
    address:address
});
await newUser.save();
console.log("user created successfully");
 res.status(200).send("successfully inserted into the database")
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({message: "internal server error"});
    }
});
//sign-in
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        bcrypt.compare(password, existingUser.password, (err, data) => {
            if (err) {
                return res.status(500).json({ message: "internal server error" });
            }

            if (data) {
                const authClaims = [
                    { name: existingUser.email },
                    { role: existingUser.role }
                ];
                const token = jwt.sign({ authClaims }, "bookStore123", {
                    expiresIn: "1h",
                });
                
                return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
            } else {
                return res.status(400).json({ message: "invalid credentials" });
            }
        });

    } catch (error) {
        console.log('Error : '+error)
        res.status(500).json({ message: "internal server error" });
    }
});


//get user information
router.get("/get-user-information",authenticateToken,async(req,res)=>{

    try{
        
        const { id }=req.headers;
        const data=await User.findById(id).select('-password ');
        return  res.status(200).json(data);
    }
    catch(error){ 
        res.status(500).json({message: "internal server error"});
}
});
//update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
     const {id}=req.headers;
     const {address}=req.body;
     await User.findByIdAndUpdate(id, { address: address});
     return  res.status(200).json({message:"address updated successfully"});
    }
    catch(err){
res.status(500).json({message: "internal server error"});
    }
})

module.exports=router;