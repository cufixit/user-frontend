import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_o09HAcOym",
    ClientId: "6c4esksiu6d045bjl56qq8f1l1"
}

export default new CognitoUserPool(poolData);