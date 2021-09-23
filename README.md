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
