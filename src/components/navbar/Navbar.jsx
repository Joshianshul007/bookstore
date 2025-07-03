import React from 'react'
import { FaGripLines } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "About Us", link: "/about-us" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];

const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);
if (isLoggedIn=== false) {
    links.splice(2, 3);
}
const [MobileNav, setMobileNav] = useState("hidden");
    return (
        <nav className="z-50 bg-zinc-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
                <img className="h-10 w-10" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                <h1 className="text-2xl font-bold tracking-wide">BooksTomb</h1>
            </div>
            <div className="flex items-center gap-4">
                {links.map((item, i) => (
                    <Link
                        to={item.link}
                        className="hover:text-blue-400 px-2 py-1 rounded transition-colors duration-200 font-medium"
                        key={i}
                    >
                        {item.title}
                    </Link>
                ))}
               {
                isLoggedIn===false &&( 
                <>
                <Link
                    to="/signup"
                    className= "ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-white hover:text-zinc-800 border border-blue-500 transition-colors duration-200 font-semibold"
                >
                    Sign Up
                </Link>

                <Link
                    to="/login"
                    className="bg-white text-blue-600 px-3 py-1 rounded border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 font-semibold"
                >
                    Log In
                </Link>
                </>
                )
               }
                <button className="text-2xl ml-2 hover:text-blue-400 transition-colors duration-200">
                     
                    <FaGripLines />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
