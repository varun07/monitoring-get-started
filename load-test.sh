#!/bin/bash

echo "Starting continuous load test..."
echo "Open Grafana dashboard at: http://localhost:3001"
echo "Press Ctrl+C to stop"
i=0
while [ $i -lt 100 ]; do
    # Generate 30 requests to /api/test every 2 seconds
    for j in {1..100}; do
        curl -s http://localhost:3000/api/test > /dev/null &
    done
    
    # Generate 5 requests to /health every 2 seconds
    for k in {1..5}; do
        curl -s http://localhost:3000/health > /dev/null &
    done
    
    wait
    echo "$(date): Generated 15 requests"
    sleep 0.1
    i=$((i+1))
done