# Cable.tech Backend Technical Challenge

## Overview

This technical challenge is designed to help us evaluate your technical capability in the context of the types of problems we solve at Cable.

### You can take as much time as you like

There is no limit on how much time you can take to complete this technical challenge. We'll set loose deadlines as part of our interview process, but they can be extended if circumstances change, or you simply need a little extra time.

### The challenge is designed to resemble the type of work we do at Cable

We don't think there's much point in testing your ability to complete simple algorithmic challenges, so this challenge is based on the type of technical problems we encounter at Cable.

### Email us if you get stuck

If there are aspects of this challenge you don't understand please email us for clarification. We won't walk you through the challenge, but want make sure you don't accidentally waste time trying to solve a problem we didn't intentionally want you to solve.

## Challenge

The challenge is to build two small systems, an API for allowing customers to send us data, and a system to process that data and produce "alerts"

Included in this repository is a test dataset of randomly generated data that should be submitted to your API and used for analysis. There is no hard requirement to stick to the data model in the dataset, but it is recommended.

### API

The API should allow a customer to submit and read basic data about their users including the following data fields.

```
    User ID
    Name
    Address Lines
    Postal Town
    Postal Code
    Country
    Date of Birth
    Email
    Phone Number
    Account Status
    Signup Time
```

Think about authentication, authorization and multi-tenant usage; it should be possible for multiple customers to submit and read data to this API. Data for one customer should not be accessible to another customer.

Please also provide a way for us to automatically submit the data in the provided dataset to your API, in addition to setup instructions. You don't need to build a production quality deploy system, basic local execution is enough.

### Alerts

The alerting system should produce alerts for the following conditions

- Users with active account status under the age of 18
- Users with active account status from a prohibited postcode (LK, JN, SW, RL)
- Users with missing or invalid email address

These alerts should be stored somewhere and be queryable using the API

### How to Run the API system

cd exercise
npm install
node app.js
opem another termilal
run node sendData.js // post data in dataset.json into sequelize db
run node alerts.js // filter customer users with create new alerts and save to alerts table
