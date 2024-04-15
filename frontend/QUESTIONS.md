1. What could be changed in Companies page to make the code more maintainable?

- Move the data fetching into a separate file, eg. companiesAPI.ts
- Make the company tile a separate component
- Move styles into CSS classes
- Move any conditional logic out of the JSX and into variables
  
eg. line 32 of Companies.tsx

<span style={{
  backgroundColor: getBackgroundColor(c),
}}>{c.campaignStatus === "CLOSED"
  ? "Funded"
  : c.campaignType === "EOI"
  ? "EOI Open"
  : "Accepting Investments"}</span>

would move into a variable

const campaignText = c.campaignStatus === "CLOSED"
  ? "Funded"
  : c.campaignType === "EOI"
  ? "EOI Open"
  : "Accepting Investments"

and line 32 becomes

<span style={{ backgroundColor: getBackgroundColor(c) }}>{campaignText}</span>

2. Would you change the way styling is handled in the solution? If so, what would you change?

Yes, I would use either CSS modules and have a separate css file for each component, or use SASS.

Both options would alleviate the very long css selectors (eg. ".company-tiles .campaign-details span, .company-tiles .industry span").

3. Any other improvements or changes you would make?

