var apigClientFactory = require("aws-api-gateway-client").default;
var apigClient = apigClientFactory.newClient({
  invokeUrl: "https://85ultm5aqh.execute-api.us-east-1.amazonaws.com/dev",
});

export default apigClient;
