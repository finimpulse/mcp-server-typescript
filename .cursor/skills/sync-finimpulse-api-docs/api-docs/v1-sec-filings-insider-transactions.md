---
title: SEC Form 4 Insider Transactions API
created: 2026-11-17
updated: 2026-11-17
endpoint: POST v1/sec-filings/insider-transactions
auth: Bearer Token
---

# SEC Form 4 Insider Transactions API

Returns insider transaction and holding records from SEC Form 4 and Form 4/A filings, including transaction codes, ownership details, and links to original SEC documents. 

**Available via:** [REST API](https://developers.finimpulse.com/)

This endpoint provides record-level data from SEC Form 4 and Form 4/A filings for stocks. The data includes transactions and holdings in non-derivative and derivative securities, with SEC transaction codes, ownership after each transaction, direct or indirect ownership type, and filing footnotes. Each request returns the records of a single filing, identified by its accession number.

Data source: SEC EDGAR, ingested directly.

To retrieve a stock’s insider transaction history across filings in a simplified format, use the [Stock Insider Transactions API](https://developers.finimpulse.com/v1/holders/insiders-transactions/).

## Endpoint Workflow

A request to this endpoint requires an **accession_number** and either a **symbol** or a **cik**. To get these values, first send a request to the [SEC Filing Events API](https://developers.finimpulse.com/v1/sec-filings/events/) and filter the results by the **form** field to select Form 4 and Form 4/A filings. Each returned record contains the **accession_number**, **symbol**, and **cik** of the filing, which you then pass to this endpoint.

To retrieve records from multiple filings, send a separate request for each accession number.

## Coverage

Asset TypesStocksAssets 5,900+Filing TypesForm 4, Form 4/ARecord TypesNon-derivative transactions, derivative transactions, non-derivative holdings, derivative holdingsGeographic CoverageU.S.-listed stocks Historical Depth1992 to present 

Coverage figures are approximate and may change over time.

## Data Freshness

Filings are added weekly and may appear with a delay of up to 7 days.

## Data Availability &amp; Limitations

- Data availability depends on SEC reporting requirements and the filings available for each company.
- Historical depth varies by company. Records are available for all covered companies from 2015 onward, and earlier records are available for some companies.
- For some companies, records are returned under the ticker of another security issued by the company, such as a preferred share or exchange-traded note, rather than the common stock ticker. The **cik** value identifies the company correctly, so use **cik** to look up a company.
- A single filing may contain multiple transaction and holding records.
- Some fields may be **null** if a specific value is not available for a given record or does not apply to its record type. This does not indicate an error.
- **owner_name** is returned as reported in the filing, so letter case may vary between filings and affect filter results on this field.
- **transaction_date** may contain a future date due to errors in the original filing.

## When to Use This Endpoint

- Display the records of a Form 4 filing, including transactions, holdings, and footnotes.
- Compare the transaction size with the insider’s holdings after the transaction to show what share of the position was bought or sold.
- Separate open-market purchases and sales from grants, option exercises, and tax withholdings using transaction codes.
- Track insider derivative positions, such as options, with exercise prices and expiration dates.
- Show how an insider holds shares: directly or through trusts, partnerships, and other entities.
- Build a detailed insider transaction dataset for a stock by combining records from multiple Form 4 filings.
- Link each record to the original SEC document for verification and audit trails.

## Request Parameters

**POST** `v1/sec-filings/insider-transactions` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol). Required if `cik` is not provided. Takes priority when both are specified.
- **cik**   
     `string` *(required)* — Central Index Key (CIK) of the company. Up to 10 digits. Required if `symbol` is not provided.
- **accession_number**   
     `string` *(required)* — Unique SEC accession number of the Form 4 or Form 4/A filing.
- **transaction_types**   
     `array` *(optional)* — Record types to return. **Possible values:**
    - `non_derivative_transaction` - Transactions involving non-derivative securities, such as common stock.
    - `derivative_transaction` - Transactions involving derivative securities, such as options.
    - `non_derivative_holding` - Reported holdings of non-derivative securities.
    - `derivative_holding` - Reported holdings of derivative securities.
    - `unknown` - Records without a recognized transaction type.
     
     You can pass any combination of the supported values. If no values are provided, all supported types are returned.
- **filters**   
     `array` *(optional)* — Optional filter expressions. Supported on all fields except `owner_relationship` and `transaction_type`. To filter by record type, use `transaction_types`. Each filter condition is defined as `[field, operator, value]`. Conditions can be combined using the logical operators `and`, `or`, and `not`. **Supported operators:** *Any field type (numbers, strings, booleans, dates):*
    - `=` - equals
    - `<>` - not equal
     
     *Numbers and dates:*
    - `>` - greater than
    - `>=` - greater than or equal
    - `<` - less than
    - `<=` - less than or equal
     
     *List of values:*
    - `in` - matches any value in the list (e.g., \["field", "in", \["value_1", "value_2"\]\])
     
     *Strings:*
    - `like` - pattern match (requires % as a wildcard)
    - `not_like` - pattern does not match (requires % as a wildcard)
    - `contains` - value exists in string
    - `not_contains` - value does not exist in string
    - `startswith` - string starts with value
    - `endswith` - string ends with value
     
     *`%` usage examples:*
    - `%abc%` - matches any string containing “abc”
    - `abc%` - matches any string starting with “abc”
    - `%abc` - matches any string ending with “abc”
     
     String operators are case-sensitive. Dates are compared as text, so pass date values in the same format as the field returns them. Fields that contain arrays cannot be filtered.
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. By default, results are sorted by `transaction_type` in ascending order. Each sorting setup is defined as an object `{selector, desc}`: 
    - `selector` - Field used for sorting (e.g., transaction_date).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Multiple sorting setups can be combined in the array.
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined). 
    - Default: 100
    - Maximum: 1000
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/sec-filings/insider-transactions" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "PLTR",
      "cik": "0001321655",
      "accession_number": "0001823952-26-000024",
      "transaction_types": [
          "non_derivative_transaction",
          "derivative_transaction"
      ],
      "filters": [
          [
              "owner_name",
              "contains",
              "Moore"
          ],
          "and",
          [
              "transaction_code",
              "=",
              "S"
          ],
          "and",
          [
              "transaction_shares",
              ">",
              1000
          ]
      ],
      "sort_by": [
          {
              "selector": "transaction_price_per_share",
              "desc": true
          },
          {
              "selector": "entry_index",
              "desc": false
          }
      ],
      "limit": 3,
      "offset": 0,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/sec-filings/insider-transactions";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""PLTR"",
    ""cik"": ""0001321655"",
    ""accession_number"": ""0001823952-26-000024"",
    ""transaction_types"": [
        ""non_derivative_transaction"",
        ""derivative_transaction""
    ],
    ""filters"": [
        [
            ""owner_name"",
            ""contains"",
            ""Moore""
        ],
        ""and"",
        [
            ""transaction_code"",
            ""="",
            ""S""
        ],
        ""and"",
        [
            ""transaction_shares"",
            "">"",
            1000
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""transaction_price_per_share"",
            ""desc"": true
        },
        {
            ""selector"": ""entry_index"",
            ""desc"": false
        }
    ],
    ""limit"": 3,
    ""offset"": 0,
    ""tag"": ""just tag""
}";
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync(url, content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```


```php
<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.finimpulse.com/v1/sec-filings/insider-transactions",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "PLTR",
      "cik" => "0001321655",
      "accession_number" => "0001823952-26-000024",
      "transaction_types" => [
        "non_derivative_transaction",
        "derivative_transaction"
      ],
      "filters" => [
        [
          "owner_name",
          "contains",
          "Moore"
        ],
        "and",
        [
          "transaction_code",
          "=",
          "S"
        ],
        "and",
        [
          "transaction_shares",
          ">",
          1000
        ]
      ],
      "sort_by" => [
        [
          "selector" => "transaction_price_per_share",
          "desc" => true
        ],
        [
          "selector" => "entry_index",
          "desc" => false
        ]
      ],
      "limit" => 3,
      "offset" => 0,
      "tag" => "just tag"
    ]
  )
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
```


```python
import urllib.request
import json

url = "https://api.finimpulse.com/v1/sec-filings/insider-transactions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "PLTR",
    "cik": "0001321655",
    "accession_number": "0001823952-26-000024",
    "transaction_types": [
        "non_derivative_transaction",
        "derivative_transaction"
    ],
    "filters": [
        [
            "owner_name",
            "contains",
            "Moore"
        ],
        "and",
        [
            "transaction_code",
            "=",
            "S"
        ],
        "and",
        [
            "transaction_shares",
            ">",
            1000
        ]
    ],
    "sort_by": [
        {
            "selector": "transaction_price_per_share",
            "desc": True
        },
        {
            "selector": "entry_index",
            "desc": False
        }
    ],
    "limit": 3,
    "offset": 0,
    "tag": "just tag"
}

req = urllib.request.Request(url,
    data=json.dumps(data).encode("utf-8"),
    headers=headers,
    method="POST")

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode("utf-8"))
    print(result)
```


```javascript
const https = require('https');

const data = JSON.stringify({
    "symbol": "PLTR",
    "cik": "0001321655",
    "accession_number": "0001823952-26-000024",
    "transaction_types": [
        "non_derivative_transaction",
        "derivative_transaction"
    ],
    "filters": [
        [
            "owner_name",
            "contains",
            "Moore"
        ],
        "and",
        [
            "transaction_code",
            "=",
            "S"
        ],
        "and",
        [
            "transaction_shares",
            ">",
            1000
        ]
    ],
    "sort_by": [
        {
            "selector": "transaction_price_per_share",
            "desc": true
        },
        {
            "selector": "entry_index",
            "desc": false
        }
    ],
    "limit": 3,
    "offset": 0,
    "tag": "just tag"
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request('https://api.finimpulse.com/v1/sec-filings/insider-transactions', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of insider transaction and holding records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of insider transaction and holding records.


### Filing and Identification


- **cik**   
     `string` — Central Index Key (CIK) of the company.
- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **accession_number**   
     `string` — Unique SEC accession number.
- **filing_date**   
     `string` — Date the filing was submitted to the SEC (YYYY-MM-DD).
- **primary_document_url**   
     `string` — Direct link to the filing document.
- **transaction_id**   
     `string` — Unique record identifier.
- **entry_index**   
     `integer` — Position of the record within the filing among records of the same `transaction_type` (0-based).


### Insider Information


- **owner_cik**   
     `string` — Central Index Key (CIK) of the reporting insider.
- **owner_name**   
     `string` — Insider name, as reported in the filing.
- **owner_relationship**   
     `string` — Insider’s relationship to the company. **Possible values:**
    - `officer`
    - `director`
    - `ten_percent_owner`
    - `other`


### Transaction Details


- **transaction_type**   
     `string` — Record type. **Possible values:**
    - `non_derivative_transaction`
    - `derivative_transaction`
    - `non_derivative_holding`
    - `derivative_holding`
    - `unknown`
- **security_title**   
     `string` — Name of the security (e.g., Class A Common Stock).
- **transaction_form_type**   
     `string` — SEC form type (4 or 4/A).
- **transaction_date**   
     `string` — Date of the transaction (YYYY-MM-DD).
- **deemed_execution_date**   
     `string` — Deemed execution date (YYYY-MM-DD).
- **transaction_code**   
     `string` — SEC transaction code. **Common values:**
    - `P` - Open-market or private purchase.
    - `S` - Open-market or private sale.
    - `A` - Grant, award, or other acquisition.
    - `M` - Exercise or conversion of a derivative security.
    - `F` - Payment of an exercise price or tax liability by delivering or withholding securities.
    - `G` - Gift.
- **transaction_shares**   
     `number` — Number of shares involved in the transaction.
- **transaction_price_per_share**   
     `number` — Transaction price per share. May be 0 for non-cash events such as grants or gifts.
- **transaction_total_value**   
     `number` — Total transaction value.
- **transaction_acquired_disposed_code**   
     `string` — Indicates whether securities were acquired or disposed of. **Possible values:**
    - `A` - Acquired.
    - `D` - Disposed.
- **transaction_timeliness**   
     `string` — Transaction timeliness indicator. **Possible values:**
    - `E` - Early.
    - `L` - Late.
- **equity_swap_involved**   
     `boolean` — Indicates whether the transaction involved an equity swap.


### Derivative Security Details


- **conversion_or_exercise_price**   
     `number` — Conversion or exercise price of the derivative security.
- **exercise_date**   
     `string` — Date the derivative security becomes exercisable (YYYY-MM-DD).
- **expiration_date**   
     `string` — Expiration date of the derivative security (YYYY-MM-DD).
- **underlying_security_title**   
     `string` — Name of the underlying security.
- **underlying_security_shares**   
     `number` — Number of shares of the underlying security.
- **underlying_security_value**   
     `number` — Value of the underlying security.


### Ownership Information


- **shares_owned_following_transaction**   
     `number` — Number of shares owned after the transaction. For holding records, the number of shares held.
- **value_owned_following_transaction**   
     `number` — Value of securities owned after the transaction.
- **direct_or_indirect_ownership**   
     `string` — Ownership type. **Possible values:**
    - `D` - Direct ownership.
    - `I` - Indirect ownership.
- **nature_of_ownership**   
     `string` — Description of indirect ownership (e.g., By Trust). May contain a reference to a footnote, in which case the explanation is returned in `footnotes`.
- **footnotes**   
     `string` — Footnotes to the record from the filing. Multiple footnotes are separated by line breaks.


### Example Response


```json
{
    "result": {
        "total_count": 5,
        "items_count": 3,
        "items": [
            {
                "cik": "0001321655",
                "symbol": "PLTR",
                "accession_number": "0001823952-26-000024",
                "transaction_id": "e8663b18-81b9-06f1-0e7e-349ea2b472ce",
                "entry_index": 6,
                "owner_cik": "0001823952",
                "owner_name": "Moore Alexander D.",
                "owner_relationship": "director",
                "transaction_type": "non_derivative_transaction",
                "security_title": "Class A Common Stock",
                "conversion_or_exercise_price": null,
                "transaction_date": "2026-10-15",
                "filing_date": "2026-10-19",
                "deemed_execution_date": null,
                "transaction_form_type": "4",
                "transaction_code": "S",
                "equity_swap_involved": false,
                "transaction_timeliness": null,
                "transaction_shares": 4200,
                "transaction_total_value": null,
                "transaction_price_per_share": 200.1463,
                "transaction_acquired_disposed_code": "D",
                "exercise_date": null,
                "expiration_date": null,
                "underlying_security_title": null,
                "underlying_security_shares": null,
                "underlying_security_value": null,
                "shares_owned_following_transaction": 1047195,
                "value_owned_following_transaction": null,
                "direct_or_indirect_ownership": "D",
                "nature_of_ownership": null,
                "footnotes": "The Reporting Person sold shares of Class A Common Stock in the open market pursuant to a Rule 10b5-1 trading plan intended to satisfy the affirmative defense conditions of Rule 10b5-1(c), entered into on December 11, 2025.nThis transaction represents sales executed in multiple open market sales. The sales reflected in this line item were made at prices ranging from $199.65 to $200.56. The price reported above reflects the weighted average sale price of trades occurring within that price range. See footnotes (2) through (9) for sales executed in price ranges on the date indicated. The Reporting Person undertakes to provide upon request by the staff of the Securities and Exchange Commission, the Issuer, or a security holder of the Issuer, full information regarding the number of shares sold at each separate sale price.",
                "primary_document_url": "https://www.sec.gov/Archives/edgar/data/1321655/000182395226000024/wk-form4_1792454773.xml"
            },
            {
                "cik": "0001321655",
                "symbol": "PLTR",
                "accession_number": "0001823952-26-000024",
                "transaction_id": "6557d874-cb75-362a-9b29-75ff04be3e32",
                "entry_index": 5,
                "owner_cik": "0001823952",
                "owner_name": "Moore Alexander D.",
                "owner_relationship": "director",
                "transaction_type": "non_derivative_transaction",
                "security_title": "Class A Common Stock",
                "conversion_or_exercise_price": null,
                "transaction_date": "2026-10-15",
                "filing_date": "2026-10-19",
                "deemed_execution_date": null,
                "transaction_form_type": "4",
                "transaction_code": "S",
                "equity_swap_involved": false,
                "transaction_timeliness": null,
                "transaction_shares": 3500,
                "transaction_total_value": null,
                "transaction_price_per_share": 199.068,
                "transaction_acquired_disposed_code": "D",
                "exercise_date": null,
                "expiration_date": null,
                "underlying_security_title": null,
                "underlying_security_shares": null,
                "underlying_security_value": null,
                "shares_owned_following_transaction": 1051395,
                "value_owned_following_transaction": null,
                "direct_or_indirect_ownership": "D",
                "nature_of_ownership": null,
                "footnotes": "The Reporting Person sold shares of Class A Common Stock in the open market pursuant to a Rule 10b5-1 trading plan intended to satisfy the affirmative defense conditions of Rule 10b5-1(c), entered into on December 11, 2025.nThis transaction represents sales executed in multiple open market sales. The sales reflected in this line item were made at prices ranging from $198.63 to $199.5814. The price reported above reflects the weighted average sale price of trades occurring within that price range. See footnotes (2) through (9) for sales executed in price ranges on the date indicated. The Reporting Person undertakes to provide upon request by the staff of the Securities and Exchange Commission, the Issuer, or a security holder of the Issuer, full information regarding the number of shares sold at each separate sale price.",
                "primary_document_url": "https://www.sec.gov/Archives/edgar/data/1321655/000182395226000024/wk-form4_1792454773.xml"
            },
            {
                "cik": "0001321655",
                "symbol": "PLTR",
                "accession_number": "0001823952-26-000024",
                "transaction_id": "34d5c44c-ade0-4a9e-8372-3cf3dd7968c8",
                "entry_index": 4,
                "owner_cik": "0001823952",
                "owner_name": "Moore Alexander D.",
                "owner_relationship": "director",
                "transaction_type": "non_derivative_transaction",
                "security_title": "Class A Common Stock",
                "conversion_or_exercise_price": null,
                "transaction_date": "2026-10-15",
                "filing_date": "2026-10-19",
                "deemed_execution_date": null,
                "transaction_form_type": "4",
                "transaction_code": "S",
                "equity_swap_involved": false,
                "transaction_timeliness": null,
                "transaction_shares": 2700,
                "transaction_total_value": null,
                "transaction_price_per_share": 198.1277,
                "transaction_acquired_disposed_code": "D",
                "exercise_date": null,
                "expiration_date": null,
                "underlying_security_title": null,
                "underlying_security_shares": null,
                "underlying_security_value": null,
                "shares_owned_following_transaction": 1054895,
                "value_owned_following_transaction": null,
                "direct_or_indirect_ownership": "D",
                "nature_of_ownership": null,
                "footnotes": "The Reporting Person sold shares of Class A Common Stock in the open market pursuant to a Rule 10b5-1 trading plan intended to satisfy the affirmative defense conditions of Rule 10b5-1(c), entered into on December 11, 2025.nThis transaction represents sales executed in multiple open market sales. The sales reflected in this line item were made at prices ranging from $197.61 to $198.6. The price reported above reflects the weighted average sale price of trades occurring within that price range. See footnotes (2) through (9) for sales executed in price ranges on the date indicated. The Reporting Person undertakes to provide upon request by the staff of the Securities and Exchange Commission, the Issuer, or a security holder of the Issuer, full information regarding the number of shares sold at each separate sale price.",
                "primary_document_url": "https://www.sec.gov/Archives/edgar/data/1321655/000182395226000024/wk-form4_1792454773.xml"
            }
        ]
    }
}
```


## Units and Formats

- Prices and values are returned as reported in the filing, typically in U.S. dollars.
- **transaction_price_per_share** may represent a weighted-average price when a filing aggregates multiple transactions into a single record. Price ranges are disclosed in the footnotes.
- Share quantities may include fractional values.

## Pagination &amp; Limits

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- To keep the order consistent across pages, pass **sort_by**, for example, by **transaction_type** and **entry_index**.

## Related APIs

- [SEC Filing Events API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/sec-filings/events/)
- [Stock Insider Transactions API](https://developers.finimpulse.com/v1/holders/insiders-transactions/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)
- [Company Insider Roster &amp; Activity API](https://developers.finimpulse.com/v1/holders/insiders/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Institutional &amp; Insider Ownership API for Stocks](https://developers.finimpulse.com/v1/holders/general/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
