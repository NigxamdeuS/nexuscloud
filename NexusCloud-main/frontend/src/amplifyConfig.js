import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";

// Amplifyの設定を適用
Amplify.configure(awsExports);

// 設定を外部でも使えるようにする
export default awsExports;
