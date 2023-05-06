var apigClientFactory = require("aws-api-gateway-client").default;
var apigClient = apigClientFactory.newClient({
  invokeUrl: "https://agvqn4a9l2.execute-api.us-east-1.amazonaws.com/dev",
});

export default apigClient;
