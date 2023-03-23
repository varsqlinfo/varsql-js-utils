import { removeAllComment } from "./core/utils";

import SqlParamInfo from "./core/sql/SqlParamInfo";



// split function
export const getSqlParam = (sql: string): { [key: string]: SqlParamInfo } => {
  if (typeof sql !== "string") {
    throw new Error(
      "Invalid sql argument. Expected string, instead got " + typeof sql
    );
  }

  sql = removeAllComment(sql);

  var sqlParam: { [key: string]: SqlParamInfo } = {};

  var matchArr = sql.match(/[#|$]{(.+?)}/gi);

  if (matchArr) {
    
    for (var i = 0; i < matchArr.length; i++) {
      var propertyVal = matchArr[i].replace(/[$|#|{|}]/gi, '');

      propertyVal = propertyVal.replace(/\s/g, ''); // 공백 제거

      const allProperty: string[] = propertyVal.split(',');
      let propertyKey: string = '';
      let propertyMode: string = '';
      for (var j = 0; j < allProperty.length; j++) {
        var propSplitArr = allProperty[j].split("=");
        var key = propSplitArr[0];
        if (propSplitArr.length > 1) {
          var val = propSplitArr[1];
          if ("MODE" == key.toUpperCase()) {
            propertyMode = propSplitArr[1];
          }
        } else {
          propertyKey = key;
        }
      }

      if (!sqlParam.hasOwnProperty(propertyKey)) {
        let sqlParamInfo: SqlParamInfo = {
          key: propertyKey
          , mode: propertyMode
        };
        sqlParam[propertyKey] = sqlParamInfo; 
      }
    }
  }

  return sqlParam; 
}