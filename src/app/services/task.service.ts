import {Injectable} from 'angular2/core';

import {MOCK_ITEMS} from '../mock-items';
import {Task} from '../model/task';

@Injectable()
export class TaskService {
    getTasks() {
        let tasks = [];
        MOCK_ITEMS.forEach(function (task) {
            tasks.push(new Task(task.id, task.name, task.description, task.status, task.priority, task.points));
        });
        return Promise.resolve(tasks);
    }

    removeTask(taskId: number) {

    }

    updateTask(task: Task) {

    }
}
