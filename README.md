# SHOWMAN Backend

REST API for SHOWMAN, built with Node.js, Express, and MongoDB through Mongoose.

## Requirements

- Node.js and npm
- A MongoDB database

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root:

   ```dotenv
   PORT=4000
   CURRENTSERVER=mongodb://127.0.0.1:27017/showman
   ```

   `CURRENTSERVER` must be a MongoDB connection URI. `PORT` is optional and
   defaults to `4000`. Keep real credentials out of source control.

3. Start the server:

   ```sh
   npm start
   ```

   The server listens on the configured port and connects to MongoDB.

## API documentation and examples

- Swagger UI: `http://localhost:4000/api-docs`
- OpenAPI JSON: `http://localhost:4000/api-docs.json`
- [API.rest](./API.rest) contains sample requests for the active routes. Open it
  in VS Code with the REST Client extension to send requests. Adjust its
  `@baseUrl` if the server is running on another port.

All responses use JSON. The exact response fields vary by endpoint; most return
`success` and `message`, and data-fetching endpoints may also return `data`.

## Routes

### General

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Health/welcome response |

### Users

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/user/accounts` | Create an account |
| `POST` | `/user/sessions` | Log in |
| `DELETE` | `/user/sessions` | Sign out |
| `POST` | `/user/password-resets` | Password-reset placeholder |

### Customers

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/customer/id` | Preview the next customer ID |
| `POST` | `/customer` | Create a customer |
| `GET` | `/customer` | List customers |
| `GET` | `/customer/names` | List customer names and IDs |
| `GET` | `/customer/:id` | Get a customer by ID |
| `GET` | `/customer/:id/details` | Get customer details by ID |
| `PUT` | `/customer/:id` | Update a customer |
| `DELETE` | `/customer/:id` | Delete a customer |

### Employees

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/employee/id` | Preview the next employee ID |
| `POST` | `/employee` | Create an employee |
| `GET` | `/employee/names` | List employee names and IDs |
| `GET` | `/employee/:id` | Get an employee by ID |
| `PUT` | `/employee/:id` | Update an employee |

### Jobs

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/job/id` | Preview the next job ID |
| `POST` | `/job` | Create a job for an existing customer |
| `GET` | `/job` | List jobs |
| `GET` | `/job/:id` | Get a job by ID |
| `GET` | `/job/:id/price` | Get the prices recorded on a job |
| `GET` | `/job/customer/:c_id/jobs` | List a customer's jobs |
| `POST` | `/job/customer/:c_id/jobs` | Add a job to a customer |
| `DELETE` | `/job/customer/:c_id/jobs/:job_id` | Remove a job from a customer |
| `GET` | `/job/mobile/:mobile` | Find jobs by customer phone number |
| `GET` | `/job/dates` | Find jobs by return-date range; provide `startDate` and `endDate` query parameters |

### Prices

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/price` | Add a price record |
| `GET` | `/price` | Get the latest prices |

### Database

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/db/backup` | Return database collections in the response |
| `POST` | `/db/restore` | Replace database collections from a ZIP file |

Use the Swagger UI for request schemas and the REST examples for sample bodies.
The IDs in those examples are placeholders; create or substitute records that
exist in your database when trying dependent requests.

## Database backup and restore

`POST /db/backup` returns the Price, Customer, JobData, and Admin collections in
its response. Save that data in the format expected by the restore process.

`POST /db/restore` expects a JSON body containing a server-local ZIP path:

```json
{
  "path": "C:\\backups\\showman.zip"
}
```

The ZIP must contain a `data.json` file with `priceCollection`,
`jobDataCollection`, `customerCollection`, and `adminCollection` arrays.
Restore deletes the existing records from those collections before inserting
the supplied data. Use it only with a verified backup.

## Development

```sh
npm start
```

The `npm test` script currently starts the server with `nodemon`; it does not
run an automated test suite.

## Security notes

JWT authentication is not currently implemented, and the data routes do not
require login. Do not expose this API to untrusted networks without adding
authentication and appropriate access controls. The password-reset endpoint is
a placeholder and does not currently change a password. The signout handler
also depends on an auth provider that is not configured in this project.
