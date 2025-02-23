### deploy backend on vercel
1. create a vercel project
2. make sure to have a `build` script in your `package.json`, even if it's empty
3. add a `vercel.json` file to the root of your project
```
{
    "version": 2,
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/api"
        }
    ]
}
```
4. make sure the `Output directory` field in vercel is set to `.` as we want it to run the project from the root directory
5. put in environment variables in vercel
6. make sure there's a `api/index.js` file in your project
7. deploy the project
