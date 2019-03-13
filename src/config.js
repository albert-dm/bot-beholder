const dev = {
  env: "dev",
  basename: "/"
};

const prod = {
  env: "prod",
  basename: "/"
};

const config = process.env.NODE_ENV === 'production'
  ? prod
  : dev;



export default {
  pretUrl: process.env.REACT_APP_PRET_API,
  ...config
};