const SPACE_SPLITTER = /\s+/;

export function tracklistIdForSearch(query: string): string {
  query = query.trim().split(SPACE_SPLITTER).join(' ');
  return `search/${query}`.toLowerCase();
}

