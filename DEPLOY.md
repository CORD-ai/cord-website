# Deploying the new CORD.ai site

These files are a plain static site (HTML + CSS, no build step), ready for the
existing Netlify setup on CORD-ai/cord-website.

Pages: index.html, team.html, research.html, videos.html, join.html, 404.html
Images: assets/site/
Redirects: _redirects (old URLs such as teams.html keep working)

1. Create a branch, e.g. `Ashish/site-revamp`.
2. Delete the old pages: blogs.html, testimonials.html, projects.html, teams.html,
   inner-page.html, otherMember.html, previous_members.html, screening_task.html,
   index.html, 404.html (and the old forms/ folder if nothing else uses it).
3. Copy everything in this folder into the repo root.
4. Commit, push, open a pull request and check the Netlify deploy preview.
5. Merge to main; Netlify publishes it to cordai.org automatically.
