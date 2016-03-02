import {Component, ViewChild, OnInit} from 'angular2/core';

import {Task} from '../model/task';
import {TaskService} from '../services/task.service';
import {TaskFilterPipe} from '../pipes/taskFilter.pipe';

import {Lane} from './lane';
import {DetailPanel} from './detailPanel';
import {EditorPanel} from './editorPanel';

@Component({
    selector: 'kanbanBoard',
    directives: [Lane, DetailPanel, EditorPanel],
    providers: [TaskService],
    pipes: [TaskFilterPipe],
    template: `
        <div class="kanbanBoard">
            <div class="kanbanBoard-toolbar">
                <button class="btn-add" (click)="addTicket()">Add</button>
            </div>
            <div class="lanes">
                <lane type="todo" [tasks]="tasks | tasksFilter: 'todo'"
                      (onTicketEdit)="editTicket($event)"
                      (onTicketRemove)="removeTicket($event)"
                      (onTicketSelect)="selectTicket($event)"></lane>
                <lane type="inprogress" [tasks]="tasks | tasksFilter: 'inprogress'"
                      (onTicketEdit)="editTicket($event)"
                      (onTicketRemove)="removeTicket($event)"
                      (onTicketSelect)="selectTicket($event)"></lane>
                <lane type="done" [tasks]="tasks | tasksFilter: 'done'"
                      (onTicketEdit)="editTicket($event)"
                      (onTicketRemove)="removeTicket($event)"
                      (onTicketSelect)="selectTicket($event)"></lane>
            </div>
            <detailPanel [task]="selectedTask"></detailPanel>
            <editorPanel [task]="editingTask" [active]="isEditorPanelActive"
                         (onSubmit)="submitTaskChange($event)" (onCancel)="onEditorPanelCancel()"></editorPanel>
        </div>
    `
})
export class KanbanBoard implements OnInit{
    tasks: Task[] = [];
    selectedTask: Task;
    editingTask: Task;
    isEditorPanelActive: boolean;

    constructor(private _taskService: TaskService) {}

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this._taskService.getTasks()
            .then(tasks => { this.tasks = tasks; });
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
        this.isEditorPanelActive = false;
        this._taskService.updateTask(task);
    }

    onEditorPanelCancel() {
        this.isEditorPanelActive = false;
    }
}
