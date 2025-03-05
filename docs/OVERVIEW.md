# Full Stack Blueprint Overview

## Table of Contents
- [Full Stack Blueprint Overview](#full-stack-blueprint-overview)
  - [Table of Contents](#table-of-contents)
  - [1. Overview](#1-overview)
    - [Technologies Used:](#technologies-used)
  - [2. Key Components](#2-key-components)
    - [Server](#server)
    - [Client](#client)
    - [SQL](#sql)
    - [Core Functions/Components:](#core-functionscomponents)
  - [3. Data Flow](#3-data-flow)
  - [4. How to Run](#4-how-to-run)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
  - [5. Key Features](#5-key-features)
  - [6. Directory Structure](#6-directory-structure)
    - [Main Directories](#main-directories)
    - [Key Files](#key-files)

## 1. Overview

Full Stack Blueprint is a minimalist template for building modern full-stack applications with a focus on AI-driven development. It provides a clean, structured foundation for web applications with separate client and server components. The project is designed to be used as a starting point for applications generated with AI agents.

### Technologies Used:
- **Bun** - JavaScript runtime and package manager
- **TypeScript** - Programming language
- **Pico CSS** - Minimal CSS framework
- **Biome** - Code formatting and linting
- **Playwright** - Testing framework

## 2. Key Components

### Server
- Backend services and API endpoints built with Bun's native HTTP server
- Organized in a clean architecture pattern with domain, API, and shared modules

### Client 
- Frontend web application with HTML/CSS/TypeScript
- Uses web components for modular UI construction
- Styled with Pico CSS for minimalist design

### SQL
- Directory for database queries and schema definitions

### Core Functions/Components:
- **initializeServer()** - Sets up the Bun HTTP server with configured routes
- **apiRoutes** - Defines the API endpoints and their handlers
- **app-component** - Main web component that serves as the entry point for the client UI
- **tools API** - Endpoints for application tools and utilities

## 3. Data Flow

- Client makes HTTP requests to the server API endpoints
- Server processes requests through the appropriate controller
- Data flows from the API layer to the domain layer for business logic processing
- SQL queries are executed as needed
- Responses are formatted and returned to the client
- Client components update based on received data

The application follows a RESTful architecture pattern with clear separation between client and server components.

## 4. How to Run

### Prerequisites
- Install Bun runtime (v1.2.0+)
```bash
# Windows
powershell -c "irm https://bun.sh/install.ps1 | iex"
```

### Installation
```bash
# Clone the repository
git clone https://github.com/AIcodeAcademy/full_stack_blueprint.git my-project
cd my-project

# Install dependencies
bun i
```

### Development
```bash
# Run both client and server
bun start

# Run only client
bun client

# Run only server
bun server
```

## 5. Key Features

- **Minimal Dependencies** - Focuses on essential packages to keep the application lightweight
- **TypeScript Support** - Full TypeScript support for both client and server
- **AI-Ready Structure** - Organized to be easily extended by AI code generators
- **Dev Environment** - Pre-configured development environment with hot reloading
- **API Framework** - Simple but powerful API routes system
- **Web Components** - Uses native web components for UI modularity

## 6. Directory Structure

### Main Directories
- **src/** - Source code for the application
  - **client/** - Frontend code
    - **app/** - Web components and application logic
    - **domain/** - Client-side business logic
    - **shared/** - Shared utilities
  - **server/** - Backend code
    - **api/** - API endpoints and controllers
    - **domain/** - Business logic and models
    - **shared/** - Utilities and helpers
  - **sql/** - SQL queries and database schema
- **docs/** - Project documentation
- **.ai/** - AI agent instructions for code generation
- **.cursor/rules/** - Rules for Cursor Composer
- **.vscode/instructions/** - Instructions for GitHub Copilot

### Key Files
- **src/main.ts** - Application entry point that runs both client and server
- **src/server/main.ts** - Server initialization and configuration
- **src/client/index.html** - Main HTML entry point for the client
- **src/client/app.component.ts** - Main web component
- **package.json** - Project configuration and dependencies

---
[Project Repository](https://github.com/AIcodeAcademy/full_stack_blueprint) 