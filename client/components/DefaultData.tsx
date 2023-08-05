

const defaultCoreMetricData = [
  {
    layout: { i: 'item 1', x: 0, y: 0, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'ActiveControllerCount'
    }
  },
  {
    layout: { i: 'item 2', x: 0, y: 1, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_ReplicaManager_Value',
      name: 'UnderReplicatedPartitions'
    }
  },
  {
    layout: { i: 'item 3', x: 0, y: 2, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'ActiveBrokerCount'
    },
  },
  {
    layout: { i: 'item 4', x: 0, y: 3, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'OfflinePartitionsCount'
    },
  },
  {
    layout: { i: 'item 5', x: 0, y: 4, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'GlobalTopicCount'
    },
  },
  {
    layout: { i: 'item 6', x: 0, y: 5, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_ReplicaManager_Value',
      name: 'PartitionCount'
    },
  },
];

const defaultTopicData = [
  {
    layout: { i: 'item 1', x: 0, y: 0, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_BrokerTopicMetrics_OneMinuteRate',
      name: 'MessagesInPerSec',
    },
  },
  {
    layout: { i: 'item 2', x: 0, y: 1, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_BrokerTopicMetrics_OneMinuteRate',
      name: 'BytesInPerSec',
    },
  },
  {
    layout: { i: 'item 3', x: 0, y: 2, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_BrokerTopicMetrics_OneMinuteRate',
      name: 'BytesOutPerSec',
    },
  },
  {
    layout: { i: 'item 4', x: 0, y: 3, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_BrokerTopicMetrics_OneMinuteRate',
      name: 'TotalProduceRequestsPerSec',
    },
  },
  {
    layout: { i: 'item 5', x: 0, y: 4, w: 3, h: 1, static: false },
    url: {
      query: 'kafka_server_BrokerTopicMetrics_Count',
      name: 'MessagesInPerSec',
    },
  },
];


export {defaultCoreMetricData, defaultTopicData};