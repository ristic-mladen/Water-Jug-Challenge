# Water Jug Challenge

A full-stack implementation of the classic **Water Jug Problem**, featuring a modern frontend built with **Aurelia 2 + Vite** and a backend powered by **ASP.NET 10**.

---

## 📌 Overview

The **Water Jug Problem** is a classic algorithmic challenge often used in computer science to demonstrate problem-solving strategies such as **state space search (BFS/DFS)** and mathematical reasoning. ([GitHub][1])

This project provides a clean, interactive way to explore and solve the problem through a web interface, backed by a robust API.

---

## ✨ Features

* 🧠 Solve the Water Jug problem interactively
* 🔄 Step-by-step solution visualization
* ⚡ Fast and modern frontend (Aurelia 2 + Vite)
* 🔧 Backend API for computations (ASP.NET 10)
* 📦 Monorepo structure with npm tooling
* 🧩 Separation of concerns (client/server)

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js **22.14.0**
* npm
* .NET SDK **10**

---

## 📦 Installation

```bash
git clone https://github.com/ristic-mladen/Water-Jug-Challenge.git
cd Water-Jug-Challenge
```

---

## 💻 Frontend (Aurelia 2 + Vite)

### Install dependencies

```bash
cd WaterJugChallenge.Client
npm install
```

### Start client

```bash
npm start
```

---

## 🖥️ Backend (ASP.NET 10)

### Navigate to backend

```bash
cd WaterJugChallenge.Server
```

### Restore dependencies

```bash
dotnet restore
```

### Build the project

```bash
dotnet build
```

### Run the API

```bash
dotnet run
```

---

## 🔗 API Communication

The frontend communicates with the backend API to:

* Calculate valid jug transitions
* Generate solution paths
* Validate user input
* Return step-by-step results

Ensure both **client** and **server** are running for full functionality.

---

## ⚙️ Configuration

### Frontend Environment (`public/config.json`)

```
{
  "apiEndpoint": "https://localhost:7061"
}
```

### Backend Configuration (`appsettings.json`)

```
{
  "AllowedOrigins": "http://localhost:9000"
}
```

---
