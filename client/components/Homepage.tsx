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
            <h2>An application for tracking workouts and fitness goals.</h2>
            <h3>Created by: Colin Silvers, Joie Zhang, Jeremy Holland, and Tim Weidinger</h3>
            <button onClick={navigateToLogin}>Login</button>
            <button onClick={navigateToSignup}>Signup</button>
        </>
    );
};

export default Homepage;