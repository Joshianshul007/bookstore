const mongoose=require("mongoose");
const order=new mongoose.Schema(
    {
    user:{
         type:mongoose.Types.ObjectId,
        ref: "user",
    },
    book:{
        type:mongoose.Types.ObjectId,
       ref: "user",
   },
   user:{
    type: String,
   ref: "Order Placed",
   enum:["Order Placed","Out For Delivery","Delivered","Cancelled"],
},
    },
    {timestamps: true}

);
module.exports=mongoose.model("user",order);