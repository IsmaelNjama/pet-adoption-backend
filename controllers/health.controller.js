const mongodb = require("../utils/mongodb");

module.exports = {
  healthCheck: async (req, res, next) => {
    try {
      // Check database connectivity by performing a simple operation
      let dbStatus = "disconnected";
      let dbPingTime = null;

      try {
        // Measure database response time
        const startTime = Date.now();

        // Try to get a count from the users collection
        // This is a lightweight operation to test connectivity
        const usersCollection = mongodb.users();
        await usersCollection.countDocuments();

        dbPingTime = Date.now() - startTime;
        dbStatus = "connected";
      } catch (dbError) {
        console.error("Database health check failed:", dbError);
        dbStatus = "error";
      }

      // Check memory usage
      const memoryUsage = process.memoryUsage();

      // Check uptime
      const uptime = process.uptime();

      // Determine overall health status
      const isHealthy = dbStatus === "connected";

      const healthData = {
        status: isHealthy ? "healthy" : "unhealthy",
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(uptime / 60)} minutes, ${Math.floor(
          uptime % 60
        )} seconds`,
        database: {
          status: dbStatus,
          responseTime: dbPingTime ? `${dbPingTime}ms` : null,
          healthy: isHealthy,
        },
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        },
        environment: process.env.NODE_ENV || "development",
        version:
          process.env.npm_package_version || require("../package.json").version,
      };

      // Return appropriate status code based on health
      res.status(isHealthy ? 200 : 503).json(healthData);
    } catch (error) {
      console.error("Health check error:", error);
      res.status(500).json({
        status: "error",
        message: "Health check failed",
        error: error.message,
      });
    }
  },

  // Simple endpoint that always returns OK for basic liveness checks
  // This can be used by load balancers that just need a 200 response
  livenessCheck: (req, res) => {
    res.status(200).send("OK");
  },
};
