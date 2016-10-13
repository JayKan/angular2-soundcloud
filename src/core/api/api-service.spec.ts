import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { API_TRACKS_URL, API_USERS_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from '../../constants';
import { UserData } from '../../.';
import { PaginateData } from './interfaces';
import { ApiService } from './api-service';

describe('ApiService', () => {
  const queryKey = 'q';
  const queryValue = 'test';
  const queryParam = `${queryKey}=${queryValue}`;

  let backend: MockBackend;
  let service: ApiService;

  beforeEach(() => {
    let injector = TestBed.configureTestingModule({
      providers: [
        ApiService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions): Http => {
            return new Http(backend, options);
          }
        }
      ]
    });

    backend = injector.get(MockBackend);
    service = injector.get(ApiService);
  });

  afterEach(() => backend.verifyNoPendingRequests());

  describe('@public requestArgs()', () => {
    it('should set RequestArgs.url with provided API url', () => {
      let requestArgs = service._requestArgs({ url: API_TRACKS_URL });
      expect(requestArgs.url).toBe(API_TRACKS_URL);
    });

    it('should add client id to RequestArgs.search', () => {
      let requestArgs = service._requestArgs({ url: API_TRACKS_URL });
      expect(requestArgs.search).toMatch(CLIENT_ID_PARAM);
    });

    it('should NOT add client id param to RequestArgs.search if url already contains client id', () => {
      let requestArgs = service._requestArgs({ url: `${API_TRACKS_URL}?${CLIENT_ID_PARAM}` });
      expect(requestArgs.search).not.toMatch(CLIENT_ID_PARAM);
      expect(requestArgs.search).toBe('');
    });

    it('should pagination params to RequestArgs.search if RequestOptions.paginate is true', () => {
      let requestArgs = service._requestArgs({ paginate: true, url: API_TRACKS_URL });
      expect(requestArgs.search).toMatch(PAGINATION_PARAMS);
    });

    it('should NOT add pagination params to RequestArgs.search if paginate is false or by default', () => {
      let requestArgs = service._requestArgs({ url: API_TRACKS_URL });
      expect(requestArgs.search).not.toMatch(PAGINATION_PARAMS);
    });

    it('should set RequestArgs.method to RequestMethod.Get by default', () => {
      let requestArgs = service._requestArgs({ url: API_TRACKS_URL });
      expect(requestArgs.method).toEqual(RequestMethod.Get);
    });

    it('should set RequestArgs.method with provided method', () => {
      let requestArgs = service._requestArgs({ method: RequestMethod.Post, url: API_TRACKS_URL });
      expect(requestArgs.method).toEqual(RequestMethod.Post);
    });

    it('should add provided query params to RequestArgs.search', () => {
      let requestArgs = service._requestArgs({ query: queryParam, url: API_TRACKS_URL });
      expect(requestArgs.search).toMatch(queryParam);
    });
  });
});