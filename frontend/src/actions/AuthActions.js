import axios from 'axios'
import toast from 'react-hot-toast';
const BASE_URL = "http://localhost:8080/api/";
export const loginStart = () => ({
    type: 'LOGIN_START',
});

export const loginSuccess = (authUser) => (dispatch) => {
    // console.log(token)
    console.log(authUser)
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: authUser
    });
    // Store user in localStorage
    // console.log(user)
    // console.log(authUser.token)
    localStorage.setItem('user', JSON.stringify(authUser.user));
    localStorage.setItem('token', authUser.token);
};

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});
export const loginCall = (userCredentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        //got token from the login api 
        //got user object by giving the token to the userTokenObject api
        const res = await axios.post(BASE_URL + "auth/login", userCredentials);
        console.log(res.data)
        const userDetailsRes = await axios.get(BASE_URL + `users/userObject`, {
            headers: {
                'Authorization': `Bearer ${res.data.data.token}`
            }
        });
        console.log(userDetailsRes);
        // const userDetails = userDetailsRes.data;
        console.log(userDetailsRes)
        const authUser = {
            token: res.data.data.token,
            user: userDetailsRes.data.data.user
        }
        // console.log(authUser)    
        dispatch(loginSuccess(authUser));
        toast.success("Login successfully");

        // window.location.reload();
    } catch (err) {
        dispatch(loginFailure(err.message));
    }
};
