
import * as React from "react";
import { ReactElement, useState } from "react";
import axios from "axios";


type LoginTypes = {
  setLoggedIn: (newState: boolean) => void
  openSignUp: () => void
};

const Login: React.FC<LoginTypes> = ({ setLoggedIn, openSignUp }): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showErrorPopup, setErrorPopup] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    axios.post('/user/login', userData)
    .then((res) => {
    setLoggedIn(true);
    })
    .catch((error)=>{
      setErrorPopup(true);
      setErrorMessage('Invalid email or password');
    })
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-1/2 overflow-hidden">
      <div className="p-6 border-t-4 h-2/3 border-gray-600 bg-white rounded-md shadow-md border-top w-[32rem] lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Hoo are you?</h1>
        <h1 className="text-xl font-semibold text-center text-gray-700">Sign In</h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input type="text" placeholder="Email Address" className="w-full input input-bordered" onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} value={password}
              className="w-full input input-bordered" />
          </div>
          {/* {showErrorPopup && (
            <div className="relative flex flex-col items-center justify-center p-4 rounded-md">
              <p className="text-black py-2">{errorMessage}</p>
              <button
                className="  bg-red-600 border-1 text-white rounded-full px-2 "
                onClick={() => setErrorPopup(false)}>
                <p className="text-center text-white">Close</p>
              </button>
            </div>
          )} */}
          <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forgot Password?</a>
          <div>
            <button className="btn btn-block bg-gray-200" onClick={(e) => handleSubmit(e)}>Login</button>
            <button type="button" className="btn btn-block mt-4 bg-gray-200" onClick={() => openSignUp()}>Don't have an account? Sign up here</button>
            {showErrorPopup && (
            <div className="relative flex flex-col items-center justify-center p-4 rounded-md">
              <p className="text-red-600 py-2">{errorMessage}</p>
            </div>
          )}
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Login;