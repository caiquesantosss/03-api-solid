# App

Gympass style app

## RFs

- [x] Must be able to register;
- [x] Must be able to authenticate;
- [x] Should be able to get the profile of the logged-in user;
- [x] Should be able to obtain the number of check-ins performed 
      by the logged-in user;
- [x] Should be able to access the check-in history;
- [x] Must be able to search for nearby gyms;
- [x] Must be able to search for gyms by name;
- [x] Must be able to check in at the gym
- [x] Must be able to validate a user's check-in;
- [x] Should be able to add a new gym.


## RNs

- [x] The user shouldn't register with a duplicate email 
- [x] The user shouldn't make two check-in on the same day
- [x] The user shouldn't make a check-in if they are not near the gym. (100m)
- [x] The check-in can only be validated up to 20 minutes after it is created. 
- [x] The check-in can only be validate by an admin;
- [x] The gym can only be register by an admin;

## RNFs

- [x] The user's password needs to be encrypted.
- [x] The application's data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page.
- [x] The user should be identified by JWT.