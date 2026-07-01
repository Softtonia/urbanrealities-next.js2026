module.exports = {
    apps: [
        {
            name: "urbanrealities",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                X_CLIENT_ID: "LD5TNUNOKREYBI2",
                X_CLIENT_SECRET: "8UJIIPRSUJK4NNI",
                LARAVEL_API_BASE_URL: "https://api.holiplaces.com",
                NEXT_PUBLIC_API_URL: "https://api.holiplaces.com",
                NEXT_PUBLIC_BUSINESS_DOMAIN : "https://business.holiplaces.com",
                X_APP_TYPE: "website",
                NEXTJS_INTERNAL_KEY: "XS7N2XMQNAXKMM0XYYWF1EGGZEWHHWXAYQPGX8RV1YNXHHLR1D"
            }
        }
    ]
};