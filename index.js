const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'express-app'
});

console.log('✅ Prometheus metrics configured with app label: express-app');

// Enable the collection of default metrics (CPU, Memory, etc.)
client.collectDefaultMetrics({ 
  register,
  timeout: 10000, // Collect every 10 seconds
});

// Create custom metrics
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // buckets for response time from 0.1s to 10s
});

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const appInfo = new client.Gauge({
  name: 'app_info',
  help: 'Application information',
  labelNames: ['version', 'name']
});

// Set app info
appInfo.set({ version: '1.0.0', name: 'monitoring-app' }, 1);

// Register custom metrics
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);
register.registerMetric(activeConnections);
register.registerMetric(appInfo);

// Middleware to collect HTTP metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  // Increment active connections
  activeConnections.inc();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    // Record metrics
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode
    });
    
    httpRequestDuration.observe(
      { method: req.method, route: route },
      duration
    );
    
    // Decrement active connections
    activeConnections.dec();
  });
  
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Hello World! This is a test endpoint.',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Express.js application is running!',
    endpoints: {
      test: '/api/test',
      metrics: '/metrics',
      health: '/health'
    },
    monitoring: 'Prometheus metrics enabled'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test endpoint available at: http://localhost:${PORT}/api/test`);
});

module.exports = app;