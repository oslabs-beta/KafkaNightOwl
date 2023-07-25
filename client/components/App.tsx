import { useState, ReactElement } from 'react';
import {Routes, Route} from 'react-router-dom';
import Tabs from './Tabs';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Topics from './Topics';
import Brokers from './Brokers';
import Producers from './Producers';
import Consumers from './Consumers';
import Login from './Login';
import Signup from './Signup';
import Homepage from './Homepage';

type AppProps = {};

const App: React.FC<AppProps> = (): ReactElement => {
	const [tab, setTab] = useState<string>('');
	const [server, setServer] = useState<string>('');
	console.log('app server', server)
	function changeTab(newTab: string) {
		if (newTab === 'overview') 				setTab('overview')
		else if (newTab === 'topics') 		setTab('topics')
		else if (newTab === 'brokers') 		setTab('brokers')
		// else if (newTab === 'producers') 	setTab('producers')
		// else if (newTab === 'consumers') 	setTab('consumers')
	}
	// function serverInput()
	const serverInput=(serverString: string)=>{
		if(!serverString) return console.error('Please input Port num');
		setServer(serverString);
	}
	return (
		<>
		<div>
		{/* <Routes>
			<Route path='/login' element = {<Login />} />
			<Route path='/signup' element = {<Signup />} />
			<Route path='/' element = {<Homepage />} />
		</Routes> */}
			<div className='flex h-screen w-auto'>
				<Sidebar serverInput={serverInput}/>
				<div className='w-screen'>
				<Tabs changeTab={changeTab} tab={tab} />
					{tab === 'overview' && <Overview server={server}/>}
					{tab === 'topics' && <Topics />}
					{tab === 'brokers' && <Brokers />}
					{/* {tab === 'producers' && <Producers />}
					{tab === 'consumers' && <Consumers />} */}
				</div>
			</div>
			</div>
		</>
	);
}

export default App;
