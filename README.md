# Easypanel Next.js Sample: Required Fixes

This is a sample Next.js application for deployment on Easypanel. When you fork or clone this repository, it will **fail to deploy** without two key configuration changes.

This guide explains the two main errors and how to fix them.

---

## 1. The Build Error: `output: standalone`

The first error happens during the build process. You will see a warning in the build logs:

> `warn "next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.`

This project is correctly configured in `next.config.js` to build a minimal, standalone server, but the `package.json` file has the wrong `start` command.

### The Fix

1.  Open **`next.config.js`** and confirm it has `output: 'standalone'`.
    ```js
    /** @type {import('next').NextConfig} */
    module.exports = {
      output: 'standalone',
    }
    ```
2.  Open **`package.json`** and change the `start` script from `next start` to the correct command.

    **Change this:**
    ```json
    "scripts": {
      "start": "next start"
    }
    ```

    **To this:**
    ```json
    "scripts": {
      "start": "node .next/standalone/server.js"
    }
    ```

After committing and pushing this change, your application will build successfully.

---

## 2. The Runtime Error: `ECONNREFUSED`

After you fix the build, the app will start, but it will immediately **crash** or get stuck in a "crash loop."

The runtime logs will show an error similar to this:

> `Error: connect ECONNREFUSED 127.0.0.1:39945`

### The Fix

This error means the Next.js app is working, but it **depends on another service** (like a database or API) that it can't connect to.

1.  **Find the Dependency:** Check the project's `.env.example` file or documentation to see what service it needs (e.g., Postgres, Redis, etc.).
2.  **Create the Service:** In your Easypanel project, add the required database service.
3.  **Link the Service:**
    * Once the database is created, copy its internal connection URL.
    * Go to your Next.js app's settings in Easypanel and click the **"Environment"** tab.
    * Create a new environment variable (e.g., `DATABASE_URL`) and paste the connection URL.
4.  **Redeploy:** Redeploy your Next.js app. It will now be able to connect to the database and will run correctly.
