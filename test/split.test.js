import * as VARSQLUtils from '../src/sqlSplitter';
import {TEST_SQL as testSql} from './testSQL';

import {equalizeWhitespace} from '../src/utils'

const split = (sql, cfg = {}) => VARSQLUtils.split(sql, { ...cfg});

// describe.skip 체크 안할때.
describe('splitter simple test', () => {

    it('first item test', () => {
      const result = split(testSql,{findLine : 2, findCharPos : 28});
      expect(equalizeWhitespace(result[0].statement)).toBe(equalizeWhitespace(`select TABLE_SCHEMA  "SCHEMA"
      , TABLE_NAME AS "NAME"
      , prop.value AS "REMARKS"
  from {databaseName}.INFORMATION_SCHEMA.tables tb 
  LEFT JOIN   {databaseName}.SYS.EXTENDED_PROPERTIES prop 
  ON prop.MAJOR_ID = OBJECT_ID(tb.TABLE_CATALOG +'.'+tb.TABLE_SCHEMA +'.'+tb.TABLE_NAME ) AND prop.MINOR_ID= 0 AND prop.class = 1 AND prop.name = 'MS_Description'
  where 1=1 
  and tb.TABLE_TYPE = 'VIEW' ;`));
    });

    it('last char postion check', () => {
        const result = split(testSql,{findLine : 8, findCharPos : 31});
        expect(equalizeWhitespace(result[0].statement)).toBe(equalizeWhitespace(`select * from RES_LPL.CMT_EMP; `));
    });
    
    it('first char postion check', () => {
      const result = split(testSql,{findLine : 12, findCharPos : 0});
      expect(equalizeWhitespace(result[0].statement)).toBe(equalizeWhitespace(`select * from TB_CODE where 1=1;`));
    });

    it('case 4', () => {
      const result = split(testSql,{findLine : 16, findCharPos : 0});
      expect(equalizeWhitespace(result[0].statement)).toBe(equalizeWhitespace(`select * from TB_CODE ;`));
    });

    it('case 5', () => {
      const result = split(testSql,{findLine : 19, findCharPos : 2});
      expect(equalizeWhitespace(result[0].statement)).toBe(equalizeWhitespace(`select GROUP_ID, GROUP_NAME, ACTV, CREATED_DATE, CREATER_ID from RES_LPL.CMT_EMP_GROUP;`));
    });
});

describe('splitter big query', () => {
  it('case 6', () => {
    const result = split(testSql,{findLine : 33, findCharPos : 10});
    expect(equalizeWhitespace(result[0].statement)).toBe(equalizeWhitespace(`select
    (
      select
        count(1) cnt
      from
        TB_AUTH_USER a
        left outer join TB_USER b on a.VIEW_ID = b.VIEW_ID
      where
        1 = 1
        and AUTH_ID = #{authId}
        and (
          b.USER_ID like #{searchVal} + '%'
          or b.USER_NAME like '%' + #{searchVal} + '%'
        )
    ) + (
      select
        count(1)
      from
        TB_USER b
      where
        USER_TYPE = '11'
        and (
          b.USER_ID like #{searchVal} + '%'
          or b.USER_NAME like '%' + #{searchVal} + '%'
        )
    ) with cte AS(
      select
        a.VIEW_ID,
        b.USER_NAME,
        b.USER_TYPE,
        b.USER_ID,
        'mapping' as TYPE
      from
        TB_AUTH_USER a
        left outer join TB_USER b on a.VIEW_ID = b.VIEW_ID
      where
        1 = 1
        and AUTH_ID = #{authId}
        and (
          b.USER_ID like #{searchVal} + '%'
          or b.USER_NAME like '%' + #{searchVal} + '%'
        )
      union all
      select
        b.VIEW_ID,
        b.USER_NAME,
        b.USER_TYPE,
        b.USER_ID,
        'userType' as TYPE
      from
        TB_USER b
      where
        USER_TYPE = '11'
        and (
          b.USER_ID like #{searchVal} + '%'
          or b.USER_NAME like '%' + #{searchVal} + '%'
        )
    )
  select
    *
  from
    cte
  ORDER BY
    USER_NAME asc OFFSET #{_startRow} -1 ROWS FETCH NEXT 10 ROWS ONLY;
  `));
  });

});