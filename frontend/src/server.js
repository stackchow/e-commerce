export const server =
  process.env.NODE_ENV !== "PRODUCTION" //Not in production
    ? "http://localhost:8000/api/v1"
    : "https://api-stackmart.onrender.com/api/v1";