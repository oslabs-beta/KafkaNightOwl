import { ReactElement } from 'react';
import Tabs from './Tabs';
import Sidebar from './Sidebar';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
	return (
		<>
			<Sidebar />
			<Tabs />
		</>
	);
}

export default App;
