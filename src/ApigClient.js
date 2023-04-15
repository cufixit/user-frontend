var apigClientFactory = require("aws-api-gateway-client").default;
var apigClient = apigClientFactory.newClient({
  invokeUrl: "https://ki09kl7t4d.execute-api.us-east-1.amazonaws.com/dev",
});

export default apigClient;
