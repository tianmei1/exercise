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
  return response.data.token;
}

// Function to submit data
async function submitData(token) {
  for (const data of dataset) {
    try {
      const response = await axios.post("http://localhost:3000/users", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
  const token = await registerAndLogin();
  await submitData(token);
}

main();
