import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="main-navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">
                    Cipher<span>SQL</span>Studio
                </Link>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-profile">
                            <span className="welcome-text">Hi, {user.username}</span>
                            <button onClick={handleLogout} className="btn btn--outline">Logout</button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn--text">Login</Link>
                            <Link to="/signup" className="btn btn--primary">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
