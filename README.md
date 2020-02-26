 Reactjs with TypeScript + Node.js with TypeScript + Docker 
 

## Installation

please install node and yarn

```
$ git clone [repo] 
$ cd client/
$ yarn install
$ cd ../server/
$ yarn install
$ cd ../
$ docker-compose up --build
```

Wait for the container to startup (first time startup is ~3min, subsequent container startups will be faster). After container starts, yarn will start the frontend and backend builds.

Upon completion of the builds, 
* React app will be accessible here [http://localhost:9001/](http://localhost:5000/)
* API End points would be called using [http://localhost:9001/api/END_POINT](http://localhost:5000/api/END_POINT)

### Frontend 

* React.js with TypeScript
* Redux.js

### Backend
* Nodejs with TypeScript
* Backend routes will be matched when the URL path starts with "/api"
* MongoDB is used.
