# Angular 2 universal - Kanban board

### Setup
- Clone the project
- Run **mkdir data**
- Run npm scripts
```sh
$ npm install
$ npm run-script start-mongo-db
$ npm run-script import-mongo-db
```

### Usage
##### 1. Standalone backend app:
- Run script
```sh
$ npm run-script start-legacy-server
```
- Navigate to **http://localhost:2003**

##### 2. Traditional SPA:
- Run script
```sh
$ npm run-script start-webapp-server
```
- Navigate to **http://localhost:2009**

##### 3. Angular 2 Universal app - Kanban board:
- Run script
```sh
$ npm run-script start
```
- Navigate to **http://localhost:2016**
