import { RequestMethod } from '@angular/http';

export interface RequestArgs {
  method: RequestMethod;
  search: string;
  url: string;
}

export interface RequestOptions {
  method?: RequestMethod;
  paginate?: boolean;
  query?: string;
  url: string;
}

export interface PaginateData {
  collection: any[];
  next_href?: string;
}