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

  const openSignUp = () => {
    setSignupButtonClicked(prevState => !prevState)
  }

  return (
    <>
      <div className="flex w-screen h-5/6 bg-slate-800">
        <div className="w-1/2 h-full flex flex-col p-8 gap-20 text-center items-center text-zinc-100">
          <h1 className="text-6xl font-bold mt-36">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, modi?</h1>
          <h4 className="text-2xl w-2/3">Lorem ipsum dolor, sit amet atque assumenda, rem doloremque error maiores quod debitis distinctio facilis eligendi quia voluptates beatae perferendis deleniti!</h4>
        </div>
        {signupButtonClicked ? <Signup setLoggedIn={setLoggedIn} openSignUp={openSignUp} /> : <Login setLoggedIn={setLoggedIn} openSignUp={openSignUp} />}
      </div>
      <div className="w-screen h-5/6 bg-lime-300">
          <h1 className="text-3xl">Check out our repository on github</h1>
      </div>
      <div className="w-screen h-5/6 bg-blue-300">
        <h1 className="text-3xl">About our product</h1>
      </div>
      <div className="w-screen h-5/6 bg-orange-300">
        <h1 className="text-3xl">Demo of our product</h1>
      </div>
      <div className="w-screen h-screen bg-purple-300">
        <h1 className="text-3xl">Our Team</h1>
      </div>
    </>
  );
};

export default Homepage;