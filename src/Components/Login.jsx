import React, { useState, useEffect } from 'react';
import './Login.css';
import travelImg from '../assets/login_img3.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate()
    const [users, setUsers] = useState(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        return storedUsers || [];
    });

    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

  
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 6;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const { fullName, email, password, confirmPassword } = formData;

     
        if (!isValidEmail(email)) return alert("Invalid email format");
        if (!isValidPassword(password)) return alert("Password must be at least 6 characters");

        if (isRegister) {
      
            if (!fullName) return alert("Full Name is required");
            if (password !== confirmPassword) return alert("Passwords do not match");
            if (users.find(user => user.email === email)) return alert("User already exists");

       
            const newUser = {
                id: users.length + 1,
                fullName,
                email,
                password,
                reportedConditions: []
            };

            setUsers(prev => [...prev, newUser]);
            setIsRegister(false)
            alert("Registration Successful!");
            
        } else {
           
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) return alert("Invalid email or password");
            setCurrentUser(user);
            localStorage.setItem("current_user", JSON.stringify(user));
            localStorage.setItem('islogin', true)
            alert(`Welcome back, ${user.fullName}!`);
            nav('/home')
        }

        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };
    const navigate = useNavigate();

    return (
        <div className="container1">
            <div className="left-side">
                <img src={travelImg} alt="Travel" />
                <div className="overlay">
                    {/* <h1 style={{ fontSize: "40px" }}></h1> */}
                    {/* <p>Your ultimate travel companion to explore the world!</p> */}
                </div>
            </div>

            <div className="right-side">
                <div className="form-container">
                    {!currentUser ? (
                        <>
                            <h2>{isRegister ? "Register" : "Login"}</h2>
                            <form onSubmit={handleSubmit}>
                                {isRegister && (
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                )}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {isRegister && (
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                )}
                                <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
                            </form>
                            <p>
                                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                                <span
                                    onClick={() => setIsRegister(!isRegister)}
                                    style={{ cursor: "pointer", color: "#3a5d3a" }}
                                >
                                    {isRegister ? "Login" : "Register"}
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2>Welcome, {currentUser.fullName}</h2>
                            <p>You are logged in!</p>
                            
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
