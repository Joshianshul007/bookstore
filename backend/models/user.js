const mongoose=require("mongoose");
const user =mongoose.Schema({
username:
    {
    type: String,
    required: true,
    unique: true,
    }    
,
email:
    {
    type: String,
    required : true,
    unique: true,
    },   

address:
    {
    type: String,
    required: true,
},

password:
    {
    type: String,
    required: true,
},

avatar:
    {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/3177440.png",
}
,
role:{
    type: String,
    default: "user",
    enum:["user","admin"],
},

favourites:[ {
    type:mongoose.Types.ObjectId,
    ref: "books",
}],
 
cart:[
    {
        type:mongoose.Types.ObjectId,
        ref: "books",
    }],
orders:
    [{
        type: mongoose.Types.ObjectId,
        ref:"order",
    }],
},
{ timestamps: true}
);
module.exports=mongoose.model("user",user);