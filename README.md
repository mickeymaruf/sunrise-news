# Sunrise News
News publishing website

**Technology:**
- React, React Router, Firebase
- React-bootstrap

## Installation Guide (Client)
 1. Clone the repository & install dependencies using:
```shell
npm install
```

 2. Create a `.env.local` file in main directory

This file holds sensitive settings, which should not be pushed to git. Example content suitable for development/testing could be:
```shell
REACT_APP_apiKey=
REACT_APP_authDomain=
REACT_APP_projectId=
REACT_APP_storageBucket=
REACT_APP_messagingSenderId=
REACT_APP_appId=
```
Go to https://console.firebase.google.com to create new firebase project and put the credentials it in the SECRET_KEY value.