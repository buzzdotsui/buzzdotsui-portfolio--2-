# 📊 InfraUI

**Live Infrastructure Monitoring Dashboard**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Status-Beta-yellow?style=for-the-badge)

## 🚀 Overview

InfraUI is a React-based frontend that visualizes the security metrics collected by **LogSentinel** and **AutoRecon**. It provides a "single pane of glass" for monitoring server health, active threats, and uptime stats.

### 🛡️ Features

- ** Live Metrics:** Real-time updates for CPU/RAM and Network IO.
- ** Threat Feed:** Displays recent IPs blocked by LogSentinel.
- ** Visualizations:** Dynamic traffic charts and alert heatmaps.
- ** API Integration:** Consumes JSON payloads from backend monitoring agents.

## 📦 Run Locally

```bash
npm install
npm run dev
```

Since this is a frontend for a secure internal system, the public version uses **mock data generators** to demonstrate functionality without exposing sensitive infrastructure details.

## 🏗️ Architecture

```mermaid
graph TD
    A[LogSentinel] -->|JSON| B(API Gateway)
    C[AutoRecon] -->|JSON| B
    B -->|WebSocket| D[InfraUI React App]
    D -->|Renders| E[Admin Dashboard]
```

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
