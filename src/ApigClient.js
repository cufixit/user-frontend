var apigClientFactory = require("aws-api-gateway-client").default;
var apigClient = apigClientFactory.newClient({
  invokeUrl: "https://su4ir1oq89.execute-api.us-east-1.amazonaws.com/dev",
});

export default apigClient;
