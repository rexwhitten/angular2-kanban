import {Component, OnInit} from 'angular2/core';

import {Task} from '../model/task';
import {TaskService} from '../services/task.service';
import {TaskFilterPipe} from '../pipes/taskFilter.pipe';

import {Lane} from 'lane';
import {DetailPanel} from 'detailPanel';

@Component({
    selector: 'kanbanBoard',
    directives: [Lane, DetailPanel],
    providers: [TaskService],
    pipes: [TaskFilterPipe],
    template: `
        <div class="kanbanBoard">
            <div class="lanes">
                <lane type="todo" [tasks]="tasksFilter: 'todo'"></lane>
                <lane type="inprogress" [tasks]="tasksFilter: 'inprogress'"></lane>
                <lane type="done" [tasks]="tasksFilter: 'done'"></lane>
            </div>
            <detailPanel [task]="selectedTask"></detailPanel>
        </div>
    `
})
export class KanbanBoard implements OnInit{
    tasks: Task[];
    selectedTask: Task;

    constructor(private _taskService: TaskService) {}

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this._taskService.getTasks()
            .then(tasks => { this.tasks = tasks});
    }
}
