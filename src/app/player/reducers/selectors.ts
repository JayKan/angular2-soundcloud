import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

// import { AppState } from '../../app'; // needs to revisit this

import { Selector } from '../../core';
import {
  getTracklistCursor
} from '../../tracklist';
import { PlayerState, TimesState } from '../interfaces';

