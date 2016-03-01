import {Pipe, PipeTransform} from 'angular2/core';

import {Task} from '../model/task';

@Pipe({
    name: 'tasksFilter'
})
export class TaskFilterPipe implements PipeTransform {
    transform(value: Task[], args: string[]): Task[] {
        if (typeof args[0] === 'undefined') {
            return value;
        }

        let status = args[0];
        return value.filter(task => task.status === status);
    }
}