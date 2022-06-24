export default interface SplitInfo {
  command: string;
  startLine: number;
  startCharPos: number;
  endLine: number;
  endCharPos: number;
  statement: string;
}
