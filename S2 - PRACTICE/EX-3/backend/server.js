const app = require('./app.js');
const db = require('./db/database.js');

const PORT = 3333;

async function startServer() {
  try {
    await db.authenticate();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
