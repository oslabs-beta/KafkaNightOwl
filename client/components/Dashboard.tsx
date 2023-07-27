import { useState, ReactElement } from 'react';
import Tabs from './Tabs';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Topics from './Topics';
import Brokers from './Brokers';
import Landing from './Landing'

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = (): ReactElement => {
  const [tab, setTab] = useState<string>('');
  const [server, setServer] = useState<string | null>(null);

  const updateServer = (serverString: string): void => {
    console.log('str', serverString)
		if(!serverString) return console.error('Please input Port num');
		setServer(serverString);
  }
  
  function changeTab(newTab: string): void {
    if (!server) return undefined;
		if (newTab === 'overview') 				setTab('overview')
		else if (newTab === 'topics') 		setTab('topics')
		else if (newTab === 'brokers') setTab('brokers')
  }
  
	return (
		<>
			<div className='flex h-screen w-auto'>
				<Sidebar updateServer={updateServer}/>
				<div className='w-screen flex flex-col items-center content-center'>
					<Tabs changeTab={changeTab} tab={tab} />
					{tab === 'overview' && <Overview server={server}/>}
          {tab === 'topics' && <Topics server={server} />}
					{tab === 'brokers' && <Brokers server={server} />}
					{tab === '' && <Landing />}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
