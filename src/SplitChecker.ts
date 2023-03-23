import { TextCheckTokenInfo } from "./core/sql/split/TextCheckTokenInfo";
import { EndCheckTokenInfo } from "./core/sql/split/EndCheckTokenInfo";

export interface SplitChecker {
  textChecker : TextCheckTokenInfo;
  endChecker : EndCheckTokenInfo;
}