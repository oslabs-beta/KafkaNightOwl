// const fetch = require('node-fetch');

// needed from request body:
// user localhost
// query string
let localhost = 'http://localhost:9090';
let query = 'kafka_controller_kafkacontroller_activebrokercount';

const now = Math.floor((Date.now() / 1000));
const prometheusURL = `${localhost}/api/v1/query_range`;
const queryParams = new URLSearchParams({
  query: `${query}`,
  start: now - (5 * 60), // note: user might want to change time
  end: now,
  step: '15s'
})

const APIURL = `${prometheusURL}?${queryParams}`
console.log(APIURL)
