# Next.js Real-time Price Data Application

This is a Next.js application that fetches real-time price data for various stocks or cryptocurrencies and displays it in a dynamic table. The application uses TypeScript, Redux, MongoDB, and a cron job to continuously fetch and store data.

## Table of Contents

- [File Structure](#file-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## File Structure

```
 real-time-data-viewer/
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
```

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shashankusinggithub/real-time-crypto-data.git
   cd real-time-crypto-data
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   Ensure you have a MongoDB database set up and note the connection URI.

4. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your-mongodb-connection-uri
   ```

## Running the Application

1. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables

- `MONGODB_URI`: The connection string for your MongoDB database.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript.
- **Redux**: State management library.
- **MongoDB**: NoSQL database.
- **Axios**: Promise-based HTTP client.
- **node-cron**: Task scheduler for cron jobs.
- **CSS Modules**: CSS files in which all class and animation names are scoped locally by default.

## Detailed Explanation

### Redux for State Management

Redux is used to manage the state of the application. The price data is fetched from the server and stored in the Redux store. The UI components access this data using selectors.

### Components

- **PriceTable**: Displays the latest price data in a table format. The data is fetched every 5 seconds to ensure real-time updates.
- **ChangeStockModal**: A modal component that allows users to select a different stock or cryptocurrency to view. Users can select from a predefined list or add a new one.

### Logging

A custom logger is set up using `winston` to log important information and errors. The logs help in monitoring the data fetching process and debugging issues.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Summary

This README file provides an overview of the project, including its structure, setup instructions, running the application, environment variables, technologies used, and a detailed explanation of key components. It ensures that any developer can understand and run the project efficiently.
