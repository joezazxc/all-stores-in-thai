

# Web Application to Get Data API and Show Data in List

This is a web application that uses API to get data and display it in a list format. It also provides a registration feature that allows users to edit the data with token authentication.

## Technologies Used

- Frontend: Templating Engine Handlebars, Axios, Bootstrap
- Backend: NodeJS, ExpressJS, Supabase
- Authentication: Username and Password
- Deployment: Vercel

## Getting Started

To run this application on your local machine, follow these steps:

### Prerequisites

- Node.js installed on your machine
- Git installed on your machine (optional)
- A Supabase account and project with the necessary tables created. You can create a free Supabase account at [supabase.io](https://supabase.io/).

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/joezazxc/all-stores-in-thai.git
```

2. Navigate to the project directory:

```bash
cd server
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with the following contents:

```
PORT=<PORT_NUMBER>
DATABASE_URL=<SUPABASE_DATABASE_URL>
SECRCT_EKEYT=<SECRET_KEY>
```

Replace <PORT_NUMBER> with your desired port number (e.g. 5000), <SUPABASE_DATABASE_URL> with your Supabase database URL, and <SECRCT_EKEY> with a secret key for authentication.

5. Start the server:

```bash
npm start
```

6. Open another terminal window, navigate to the `client` directory, and install the dependencies:

```bash
cd client
npm install
```

7. Start the client:

```bash
npm start
```

8. Open your browser and go to `http://localhost:3000` to view the application.

## API Endpoints

The following API endpoints are available:

- `GET /api/stores`: Returns all the stores in the database.
- `POST /api/stores`: Adds new stores to the database.
- `GET /api/stores/:id`: Return stores with the specified ID.
- `PUT /api/stores/:id`: Updates stores with the specified ID.
- `DELETE /api/stores/:id`: Deletes stores with the specified ID.

## Authentication

Authentication is implemented using session-based authentication. When a user registers, their credentials are stored in the database. When they log in, a session is created and stored in memory. The session ID is stored in a cookie on the client side. When the user makes requests to edit data, the session ID is included in the request header. The server checks the session ID to ensure that the user is authenticated.

## Deployment

This application is deployed on Vercel. To deploy your own version of this application, follow these steps:

1. Create an account on Vercel (if you don't have one already).

2. Connect your GitHub account to Vercel.

3. Fork this repository and create a new project on Vercel.

4. Configure the environment variables in the Vercel dashboard.

5. Deploy the project to Vercel.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
