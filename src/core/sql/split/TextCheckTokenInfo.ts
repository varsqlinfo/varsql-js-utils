import { LINE_CHAR } from "../../../constants";

export interface TextCheckToken {
  keepWord: boolean;
  endToken?: string;
  checkEnd?(beforeCh1: string, c1: string, c2: string): boolean;
}

export class TextCheckTokenInfo {
  private tokens: Record<string, TextCheckToken>;

  constructor(tokens: Record<string, TextCheckToken>){
    this.tokens = tokens;
  }

  public put(key: string, value : TextCheckToken) : TextCheckTokenInfo{
    this.tokens[key] = value;
    return this;
  }

  public hasKey(key: string): boolean {
    return this.tokens.hasOwnProperty(key);
  }

  public get(key: string): TextCheckToken {
    return this.tokens[key];
  }
}
