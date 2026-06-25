---
title: Authentication
created: 2026-01-28
updated: 2026-04-16
---

# Authentication

Learn how to authenticate with the FinImpulse API using Bearer authentication.

The FinImpulse API uses **[Bearer Authentication](https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/)** — a simple, widely used method in which an API token (sometimes called a Bearer token) is sent with each request to prove your identity and grant access to your account’s resources.

Note that all requests must include a valid token. Otherwise, they will be rejected.

## Obtaining the Token

To get your token, you need to [create an account with FinImpulse](https://app.finimpulse.com/auth/register). After logging in, you can view or create a personal token in the **API settings**. Make sure to copy and securely store your token immediately.

Each token is unique and should be kept **confidential**, as anyone with access to it can make requests on your behalf.

## Using the Token

Once you have your token, include it in the **Authorization** header of each HTTP request in the following format:

```
Authorization: Bearer <API_token>
```

Any HTTP client can use this token by including the header, including tools like Postman and curl, as well as code written in Python, JavaScript, and other languages.
