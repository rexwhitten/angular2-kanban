import {Injectable} from 'angular2/core';

import {MOCK_ITEMS} from '../mock-items';
import {Task} from '../model/task';

@Injectable()
export class TaskService {
    getTasks() {
        return Promise.resolve(MOCK_ITEMS);
    }
}
