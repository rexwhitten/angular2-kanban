import {Component, ViewChild, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterOutlet, RouterLink} from 'angular2/router';

import {Task} from '../model/task';
import {TaskService} from '../services/task.service';
import {TaskFilterPipe} from '../pipes/taskFilter.pipe';

import {Lane} from './lane';
import {DetailPanel} from './detailPanel';
import {EditorPanel} from './editorPanel';

@Component({
    selector: 'kanbanBoard',
    directives: [RouterOutlet, RouterLink, Lane, DetailPanel, EditorPanel],
    providers: [TaskService],
    pipes: [TaskFilterPipe],
    template: `
        <div class="kanbanBoard">
            <div class="kanbanBoard-toolbar">
                <a class="btn btn-add" [routerLink]="['NewTicket']">Create</a>
            </div>
            <div class="kanbanBoard-intro">
                <h2 class="kanbanBoard-team-title">Team JV.</h2>
            </div>
            <div class="kanbanBoard-content">
                <div class="lanes">
                    <lane type="todo" laneTitle="To do"
                          [tasks]="tasks | tasksFilter: 'todo'"
                          (onTicketEdit)="editTicket($event)"
                          (onTicketRemove)="removeTicket($event)"
                          (onTicketSelect)="selectTicket($event)"></lane>
                    <lane type="inprogress" laneTitle="In progress"
                          [tasks]="tasks | tasksFilter: 'inprogress'"
                          (onTicketEdit)="editTicket($event)"
                          (onTicketRemove)="removeTicket($event)"
                          (onTicketSelect)="selectTicket($event)"></lane>
                    <lane type="done" laneTitle="Done"
                          [tasks]="tasks | tasksFilter: 'done'"
                          (onTicketEdit)="editTicket($event)"
                          (onTicketRemove)="removeTicket($event)"
                          (onTicketSelect)="selectTicket($event)"></lane>
                </div>
                <detailPanel *ngIf="selectedTask" [task]="selectedTask"
                             (onEdit)="editTicket($event)"></detailPanel>
                <editorPanel *ngIf="isEditorPanelActive == true && editingTask" [task]="editingTask" [active]="isEditorPanelActive"
                             (onSubmit)="submitTaskChange($event)" (onCancel)="onEditorPanelCancel()"></editorPanel>
            </div>
        </div>
    `
})
export class KanbanBoard implements OnInit{
    tasks: Task[] = [];
    selectedTask: Task;
    editingTask: Task;
    isEditorPanelActive: boolean;

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _taskService: TaskService) {}

    ngOnInit() {
        this.getTasks();
    }

    processRoute() {
        let routeParams = this.getRouteParams();
        let path = this._router.parent.lastNavigationAttempt;
        if (path.indexOf('/insert') >= 0) {
            this.addTicket();
        } else {
            if (routeParams) {
                // TODO process route further
            }
        }
    }

    getRouteParams() {
        let routeParams = this._routeParams.params;
        if (Object.keys(routeParams).length === 0 && JSON.stringify(routeParams) === JSON.stringify({})) {
            routeParams = null;
        }

        return routeParams;
    }

    getTasks() {
        this._taskService.getTasks()
            .then(function(tasks) {
                this.tasks = tasks;
                this.processRoute();
            }.bind(this));
    }

    editTicket(task: Task) {
        if (!this.editingTask) {
            this.editingTask = task;
            this.isEditorPanelActive = true;
        }
    }

    selectTicket(task: Task) {
        this.selectedTask = task;
    }

    removeTicket(task: Task) {
        let array: Task[] = this.tasks.filter(item => {return item.id !== task.id});
        this.tasks = array;
        this._taskService.removeTask(task.id);
    }

    addTicket() {
        if (this.editingTask) {
            return;
        }

        let biggestId: number = 0;
        let newTask: Task;
        this.tasks.forEach(function (task) {
            if (task.id > biggestId) {
                biggestId = task.id;
            }
        });

        newTask = new Task(biggestId + 1);
        newTask.newTask = true;
        this.editingTask = newTask;
        this.isEditorPanelActive = true;
    }

    submitTaskChange(task: Task) {
        let tasks: Task[] = this.tasks;
        if (task.newTask) {
            task.newTask = false;
            tasks.push(task);
        } else {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === task.id) {
                    tasks[i] = task;
                }
            }
        }
        this.tasks = tasks;
        if (this.selectedTask && this.selectedTask.id == task.id) {
            this.selectedTask = task;
        }
        this.onEditorPanelCancel();
        this._taskService.updateTask(task);
    }

    onEditorPanelCancel() {
        this.isEditorPanelActive = false;
        this.editingTask = null;
    }
}
