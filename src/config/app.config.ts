export const AppConfig = () => ({
  mongoURI: process.env.DB_URI,
  mongoURILocal: process.env.DB_URI_LOCAL,
  mongoURIProd: process.env.DB_URI_PROD,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRES,
});
