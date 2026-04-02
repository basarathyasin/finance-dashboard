const app = require("./app");
const { connectDatabase } = require("./config/database");
const { MONGODB_URI, PORT } = require("./config/env");

async function startServer() {
  try {
    console.log("[Server] starting...");
    console.log("[Env] loading configuration...");
    console.log(`[Env] port=${PORT}`);

    await connectDatabase(MONGODB_URI);

    console.log("[Express] starting...");
    app.listen(Number(PORT), () => {
      console.log(`[Server] running on port ${PORT}`);
    });
  } catch (error) {
    console.log("[Server] startup failed", error);
    process.exit(1);
  }
}

startServer();
