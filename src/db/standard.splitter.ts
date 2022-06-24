import { DEFAULT_TEXT_CHECK_TOKEN, DEFAULT_END_SPLITTER } from "../constants";
import Splitter from "../core/Splitter";
import { SplitChecker } from "../SplitChecker";
import { TextCheckTokenInfo } from "../core/TextCheckTokenInfo";
import { EndCheckTokenInfo } from "../core/EndCheckTokenInfo";

import {  } from "../constants";

export default class StandardSplitter extends Splitter {
  checker(): SplitChecker {
    return {
      textChecker: new TextCheckTokenInfo(DEFAULT_TEXT_CHECK_TOKEN),
      endChecker: new EndCheckTokenInfo(DEFAULT_END_SPLITTER),
    };
  }
}
