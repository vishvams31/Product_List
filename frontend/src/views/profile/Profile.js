import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../services/Service';
import Topbar from '../../components/topbar/Topbar';

import { useNavigate } from 'react-router-dom';
import './profile.css'
const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserDetails(username);
            setUser(data);
        };

        fetchData();
    }, [username]);
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            // Clear user session
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            // Redirect to login page
            navigate('/login');
            window.location.reload()
        }
    };
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Topbar />
            <div className="profile-page">
                <div className='profile-content'>
                    <h2>Profile</h2>
                    <p>First Name: {user.firstname}</p>
                    <p>Mobile Number: {user.mobilenumber}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Email: {user.email}</p>
                    <div className="profile-buttons">
                        <button className="profile-button update-user">Update User</button>
                        <button className="profile-button change-password">Change Password</button>
                        <button className="profile-button logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
