# Express.js Application with Monitoring

A simple Express.js REST API application with built-in monitoring capabilities, containerized with Docker for easy local development.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Local Development](#local-development)
  - [Docker Development](#docker-development)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Docker Configuration](#docker-configuration)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Express.js REST API server
- Built-in health and metrics endpoints
- Docker containerization with development/production profiles
- Hot reload development with nodemon
- Lightweight and fast startup
- Ready for monitoring integration

## 🛠️ Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm or yarn

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monitoring-get-started
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Local Development
```bash
# Start the application locally
npm start

# Start with hot reload
npm run dev
```

The application will be available at http://localhost:3000

### Docker Development

#### Development Mode (with hot reload)
```bash
npm run docker:up-dev
```

#### Production Mode
```bash
npm run docker:up
```

## 🌐 API Endpoints

- **`GET /`** - Root endpoint with API information
- **`GET /api/test`** - Test endpoint returning JSON response  
- **`GET /health`** - Health check endpoint
- **`GET /metrics`** - Prometheus metrics endpoint

## 📜 Available Scripts

```bash
# Application Scripts
npm start                    # Start the application
npm run dev                 # Start with nodemon (hot reload)

# Docker Scripts  
npm run docker:build        # Build Docker images
npm run docker:up           # Start production containers
npm run docker:up-dev       # Start development container
npm run docker:down         # Stop all containers
npm run docker:logs         # View container logs

# Monitoring Scripts
npm run monitoring:up       # Start monitoring stack
npm run monitoring:full     # Start app + monitoring
npm run monitoring:down     # Stop monitoring services
```

## 📁 Project Structure

```
monitoring-get-started/
├── index.js                    # Main Express.js application
├── package.json               # Dependencies and scripts
├── Dockerfile                 # Container configuration
├── docker-compose.yml         # Multi-service orchestration
├── prometheus.yml             # Prometheus configuration
├── grafana/                   # Grafana provisioning
│   └── provisioning/
│       ├── datasources/       # Auto-configure Prometheus
│       └── dashboards/        # Pre-built dashboards
├── README.md                  # This file
└── MONITORING.md              # Detailed monitoring guide
```

## � Docker Configuration

The application supports multiple deployment modes using Docker Compose profiles:

### **Development Profile**
```bash
npm run docker:up-dev
```
- Hot reload with nodemon
- Source code mounted as volume
- Runs on port 3000

### **Production Profile** 
```bash
npm run docker:up
```
- Optimized production build
- No source code mounting
- Runs on port 3000

### **Monitoring Profile**
```bash
npm run monitoring:up
```
- Prometheus, Grafana, Node Exporter
- Data persistence with Docker volumes
- See [MONITORING.md](MONITORING.md) for details

## 📊 Monitoring

This application includes built-in monitoring capabilities with Prometheus and Grafana.

**For complete monitoring setup and usage instructions, see [MONITORING.md](MONITORING.md)**

Quick monitoring commands:
```bash
npm run monitoring:full     # Start app + full monitoring stack
npm run monitoring:up       # Start monitoring services only
```

## 🐛 Troubleshooting

### **Application won't start**
```bash
# Check if port 3000 is in use
lsof -i :3000

# View application logs
npm run docker:logs
```

### **Docker issues**
```bash
# Rebuild containers
npm run docker:down
docker system prune -f
npm run docker:up

# Check container status
docker-compose ps
```

### **Permission errors (macOS/Linux)**
```bash
# Fix Docker volume permissions
sudo chown -R $USER:$USER .
```

### **Port conflicts**
If you encounter port conflicts, modify the ports in `docker-compose.yml`:
- Application: `3000:3000` → `YOUR_PORT:3000`
- Monitoring services: See [MONITORING.md](MONITORING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

**Happy coding! 🚀**