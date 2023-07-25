import { ReactElement, useState } from "react";
import axios from "axios";

type SignupTypes = {
  setLoggedIn: (newState: boolean) => void
};

const Signup: React.FC<SignupTypes> = ({setLoggedIn}): ReactElement => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {password, email}
    axios.post('http://localhost:5050/user/signup', userData)
    .then((res) => {
      console.log('Account created successfully');
      setLoggedIn(true);
    })
  };

  return (
    <>
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
                <button className="btn btn-block" onClick={(e) => handleSubmit(e)}>Signup</button>
            </div>
        </form>
    </div>
</div>
    </>
  )
}

export default Signup;