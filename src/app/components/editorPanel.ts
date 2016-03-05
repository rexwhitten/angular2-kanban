import {Component, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {Task} from '../model/task';

@Component({
    selector: 'editorPanel',
    inputs: ['task', 'active'],
    outputs: ['_onSubmit: onSubmit', '_onCancel: onCancel'],
    template: `
        <div class="modal" *ngIf="model && active">
            <div class="editPanel modal-content">
                <form (ngSubmit)="submitChange()" #taskForm="ngForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" required
                               [(ngModel)]="model.name"
                               ngControl="name" #nameInput="ngForm">
                        <div [hidden]="nameInput.valid || nameInput.pristine" class="alert alert-danger">
                            Name is required
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="priority">Status</label>
                        <select [(ngModel)]="model.status" required>
                            <option value="todo">To do</option>
                            <option value="inprogress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="points">Story points</label>
                        <input type="number" class="form-control"
                               [(ngModel)]="model.points"
                               ngControl="points" #pointsInput="ngForm">
                        <div [hidden]="pointsInput.valid || pointsInput.pristine" class="alert alert-danger">
                            Story point is not valid
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="priority">Priority</label>
                        <select [(ngModel)]="model.priority" required>
                            <option value="2">Minor</option>
                            <option value="1">Major</option>
                            <option value="0">Critical</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" [(ngModel)]="model.description"></textarea>
                    </div>

                    <div class="form-controls">
                        <button type="submit" class="btn btn-submit" [disabled]="!taskForm.form.valid">Submit</button>
                        <button type="button" class="btn btn-cancel" (click)="cancel()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class EditorPanel {
    active: boolean;
    private _task: Task;
    private model: Task;
    private _onSubmit: EventEmitter<Task> = new EventEmitter<Task>();
    private _onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

    public set task(value: Task) {
        if (value) {
            this._task = value;
            this.model = new Task(
                value.id,
                value.name,
                value.description,
                value.status,
                value.priority,
                value.points
            );
            this.model.newTask = value.newTask;
        } else {
            this._task = null;
            this.model = null;
        }
    }

    public get task(): Task {
        return this._task;
    }

    submitChange() {
        this._onSubmit.emit(this.model);
    }

    cancel() {
        this.active = false;
        this._onCancel.emit(false);
    }
}
