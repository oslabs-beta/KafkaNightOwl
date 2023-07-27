import { ReactElement, useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Homepage from './Homepage';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
	const [isLoggedIn, setLoggedIn] = useState(false);

	return (
    <>
      {/* <Dashboard /> */}
			{isLoggedIn ? <Dashboard /> : <Homepage setLoggedIn={setLoggedIn} />}
    </>
  );
}

export default App;
