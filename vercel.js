{
    "builds": {
        {
            "src": "src/app.js",
            "use": "@vercel/node"
        }
    },
    "routes": {
        {
            "src": "/(.*)",
            "dest": "index.js"
        }   
    }
}
