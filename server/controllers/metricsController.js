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
    const now = Math.floor((Date.now() / 1000));
    const then = now - 120;

    try {
      // const activeController = await axios.get(
        //   `http://${port}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount[1m]`
        // );
        const activeControllers = await axios.get(
          `http://${port}/api/v1/query_range?query=kafka_controller_kafkacontroller_activecontrollercount&start=${then}&end=${now}&step=15s`
        );
      // // const underRepPartitions = await axios.get(
      // //   `http://${port}/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions[1m]`
      // // );
      // const underRepPartitions = await axios.get(
      //   `http://${port}/api/v1/query?query=kafka_server_replicamanager_value{name="UnderReplicatedPartitions",}[1m]`
      // );
      // // const activebrokercount = await axios.get(
      // //   `http://${port}/api/v1/query?query=kafka_controller_kafkacontroller_activebrokercount`
      // // );
      // const activebrokers = await axios.get(
      //   `http://${port}/api/v1/query?query=kafka_controller_kafkacontroller_value{name="ActiveBrokerCount",}[1m]`
      // );
      // // const offlinePartitions = await axios.get(
      // //   `http://${broker}/api/v1/query?query=sum(rate(kafka_controller_kafkacontroller_offlinepartitionscount[1m]))`
      // // );
      // const offlinePartitions = await axios.get(
      //   `http://${port}/api/v1/query?query=kafka_controller_kafkacontroller_value{name="OfflinePartitionsCount",}[1m]`
      // );
      // const totalTopics = await axios.get(
      //   `http://${port}/api/v1/query?query=kafka_controller_kafkacontroller_value{name="GlobalTopicCount",}[1m]`
      // );
      // const totalPartitions = await axios.get(
      //   `http://${port}/api/v1/query?query=kafka_server_replicamanager_value{name="PartitionCount",}[1m]`
      // );
      // // const cpuMetric = await axios.get(
      // //   `http://${broker}/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100`
      // // );
      // // const ramUsage = await axios.get(
      // //   `http://${broker}/api/v1/query?query=sum(rate(process_resident_memory_bytes[1m]))`
      // // );
      // // const latency = await axios.get(
      // //   `http://${broker}/api/v1/query?query=sum(rate(kafka_network_requestmetrics_totaltimems{}[1m]) - rate(kafka_network_requestmetrics_localtimems{}[1m]))`
      // // );
      res.locals.coreMetrics = {
        activeControllers: activeControllers.data.data.result[0].values,
        // underRepPartitions: underRepPartitions.data.data.result[0].values,
        // activebrokers: activebrokers.data.data.result[0].values,
        // offlinePartitions: offlinePartitions.data.data.result[0].values,
        // totalTopics: totalTopics.data.data.result[0].values,
        // totalPartitions: totalPartitions.data.data.result[0].values,
        // // activeController: activeController.data.data.result[0].value[1],
        // // underRepPartitions: underRepPartitions.data.data.result[0].value[1],
        // // offlinePartitions: offlinePartitions.data.data.result[0].value[1],
        // // cpuMetric: cpuMetric.data.data.result[0].value[1],
        // // ramUsage: ramUsage.data.data.result[0].value[1],
        // // latency: latency.data.data.result[0].value[1],
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
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="MessagesInPerSec",topic="${topic}",}[1m]`
      );
      const bytesInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="BytesInPerSec",topic="${topic}",}[1m]`
      );
      const bytesOutRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="BytesOutPerSec",topic="${topic}",}[1m]`
      );
      const produceRequestRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="TotalProduceRequestsPerSec",topic="${topic}",}[1m]`
      );
      const totalMessageIn = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_count{name="MessagesInPerSec",topic="${topic}",}[1m]`
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
        `http://${port}/api/v1/query?query=kafka_controller_kafkacontroller_value{name="GlobalTopicCount",}[1m]`
      );
      const messageInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="MessagesInPerSec",}[1m]`
      );
      const bytesInRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="BytesInPerSec",}[1m]`
      );
      const bytesOutRate = await axios.get(
        `http://${port}/api/v1/query?query=kafka_server_brokertopicmetrics_oneminuterate{name="BytesOutPerSec",}[1m]`
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
        log: 'Error occurred in metricsController.middleware',
        status: 500,
        message: { err: 'Error occurred in metricsController.middleware' },
      });
    }
  },

  async middleware3 (req, res, next) {
    const { metrics } = req.body;
    try {
      const metrics1 = await axios.get(
        `http://${metrics}/api/v1/query?query=sum(rate(kafka_metrics_name[1m])) * 100`
      );
      const metrics2 = await axios.get(
        `http://${metrics}/api/v1/query?query=sum(rate(kafka_metrics_name[1m]))`
      );
      res.locals.name = {
        metrics1: metrics1.data.data.result[0].value[1],
        metrics2: metrics2.data.data.result[0].value[1],
      };
      return next();
    } catch (err) {
      return next({
        log: 'Error occurred in metricsController.middleware',
        status: 500,
        message: { err: 'Error occurred in metricsController.middleware' },
      });
    }
  },


}  



module.exports = metricsController;