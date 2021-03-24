1. [X] Load Balancer mit dummy Strategie (Jonathan)
2. [X] Config parser (Jonathan)
3. [X] Service - Grundfunktionalität (Seb)
4. [X] Service - Periodisches senden von Auslastung an LoadBalancer (Seb)
5. [X] Service - Endpunkt für manuelles ändern der Auslastung [Für Testzewecke] (Seb)
6. [ ] Client - Statistik über angesprochene Services (Jonathan)
7. [ ] Jenkins deploy (Seba)
8. [ ] Strategien (beide)
    1. [X] Round-Robin
    2. [X] Least Connection
    3. [ ] Auslastung
    4. [X] IP-Hash


To start balancer + services run
```
docker-compose -f docker-compose.yaml up --build
```

To start balancer + services + client run
```
docker-compose -f docker-compose-with-client.yaml up --build
```

To start balancer + services + client (with prod env) run
```
docker-compose -f docker-compose-deploy.yaml up --build
```
