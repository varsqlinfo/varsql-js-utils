import CreateChecker from "./core/create/CreateChecker";
import CreateFunctionChecker from "./core/create/CreateFunctionChecker";
import CreateTriggerCheckerr from "./core/create/CreateTriggerCheckerr";
import CreateProcedureChecker from "./core/create/CreateProcedureChecker";
import DefaultChecker from "./core/DefaultChecker";

import { TextCheckToken } from "./core/TextCheckTokenInfo";

import { EndCheckKeyord, EndCheck } from "./core/EndCheckTokenInfo";

// line char
export const LINE_CHAR = '\n';

// tab char
export const TAB_CHAR = '\t';

export const DEFAULT_TEXT_CHECK_TOKEN: Record<string, TextCheckToken> = {
  "'": {
    keepWord: true,
    checkEnd(beforeCh1: string, c1: string, c2: string): boolean {
      return beforeCh1 != "\\" && c1 == "'";
    },
  },
  '"': {
    keepWord: true,
    checkEnd(beforeCh1: string, c1: string, c2: string): boolean {
      return beforeCh1 != "\\" && c1 == '"';
    },
  },
  "--": {
    keepWord: true,
    endToken: LINE_CHAR,
  },
  "/*": {
    keepWord: true,
    endToken: "*/",
  },
  "#{": {
    keepWord: true,
    endToken: "}",
  },
  "${": {
    keepWord: true,
    endToken: "}",
  },
};

export const CREATE_END_CHECK_KEYWORD: Record<string, EndCheckKeyord>  = {
	'if' :{
		end : 'if'
	}
	,'loop' :{
		end : 'loop'
	}
	,'case' :{
		end : ''
	}
};

export const DEFAULT_END_SPLITTER : Record<string, EndCheck> = {
  'default' : new DefaultChecker()
  ,'create' : new CreateChecker()
  ,'create_function' : new CreateFunctionChecker(CREATE_END_CHECK_KEYWORD)
  ,'create_trigger' : new CreateTriggerCheckerr(CREATE_END_CHECK_KEYWORD)
  ,'create_procedure' : new CreateProcedureChecker(CREATE_END_CHECK_KEYWORD)
}