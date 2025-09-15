module.exports =
{
    apps: [
        {
            name: "urbanrealities", cwd: "/var/www/urbanrealities.com", // 👈 important 
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production", PORT: 3000 // change if needed 
            }
        }
    ]
};
