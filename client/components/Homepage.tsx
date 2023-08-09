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


  /*
  
  */
  return (
    <>
    {/* INTRO TITLE AND LOGIN/SIGNUP */}

      <div className="flex w-screen h-5/6 bg-slate-800">
        <div className="w-1/2 h-full flex flex-col ml-24 p-8 text-center text-zinc-100">
          <div className="flex items-end ml-24">
            <div className="">
              <h1 className="text-6xl font-bold mt-36 ">Kafka NightOwl</h1>
              <h2 className="text-5xl italic mt-5">Real-time insights & alerts.</h2>
            </div>
            <div className="">
              <img className="object-scale-down w-48" src="/build/assets/image/logo.png" />
            </div>
          </div>
          
          <h4 className="text-3xl w-5/6 leading-10 text-center mt-20 ml-6">Your Gateway to Streamlined Monitoring. Harness the power of real-time metrics and actionable insights as we transform your local Kafka stream.</h4>
        </div>
        {signupButtonClicked ? <Signup setLoggedIn={setLoggedIn} openSignUp={openSignUp} /> : <Login setLoggedIn={setLoggedIn} openSignUp={openSignUp} />}
      </div>
  
      {/* GITHUB */}
      <div className="w-screen h-1/4 bg-white">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl text-center mr-5">Check us out on GitHub! We're dedicated to open source. </h1>
          <a href="https://github.com/oslabs-beta/KafkaNightOwl/" target='_blank' className="bg-slate-800 rounded-xl hover:bg-zinc-500 text-white btn p-2">CLICK HERE<i className="fa-brands fa-github fa-2xl"></i> </a>
        </div>
      </div>

      {/* ABOUT/DEMO of OUR PRODUCT */}
      <div className="w-screen h-auto bg-blue-300">
        <h1 className="text-5xl ml-6 font-bold italic text-center py-10">Welcome to Kafka NightOwl. </h1>
        <div className="flex py-5 px-20"> {/* title paragraph and demo1: login and add server*/}
        <div className="max-w-[50%] px-5">
          <h2 className="text-5xl ml-6 font-semibold">Sign in and add your Prometheus Port</h2>
          <div className="flex justify-center">
            <p className="text-3xl py-20 w-5/6">Seamlessly integrate your Kafka environment with Prometheus by inputting the port, and watch Kafka NightOwl take charge. </p>
          </div>
          
        </div>
          <div className="bg-zinc-500 w-[800px] h-[400px] "></div>
        </div>
        
        <h1 className="text-6xl font-bold my-20 italic text-center">Rest easy knowing Kafka NightOwl has got your back ;) </h1>
        <div className="flex py-5 px-20"> {/* DEMO 2*/}
          <div className="bg-zinc-500 w-[800px] h-[400px] "></div>        
          <div className="max-w-[50%] px-5">
            <h2 className="text-5xl ml-6 font-semibold">Explore the default metrics for your main Kafka components</h2>
            <div className="flex justify-center">
            <p className="text-3xl py-20 w-5/6"> Sit back and watch your local Kafka stream turn into a goldmine of real-time metrics and actionable insights.  </p>
            </div>
          </div>
          
        </div>
        
        <div className="flex py-5 px-20"> {/* title paragraph and demo1: login and add server*/}
        <div className="max-w-[50%] px-5">
          <h2 className="text-5xl ml-6 font-semibold">Want to add Metrics?</h2>
          <div className="flex justify-center">
            <p className="text-3xl py-20 w-5/6">Gain a competitive edge as you delve into intricate metrics, attain holistic visibility across components, and receive instantaneous alerts, all granting you full control of your Kafka ecosystem.</p>
          </div>
        </div>
          <div className="bg-zinc-500 w-[800px] h-[400px] "></div>
        </div>
        
        <div className="flex py-5 px-20"> {/* title paragraph and demo1: login and add server*/}
          <div className="bg-zinc-500 w-[800px] h-[400px] "></div>
          <div className="max-w-[50%] px-5">
            <h2 className="text-5xl ml-6 font-semibold">Get alerts in real time.</h2>
            <div className="flex justify-center">
              <p className="text-3xl py-20 w-5/6">Elevate your monitoring experience today and embrace the future of unified monitoring, all at your fingertips with Kafka NightOwl.</p>
            </div>
           
          </div>
        </div>
      </div>

      {/* OUR TEAM */}
      <div className="w-screen h-1/2 bg-white py-10">
        <h1 className="text-4xl font-black text-center">Our Team</h1>
        <div className="flex justify-center w-full mt-12 gap-24">
          
          <div className="flex flex-col text-center items-center text-xl font-bold tracking-wider avatar">
            <div className="w-36 bg-zinc-100 mask mask-squircle">
              <img src="/build/assets/image/kelvin.png" />
            </div>
            <p className='mt-4'>Kelvin Chen</p>
            <div className=""><a href="https://github.com/kc-code32" target='_blank' className=""><i className="fa-brands p-1 bg-black fa-github text-white fa-1xl rounded"></i> </a>
            <a href="https://www.linkedin.com/in/jianming-kelvin-chen-b22191105/" target='_blank' className=""><i className="fa-brands bg-blue-500 text-white fa-linkedin-in p-1 rounded"></i></a></div>
          </div>

          <div className="flex flex-col text-center items-center text-xl font-bold tracking-wider avatar">
            <div className="w-36 bg-slate-100 mask mask-squircle">
              <img src="/build/assets/image/jeremy.png" />
            </div>
            <p className='mt-4'>Jeremy Holland</p>
            <div className=""><a href="https://github.com/PecheKeen" target='_blank' className=""><i className="fa-brands p-1 bg-black text-white fa-github fa-1xl rounded "></i> </a>
            <a href="https://www.linkedin.com/in/jerholland" target='_blank' className=""><i className="fa-brands bg-blue-500 text-white fa-linkedin-in p-1 rounded"></i></a></div>
          </div>
          
          <div className="flex flex-col text-center items-center text-xl font-bold tracking-wider avatar">
            <div className="w-36 bg-zinc-100 mask mask-squircle">
              <img src="/build/assets/image/paul.png" />
            </div>
            <p className='mt-4'>Paul Kim</p>
            <div className=""><a href="https://github.com/paulkimofficial" target='_blank' className=""><i className="fa-brands p-1 bg-black text-white fa-github fa-1xl rounded "></i> </a>
            <a href="http://www.linkedin.com/in/paul-kim-37735b217" target='_blank' className=""><i className="fa-brands bg-blue-500 text-white fa-linkedin-in p-1 rounded"></i></a></div>
          </div>
          
          <div className="flex flex-col text-center items-center text-xl font-bold tracking-wider avatar">
            <div className="w-36 bg-zinc-100 mask mask-squircle">
              <img src="/build/assets/image/carlos.png" />
            </div>
            <p className='mt-4'>Carlos Revilla</p>
            <div className=""><a href="https://github.com/carlosfrev123" target='_blank' className=""><i className="fa-brands p-1 bg-black text-white fa-github fa-1xl rounded "></i> </a>
            <a href="https://www.linkedin.com/in/carlosfrevilla/" target='_blank' className=""><i className="fa-brands bg-blue-500 text-white fa-linkedin-in p-1 rounded"></i></a></div>
          </div>
          
          <div className="flex flex-col text-center items-center text-xl font-bold tracking-wider avatar">
            <div className="w-36 bg-zinc-100 mask mask-squircle">
              <img src="/build/assets/image/colin.png" />
            </div>
            <p className='mt-4'>Colin Silvers</p>
            <div className=""><a href="https://github.com/ColinSilvers" target='_blank' className=""><i className="fa-brands p-1 bg-black text-white fa-github fa-1xl rounded "></i> </a>
            <a href="https://www.linkedin.com/in/colinsilvers/" target='_blank' className=""><i className="fa-brands bg-blue-500 text-white fa-linkedin-in p-1 rounded"></i></a></div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;


/*        DEMO PART
      <div className="w-screen h-5/6 bg-orange-300">
        <h1 className="text-3xl">Demo of our product</h1>
      </div>
*/