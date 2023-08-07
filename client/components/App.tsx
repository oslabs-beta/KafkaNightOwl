import { ReactElement, useState } from 'react';
import Dashboard from './Dashboard';
import Homepage from './Homepage';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const handleLogout = () =>{
    setLoggedIn(false);
  }
  return (
    <>
      {isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : <Homepage setLoggedIn={setLoggedIn} />}
    </>
  );
};

export default App;
