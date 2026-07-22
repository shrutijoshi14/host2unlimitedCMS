# Step-by-Step Deployment Guide - Host2Unlimited CMS

This guide details the step-by-step instructions for configuring the database on **Supabase** (PostgreSQL) and deploying both the backend and frontend services on **Render**.

---

## 📋 Pre-requisites Checklist
✦ [ ] A GitHub repository containing your project code.
✦ [ ] A free account on [Supabase](https://supabase.com).
✦ [ ] A free account on [Render](https://render.com).

---

## 🗄️ Step 1: Configure Supabase Database

1. **Log In / Create Project**:
   ✦ Go to [supabase.com](https://supabase.com) and log in.
   ✦ Click **New Project** and choose your organization.
   ✦ Set a name (e.g., `Host2Unlimited-CMS`) and enter a **Database Password** (write this password down!).
   ✦ Choose the region closest to you (e.g., `Singapore` or `Mumbai`) and click **Create new project**.
   ✦ Wait 1-2 minutes for the database to provision.

2. **Get the Session Pooler Connection String**:
   > [!IMPORTANT]
   > Do **NOT** use the direct connection string. Render requires the IPv4 Connection Pooler in **Session** mode to work.
   
   ✦ Look at the top header bar of your project dashboard and click the **Connect** button.
   ✦ In the popup window, click on the **Connection Pooler** tab.
   ✦ Set **Mode** to **Session** (this runs on port `5432` and uses IPv4 routing).
   ✦ Under the **URI** text box, copy the connection string. It will look like this:
     ```
     postgresql://postgres.kvgbphopauybvgkhtudh:my_secure_db_password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
     ```
   ✦ **Crucial**: Replace `my_secure_db_password` with your actual database password in the connection string.

---

## 🚀 Step 2: Deploy Backend to Render

1. Log in to [render.com](https://render.com).
2. Click **New + at the top right** and select **Web Service**.
3. Link your GitHub repository.
4. Configure the settings:
   ✦ **Name**: `host2unlimited-backend`
   ✦ **Language**: `Node`
   ✦ **Root Directory**: `backend`
   ✦ **Build Command**: `npm install`
   ✦ **Start Command**: `node server.js`
   ✦ **Instance Type**: Select **Free**.
5. Click **Advanced** > **Add Environment Variable** and enter the following settings:

   | Key | Example / Value | Description & How to Find It |
   | :--- | :--- | :--- |
   | **`PORT`** | `5050` | The network port the server listens on. Enter `5050` matching your configuration. |
   | **`DATABASE_URL`** | `postgresql://postgres.kvgbphopauybvgkhtudh:my_secure_db_password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres` | Your Supabase Connection Pooler URI (copied from **Step 1**). |
   | **`JWT_SECRET`** | `supersecretkey1234567890abcdef` | A secure random string. You can type any random letters and numbers. |
   | **`NODE_ENV`** | `production` | Tells Node.js and Express to run in optimized production mode. Type `production`. |

6. Click **Create Web Service**.
7. Wait for the build logs to show success. Copy the Web Service URL from the top left of the page (e.g., `https://host2unlimited-backend.onrender.com`).

---

## 🖥️ Step 3: Deploy Frontend to Render

1. On your Render Dashboard, click **New +** and select **Static Site**.
2. Link your GitHub repository.
3. Configure the settings:
   ✦ **Name**: `host2unlimited-frontend`
   ✦ **Root Directory**: `frontend`
   ✦ **Build Command**: `npm run build`
   ✦ **Publish Directory**: `dist`
4. Click **Advanced** > **Add Environment Variable**:

   | Key | Example / Value | Description & How to Find It |
   | :--- | :--- | :--- |
   | **`VITE_API_URL`** | `https://host2unlimited-backend.onrender.com` | Paste the **Render Web Service URL** you copied from your Backend service page in **Step 2**. |

5. Click **Create Static Site**.

---

## ⚙️ Step 4: Local vs Live Switching (Optional)
If you want to view or edit the live Supabase database content locally from your computer:
1. Open the [backend/.env](file:///e:/Freelancing/Host2Unlimited/backend/.env) file.
2. Paste your Supabase connection URI in `DATABASE_URL`.
3. Set `FORCE_LIVE_DB=true`.
4. Run `npm run dev` locally.

---

## 📁 Where to Add Credentials (File Paths & Locations)

### 1. For Local Development (Running on your computer)

- **Backend Configuration**:
  ✦ **File Path**: `backend/.env` (located in [backend/.env](file:///e:/Freelancing/Host2Unlimited/backend/.env))
  ✦ **Variable to set**: `DATABASE_URL="postgresql://postgres.kvgbphopauybvgkhtudh:my_secure_db_password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"` (if using Supabase locally) and ensure `FORCE_LIVE_DB=true`.
  
- **Frontend Configuration**:
  ✦ **File Path**: `frontend/.env` (located in [frontend/.env](file:///e:/Freelancing/Host2Unlimited/frontend/.env))
  ✦ **Variable to set**: `VITE_API_URL=http://localhost:5050` (points to your local backend server).

### 2. For Live Production (Deployed on Render)

- **Backend Web Service Configuration**:
  ✦ **Location**: Your Render Dashboard > Select your **Backend Web Service** > **Environment Variables** tab.
  ✦ **Variables to add**:
    ✦ `PORT` = `5050`
    ✦ `DATABASE_URL` = `postgresql://postgres.kvgbphopauybvgkhtudh:my_secure_db_password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres`
    ✦ `JWT_SECRET` = `supersecretkey1234567890abcdef`
    ✦ `NODE_ENV` = `production`

- **Frontend Static Site Configuration**:
  ✦ **Location**: Your Render Dashboard > Select your **Frontend Static Site** > **Environment Variables** tab.
  ✦ **Variable to add**:
    ✦ `VITE_API_URL` = `https://host2unlimited-backend.onrender.com`

### 3. Render Redirects/Rewrites Rule (For React Router / Sub-page Refreshes)

To prevent `404 Not Found` errors when refreshing sub-pages (like `/admin` or `/services`) on your live website:

- **Location**: Your Render Dashboard > Select your **Frontend Static Site** > **Redirects/Rewrites** tab.
- **Rule to add**:
  ✦ **Source**: `/*`
  ✦ **Destination**: `/index.html`
  ✦ **Action**: `Rewrite`
- **Save**: Click **Save Changes**. This forwards all route requests to your React index page, allowing React Router to display sub-routes correctly.
