const axios = require("axios");

// created dummy middleware for future use
// replace dummy path endpoint, middleware, and res.locals var for actual functionality

// example for cupMetric
// const cpuMetric = await axios.get(
//   `http://${broker}/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100`
// );

const metricsController = {
  async getCoreMetrics(req, res, next) {
    const { broker } = req.body;
    try {
      const activeController = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(kafka_controller_kafkacontroller_activecontrollercount[1m]))`
      );
      const underRepPartitions = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(kafka_server_replicamanager_underreplicatedpartitions[1m]))`
      );
      const offlinePartitions = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(kafka_controller_kafkacontroller_offlinepartitionscount[1m]))`
      );
      const cpuMetric = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100`
      );
      const ramUsage = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(process_resident_memory_bytes[1m]))`
      );
      const latency = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(kafka_network_requestmetrics_totaltimems{}[1m]) - rate(kafka_network_requestmetrics_localtimems{}[1m]))`
      );
      res.locals.coreMetrics = {
        activeController: activeController.data.data.result[0].value[1],
        underRepPartitions: underRepPartitions.data.data.result[0].value[1],
        offlinePartitions: offlinePartitions.data.data.result[0].value[1],
        cpuMetric: cpuMetric.data.data.result[0].value[1],
        ramUsage: ramUsage.data.data.result[0].value[1],
        latency: latency.data.data.result[0].value[1],
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

  async middleware1 (req, res, next) {
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

  async middleware2 (req, res, next) {
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