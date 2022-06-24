import { LINE_CHAR } from "../constants";
import { EndCheck } from "./EndCheckTokenInfo";

// create function check token
export default class DefaultChecker implements EndCheck {
  private lineCount = 0;

  init(){
    this.lineCount = 0;
  }

  checkEnd(word: string, beforeWord: string, c1: string, beforeCh1: string, i: number, sql: string ): boolean {
    if (/\s/.test(c1)) {
      if (this.lineCount > 0 && c1 == LINE_CHAR) {
        this.lineCount += 1;
      } else if (c1 == LINE_CHAR) {
        this.lineCount = 1;
      }
      return this.lineCount > 2 ? true : false; // 공백 2줄 이상이면 분리
    }

    this.lineCount = 0;
    if (beforeCh1 == LINE_CHAR && beforeCh1 == c1) {
      return true;
    }

    return c1 == ";";
  }
}
