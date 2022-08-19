# TaskMaker

## Requirements
- Node.js

## Development deployment

Install server npm packages
```
npm install
```
Install client npm packages
```
cd client
npm install
```
Create the `.env` from the `.env.example` in:

- Root folder
- Client folder

Start localhost

```
npm start
```

## Database seeding

Seed database with fake data
```
mongosh taskmaker seed.mongo.js
```
Clear database
```
mongosh taskmaker init.mongo.js
```

## Production deployment

Build SPA
```
npm run build
```