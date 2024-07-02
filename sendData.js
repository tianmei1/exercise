const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Load the test dataset
const datasetPath = path.resolve(__dirname, "dataset.json");
const dataset = fs
  .readFileSync(datasetPath, "utf-8")
  .split("\n")
  .filter(Boolean)
  .map(JSON.parse);

// Replace with actual credentials
const credentials = {
  email: "customer@example.com",
  password: "password123",
};

// Function to register and login customer
async function registerAndLogin() {
  try {
    await axios.post("http://localhost:3000/register", {
      name: "Customer",
      ...credentials,
    });
  } catch (error) {
    console.log("User already exists");
  }
  const response = await axios.post("http://localhost:3000/login", credentials);
  return response.data;
}

// Function to submit data
async function submitData(customerData) {
  for (const data of dataset) {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        {
          user_id: data.user_id ?? (Math.random() * 100000).toString(),
          signup_time: data.signup_time,
          name: data.name,
          address_lines: data.address_lines,
          postal_area: data.postal_area,
          postal_code: data.postal_code,
          country: data.country,
          email: data.email,
          phone_number: data.phone_number,
          account_status: data.account_status,
          date_of_birth: data.date_of_birth,
          customer_id: customerData.customer.customerId,
        },
        {
          headers: { Authorization: `Bearer ${customerData.token}` },
        }
      );
      console.log(`Submitted data for user: ${data.name}`);
    } catch (error) {
      console.error(
        `Failed to submit data for user: ${data.name}`,
        error.message
      );
    }
  }
}

async function main() {
  const response = await registerAndLogin();
  await submitData(response);
}

main();
