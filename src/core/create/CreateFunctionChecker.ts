import {EndCheck, EndCheckKeyord} from "../EndCheckTokenInfo"



// create function check token
export default class CreateFunctionChecker implements EndCheck{
  private begin = false;
  private endFlag = false;
  private tokenStack:any = [];
  private endCheckKeywords: Record<string, EndCheckKeyord>;

  constructor(endCheckKeywords: Record<string, EndCheckKeyord>) {
    this.endCheckKeywords = endCheckKeywords;
  }

  init(){
    this.begin = false;
    this.endFlag = false;
    this.tokenStack = [];
  }

  checkEnd(word: string, beforeWord: string, c1: string, beforeCh1: string, i: number, sql: string): boolean {
    if('begin' == word){
      this.begin = true;
    }else if(this.endCheckKeywords.hasOwnProperty(word)){
      if('end' == beforeWord){
        this.tokenStack.pop();				
      }else{
        this.tokenStack.push(this.endCheckKeywords[word]);				
      }
    }else if('end' == word){
      let popItem = this.tokenStack[this.tokenStack.length - 1];

      if(popItem && popItem.end ==''){
        this.tokenStack.pop();
      }
      this.endFlag = this.tokenStack.length == 0;
    }

    if(this.begin && this.endFlag && c1 ==';'){
      return true; 
    }
    return false; 
  }
}