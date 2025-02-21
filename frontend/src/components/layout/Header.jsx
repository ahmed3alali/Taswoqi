import React, { useRef } from 'react';
import { useGetMeQuery } from '../../Redux/api/userApi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../Redux/api/authApi';
import logo from "../../images/logo.png";
import avatar from "../../images/default_avatar.jpg";
import Search from './Search';

const Header = () => {
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [triggerLogout] = useLazyLogoutQuery();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await triggerLogout();
      navigate(0);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("show");
    }
  };

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.remove("show");
    }
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="ShopIT Logo" className='w-[120px]' />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: 'none' }}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">{cartItems.length}</span>
        </a>

        {user ? (
          <div className="ms-4 dropdown position-relative">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              onClick={toggleDropdown} // Manually toggle
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user?.avatar ? user?.avatar?.url : avatar}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div className="dropdown-menu w-100" ref={dropdownRef}>
              {user?.role === 'Admin' && (
                <Link className="dropdown-item" to="/admin/dashboard"onClick={closeDropdown}> Dashboard </Link>
              )}
              <Link className="dropdown-item" to="/me/orders"onClick={closeDropdown}> Orders </Link>
              <Link className="dropdown-item" to="/me/profile"onClick={closeDropdown}> Profile </Link>
              <Link className="dropdown-item text-danger" onClick={handleLogout}> Logout </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn"> Login </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
