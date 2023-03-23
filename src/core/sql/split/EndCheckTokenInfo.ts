// end check interface
export interface EndCheck {
  init() :void;
  checkEnd(word:string, beforeWord:string, c1:string, beforeCh1:string, i:number, sql:string): boolean;
}

export interface EndCheckKeyord {
  end: string
}

export class EndCheckTokenInfo {
  private tokens: Record<string, EndCheck> = {};

  constructor(tokens: Record<string, EndCheck>){
    this.tokens = tokens;
  }

  public put(key: string, value : EndCheck): EndCheckTokenInfo{
    this.tokens[key] = value;
    return this;
  }

  public hasKey(key: string): boolean {
    return this.tokens.hasOwnProperty(key);
  }

  public get(key: string): EndCheck {
    let endCheck = this.tokens[key];
    endCheck.init();
    return endCheck;
  }
}


