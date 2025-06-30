import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Button.css";
import "./Button1.css"
import "./Title.css"

const BookCard = ({ data }) => {
   
  
  return (
    <Link to={`/view-book-details/${data._id}`} className="no-underline">
      <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img src={data.url} alt="/" className="h-[25vh]" />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold two-line-ellipsis">
  {data.title}
</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">
          {"₹"+data.price}
        </p>
<div className="flex gap-3 mt-3">
  <button className="px-3 py-1 text-sm rounded">
    <span className="text bg-black">Buy Now</span>
  </button>
  <button className="button px-3 py-1 text-sm rounded">
    <span className="container flex justify-center items-center">
      Add to Cart
    </span>
  </button>
</div>
</div>
    </Link>
  );
};

export default BookCard;