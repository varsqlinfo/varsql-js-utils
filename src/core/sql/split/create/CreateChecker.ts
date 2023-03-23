import {EndCheck} from "../EndCheckTokenInfo"

// create check token
export default class CreateChecker implements EndCheck{
  private idx : number = 0; 
  init(){
    this.idx=0; 
  }
  checkEnd(word: string, beforeWord: string, c1: string, beforeCh1: string, i: number, sql: string): boolean {
    return c1 =='/' || c1 ==';';
  }
}
