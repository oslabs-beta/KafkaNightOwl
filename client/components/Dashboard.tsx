import { useState, useEffect, ReactElement } from 'react';
import data from '../../data.json'
import { Layout } from 'react-grid-layout';
import CreateChartForm from './CreateChartForm';
import AddServerModal from './AddServerModal';
import GridLayout from './GridLayout';
import axios from "axios";
import defaultCoreMetricData from './DefaultData'

type DashboardProps = {};
type ChartDataType = {
	layout: Layout,
	url: {
		query: string,
		name: string,
		topic?: string
	}
}

const Dashboard: React.FC<DashboardProps> = (): ReactElement => {
	const [server, setServer] = useState<string | null>('localhost:9090');
	const [metric, setMetric] = useState<string>('');
	const [metricList, setMetricList] = useState<string[]>(data.data);
	const [filteredMetrics, setFilteredMetrics] = useState<string[]>(data.data)
	const [topicList, setTopicList] = useState<string[]>([])
	const [topic, setCurrentTopic] = useState<string>('')
	const [layout, setLayout] = useState<Layout[]>([
    {i: 'item 1', x: 0, y:0, w:2, h:1, static: false},
    {i: 'item 2', x: 2, y:2, w:2, h:1, static: false},
    {i: 'item 3', x: 4, y:4, w:2, h:1, static: false}
	]);
	const [chartData, setChartData] = useState<ChartDataType[] | null>(defaultCoreMetricData)

	const onLayoutChange = (newLayout) => {
		setLayout(newLayout)
	}
	
	const addChart = (chart: Layout) => {
		setLayout((prevLayout: Layout[]): Layout[] => [...prevLayout, chart])
	}

  const updateServer = async (serverString: string) => {
		if(!serverString) return console.error('Please input Port num');
		setServer(serverString);
		console.log(server);
		try {
			const brokerTopicMetrics = await axios.get(
				`http://${serverString}/api/v1/query?query=kafka_server_BrokerTopicMetrics_Count{name="MessagesInPerSec"}`
			);
			const metricsArray = brokerTopicMetrics.data.data.result;
			const topics = [];
			metricsArray.forEach(data => {
				if (data.metric.topic !== '__consumer_offsets' && !topics.includes(data.metric.topic) && data.metric.topic) topics.push(data.metric.topic);
			});
			setTopicList(topics);
			console.log(topicList);
		} catch (err) {
			console.log(err);
		}
  }
  // const updateServer = (serverString: string): void => {
	// 	if(!serverString) return console.error('Please input Port num');
	// 	setServer(serverString);
  // }

  // TODO: fetch metric list from client
	useEffect(() => {
		if(!server) return undefined
  }, [server])

	// TODO: add debouncer/limiter to limit rerenders when typing
  useEffect((): void => {
    if (!metric) {
      return setFilteredMetrics(metricList);
    }
    const newFilteredMetrics: string[] = metricList
			.filter((item) => item.toLowerCase().includes(metric.toLowerCase()))
			.sort()
    setFilteredMetrics(newFilteredMetrics)
  },[metric, metricList])
  
	return (
		<>
			<div className='flex h-screen w-auto'>
				<div className='w-screen flex flex-col'>
					<div className='flex items-center justify-center content-center px-4 bg-slate-900'>
						<AddServerModal updateServer={updateServer}/>
						<CreateChartForm server={server} metric={metric} setMetric={setMetric} filteredMetrics={filteredMetrics} addChart={addChart} />
						<span className='ml-auto text-white w-72 text-2xl font-black'>KAFKA NIGHTOWL</span>
					</div>
					<GridLayout server={server} items={layout} onLayoutChange={onLayoutChange} chartData={chartData} />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
