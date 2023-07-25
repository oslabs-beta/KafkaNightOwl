import * as React from "react";
import { ReactElement, useState } from "react";
import {useNavigate} from "react-router";

type LoginTypes = {};

const Login: React.FC<LoginTypes> = (): ReactElement => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {username, password};
    fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj),
    }).then((res) => {
      if(res.ok) {
        navigate('/');
      }
    });
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
                <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter Password"
                    className="w-full input input-bordered" />
            </div>
            <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forgot Password?</a>
            <div>
                <button className="btn btn-block">Login</button>
            </div>
        </form>
    </div>
</div>
    
    // <>
    //   <h2>Log In</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       onChange={(e) => setUsername(e.target.value)}
    //       value={username}
    //       name='username'
    //       type='text'
    //       placeholder='Username'
    //     ></input>
    //     <input
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //       name='password'
    //       type='password'
    //       placeholder='Password'
    //     ></input>
    //     <input type='submit' value='Log In'></input>
    //   </form>
    // </>
  );
};

export default Login;