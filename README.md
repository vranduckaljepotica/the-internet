# The Internet Herokuapp - Cypress Test Suite

Comprehensive automated test suite for [The Internet](https://the-internet.herokuapp.com/) practice application.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Installation
```bash
npm install
```

## Running Tests

### Open Cypress Test Runner
```bash
npm run cy:open
```

### Run All Tests (Headless)
```bash
npm run cy:run
```

### Run Specific Test File
```bash
npm run cy:run:spec "cypress/e2e/01-authentication/login.cy.js"
```

### Run in Different Browsers
```bash
npm run cy:run:chrome
npm run cy:run:firefox
```

## Test Coverage

- ✅ Authentication & Login
- ✅ Form Interactions (Checkboxes, Dropdowns, Inputs)
- ✅ Dynamic Content Loading
- ✅ File Upload/Download
- ✅ JavaScript Alerts
- ✅ Drag and Drop
- ✅ Frames & iFrames
- ✅ Multiple Windows
- ✅ Hovers & Context Menu
- ✅ Disappearing Elements

## Project Structure
See folder structure above for organization details.