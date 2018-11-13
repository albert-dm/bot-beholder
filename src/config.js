const dev = {
  env: "dev",
  basename: "/"
};

const prod = {
  env: "prod",
  basename: "/BotBeholder/"
};

const config = process.env.NODE_ENV === 'production'
  ? prod
  : dev;

export default {
  // Add common config values here
  tracingUrl: "https://bot-beholder-serve.herokuapp.com/",
  ...config
};