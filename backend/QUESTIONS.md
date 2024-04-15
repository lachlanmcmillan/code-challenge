1) Would your solution change if you needed to parse 1 million plus records?

I think we would run into out-of-memory issues with a JSON file that large. To get around the memory limits of nodejs/v8 we could set up a read stream (fs.createReadStream), and use the readline module to read the file line-by-line, parsing each object item one-by-one. We would need to somewhat parse the JSON ourselves, either by detecting the opening/closing braces of each JSON object, or simply reading six lines from the file at a time and using JSON.parse.

2) How would you deploy this service?

It depends on how often the service is going to be run and the existing infrastructure. 

The simplest method would be to use Heroku or similar platform-as-a-service operator. 

We could wrap the code in an API using express and have it output the weight table as JSON, and then deploy this API to a private server. 

A serverless function on AWS/Azure would make deployment very cheap if the report is not being run very often.

3) How would you change this service to allow founders to have their own custom rulesets?

We could allow founders to provide a JSON file with rules, according to a schema which we provide.

eg.
[
  {
    "type": "RULE"
    "comparison": "EQUALS"
    "property": "status",
    "value": "INCOMPLETE"
    "weight": -1
  },
  {
    "type": "AND",
    "weight": 1.25
    "checks": [
      {
        "type": "RULE"
        "property": "status",
        "comparison": "EQUALS"
        "value": "PURCHASED"
      },
      {
        "type": "RULE"
        "property": "numberOfShares",
        "comparison": "GREATER_THAN"
        "value": "1000"
      },
    ]
  }
]

Writing this JSON by hand would be difficult, so a frontend could be made to allow for configuring rules.

## Notes

- Checking whether a date is within "6 months" is not straightforward.

For example, what is the date exactly six months before August 30th? 

If we assume six months before means the same day-of-the-month, but set the month back six times, well the date cannot be February 30th as that date does not exist.

For this test I will assume "<= 6 months" to mean "<= 180 days", as that is a common interpretation of "6 months". If this was a report in a real work environment I would need to clarify exactly what is meant by "<= 6 months."

- This report is non-deterministic, as it depends on the date which it's run. 

For example, if Terry makes a single purchase of 1 share on the 1st of January and the report is run on the 30th of June then Terry would receive a weight of 1.5, however if the report was run in July then Terry would have a weight of 1. I have added a `dateOfReport` variable to support this and make testing deterministic. 

- There are no items in the transaction_history with numberOfShares > 1000 ?