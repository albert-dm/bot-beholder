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
  //tracingUrl: "https://bot-beholder-serve.herokuapp.com/",
  tracingUrl: "https://bot-beholder.azurewebsites.net/",
  //pretUrl: "https://pretwebsockethmg.azurewebsites.net/testhub",
  pretUrl: "https://pretwebsocketprod.azurewebsites.net/testhub",
  ...config
};