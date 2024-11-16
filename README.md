#Stealth

## Tech Stack:

* Node - v18.17.0 or Higher

* Npm - v9.6.7 or Higher

## Getting Started:

#### Install all the above tools in your local machine.
  
#### To Install all the dependencies by running the following command in your project root folder.

* `npm install`

#### Create a .env file and include all the necessary environment variables and keys.
#### Refer .env.exapmle file for environment variables.
#### Execute the following command in the project's root folder to start the application

* `node index.js`

#### Visit http://localhost:3001 to access the application.

# **API Authentication and Testing Guide**

To ensure the APIs are not publicly accessible and to track the users interacting with them, a **Basic Authentication** mechanism has been implemented. All API requests require an authentication token to be included as a **Bearer Token** in the request headers.

## **Postman Collection**

To simplify the testing process, a Postman collection has been provided.

1. **Postman Collection**:  
   Use the following link to access the Postman collection:
     
   ```https
   https://api.postman.com/collections/22577116-eac99ffb-db2d-4b6f-98b6-9b86adbf7e94?access_key=PMAT-01JCSTM46YD2FZ4SC8QA60JBXZ
   ```

3. **Import the Collection**:  
   - Open Postman.
   - Go to **File > Import**.
   - paste the URL and import it.

4. **Environment Setup**:  
   - Navigate to **Environments** in Postman.
   - Ensure the `url` and `authToken` variable exists. Example:
     
     ```json
     {
       "url": "http://localhost:3001",
       "authToken": "<your-auth-token>"
     }
     ```

# **Upload Sample User Data API**

This API allows you to upload sample user data to the system by hitting the `/import` endpoint. 

## **Endpoint Overview**

- **Method**: `POST`
- **Endpoint**: `/import`

The request will import the specified user data into the system.

## **Authentication Process**

### **Step 1: Obtain Authentication Token**

Use the **Login API** to authenticate and receive an authentication token.

- **Endpoint**: `/login`
- **Method**: `POST`
- **Request Body**:
  
  ```json
  {
    "userid": "2"
  }
- **Response**:
  
  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

The token will be used as the `authToken` in subsequent API requests. Postman will automatically save it to the environment if configured correctly. If not, manually add it to the environment.

## **Step 2: Use Bearer Token for API Requests**

All subsequent API requests require the `authToken` as a **Bearer Token** in the `Authorization` header.

### **Authorization Header Example**:

```http
Authorization: Bearer <authToken>
```

## **Testing APIs**

### **1. Authenticate**  
Start by calling the `/login` API to retrieve the `authToken`.

### **2. Test Other APIs**  
Use the endpoints provided in the Postman collection. Ensure each request includes the `authToken` in the `Authorization` header.

### **3. Verify Responses**  
Check the response status codes and payloads to ensure the APIs behave as expected.

