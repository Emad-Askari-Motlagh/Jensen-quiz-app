import React, { useState } from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineQuiz } from "react-icons/md";

interface User {
  userId: string;
  // Add other user properties as needed
}

const Header: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <header className="header">
      <div className="logo">
        <MdOutlineQuiz size={44} />
      </div>

      <div className="nav--row">
        <nav>
          <ul>
            <li>{user?.userId}</li>
            <li className="nav--hidden--mobile">
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/auth/register" className="login-nav-link">
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
