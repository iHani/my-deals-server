# Deals Provider System - API Server

API server for [my-deals app](https://github.com/iHani/my-deals).

# Get Started
To install and start the API server, run the following commands in this directory:

`npm install`

`node server`

The server should be live on http://localhost:3001

## Using The Server

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /deals` | Get list of deals. |  |
| `POST /signup` | will signup new user, you should pass user object in the body (no checking for duplicate users right now). | `{ mobile: <String>, password: <String> }` |
| `GET /auth/check` | Check if user is authenticated, returns `{ isAuthenticated: <Boolean>`` } | No params, will use token from the header |
| `POST /login` | Login user. | `{ mobile: <String>, password: <String> }` |
| `GET /logout` | Logout user, will return `{ loggedOut: true }` if logged out successfully. | |
| `POST /create-new-deal` | Will create a new deal. | `{ dealId: <String>, dealCategory: <String>, dealPartner: <String>, dealPrice: <Number> }` |
| `PUT /deal/:id` | Edit the details of an existing deal. `:id` is `dealId` of the deal to be edited. | `{ dealId: <String>, dealCategory: <String>, dealPartner: <String>, dealPrice: <Number> }` |
| `DELETE /deal/:id` | Deletes a deal from deals list. `:id` is `dealId` of the deal to be deleted | `{ id: <String> }` 'id' is `dealId` of the deal. |


### Licence

MIT
