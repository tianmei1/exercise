### Solution and How to Run the API System

```bash
cd exercise
npm install
node app.js
# open another split terminal
run node sendData.js  #post data in dataset.json into sequelize db
run node alerts.js #filter customer users with create new alerts and save to alerts table
```
you will able to view the data.db by installing the extension app `SQLite Viewer`


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


