import { ReactElement, useState } from "react";
import axios from "axios";

type SignupTypes = {
  setLoggedIn: (newState: boolean) => void
  openSignUp: () => void
};

const Signup: React.FC<SignupTypes> = ({setLoggedIn, openSignUp}): ReactElement => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {password, email}
    axios.post('http://localhost:5050/user/signup', userData)
    .then((res) => {
      setLoggedIn(true);
    })
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-1/2 overflow-hidden">
      <div className="p-6 border-t-4 w-[32rem] h-2/3 border-gray-600 bg-white rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Kafka NightOwl</h1>
        <h1 className="text-xl font-semibold text-center text-gray-700">Sign Up</h1>
        <form className="space-y-4">
          <div>
              <label className="label">
                  <span className="text-base label-text">Email</span>
              </label>
              <input type="text" placeholder="Email Address" className="w-full input input-bordered" onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div >
              <label className="label">
                  <span className="text-base label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} value={password}
                  className="w-full input input-bordered" />
              <button className="btn btn-block mt-8 bg-gray-200" onClick={(e) => handleSubmit(e)}>Signup</button>
              <button className="btn btn-block mt-4 bg-gray-200" onClick={() => openSignUp()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;