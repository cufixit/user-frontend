import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_ZsWZMTmx0",
  ClientId: "7510b77pj9s343c518631nct8o",
};

export default new CognitoUserPool(poolData);
