const axios = require("axios");

// created dummy middleware for future use
// replace dummy path endpoint, middleware, and res.locals var for actual functionality

// example for cupMetric
// const cpuMetric = await axios.get(
//   `http://${broker}/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100`
// );

const metricsController = {
  async getCoreMetrics(req, res, next) {
    const { port } = req.body;
    // const now = Math.floor((Date.now() / 1000));
    // const then = now - 120;

    try {
      const activeControllers = await axios.get(
        `http://${port}/api/v1/query?query=kafka_controller_KafkaController_Value{name="ActiveControllerCount",}[1m]`
      );
      const underRepPartitions = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_ReplicaManager_Value{name="UnderReplicatedPartitions",}[1m]`
      );
      const activebrokers = await axios.get(
        `http://${port}/api/v1/query?query=kafka_controller_KafkaController_Value{name="ActiveBrokerCount",}[1m]`
      );
      const offlinePartitions = await axios.get(
        `http://${port}/api/v1/query?query=kafka_controller_KafkaController_Value{name="OfflinePartitionsCount",}[1m]`
      );
      const totalTopics = await axios.get(
        `http://${port}/api/v1/query?query=kafka_controller_KafkaController_Value{name="GlobalTopicCount",}[1m]`
      );
      const totalPartitions = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_ReplicaManager_Value{name="PartitionCount",}[1m]`
      );
      res.locals.coreMetrics = {
        activeControllers: activeControllers.data.data.result[0].values,
        underRepPartitions: underRepPartitions.data.data.result[0].values,
        activebrokers: activebrokers.data.data.result[0].values,
        offlinePartitions: offlinePartitions.data.data.result[0].values,
        totalTopics: totalTopics.data.data.result[0].values,
        totalPartitions: totalPartitions.data.data.result[0].values,
      };
      return next();
    } catch (err) {
      return next({
        log: 'Error occurred in metricsController.getCoreMetrics',
        status: 500,
        message: { err: 'Error occurred in metricsController.getCoreMetrics' },
      });
    }
  },

  async topicMetrics (req, res, next) {
    const { port, topic } = req.body;
    try {
      const messageInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="MessagesInPerSec",topic="${topic}",}[1m]`
      );
      const bytesInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="BytesInPerSec",topic="${topic}",}[1m]`
      );
      const bytesOutRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="BytesOutPerSec",topic="${topic}",}[1m]`
      );
      const produceRequestRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="TotalProduceRequestsPerSec",topic="${topic}",}[1m]`
      );
      const totalMessageIn = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_Count{name="MessagesInPerSec",topic="${topic}",}[1m]`
      );
      res.locals.topicMetrics = {
        messageInRate: messageInRate.data.data.result[0].values,
        bytesInRate: bytesInRate.data.data.result[0].values,
        bytesOutRate: bytesOutRate.data.data.result[0].values,
        produceRequestRate: produceRequestRate.data.data.result[0].values,
        totalMessageIn: totalMessageIn.data.data.result[0].values,
      };
      return next();
    } catch (err) {
      return next({
        log: 'Error occurred in metricsController.topicMetrics',
        status: 500,
        message: { err: 'Error occurred in metricsController.topicMetrics' },
      });
    }
  },

  async brokerMetrics (req, res, next) {
    const { port } = req.body;
    try {
      const totalTopics = await axios.get(
        `http://${port}/api/v1/query?query=kafka_controller_KafkaController_Value{name="GlobalTopicCount",}[1m]`
      );
      const messageInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="MessagesInPerSec",}[1m]`
      );
      const bytesInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="BytesInPerSec",}[1m]`
      );
      const bytesOutRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_BrokerTopicMetrics_OneMinuteRate{name="BytesOutPerSec",}[1m]`
      );
      res.locals.brokerMetrics = {
        totalTopics: totalTopics.data.data.result[0].values,
        messageInRate: messageInRate.data.data.result[0].values,
        bytesInRate: bytesInRate.data.data.result[0].values,
        bytesOutRate: bytesOutRate.data.data.result[0].values,
      };
      return next();
    } catch (err) {
      return next({
        log: 'Error occurred in metricsController.brokerMetrics',
        status: 500,
        message: { err: 'Error occurred in metricsController.brokerMetrics' },
      });
    }
  },
  
}


module.exports = metricsController;
