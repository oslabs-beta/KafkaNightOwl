import { useNavigate } from "react-router";

const Homepage = () => {

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    }
    const navigateToSignup = () => {
        navigate('/signup');
    }

    return (
        <>
            <button onClick={navigateToLogin}>Login</button>
            <button onClick={navigateToSignup}>Signup</button>
        </>
    );
};

export default Homepage;