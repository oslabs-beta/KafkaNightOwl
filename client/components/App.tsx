import { ReactElement, useState } from 'react';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import NotificationsContainer from './NotificationContainer';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogout = () =>{
    setLoggedIn(false);
  }
  return (
    // <>
    //   {isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : <Homepage setLoggedIn={setLoggedIn} />}
    // </>
    <NotificationsContainer/>
  );
};

export default App;
