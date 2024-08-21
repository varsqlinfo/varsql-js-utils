import * as VARSQLUtils from '../../src/sqlParamChecker';
import {PARAM_TEST_SQL as testSql} from '../testSQL';

import {equalizeWhitespace} from '../../src/core/utils'

const getSqlParam = (sql) => VARSQLUtils.getSqlParam(sql);

// describe.skip 체크 안할때.
describe('param check test', () => {

    it('first item test', () => {
      const result = getSqlParam(testSql);
      
      console.log(result);

      expect(Object.keys(result).length).toBeGreaterThan(0);

    });

});
