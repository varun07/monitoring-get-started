# 📊 Express.js Monitoring Guide

**Complete Prometheus & Grafana monitoring setup with automatic Node.js instrumentation**

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────┐
│            Docker Compose                      │
├────────────────────────────────────────────────┤
│                                                │
│  Express.js ──→ Prometheus ──→ Grafana         │
│   :3000           :9090         :3001          │
│      │                                         │
│      │                                         │
│      └──→ Node Exporter ──┘                    │
│            :9100                               │
│                                                │
└────────────────────────────────────────────────┘

Flow: App metrics → Storage → Visualization
```

## 🚀 Quick Start

```bash
# Option 1: Development app + full monitoring stack
npm run monitoring:full

# Option 2: Production app + monitoring stack  
npm run docker:up && npm run monitoring:up

# Option 3: Monitoring services only
npm run monitoring:up
```

**⚠️ Note:** `monitoring:full` runs both dev and production profiles, which may cause port conflicts. Use Option 2 for production.

## 🌐 Access Points

| **Service** | **URL** | **Login** |
|-------------|---------|-----------|
| **Express App** | http://localhost:3000 | - |
| **Metrics** | http://localhost:3000/metrics | - |
| **Health Check** | http://localhost:3000/health | - |
| **Prometheus** | http://localhost:9090 | - |
| **Grafana** | http://localhost:3001 | `admin/admin` |

## 📈 Key Metrics Monitored

### Application Metrics
- **`http_requests_total`** - Request count by method/route/status
- **`http_request_duration_seconds`** - Response time histogram
- **`process_resident_memory_bytes`** - Memory usage
- **`nodejs_heap_size_used_bytes`** - Node.js heap usage
- **`nodejs_eventloop_lag_seconds`** - Event loop performance

### System Metrics (Node Exporter)
- CPU usage & load average
- Memory & swap utilization
- Disk I/O & space usage
- Network interface stats

## 📊 Pre-built Grafana Dashboard

**"Express.js Monitoring Dashboard"** includes:

1. **HTTP Request Rate** - Real-time request volume
2. **Response Time (95th percentile)** - Application performance
3. **Memory Usage** - RSS and heap memory tracking
4. **CPU Usage** - User and system CPU time
5. **Status Code Distribution** - Error rate visualization
6. **Event Loop Lag** - Node.js specific performance

## 🛠️ Available Commands

```bash
# Development Commands
npm run docker:up-dev          # Development mode with hot reload (port 3000)
npm run docker:up              # Production mode (port 3000)

# Monitoring Commands  
npm run monitoring:up          # Start monitoring stack only
npm run monitoring:full        # Start dev app + monitoring stack
npm run monitoring:production  # Start production app + monitoring stack
npm run monitoring:down        # Stop monitoring services
npm run monitoring:logs        # View monitoring logs

# Utility Commands
npm run docker:logs            # View all container logs
npm run docker:down            # Stop all services
```

## 🔧 Configuration Files

| **File** | **Purpose** |
|----------|-------------|
| `prometheus.yml` | Prometheus scraping configuration |
| `grafana/provisioning/datasources/` | Auto-configure Prometheus connection |
| `grafana/provisioning/dashboards/` | Pre-load monitoring dashboards |
| `docker-compose.yml` | Multi-service orchestration with profiles |

## ⚡ Performance Thresholds

| **Metric** | **Good** | **Warning** | **Critical** |
|------------|----------|-------------|--------------|
| Response Time (95th) | < 200ms | 200-500ms | > 500ms |
| Memory Usage | < 70% | 70-85% | > 85% |
| Error Rate | < 1% | 1-5% | > 5% |
| Event Loop Lag | < 10ms | 10-50ms | > 50ms |

## 🚨 Troubleshooting

### **Metrics Not Showing?**
```bash
# Check metrics endpoint
curl http://localhost:3000/metrics

# Verify Prometheus targets
# Go to: http://localhost:9090/targets
```

### **Grafana Dashboard Empty?**
1. Verify Prometheus datasource: **Configuration → Data Sources**
2. Check Prometheus connection: **Test** button should be green
3. Refresh dashboard or adjust time range

### **Container Issues?**
```bash
# Check service status
docker-compose ps

# View specific service logs
docker-compose logs prometheus
docker-compose logs grafana

# Restart services
npm run monitoring:down && npm run monitoring:up
```

### **Port Conflicts?**
Default ports: `3000` (app), `3001` (Grafana), `9090` (Prometheus), `9100` (Node Exporter)
- Modify ports in `docker-compose.yml` if needed
- Update Prometheus targets accordingly

## 🔒 Security Notes

- **Change default Grafana password** (`admin/admin`) in production
- **Restrict monitoring port access** using firewalls
- **Use environment variables** for sensitive configuration
- **Regular security updates** for base Docker images

## 📱 Mobile Dashboard Access

Grafana dashboards are mobile-responsive. Access monitoring from any device using the Grafana URL.

## 🎯 Custom Metrics

Add your own business metrics:

```javascript
const customMetric = new promClient.Counter({
  name: 'custom_business_events_total',
  help: 'Custom business events',
  labelNames: ['event_type', 'user_type']
});

// Usage
customMetric.inc({ event_type: 'signup', user_type: 'premium' });
```

---

**🎉 You now have enterprise-grade monitoring for your Express.js application!**

*Dashboard auto-refreshes every 5 seconds • Data retained for 200 hours • Zero configuration required*