const defaultCoreMetricData = [
  {
    layout: { i: 'item 1', x: 0, y: 0, w: 2, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'ActiveControllerCount'
    }
  },
  {
    layout: { i: 'item 2', x: 2, y: 0, w: 2, h: 1, static: false },
    url: {
      query: 'kafka_server_ReplicaManager_Value',
      name: 'UnderReplicatedPartitions'
    }
  },
  {
    layout: { i: 'item 3', x: 4, y: 0, w: 2, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'ActiveBrokerCount'
    },
  },
  {
    layout: { i: 'item 4', x: 6, y: 0, w: 2, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'OfflinePartitionsCount'
    },
  },
  {
    layout: { i: 'item 5', x: 8, y: 0, w: 2, h: 1, static: false },
    url: {
      query: 'kafka_controller_KafkaController_Value',
      name: 'GlobalTopicCount'
    },
  },
  {
    layout: { i: 'item 6', x: 10, y: 0, w: 2, h: 1, static: false },
    url: {
      query: 'kafka_server_ReplicaManager_Value',
      name: 'PartitionCount'
    },
  },
];

export default defaultCoreMetricData;