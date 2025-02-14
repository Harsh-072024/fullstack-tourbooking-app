export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1"
    : "/api/v1";


