import { trim } from "../utils";
import { LINE_CHAR } from "../constants";
import { SplitChecker } from "../SplitChecker";
import { TextCheckTokenInfo } from "./TextCheckTokenInfo";
import { EndCheckTokenInfo } from "./EndCheckTokenInfo";
import { SplitOptions } from "../splitOptions";
import SplitInfo from "./SplitInfo";


export default class Splitter {
  private textChecker : TextCheckTokenInfo;
  private endChecker : EndCheckTokenInfo;
  private cfg : SplitOptions;

  constructor(cfg: SplitOptions) {
    this.cfg = cfg; 

    let checker =this.checker();
    this.textChecker = checker.textChecker;
    this.endChecker = checker.endChecker;
  }

  protected checker(): SplitChecker {
    throw new Error('checker() not implemented by subclass');
  }

  public split(sql:string, findLine?:number, findCharPos?:number) : SplitInfo[]{
    findLine = typeof findLine =='undefined' ? -1 : findLine;
	findCharPos = typeof findCharPos =='undefined' ? -1 : findCharPos;
				
	let statementList: SplitInfo[] = [];
	let statement = [];
	
	let g_idx =0; 

	let sqlLen = sql.length; 
	let lineIdx =0; 
	let startLine = 0; 
	let startCharPos = 0; 

	let c1:string ='', c2:string='';

	let beforeCh1:string; 
    let orginCh:string;

	let startCommand = false;
	let command='';
	let word ='';
	let beforeWord ='';

	let endCheckerInter = null;
	let textCheckerInter = null;

	let currentEndTokenKey = '';
	let lineStartCharIdx = 0;

	let overflowFlag = false; //찾는 문자 영역을 벋어 났는지 여부
	let overflowNextSplitChk = false; // 찾는 문자 라인에 쿼리가 있는지 여부

	for (let i = 0; i < sqlLen; i++) {
		beforeCh1 = c1; // 이전 값 넣기.
		orginCh = sql.charAt(i);

		c1 = orginCh.toLowerCase();
		c2 = c1+((i + 1) < sqlLen ? sql.charAt(i + 1) : '0');
		c2 = c2.toLowerCase();
				
		if(c1==LINE_CHAR){
			lineStartCharIdx = i;
			++lineIdx;
		}

		if(c1==beforeCh1){
			g_idx++;

			if(g_idx > 1000){
				console.log('split error');
				break; 
			}
		}else{
			g_idx = 0;
		}
		
		if(textCheckerInter==null){
			if(this.textChecker.hasKey(c2) || this.textChecker.hasKey(c1)){
				textCheckerInter = this.textChecker.get(c2) || this.textChecker.get(c1);
				if(textCheckerInter.keepWord !== false) statement.push(orginCh);

				continue; 
			}
		}else{
			let check = false; 
			if(textCheckerInter.checkEnd && textCheckerInter.checkEnd(beforeCh1, c1, c2)){
				check = true; 
			}else if(textCheckerInter.endToken == c2 || textCheckerInter.endToken == c1){
				check = true; 
			}

			if(check){
				if(textCheckerInter.keepWord === false){
					i += (textCheckerInter.endToken?textCheckerInter.endToken.length -1 : 0);
				}else{
					statement.push(orginCh);
				}
				textCheckerInter = null;
			}else{
				if(textCheckerInter.keepWord !== false) statement.push(orginCh);
			}
			
			continue; 
		}

		statement.push(orginCh);
		/*
		if(/[(),]/.test(c1)){
			continue; 
		}
		*/

		// 공백체크. ( 체크 
		if(/[\s(]/.test(c1)){
			if(startCommand) startCommand = false; 
			beforeWord = word; 
			word = '';
		}else {
			if(command == ''){
				if(/[;/!@#$%^&()+=?\-]/.test(c1)){// command 시작 문자가 특수 문자면 command로 처리 안함. 
					continue; 
				}
				startLine = lineIdx;
				startCharPos = i -lineStartCharIdx;
				startCommand = true; 
			}

			if(startCommand){
				command += c1;
			}
			word += c1;
		}
		
		if(startCommand===false && endCheckerInter == null && command !=''){
			currentEndTokenKey = command;
			if(this.endChecker.hasKey(command)){
				endCheckerInter = this.endChecker.get(command);	
			}else {
				endCheckerInter = this.endChecker.get('default');
			}
		}else{
			if(this.endChecker.hasKey(currentEndTokenKey+'_'+word)){
				currentEndTokenKey = currentEndTokenKey+'_'+word;
				endCheckerInter = this.endChecker.get(currentEndTokenKey);
			}
		}

		if(!overflowNextSplitChk && !overflowFlag && (findLine !=-1 && (lineIdx >= findLine && findCharPos <= i-lineStartCharIdx)) ){
			overflowFlag = true; 

			if(command.trim()=='' && statementList.length > 0){

				let newLineIdx =sql.indexOf(LINE_CHAR, i+1); 
				if(newLineIdx > -1){ // 라인 끝 체크, 체크 해서 문자가 있으면 다음 query 리턴하게 처리.
					let lineStr = sql.substring(i+1,newLineIdx);
					lineStr = trim(lineStr);
					let firstChar = lineStr.charAt(0);
					if(lineStr !='' && !/[;/!@#$%^&()+=?\-]/.test(firstChar)){
						overflowNextSplitChk = true; 
						continue;
					}
				}

				return [statementList[statementList.length -1]];	
			}
		}

		if((endCheckerInter && endCheckerInter.checkEnd(word, beforeWord, c1, beforeCh1, i, sql)) || i+1 == sqlLen){
			
			let sqlSplitInfo : SplitInfo = {
                command : command
				,startLine : startLine
				,startCharPos : startCharPos
				,endLine : lineIdx
				,endCharPos : i -lineStartCharIdx
				,statement : statement.join('')
			};

			//console.log(endCheckerInter, sqlSplitInfo)

			if(overflowFlag){
				return [sqlSplitInfo];	
			}

			if(findLine !=-1){
				if(startLine <= findLine && findLine <= lineIdx){ // 라인이 다를경우

					if(startLine == lineIdx && findLine == lineIdx){
						if(startCharPos <= findCharPos && findCharPos <= sqlSplitInfo.endCharPos){
							return [sqlSplitInfo];	
						}
					}else{
						return [sqlSplitInfo];	
					}
				}
			}

			statementList.push(sqlSplitInfo);
			
			command = '';
			word == '';
			statement = [];
			endCheckerInter = null;
			startCommand = false; 
		}
	}
	return statementList;
  }
}
