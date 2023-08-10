<div align='center'> 
  <img width="500px" height="500px" src="./build/assets/image/white.png"/>
</div>

# KafkaNightOwl

### Kafka NightOwl is an open-source project dedicated to developing a powerful Kafka cluster visualization tool specifically designed for senior software developers. Our mission is to empower developers with a simple yet powerful tool that allows them to monitor and visualize their Kafka clusters effortlessly and get live time alerts which enable developers to effectively troubleshoot, optimize performance, and efficiently manage their Kafka clusters.

# Features at a Glance

Real-time Metrics and Charts: Kafka NightOwl provides you with real-time insights into your Kafka clusters' health and performance through easy-to-understand metrics and visually appealing charts. Gain a deeper understanding of topics, partitions, brokers, and more.

Seamless Prometheus Integration: Setting up Prometheus to scrape Kafka metrics has never been easier. Kafka NightOwl guides you through the process, ensuring that your data collection is a smooth experience.

Intuitive Dashboard: The application's main dashboard serves as your central hub for Kafka cluster monitoring. Our integration of the ChartJS library provides numerous customization features to the dashboard including moving, resizing, and auto-scale and fit.

Alerts and Notifications: Kafka NightOwl leverages Prometheus AlertManager to keep you informed about critical issues. Receive alerts about errors, performance drops, and other anomalies, allowing you to take proactive measures.

# Getting Started with Kafka NightOwl

1. Creating a User Account
   Before diving into Kafka cluster visualization, you'll need to create a user account. Simply sign up with your email and password to access the powerful features of Kafka NightOwl.

2. Connecting to Prometheus
   To kickstart the monitoring process, connect Kafka NightOwl to your Prometheus instance running locally. Our team has provided sample configuration files for Kafka, Prometheus, and AlertManager as well as a simple guide to connect these together.
   ![login](/build/assets/image/login.gif)

3. Exploring Metrics
   Once connected, Kafka NightOwl provides an intuitive interface to explore various Kafka metrics. Select topics, partitions, or brokers, and watch as the application generates insightful charts and graphs, giving you a real-time view of your cluster's health. Customize your metrics display by dragging and resizing charts and even add more metrics to your dashboard.
   ![default](/build/assets/image/default.gif)
   ![add](/build/assets/image/add.gif)

4. Staying Informed with Alerts
   Kafka NightOwl's AlertManager integration empowers you to stay ahead of critical issues. Whenever an anomaly or error is detected, an alert will be triggered. You can acknowledge and manage these alerts directly from the application.
   ![alert](/build/assets/image/alert.gif)

# Setup for new Kafka/Prometheus user

1. Setting up Kafka by following Apache Kafka Quickstart tutorial: [Apache Kafka Quickstart](https://kafka.apache.org/quickstart)
2. Configure JMX Exporter for Kafka

- Download the JMX Exporter jar file from: https://github.com/prometheus/jmx_exporter
- Configure the JMX exporter configuration file for Kafka (example configuration files can be found at https://github.com/prometheus/jmx_exporter/tree/main/example_configs)
- CD to your Kafka directory
- Run

```
java -jar jmx_prometheus_httpserver-0.19.0.jar <port number> <exporter-config-file-path>
```

to expose your metrics at https://localhost:[port number]/metrics

- Run

```
export KAFKA_OPTS="-javaagent:/<exporter-jar-file-path>/jmx_prometheus_javaagent-0.19.0.jar=<port number>:/<kafka-yml-file-path>/kafka-2_0_0.yml"
```

- Start your Kafka server

3. Setting up Prometheus by following: [Prometheus Tutorial](https://jhooq.com/prometheous-grafan-setup/)
4. Configure the prometheus.yml file as shown in /setup/prometheus
5. Download and Setup AlertManager from [Prometheus](https://prometheus.io/download/)
6. Configure the alertManager.yml file as shown in /setup/prometheus

# Tech Stack

<div align='center'>

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prometheus](https://img.shields.io/badge/Prometheus-E7532D?style=for-the-badge&logo=prometheus&logoColor=white)
![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/apache%20kafka-%2320232a.svg?style=for-the-badge&logo=apachekafka&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red)

</div>

# Contributors

|  Developed By  |                                                                       Github                                                                       |                                                                           LinkedIn                                                                            |
| :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  Kelvin Chen   |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kc-code32)    | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jianming-kelvin-chen-b22191105/) |
| Jeremy Holland |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PecheKeen)    |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jerholland/)           |
|    Paul Kim    | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paulkimofficial) |       [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paul-kim-37735b217/)       |
| Carlos Revilla |  [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/carlosfrev123)  |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carlosfrevilla/)         |
| Colin Silvers  |  [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ColinSilvers)   |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/colinsilvers/)          |

# License

This project is licensed under the [**MIT License**](https://choosealicense.com/licenses/mit/)
