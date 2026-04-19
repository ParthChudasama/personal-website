# Adding a Job

Each company gets one folder with a single `index.md`.

```
content/jobs/Company Name/index.md
```

## Format

```md
---
company: 'Company Name'
location: 'City, Country'
url: 'https://company-website.com'
roles:
  - title: 'Senior Engineer'
    date: 'YYYY-MM-DD'
    range: 'Jan 2024 - present'
  - title: 'Junior Engineer'
    date: 'YYYY-MM-DD'
    range: 'Jun 2022 - Dec 2023'
---

## Senior Engineer

- Bullet point about what you did
- Another achievement

## Junior Engineer

- Bullet point about what you did
```

## Notes

- **One folder per company** — multiple roles at the same company go in the same file.
- **`roles` order** — list roles most recent first. The `## Section` headings must match the `title` fields exactly.
- **`date`** — used for sorting (not displayed). Use the role start date in `YYYY-MM-DD`.
- **`range`** — display string, write it however you like.
- For a single-role company, just add one entry under `roles:` and one `## Section`.
