import { useState, useEffect, ReactElement } from 'react';
import { Layout } from 'react-grid-layout';
import CreateChartForm from './CreateChartForm';
import AddServerModal from './AddServerModal';
import GridLayout from './GridLayout';
import axios from 'axios';
import { defaultCoreMetricData, defaultTopicData } from './DefaultData';
import React from 'react';

type DashboardProps = {
  handleLogout: (e: any) => void;
};

type ChartDataType = {
  layout: Layout;
  url: {
    query: string;
    name: string;
    topic?: string;
  };
};

const Dashboard: React.FC<DashboardProps> = ({handleLogout}): ReactElement => {
  const [server, setServer] = useState<string | null>();
  const [metric, setMetric] = useState<string>('');
  const [metricList, setMetricList] = useState<string[]>([]);
  const [filteredMetrics, setFilteredMetrics] = useState<string[]>([]);
  const [metricData, setMetricData] = useState([]);
  const [topicList, setTopicList] = useState<string[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);
  const [coreData, setCoreData] = useState<ChartDataType[]>(
    defaultCoreMetricData
  );
  const [topicData, setTopicData] = useState<ChartDataType[]>(defaultTopicData);
  const [tab, setTab] = useState<number | null>();

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const addChart = (query: string, name: string, topic: string | undefined) => {
    const newChart = {
      layout: {i: `${query}${name}${topic}`, x: 0, y:Infinity, w:2, h:2, static: false},
      url: {
        query,
        name,
        topic
      }
    }
    setCoreData((prev: ChartDataType[]): ChartDataType[] => [...prev, newChart]);
  };

  const updateServer = async (serverString: string) => {
    if (!serverString) return console.error('Please input Port num');
    setServer(serverString);
    try {
      const brokerTopicMetrics = await axios.get(
        `http://${serverString}/api/v1/query?query=kafka_server_BrokerTopicMetrics_Count{name="MessagesInPerSec"}`
      );
      const metricsArray = brokerTopicMetrics.data.data.result;
      const topics = [];
      metricsArray.forEach((data) => {
        if (
          data.metric.topic !== '__consumer_offsets' &&
          !topics.includes(data.metric.topic) &&
          data.metric.topic
        )
          topics.push(data.metric.topic);
      });
      setTopicList(topics);
			setCoreData(defaultCoreMetricData);
    } catch (err) {
      console.log(err);
			setTopicList([]);
			setCoreData([]);
			alert('Please provide an active port')
    }
		
  };

  // fetches metric list from client
  useEffect(() => {
    if (!server) return undefined;
    const getMetrics = async () => {
      try {
        const response = await axios.get(`http://${server}/api/v1/label/__name__/values`)
        setMetricList(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMetrics()
  }, [server]);

  const getMetricData = async (metric: string) => {
    if (!metricList.includes(metric)) return setMetricData([]);
    try {
      const response = await axios.get(`http://${server}/api/v1/query?query=${metric}`)
      setMetricData(response.data.data.result)
    } catch (err) {
      console.log(err)
    }
  }

  // TODO: add debouncer/limiter to limit rerenders when typing
  useEffect((): void => {
    if (!metric) {
      return setFilteredMetrics(metricList);
    }
    const newFilteredMetrics: string[] = metricList
      .filter((item) => item.toLowerCase().includes(metric.toLowerCase()))
      .sort();
    setFilteredMetrics(newFilteredMetrics);
  }, [metric, metricList]);

  const topicTabs = [];
  if (topicList.length) {
		topicTabs.push(
			<button key={'default'} onClick={() => changeTab(0)} className='btn btn-xs join-item'>
				Core
			</button>,
		);
	} 

  const topicGrids = [
    <GridLayout
      key={'default'}
      server={server}
      layout={layout}
      onLayoutChange={onLayoutChange}
      chartData={coreData}
			tab={tab}
    />,
  ];

  topicList.map((topic, index) => {
    topicTabs.push(
      <button
        onClick={() => changeTab(index + 1)}
        className='btn btn-xs join-item'
      >
        {topic}
      </button>
    );

    topicGrids.push(
      <GridLayout
        server={server}
        layout={layout}
        onLayoutChange={onLayoutChange}
        chartData={topicData}
        topic={topic}
				tab={tab}
      />
    );
  });

  const changeTab = (num) => {
    setTab(num);
  };

  return (
    <>
      <div className='flex h-screen w-auto'>
        <div className='w-screen flex flex-col'>
          <div className='flex items-center justify-center content-center px-4 bg-slate-900'>
            <AddServerModal updateServer={updateServer} />
            <CreateChartForm
              server={server}
              metric={metric}
              setMetric={setMetric}
              filteredMetrics={filteredMetrics}
              getMetricData={getMetricData}
              addChart={addChart}
              metricData={metricData}
            />
            <span className='ml-auto text-white w-[25rem] text-2xl font-black'>
              KAFKA NIGHTOWL
            </span>
            <button className = 'btn' onClick={(e) => handleLogout(e)}>LogOut</button>
          </div>
          <div className='join'>{topicTabs}</div>
          {topicGrids[tab]}
          <div className='absolute -z-50 flex h-full w-full justify-center items-center bg-slate-800 text-9xl text-black font-black'>
            <img className='opacity-20' src="../assets/image/logo.png" alt="hoot hoot" />
            <h1 className='opacity-20 select-none'>KAFKA NIGHTOWL</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
