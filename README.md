# Hotel Reservation Application

## Backend written in Node.js with Express server.

### Tree File Directory

```
hotel-reservation-backend
├── README.md
├── controller
│   ├── auth.js
│   ├── hotel.js
│   └── stripe.js
├── middlewares
│   └── index.js
├── models
│   ├── hotel.js
│   └── user.js
├── package-lock.json
├── package.json
├── renovate.json
├── routes
│   ├── auth.js
│   ├── hotel.js
│   └── stripe.js
└── server.js
```

## Endpoints

1. Auth Route
    ```
   * Test: router.get("/test", test);
   > http://127.0.0.1:8000/test
   ```

   ```
   * Login: router.post("/login", login);
   > http://127.0.0.1:8000/api/login
   
   // Content-Type - Application-JSON
   {
    "email": "silvinpradhan95@gmail.com,
    "password": "xxxxxxxx" 
   }
    ```
   ```
   * Register: router.post("/register", register);
   http://127.0.0.1:8000/api/register
   
   // Content-Type - Application-JSON
   {
    "name":"silvin",
   "email":"silvinpradhan95@gmail.com",
   "password":"xxxxxxxx"
   }
   ```
2. Hotel Endpoints

```
   * Create Hotel
```

```
   * List Hotels
```

```
   * Get Single Hotel Image {id}
```

```
   * Delete Hotel {id}
```

```
   * Get Single Hotel {id} '-image.data'
```

```
   * Get Seller Hotels
```

## Environment Variables

Create .env with these variables:

```
   NODE_ENV = development
   PORT = 8000
   // generate your own jwt_secret passwprd
   JWT_SECRET=xxxxxxxx
   DATABASE=mongodb://localhost:27017/nyano-ghar
   DATABASE2=mongodb://127.0.0.1:27017/nyano-hotel
   // get the stripe_secret from your Stripe dashboard
   STRIPE_SECRET=testingSecret
   STRIPE_REDIRECT_URL = http://localhost:3000/stripe/callback
```
