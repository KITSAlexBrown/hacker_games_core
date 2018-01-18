#KF Mood tracker API

## Installation

```bash
npm install
npm start
```

## Install docker and mongo

```bash
 docker run --name api-mongo -v /data/db -p 27017:27017 -d mongo 
```

Data will get backed up to the data dir when we do an export

## URL

* API endpoint: http://localhost:3003
* Swagger UI: http://localhost:3003/docs
* Swagger json: http://localhost:3003/api/swagger

