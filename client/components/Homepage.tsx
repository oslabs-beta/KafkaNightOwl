import React, {useState} from 'react'
import Signup from "./Signup";
import Login from './Login';

const Homepage = ({setLoggedIn}) => {

    // const navigate = useNavigate();
    // const navigateToLogin = () => {
    //     navigate('/login');
    // }
    // const navigateToSignup = () => {
    //     navigate('/signup');
    // }
    const [signupButtonClicked, setSignupButtonClicked] = useState(false);

    const openSignUp = (e) => {
        e.preventDefault()
        setSignupButtonClicked(prevState => !prevState)
        console.log('signup form opened');
    }
    return (
        <>
            {signupButtonClicked ? <Signup setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} openSignUp={openSignUp} />}
        </>
    );
};

export default Homepage;