import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Header.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  return (
    <>
      <header>
        <Container>
          <section className="navbar">
            <Link to="/">EGadgets</Link>
            <div className="search-container">
              <input type="text" placeholder="search" />
              <SearchIcon />
              {/* <img src="assets/search.png" alt="search" /> */}
            </div>
            <nav className="nav-menu">
              <ul>
                <li>
                  <Link to="/">Account</Link>
                  {/* <ul>
                  <li>
                  <a>Link 1</a>
                  </li>
                  <li>
                  <a>Link 2</a>
                  </li>
                </ul> */}
                </li>
                <li>
                  <Link to="/">Orders</Link>
                </li>
                <li>
                  <Link to="/cart">
                    <section className="cart-container">
                      <ShoppingCartIcon />
                      {/* <img src="assets/cart.png" alt="cart-icon" /> */}
                      <span>3</span>
                    </section>
                  </Link>
                </li>
              </ul>
            </nav>
            <div
              className="burgur-menu"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </section>

          {/* Mobile Menus */}
        </Container>
      </header>

      {showMobileMenu && (
        <nav className="mob-navbar">
          <ul>
            <li>
              <a
                href="javascript:void(0);"
                onClick={() => setShowActionMenu(!showActionMenu)}
              >
                Account <KeyboardArrowDownIcon />
              </a>
              {showActionMenu && (
                <ul class="mob-sub-menu">
                  <li>
                    <Link to="/">Profile</Link>
                  </li>
                  <li>
                    <Link to="/">My Addresses</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/">Orders</Link>
            </li>
            <li>
              <Link to="/cart">Cart (3)</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;
