# the deploy ... your file, on the internet

the export is one self-contained html file. it needs no build, no server,
no database, no runtime. anywhere that serves a static file can hold it.
this page is the whole ritual.

first, one habit: rename the file to `index.html`. most hosts serve that
name at the bare domain, and it keeps the url clean.

## the ways, cheapest to fanciest

### netlify drop ... the two-minute path

1. go to `app.netlify.com/drop` (free account, no cli).
2. put your `index.html` in an empty folder. drag the folder onto the page.
3. netlify gives you a `something.netlify.app` address. done, it is live.
4. want your own domain? site settings → domain management → add the
   domain, then point a CNAME at the netlify address where your registrar
   tells you to.

### github pages ... the sovereign path

1. make a repo (public). put `index.html` in it. push.
2. repo settings → pages → deploy from branch → `main` / root.
3. the site lives at `you.github.io/the-repo`. a CNAME file in the repo
   maps a custom domain if you have one.

### cloudflare pages ... the fast-edge path

1. dash → pages → create → direct upload.
2. drop the folder holding `index.html`.
3. live on a `pages.dev` address; custom domains are one click if your
   dns already sits on cloudflare.

### any static host / vps / s3

the file is the artifact. put it behind any web server:

- **s3 + cloudfront**: bucket, static website hosting on, upload, done.
- **a vps you already run**: `scp index.html you@host:/var/www/site/` and
  let nginx serve it. nothing else to install.

## what the file does not need

- no environment variables, no serverless functions, no build step.
- the only outbound call it ever makes is google fonts. if even that is
  too much, open the file, find the fonts `<link>`, and remove it ... the
  site falls back to system serifs and stays whole.

## if the pour was bought through velum's hosted studio

your unlock lives in your browser's localStorage against the pour id.
the exported file carries no unlock logic at all ... it is plain html,
yours outright, deployable everywhere above with no further ceremony.
