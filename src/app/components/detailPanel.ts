import {Component, EventEmitter} from 'angular2/core';

import {Task} from '../model/task';

@Component({
    selector: 'detailPanel',
    inputs: ['task'],
    outputs: ['_editTicket: onEdit'],
    host: {
        'class': 'detailPanel'
    },
    template: `
        <div *ngIf="task">
            <h4 class="detailPanel-name">{{task.name}}</h4>
            <div class="detailPanel-sideControls">
                <div class="controls">
                    <button class="btn btn-glass btn-edit icon-pencil" (click)="editTicket()"></button>
                </div>
            </div>
            <ul class="detailPanel-info">
                <li>
                    <label>Status</label>
                    <span>{{task.status}}</span>
                </li>
                <li>
                    <label>Priority</label>
                    <span>{{task.priority}}</span>
                </li>
                <li>
                    <label>Story point</label>
                    <span>{{task.points}}</span>
                </li>
            </ul>
            <div class="detailPanel-description">
                <div>{{task.description}}</div>
            </div>
        </div>
    `
})
export class DetailPanel {
    task: Task;

    private _editTicket: EventEmitter<Task> = new EventEmitter<Task>();

    editTicket() {
        this._editTicket.emit(this.task);
    }
}
