import { TextCheckTokenInfo } from "./core/TextCheckTokenInfo";
import { EndCheckTokenInfo } from "./core/EndCheckTokenInfo";

export interface SplitChecker {
  textChecker : TextCheckTokenInfo;
  endChecker : EndCheckTokenInfo;
}