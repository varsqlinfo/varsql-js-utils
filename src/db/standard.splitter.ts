import { DEFAULT_TEXT_CHECK_TOKEN, DEFAULT_END_SPLITTER } from "../constants";
import Splitter from "../core/sql/split/Splitter";
import { SplitChecker } from "../SplitChecker";
import { TextCheckTokenInfo } from "../core/sql/split/TextCheckTokenInfo";
import { EndCheckTokenInfo } from "../core/sql/split/EndCheckTokenInfo";

import {  } from "../constants";

export default class StandardSplitter extends Splitter {
  checker(): SplitChecker {
    return {
      textChecker: new TextCheckTokenInfo(DEFAULT_TEXT_CHECK_TOKEN),
      endChecker: new EndCheckTokenInfo(DEFAULT_END_SPLITTER),
    };
  }
}
