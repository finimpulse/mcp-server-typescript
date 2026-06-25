---
title: Errors
created: 2026-02-05
updated: 2026-04-16
endpoint: GET v1/errors
auth: Bearer Token
---

# Errors

FinImpulse API error reference: HTTP response codes, internal status codes, and how to retrieve the full error list via the errors endpoint.

The FinImpulse API uses a combination of standard **HTTP response codes** and **internal status codes** to communicate the result of each request.

We recommend recording error-related information in your application logs and implementing a robust mechanism for handling exceptions or error conditions.

## HTTP Response Codes

**Code****Message****Description**200OKThe request was successfully processed.401UnauthorizedThe request is missing a valid **Bearer** token or the token has expired.  
See the [**API Tokens Management &amp; Security Guide**](https://finimpulse.com/help/api-tokens/) for details.402Payment RequiredYour account has insufficient funds or billing issues. Please check your account balance.404Not FoundThe requested endpoint or resource does not exist. Verify the request URL.500Internal Server ErrorThe server encountered an unexpected condition. Please retry later.## Internal Status Codes and Messages

Along with HTTP response codes, the system also generates internal status codes, which are returned in the ***status_code*** and ***status_message*** fields of the API response.

**Code****Message****Description**20000OKThe request was processed successfully.40000Validation failedThe request contains invalid data or is missing required fields.40100UnauthorizedThe provided Bearer token is missing, invalid, or expired.40200Insufficient balanceThe account does not have sufficient funds to complete this request.40300Access ForbiddenThe request originated from an IP address not whitelisted for this API token.40400Not FoundThe requested resource could not be found. Check the request URL.42900Rate limit exceededThe number of requests per minute has exceeded. Reduce request frequency.50000Internal server errorAn unexpected server-side error occurred. Please contact support.Note that status messages may provide **additional context** in the API response and can **vary** depending on the conditions that triggered them.

## Errors Endpoint

You can retrieve the full list of internal error codes by calling the **v1/errors** endpoint. Your account will **not be charged** for accessing it.

### Request
**GET** `v1/errors` 


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/errors" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>"
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/errors";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.GetAsync(url);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```


```php
<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.finimpulse.com/v1/errors",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ]
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
```


```python
import urllib.request
import json

url = "https://api.finimpulse.com/v1/errors"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}

req = urllib.request.Request(url, headers=headers, method="GET")

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode("utf-8"))
    print(result)
```


```javascript
const https = require('https');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>'
  }
};

const req = https.request('https://api.finimpulse.com/v1/errors', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.end();
```


### Response
- **result**   
     `array` — Array of objects. Each object represents a specific internal status code returned for the request with the following fields: 
    - `code` - Internal status code of the error (integer).
    - `message` - Description of the error (string).


### Example Response


```json
{
    "task_id": "771ec16c-6fcd-46f4-9a8d-c24a4eee5e15",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0,
    "data": [],
    "result": [
        {
            "code": 20000,
            "message": "Ok"
        },
        {
            "code": 40000,
            "message": "Validation failed"
        },
        {
            "code": 40100,
            "message": "Unauthorized"
        },
        {
            "code": 40200,
            "message": "Insufficient balance"
        },
        {
            "code": 40300,
            "message": "Access forbidden"
        },
        {
            "code": 40400,
            "message": "Not found"
        },
        {
            "code": 42900,
            "message": "Rate limit exceeded"
        },
        {
            "code": 50000,
            "message": "Internal server error"
        }
    ]
}
```
