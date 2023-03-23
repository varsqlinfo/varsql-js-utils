export const TEST_SQL = `select TABLE_SCHEMA  "SCHEMA"
, TABLE_NAME AS "NAME"
, prop.value AS "REMARKS"
from {databaseName}.INFORMATION_SCHEMA.tables tb 
LEFT JOIN   {databaseName}.SYS.EXTENDED_PROPERTIES prop 
ON prop.MAJOR_ID = OBJECT_ID(tb.TABLE_CATALOG +'.'+tb.TABLE_SCHEMA +'.'+tb.TABLE_NAME ) AND prop.MINOR_ID= 0 AND prop.class = 1 AND prop.name = 'MS_Description'
where 1=1 
and tb.TABLE_TYPE = 'VIEW' ;
select * from RES_LPL.CMT_EMP; 

select * from RES_PMS.VW_PROJ_FILE_DATA;

select * from TB_CODE where 1=1;

select * from TB_CODE

;


select GROUP_ID, GROUP_NAME, ACTV, CREATED_DATE, CREATER_ID from RES_LPL.CMT_EMP_GROUP;

select * from TB_BOOKMARK;

select * from RES_LPL.CMT_COMN_DTL;

select * from RES_LPL.CMT_EMP;

select
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

  select * from RES_LPL.dbo.CMT_COMN_GRP;

select * from RES_LPL.dbo.CMT_COMN_DTL;
`;


export const PARAM_TEST_SQL = `select TABLE_SCHEMA  "SCHEMA"
, TABLE_NAME AS "NAME" /* #{bbbb}*/
, prop.value AS "REMARKS" -- #{aaa}
from {databaseName}.INFORMATION_SCHEMA.tables tb 
LEFT JOIN   {databaseName}.SYS.EXTENDED_PROPERTIES prop 
ON prop.MAJOR_ID = OBJECT_ID(tb.TABLE_CATALOG +'.'+tb.TABLE_SCHEMA +'.'+tb.TABLE_NAME ) AND prop.MINOR_ID= 0 AND prop.class = 1 AND prop.name = 'MS_Description'
where 1=1 
and tb.TABLE_TYPE = #{test1}
and tb.tab = \${aaaa}`