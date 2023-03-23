import { SplitOptions } from "./splitOptions";
import StandardSplitter from "./core/sql/db/standard.splitter";
import SplitInfo from "./core/sql/split/SplitInfo";

let splitters = {
  standard: StandardSplitter,
};

export type language = keyof typeof splitters;
export type SplitFnOptions = SplitOptions & { language: language };

// default option
const defaultOptions: SplitFnOptions = {
  language: "standard",
  keepComment: true,
  findLine: -1,
  findCharPos: -1,
};

// split function
export const split = (sql: string, cfg: Partial<SplitFnOptions> = {}): SplitInfo[] => {
  if (typeof sql !== "string") {
    throw new Error(
      "Invalid sql argument. Expected string, instead got " + typeof sql
    );
  }

  const options = {...defaultOptions, ...cfg};
  const Splitter = splitters[options.language];

  return new Splitter(options).split(sql, cfg.findLine, cfg.findCharPos);
};


