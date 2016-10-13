import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserData } from '../../../users';
import { PaginateData, RequestArgs, RequestOptions } from './interfaces';
import { API_TRACKS_URL, API_USERS_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from '../../constants';

@Injectable()
export class ApiService {
  constructor(private _http: Http) {}

  fetch(url: string): Observable<any> {
    return this._request({url});
  }

  fetchSearchResults(query: string): Observable<PaginateData> {
    return this._request({
      paginate: true,
      query: `q=${query}`,
      url: API_TRACKS_URL
    });
  }

  fetchUser(userId: number): Observable<UserData> {
    return this._request({
      url: `${API_USERS_URL}/${userId}`
    });
  }

  fetchUserLikes(userId: number): Observable<PaginateData> {
    return this._request({
      paginate: true,
      url: `${API_USERS_URL}/${userId}/favorites`
    });
  }

  fetchUserTracks(userId: number): Observable<PaginateData> {
    return this._request({
      paginate: true,
      url: `${API_USERS_URL}/${userId}/tracks`
    })  ;
  }

  private _request(options: RequestOptions): Observable<any> {
    const req: Request = new Request(this._requestArgs(options));
    return this._http.request(req)
      .map((res: Response) => res.json());
  }

  _requestArgs(options: RequestOptions): RequestArgs {
    const { method, paginate, query, url } = options;
    let search: string[] = [];

    if (!url.includes(CLIENT_ID_PARAM)) search.push(CLIENT_ID_PARAM);
    if (paginate) search.push(PAGINATION_PARAMS);
    if (query) search.push(query);

    return {
      method: method || RequestMethod.Get,
      search: search.join('&'),
      url
    };
  }
}