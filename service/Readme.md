# Install

To build this container run 

```
docker build . -t verteile_systeme_service
```

inside this folder.

---

# Override Metrics

## System Metrics

Override can also be made for specific attributes, by just providing said attribute. 
```
curl --location --request POST 'http://localhost:8080/manipulate/systemmetrics' \
--header 'Content-Type: application/json' \
--data-raw '{
  "numberOfCpus": 1,
  "totalMemory": 1,
  "usedMemory": 1,
  "usedMemoryPercentage": 1,
  "freeMemory": 1
}'
```
To reset the override 

```
curl --location --request POST 'http://localhost:8080/manipulate/systemmetrics' \
--data-raw ''
```

## Server Metrics

Override can also be made for specific attributes, by just providing said attribute.
```
curl --location --request POST 'http://localhost:8080/manipulate/servermetrics' \
--header 'Content-Type: application/json' \
--data-raw '{
  "numberOfConnections": 100
}'
```
To reset the override

```
curl --location --request POST 'http://localhost:8080/manipulate/servermetrics' \
--data-raw ''
```



