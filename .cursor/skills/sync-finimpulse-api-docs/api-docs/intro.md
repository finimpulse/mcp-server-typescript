---
title: FinImpulse API Introduction
created: 2025-12-15
updated: 2026-10-30
---

# FinImpulse API Introduction

Overview of the FinImpulse API: architecture, data format, rate limits, and code examples.

This documentation introduces the FinImpulse API, a solution for accessing normalized financial data across different asset classes. The API is intended for developers building financial applications, AI agents, and automated research workflows.

Along with the API, FinImpulse provides an [MCP server](https://developers.finimpulse.com/model-context-protocol/) that gives AI clients direct access to the same data.

## REST Technology

The FinImpulse API follows [**REST**](https://en.wikipedia.org/wiki/Representational_state_transfer) principles, making it straightforward to integrate and work with. This means:

- Each endpoint represents a specific resource and is accessed using standard **HTTP** methods.
- All requests are stateless: the server does not store any client context between requests, so each request must contain all the information required to process it.
- REST-based APIs are easy to scale and simplify debugging and future integration extensions.

## Data Format

The API can be used from any programming language or platform that supports HTTP requests. All responses are returned in [**JSON**](https://en.wikipedia.org/wiki/JSON) format, providing a consistent and widely supported data structure.

## Rate Limits

Each FinImpulse API endpoint has a defined rate limit, which is included in the following HTTP response headers:

- X-RateLimit-Limit — the maximum number of requests allowed per minute for the endpoint;
- X-RateLimit-Remaining — the number of requests remaining in the current rate limit window.

Free tier accounts are limited to 60 requests per minute. After the first payment, the limit increases to 2,000 requests per minute.

**For higher rate limits, please contact the FinImpulse support team.**

.download-cards { display:grid;grid-template-columns:repeat(3, 1fr);gap:1rem;margin-top:1.5rem;margin-bottom:1.5rem;} @media (max-width:48rem) { .download-cards { grid-template-columns:repeat(2, 1fr);} } @media (max-width:40rem) { .download-cards { grid-template-columns:1fr;} } .download-card { display:flex;flex-direction:column;gap:0.25rem;padding:1.25rem 1.5rem;background:var(--bg-secondary);border-radius:var(--radius-xl);text-decoration:none;color:var(--text-primary);transition:box-shadow 0.2s ease, background-color 0.2s ease;} .download-card:hover { background:var(--bg-tertiary);box-shadow:var(--shadow-sm);} .download-card-header { display:flex;align-items:center;gap:0.625rem;} .download-card-icon { width:1.5rem;height:1.5rem;flex-shrink:0;margin:0;} .download-card-title { font-weight:600;font-size:var(--font-size-base);color:var(--text-primary);} .download-card-desc { font-size:var(--font-size-sm);color:var(--text-tertiary);padding-left:2.125rem;}

## C#, PHP, Python, JavaScript and JSON examples

Choose your preferred programming language or data format.

 [    C# Examples


 C# code examples](https://developers.finimpulse.com/examples/finimpulse-api-examples-csharp.zip)  
 [    PHP Examples


 PHP code examples](https://developers.finimpulse.com/examples/finimpulse-api-examples-php.zip)  
 [   
 Python Examples 

 Python code examples](https://developers.finimpulse.com/examples/finimpulse-api-examples-python.zip)  
 [   
 JavaScript Examples 

 JavaScript code examples](https://developers.finimpulse.com/examples/finimpulse-api-examples-javascript.zip)  
 [   
 JSON Examples 

 JSON data examples](https://developers.finimpulse.com/examples/finpulse.postman_collection.json.zip)
