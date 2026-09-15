# Internal Audit Skills Lab - Setup Guide

This is a complete, ready-to-deploy web app. You don't need to write or
understand the code - just follow these steps in order. Total time: about
20-30 minutes the first time.

## What you're setting up

- **Vercel** - hosts the website and runs the two small server functions
  (the interview chat and the grading). Free tier is enough for this.
- **Supabase** - a free database that remembers each student's progress.
- **Gemini API key** - lets the app talk to Google's AI model.

## Step 1 - Get a Gemini API key

1. Go to https://aistudio.google.com/apikey
2. Sign in with a Google account and click "Create API key"
3. Copy the key somewhere safe - you'll paste it into Vercel in Step 4

## Step 2 - Create the database (Supabase)

1. Go to https://supabase.com and create a free account and a new project
2. Once it's created, open the **SQL Editor** (left sidebar) > **New query**
3. Open the file `supabase-schema.sql` from this project, copy all of it,
   paste it into the SQL Editor, and click **Run**
4. Go to **Settings > API** in Supabase and copy two values:
   - **Project URL**
   - **service_role key** (not the "anon" key - the service_role one)

## Step 3 - Put this project on GitHub

1. Create a free account at https://github.com if you don't have one
2. Create a new repository (button top-right, "New")
3. Upload every file in this folder to that repository (GitHub's web
   interface lets you drag-and-drop files - look for "uploading an
   existing file" on the new repository's page)

## Step 4 - Deploy to Vercel

1. Go to https://vercel.com and sign up (you can sign up directly with
   your GitHub account, which makes this step easier)
2. Click **Add New > Project**, then select the GitHub repository you
   just created
3. Before clicking Deploy, open **Environment Variables** and add these
   four (copy the names exactly):
   - `GEMINI_API_KEY` = the key from Step 1
   - `GEMINI_MODEL` = `gemini-2.5-flash`
   - `SUPABASE_URL` = the Project URL from Step 2
   - `SUPABASE_SERVICE_KEY` = the service_role key from Step 2
4. Click **Deploy**. After a minute or two you'll get a live web address
   like `your-project-name.vercel.app` - that's the link you can send to
   students.

## Trying it out

Open your new Vercel link, type any name, and click "Open Case File."
Try asking Ahmad Salem vague questions first (he'll be evasive), then ask
something specific about the three purchase orders being raised the same
day to the same vendor - that's what unlocks the hidden email evidence.

## Making changes later

- **Wording, colors, layout** - edit `styles.css` or `index.html`
- **The scenario itself** (documents, personas, grading rubric) - the
  public-facing parts are in `scenario-data.js`; the private parts (what
  each persona knows, the grading answer key) are in `lib/scenario-secrets.js`
- After editing any file, upload the changed file to GitHub again - Vercel
  automatically redeploys within a minute or two

Bring any of these files back to Claude any time you want to add a new
scenario, change the personas, or adjust the grading - just say what you
want changed and paste in the relevant file.

## A note on cost

Every chat message and every grading submission is a small paid call to
your Gemini API key (Google gives free usage credits to new accounts, and
per-call costs after that are fractions of a cent for a model this size).
For a training exercise with a handful of students, this should stay
very cheap - just don't expect it to be entirely free at real classroom
scale. Vercel and Supabase's free tiers are generous enough that you're
unlikely to pay for hosting itself.
