# rabbitmq, kafka, zookeeper, nodejs setup

## kafka zookeeper docker setup source

https://developer.confluent.io/get-started/nodejs/#produce-events

### To run rabbitmq in docker container

```sh
docker run -d --name rabbitmq -p 5672:5672 rabbitmq
```

## To test rabbitmq

1. Run rabbitmq docker container by
    - `docker container start rabbitmq`

2. Run
    - `node rabbitmq/index.js`

### To run kafka and zookeeper in docker container

```sh
docker-compose up -d 
```

OR

```sh
docker compose up -d
```

## To test kafka

1. Create a topic
   - `node kafka/topic.js`

2. Create a producer and publish a message
   - `node kafka/producer.js "some message to publish"`

3. Create a consumer and consume the messages
   - `node kafka/consumer.js`
