const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0Y4Z21pTzZzaDV3dU92dlVPb200QkRzZjhLRlp2UEFVWld4aXlWR2RWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2ZXWlpmb1JMcHh2RGNJSC9VTnNWUUJib0xoeEJlMms1NDdLVUczYk9IRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SmdJdXgycjYvRVJ6VHp3K3dseTJ0d2FPdEdtdmZQd3BaajRxOFlZd2swPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLY3lrL3BYNENxMTBTU0h6cGc1RDJoQTQrbnRJNXIxWUJRblJaSDVnUnpJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9NdDc2VHJzNzdnVWsvRWl4R0Zsc05QRFg3MTlvdlh1RFEyNWMwNUxZMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikc5eWpDNFVGVVV1K2ZEaDNVaDRYSTk0VUV0eCs0alcreFk3dm9mL1N5VDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lEamtRZWVSdGg5TVFJRkFRSTU1bGphWkd2blRubXNWbFpjQXQ5S1ptRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnFHVHA2VkNrMndtZ1Q5N1lCYWc3SlRtZGNTREZld1lYMjAwUXJFeDkyVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InE1TCtKcjhQR01sV0pNMVdhNkVGTmJNVGF2Yk1FWTd0VUNoZEJ6RXRzdmFlVldBMEV6V1RtS0lZNDZYZmZ4K3Jpd2htMmZVa3RnaDFlell4VklGMWdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMwLCJhZHZTZWNyZXRLZXkiOiJHVkJSQ3ZpbCtzYnFrazZtWjcrWUFjWTFGQ1hpQnBmNlhFenVlM0ZaU1prPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3VVp1aVR1M1RjQzQ0c3RXMjdIUGx3IiwicGhvbmVJZCI6ImQ3NGMxYTUzLTI3MWMtNDEzYS1hOGE2LTU4NDgwOGFhNGEzMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkaUZVQVl1Q2VJUkt5T25zOVljd2FEQW5GeTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmdRTUh3bWhqaWt4WGJUQzRIL2xrMkxnTDJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhZUFFLRVZRIiwibWUiOnsiaWQiOiIyNTQxMDQ5MTYwOTE6NDlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lHem1aQUNFT1BDM3JzR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFvWkhvTS9iVjJ3T2dnYXNQcDJNZVFOODNkcU1BZjlNNmh1SlRMMDdHemM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkpqcVRHVG5sKzBJR0hDNDQvTWUwdjB6QVZmamNGYW5zVis3Tmh0emVONTJqVVhsZlI3WGJLbE5FWVk3OXNoaDlzN1J3TS9FTzl0TDFRUmZRY2lzNkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJyZzAxR2hZOUZaRWVQby92QW93dXZnM1o5b0FPbzBvakVwdnJtQ29uR1pXRXVoYUx3RXhKT2x4V2pvUXUxQjFjdnYzZXJBcHFJWXlmSUVWaVVtL3doUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwNDkxNjA5MTo0OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVS0dSNkRQMjFkc0RvSUdyRDZkakhrRGZOM2FqQUgvVE9vYmlVeTlPeHMzIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1ODkzMzYyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU51TCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Alvino",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254104916091",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Depahs',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
