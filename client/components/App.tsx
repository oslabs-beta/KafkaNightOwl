import { ReactElement, useState } from 'react';
import Dashboard from './Dashboard';
import Homepage from './Homepage';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // useEffect
    // triggers anytime the page loads
    // fetch request -> create new route in backend called auth
    // route must call is logged in method and return bad status code if not logged in (401) if they are (201 - authorized)
    // if status code is 200 set true
    
  const handleLogout = () =>{
    setLoggedIn(false);
    // make a log out route that clears session and cookie and redirects to landing page
  }
  return (
    <>
      {isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : <Homepage setLoggedIn={setLoggedIn} />}
    </>
  );
};

export default App;
