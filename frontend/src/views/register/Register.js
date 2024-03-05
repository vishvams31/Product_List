import "./register.css";
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleClick } from '../../services/Service'
import toast from "react-hot-toast";

export default function Register() {
    const email = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const mobilenumber = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        await handleClick(e, passwordAgain, password, firstname, lastname, email, mobilenumber, navigate);
    };
    const validatePassword = () => {
        const password = passwordAgain.current.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

        if (!regex.test(password)) {
            toast.error('Password must be 8 to 32 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            // Optionally, clear the input or set it to an invalid state
            passwordAgain.current.value = '';
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <div className="loginboxTitle">Register User</div>
                    <input placeholder="firstname" required ref={firstname} className="loginInput" />
                    <input placeholder="lastname" required ref={lastname} className="loginInput" />
                    <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                    <input placeholder="Mobile no." required ref={mobilenumber} className="loginInput" type="string " minLength="10" />
                    <input placeholder="Password" required ref={password} className="loginInput" type="password"
                        onBlur={validatePassword} />
                    <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton" onClick={() => {
                        navigate("/login")
                    }}>
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    );
}