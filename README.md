# My Crypto Tracker

A mini-website to collect and display real-time price data for cryptocurrencies using Next.js, TypeScript, and Redux. The project includes a separate Node.js server for running a cron job to fetch data periodically and is Dockerized with Nginx as a reverse proxy and MongoDB as the database.

## Features

- Polls real-time data every few seconds for selected cryptocurrencies from LiveCoinWatch.
- Stores the data in a MongoDB database.
- Displays the most recent 20 data entries in a table.
- The table updates dynamically in real-time.
- Allows changing the cryptocurrency via a dropdown.

## Project Structure

```
my-crypto-tracker/
├── crontab-server/
│   ├── lib/
│   │   └── db.js
│   ├── node_modules/
│   ├── .env
│   ├── Dockerfile
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── real-time-data-viewer/
│   ├── app/
│   │   ├── api/
│   │   │   ├── fetchData/[stock]
│   │   │   │   └── route.ts
│   │   │   ├── prices/
│   │   │   │   └── route.ts
│ 	|	|── components
│ 	│ 	|	├── ChangeStockModal.tsx
│ 	│ 	|	├── ChangeStockModal.module.css
│ 	│	|	├── PriceTable.tsx
│ 	│	|	├── PriceTable.module.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── logger.ts
│   │   ├── store.ts
│   │   ├── mongodb.ts
│   │   └── slices/
│   │   |    └── PriceSlice.ts
│   ├── public/
│   ├── .env
│   ├── Dockerfile
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
├── docker-compose.yml
└── nginx.conf
```

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/shashankusinggithub/real-time-crypto-data.git
cd real-time-crypto-data
```

2. **Set up environment variables:**

Create a `.env` file in the `real-time-data-viewer` directory and a `.env` file in the `crontab-server` directory.

### `real-time-data-viewer/.env`

```plaintext
MONGODB_URI=mongodb://mongo:27017/
APIKEY = 112334645645696486yfdgsfdkjglfds
API = https://api.livecoinwatch.com/coins/map
```

### `crontab-server/.env`

```plaintext
MONGODB_URI=mongodb://mongo:27017
```

### Running the Application

1. **Build and start the Docker containers:**

```bash
docker-compose up --build
```

This command will:

- Build the Docker images for the Next.js application (`real-time-data-viewer`), the cron job server (`crontab-server`), and Nginx.
- Start the MongoDB container.
- Start the Next.js application on port 3000.
- Start the cron job server that will fetch and store data periodically.
- Set up Nginx as a reverse proxy on port 80 to forward requests to the Next.js application.

2. **Open your browser and navigate to `http://localhost`.**

You should see the Next.js application running and displaying the real-time cryptocurrency data.

### Stopping the Application

To stop the application and remove the containers, run:

```bash
docker-compose down
```

### Fetching Data

The cron job server automatically polls data from CoinGecko every 5 seconds and stores it in MongoDB.

### Project Structure Details

### `crontab-server/`

- **lib/db.js:** Connects to MongoDB using Mongoose.
- **index.js:** Contains the cron job logic and schedules the task.
- **Dockerfile:** Dockerfile for the cron job server.

### Docker Configuration

#### `docker-compose.yml`

This file defines the services: Next.js app, cron job server, MongoDB, and Nginx.

```yaml
services:

app:

build: ./real-time-data-viewer

container_name: nextjs-app

restart: always

environment:

- MONGODB_URI=mongodb://mongo:27017

- APIKEY = 1d55a7e6-c3e2-4482-893d-51a78a34ee1d

- API = https://api.livecoinwatch.com/coins/map

depends_on:

- mongo

- crontab



mongo:

image: mongo

container_name: mongodb

restart: always

volumes:

- mongo-data:/data/db



nginx:

image: nginx

container_name: nginx

ports:

- "80:80"

volumes:

- ./nginx.conf:/etc/nginx/nginx.conf

depends_on:

- app



crontab:

build: ./crontab-server

container_name: crontab

environment:

- MONGODB_URI=mongodb://mongo:27017

- APIKEY = 1ddsfhskdjhfksdfsdfds

- API = https://api.livecoinwatch.com/coins/map

restart: always

depends_on:

- mongo



volumes:

mongo-data:
```

#### `nginx.conf`

Nginx configuration file for reverse proxy.

```nginx
server {
  listen 80;

  location / {
    proxy_pass http://app:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
