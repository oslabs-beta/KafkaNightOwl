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
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name='username'
          type='text'
          placeholder='Username'
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name='password'
          type='password'
          placeholder='Password'
        ></input>
        <input type='submit' value='Log In'></input>
      </form>
    </>
  );
};

export default Login;