---
title: Financial Data API Sandbox
created: 2026-05-21
updated: 2026-10-30
---

# Financial Data API Sandbox

Learn how to use the FinImpulse Sandbox environment to test API integration 

Sandbox is a testing environment that allows you to integrate and test the FinImpulse API without affecting your API usage.

## Sandbox API Token 

To use the Sandbox, a separate API token is required. The Sandbox API token is available in the FinImpulse dashboard, under the  [API settings tab](https://finimpulse.com/help/api-mode-overview/). It is a fixed token — it is always visible, cannot be regenerated, and does not support IP whitelisting.

To send requests to the Sandbox, use the standard API base URL (api.finimpulse.com) and replace the production API token with the Sandbox one. No other changes to the request structure are required.

For step-by-step instructions on getting the Sandbox token, see the [API Tokens Management &amp; Security guide](https://finimpulse.com/help/api-tokens/).

## Availability and Use Case

Sandbox is available to all registered users. The primary use case is testing API integration and validating request and response structure.

Note that all responses contain **dummy** data. However, the structure and fields of the Sandbox response are identical to those of the production API response.

Rate limits in the Sandbox match those of the production environment: 60 requests per minute for accounts on the free tier, and 2,000 requests per minute after the first payment.
