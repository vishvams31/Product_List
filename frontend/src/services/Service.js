import axios from 'axios'
import toast from 'react-hot-toast';
const BASE_URL = "http://localhost:8080/api/";


const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const handleClick = async (e, passwordAgain, password, firstname, lastname, email, navigate) => {
    // const navigate = useNavigate();
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Password don't match!")
    } else {
        try {
            const user = {
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
                password: password.current.value
            }
            await axios.post(BASE_URL + "auth/register", user);
            toast.success("Successfully registered");
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
}
export const fetchProducts = async (skip, limit) => {
    try {
        const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return []; // Return an empty array in case of error
    }
};
export const fetchProductDetails = async (id) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch product details:', error);
        return null;
    }
};
// services/Service.js

export const fetchUserDetails = async (username) => {
    try {
        const response = await fetch(BASE_URL + `users/${username}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        return null;
    }
};

