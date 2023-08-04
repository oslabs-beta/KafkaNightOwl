
import * as React from "react";
import { ReactElement, useState } from "react";
import axios from "axios";


type LoginTypes = {
  setLoggedIn: (newState: boolean) => void
  openSignUp: (e: any) => void
};

const Login: React.FC<LoginTypes> = ({ setLoggedIn, openSignUp }): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showErrorPopup, setErrorPopup] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log('user', userData)
    axios.post('http://localhost:5050/user/login', userData)
      .then((res) => {
        console.log(res)
      console.log('success!')
      setLoggedIn(true);
    })
    .catch((error)=>{
      console.error(error);
      setErrorPopup(true);
      setErrorMessage('Invalid email or password');
    })
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
    <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Kafka NightOwl</h1>
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
            {showErrorPopup && (
        <div className="relative flex flex-col items-center justify-center bg-zinc-400 p-4 rounded-md">
          <p className="text-white py-2">{errorMessage}</p>
          <button
              className="  bg-red-600 border-1 text-white rounded-full px-2 "
              onClick={() => setErrorPopup(false)}>
                <p className="text-center text-white">
                  Close
                </p>
                
          </button>
        </div>
    
    )}

            <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forgot Password?</a>
            <div>
                <button className="btn btn-block" onClick={(e) => handleSubmit(e)}>Login</button>
            </div>
            <div>
              <button className="btn btn-block" onClick={e => openSignUp(e)}>Don't have an account? Sign up here</button>
            </div>
        </form>
    </div>
</div>
  );
};

export default Login;