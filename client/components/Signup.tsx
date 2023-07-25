import {ReactElement, useState} from "react";
import { useNavigate } from "react-router";

type SignupTypes = {};

const Signup: React.FC<SignupTypes> = (): ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {username, password, email}
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
  })
      .then((res) => {
          if (res.ok) {
              navigate('/login');
          }
      });
  };

  return (
    <>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input onChange={e => setUsername(e.target.value)} value={username} name="username" type="text" placeholder="username"></input>
            <input onChange={e => setPassword(e.target.value)} value={password} name="password" type="password" placeholder="password"></input>
            <input onChange={e => setEmail(e.target.value)} value={email} name="email" type="email" placeholder="email"></input>
            <input type="submit" value="Sign Up"></input>
        </form>
    </>
  )
}

export default Signup;