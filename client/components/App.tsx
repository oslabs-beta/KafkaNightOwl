import { useState, ReactElement } from 'react';
import Tabs from './Tabs';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Topics from './Topics';
import Brokers from './Brokers';
import Producers from './Producers';
import Consumers from './Consumers';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
	const [tab, setTab] = useState<string>('overview');
	const [server, setServer] = useState<string | null>(null);

	function changeTab(newTab: string) {
		if (newTab === 'overview') 				setTab('overview')
		else if (newTab === 'topics') 		setTab('topics')
		else if (newTab === 'brokers') 		setTab('brokers')
		else if (newTab === 'producers') 	setTab('producers')
		else if (newTab === 'consumers') 	setTab('consumers')
	}

	return (
		<>
			<div className='flex h-screen w-auto'>
				<Sidebar />
				<div className='w-screen'>
				<Tabs changeTab={changeTab} tab={tab} />
					{tab === 'overview' && <Overview />}
					{tab === 'topics' && <Topics />}
					{tab === 'brokers' && <Brokers />}
					{tab === 'producers' && <Producers />}
					{tab === 'consumers' && <Consumers />}
				</div>
			</div>
		</>
	);
}

export default App;
