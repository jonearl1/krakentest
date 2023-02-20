# KrakenFlex Back End Test

# Jon Earl

# Introduction

This is a typescript project completing the task asked as part of the Krakenflex technical test.

## Setup

```sh
# Install dependencies
npm install

# Run typescript
npm run build

# Run the tests
npm run tests
```

# Running

As the method of triggering or running the code ( or type of infrastructure ), I have chosen to demonstate the outcome through tests. The functionality is demonstrated through the unit tests (test/unit folder) and there is a single "integration" test ( test/integration" ) showing the behaviour against real world endpoints, using the norwich-pear-tree example from the requirements document. Both sets of tests can be run using the above npm command.

# Extra requirements

As the API key is required to make any of the requests, I have chosen to reference it from an environment variable to avoid any attempt at committing it to source control. Please set KRAKEN_API_KEY to a valid key before attempting to run the tests.

# Error handling

For the 4xx errors, there is no obvious requirement for the code to continue running after receiving one. I have added a handler for 403 errors to demonstrate how they could potentially be caught and have additional logging added to them, using a custom error.
