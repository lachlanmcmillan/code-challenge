1) Would your solution change if you needed to parse 1 million plus records?

2) How would you deploy this service?

3) How would you change this service to allow founders to have their own custom rulesets?


### Notes

- Checking whether a date is within "6 months" is not straightforward.

For example, what is the date exactly six months before August 30th? 

If we assume six months before means the same day-of-the-month, but set the month back six times, well the date cannot be February 30th as that date does not exist.

For this test I will assume "<= 6 months" to mean "<= 180 days", as that is a common interpretation of "6 months". If this was a report in a real work environment I would need to clarify exactly what is meant by "<= 6 months."

- This report is non-deterministic, as it depends on the date which it's run. 

For example, if Terry makes a single purchase of 1 share on the 1st of January and the report is run on the 30th of June then Terry would receive a weight of 1.5, however if the report was run in July then Terry would have a weight of 1. I have added a `dateOfReport` variable to support this and make testing deterministic. 

- There are no items in the transaction_history with numberOfShares > 1000 ?