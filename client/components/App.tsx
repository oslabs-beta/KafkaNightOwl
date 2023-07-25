import { ReactElement } from 'react';
import Dashboard from './Dashboard';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
	return (
		<>
			<Dashboard />
		</>
	);
}

export default App;
