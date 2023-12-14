# NodeApp

Website and API application.

## Install

Install dependencies:

```sh
$ npm install
```

Copy .env.example to to your custom .env.

```sh
cp .env.example .env
```

And setup your configuration.

Load initial data:

```sh
# this command deletes all the data in the database and create default data
$ npm run init-db
```

## Start

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

## Start a MongoDB Server in MacOS or Lin
ux

From the folder of the server:

```sh
./bin/mongod --dbpath ./data
```

## API Endpoints

### GET /api/agentes

```json
{
    "results": [
        {
            "_id": "6511d779c0d44ab041a37592",
            "name": "Smith",
            "age": 24
        }
    ]
}
```