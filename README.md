# Amazon Shopping Cart Testing Suite

This project contains automated tests for Amazon's shopping cart functionality using Cypress. The tests validate adding products to the cart, managing cart contents, and cleaning up after test execution.

## Project Overview

The testing suite consists of three main task groups:

- Task 1: Search, and basic functionality tests
- Task 2: Navigation and customer service tests
- Task 3: Shopping cart tests with proper setup and teardown

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Cypress installed (npm install cypress --save-dev)
- Amazon test account

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/FirasNaarani/AWS_Cypress_Tests.git
   cd ./AWS_Cypress_Tests
   ```

2. Insall dependencies:

   ```bash
   npm install
   ```

## Configuration

Modify the name of `.env.txt` file to `.env` in the project root with your Amazon test account credentials:

    ```env
    CYPRESS_BASE_URL=https://www.amazon.com
    EMAIL=ReplaceYourEmail
    PASS=ReplaceYourPassword
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`CYPRESS_BASE_URL=https://www.amazon.com`

`EMAIL=ReplaceYourEmail`

`PASS=ReplaceYourPassword`

## Project Structure

```Plaintext
cypress/
├── e2e/
│   └── amazon/
│       ├── Task_1.cy.js    #   The first task is to familiarize oneself with the website.
|       ├── Task_2.cy.js    #   The goal of the second task is to get familiar with Cypress and to write the first automated test.
|       └── Task_3.cy.js    #   This task aims to write some test cases and implement them in a new test suite.
├── support/
│   ├── AmazonProd.js          # Product class
│   ├── BaseTestCase.js        # Base test case
│   ├── commands.js            # Custom commands
│   └── e2e.js                 # e2e configuration
└── fixtures/
    └── Data.json              # Product test data
```

## Test Data

All test data for `Task_3` is stored in the `cypress/fixtures/Data.json` file. This file contains information about the products used in the shopping cart tests.

## Running Tests

To run the tests in the Cypress UI:

```bash
  npx cypress open
```

To run tests headlessly:

```bash
  npx cypress run
```

To run a specific test file:

```bash
  npx cypress run --spec "cypress/e2e/amazon/Task_3.cy.js"
```

## Test Cases

### Task 1: Basic Functionality Tests

#### Task 1.2 outlines test cases for:

- User Authentication Test - Validates login with valid and invalid credentials
- Product Search Test - Verifies search functionality returns relevant results
- Shopping Cart Test - Validates add/remove items and cart persistence
- Checkout Process Test - Validates complete checkout flow through payment
- Product Filtering Test - Verifies product filtering and sorting options

#### Task 1.3 implements:

- Detailed Search Test - Searches for "_iPhone_" and performs multiple verification checks to ensure search results are relevant

### Task 2: Navigation Tests

- Main Menu and Customer Service Navigation - Validates main menu items in the top navigation bar
- Customer Service Content - Navigates to Customer Service and verifies content
- Help Search - Searches for "Where's My Stuff?" in the help section and validates results

### Task 3: Shopping Cart Tests

The shopping cart tests implement proper test independence by:

- Starting each test with adding two items to the cart
- Ending each test by emptying the cart completely

Specific test cases include:

1. Add multiple items to cart - Adds multiple pencil sharpeners and verifies cart content
2. Add individual products - Individual tests for adding different types of products
3. Cart management - Tests for managing items in the cart

## Support Classes

### AmazonProduct Class

The `AmazonProduct` class encapsulates product information and operations:

- Constructor: Stores brand, name, color, and URL
- SearchByName: Searches for a product by name
- SearchByUrl: Opens a product directly by URL
- SelectColor: Selects the specified color
- AddToCart: Adds the product to the cart and handles popups

### AmazonTestBase Class

The `AmazonTestBase` class provides common test functionality:

- Start: Visits the Amazon homepage
- DismissPopup: Handles common popups and alerts
- Login: Logs in to the Amazon account if needed
- GoToCart: Navigates to the shopping cart
- CleanUpCart: Removes all items from the cart

## Troubleshooting

If you encounter issues with the tests:

1. Selector issues: Amazon's website structure may change. Update selectors in the support classes.
2. Color selection problems: If colors aren't being selected correctly, verify the color values in the JSON file match what appears on Amazon.
3. Login failures: Amazon may require captcha or other verification. Consider using a dedicated test account.
4. Timing issues: Adjust the wait times in the test code if elements aren't loading quickly enough.

## Notes

- #### These tests are designed for educational purposes
- #### Use a dedicated test account to avoid affecting your personal Amazon account
- #### The tests are designed to clean up after themselves, but verify your cart manually after test runs

## Authors

- [@Firas Naarani](https://www.github.com/FirasNaarani)
