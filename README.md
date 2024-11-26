### Playwright Assessment

npx playwright test
    Runs the end-to-end tests.

npx playwright test --ui
    Starts the interactive UI mode.

npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

npx playwright test example
    Runs the tests in a specific file.

npx playwright test --debug
    Runs the tests in debug mode.

npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - .\playwright.config.ts - Playwright Test configuration

npx playwright test --project=chromium --headed
    Runs the tests only on Desktop Chrome in headed mode with UI.

npx playwright test example.spec.ts --project=chromium --headed
    Runs only the specific file in headed mode in chromium browser.

npx playwright test -g "has title" --project=chromium --headed
    Runs only the specific test in headed mode in chromium browser.

npx playwright test --project=chromium --trace on
    Helps in debugging with the help of screenshots.

npx playwright test --project=chromium --debug

npm init playwright@latest --force
    Run the command when started working on a new playwright repo to install playwright 

npm i @faker-js/faker
    Command for test data generation

npx playwright test --project=chromium --grep @smoke
    To run specific tests by adding tags into it

npm i dotenv
    To install dot env js

npm i @faker-js/faker
    For random test data generation