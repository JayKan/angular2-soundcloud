export interface MediaQueryResults {
  [key: string]: boolean;
}

export interface MediaQueryRule {
  id: string;
  maxWidth?: number;
  minWidth?: number;
  orientation?: number;
  type?: string;
}

export interface MediaQueryUpdate {
  mql: MediaQueryList;
  rule: MediaQueryRule;
}

