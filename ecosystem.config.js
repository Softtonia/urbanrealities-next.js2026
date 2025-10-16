module.exports = {
    apps: [
        {
            name: "urbanrealities",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                X_CLIENT_ID: "KWTWGGSBIZGD7GZ",
                X_CLIENT_SECRET: "DLERJBYZ6QZCW0U",
                LARAVEL_API_BASE_URL: "https://api.urbanrealities.com/public",
                NEXT_PUBLIC_API_URL: "https://urbanrealities.com",
                NEXT_PUBLIC_BUSINESS_DOMAIN : "https://business.urbanrealities.com",
                X_APP_TYPE: "website",
                NEXTJS_INTERNAL_KEY: "PMCVGOEQZQQUNZODZTNKXAQC10QYLW04HAF316DEDXD7YWD5VR"
            }
        }
    ]
};