import {Pipe, PipeTransform} from 'angular2/core';

import {Task} from '../model/task';

@Pipe({
    name: 'tasksFilter',
    // Pure make the pipe becomes stateful pipe
    // By default it's value is true which is stateless, data will be fetch only 1 time
    pure: false
})
export class TaskFilterPipe implements PipeTransform {
    transform(value: Task[], args: string[]): Task[] {
        if (typeof args[0] === 'undefined') {
            return value;
        }

        let status = args[0];
        if (value) {
            return value.filter(task => task.status === status);
        }
    }
}
