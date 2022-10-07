# kafka zookeeper nodejs setup

## docker nodejs setup source

> https://developer.confluent.io/get-started/nodejs/#produce-events

### > To run rabbitmq in docker container

```sh
docker run -d --name rabbitmq -p 5672:5672 rabbitmq
```

## To test rabbitmq

1. Run docker container of not running by
    - docker container start rabbitmq

2. Run
    - node rabbitmq/index.js

### > To run kafka and zookeeper in docker container

```sh
docker-compose up -d 
```

OR

```sh
docker compose up -d
```

## to test kafka

1. Create a topic
   - run kafka/topic.js

2. Create a producer and publish a message
   - run node kafka/producer.js "some message to publish"

3. Create a consumer and consume the messages
   - run node kafka/consumer.js
