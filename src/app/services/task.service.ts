import {Injectable} from 'angular2/core';

import {MOCK_ITEMS} from '../mock-items';
import {Task} from '../model/task';

@Injectable()
export class TaskService {
    getTasks() {
        return this.dispatchPromise(function () {
            let tasks: Task[] = [];
            MOCK_ITEMS.forEach(function (task) {
                tasks.push(new Task(task.id, task.name, task.description, task.status, task.priority, task.points));
            });

            return tasks;
        });
    }

    removeTask(taskId: number) {
        let array: Task[] = MOCK_ITEMS.filter(item => {return item.id !== taskId});
        MOCK_ITEMS = array;
    }

    updateTask(task: Task) {
        for (let i = 0; i < MOCK_ITEMS.length; i++) {
            if (MOCK_ITEMS[i].id === task.id) {
                MOCK_ITEMS[i] = task;
                return;
            }
        }

        // Add new item
        MOCK_ITEMS.push(task);
    }

    private dispatchPromise(callback) {
        let promise = new Promise(function (resolve) {
            resolve(callback());
        });

        return promise;
    }
}
