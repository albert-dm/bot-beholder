const dev = {
  env: "dev",
  basename: "/"
};

const prod = {
  env: "prod",
  basename: "/BotBeholder/"
};

const config = process.env.APP_ENV === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};