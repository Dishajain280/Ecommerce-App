import React from "react";
import { BiCart } from "react-icons/bi";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../shopContext/shopContext.jsx";

const Navbar = () => {
  const { quantity } = useContext(ShopContext);

  return (
    <div>
      <div className="navbar">
        <div className="link">
          <ul>
            <li>Home</li>
            <li>Clothes</li>
          </ul>
        </div>

        <div className="logo">
          <h2>KLARA FASHIONS</h2>
        </div>
        <Link to="/cart">
          <div className="nav_icon_wrapper">
            <BiCart className="nav_icon" />
            <p className="nav_qty">{quantity}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
