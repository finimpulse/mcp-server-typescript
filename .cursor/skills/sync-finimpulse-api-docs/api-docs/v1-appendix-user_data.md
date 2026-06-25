---
title: User Data
created: 2026-04-16
updated: 2026-04-16
endpoint: GET v1/appendix/user_data
auth: Bearer Token
---

# User Data

Returns the user's account email, API token name, and current balance.

The user data endpoint returns account information for the authenticated user: the account email, the name of the API token used in the request, and the current balance.

Use this endpoint to verify the active token or check the remaining balance before making paid requests.

This endpoint has no associated cost and **does not affect the account balance**.

## Request

**GET** `v1/appendix/user_data` 


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/appendix/user_data" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>"
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/appendix/user_data";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/appendix/user_data",
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

url = "https://api.finimpulse.com/v1/appendix/user_data"
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

const req = https.request('https://api.finimpulse.com/v1/appendix/user_data', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.end();
```


## Response

- **account**   
     `string` — Email address associated with the user account.
- **token**   
     `string` — Name of the API token used in the request. Returns the token name for user-created tokens, or `default` when the default token is used.
- **balance**   
     `number` — Current account balance in USD.


### Example Response


```json
{
    "task_id": "e61c8446-d55f-44d2-ab43-60589f551d01",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0,
    "data": [],
    "result": [
        {
            "account": "example@mail.com",
            "token": "<default>",
            "balance": 50
        }
    ]
}
```
