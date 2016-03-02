import {Component, EventEmitter} from 'angular2/core';

import {Task} from '../model/task';

@Component({
    selector: 'ticket',
    inputs: ['task'],
    outputs: ['_editTicket: onEdit', '_removeTicket: onRemove', '_displayDetails: onSelect'],
    template: `
        <div *ngIf="task" class="ticket">
            <h4 class="ticket-name">
                <a href="#" (click)="selectTicket()">{{task.name}}</a>
            </h4>
            <div class="ticket-description">{{task.description}}</div>
            <div class="controls">
                <button (click)="editTicket()">Edit</button>
                <button (click)="removeTicket()">Remove</button>
            </div>
            <div class="ticket-points"><span>{{task.points}}</span></div>
        </div>
    `
})
export class Ticket {
    task: Task;

    private _editTicket: EventEmitter<Task> = new EventEmitter<Task>();
    private _removeTicket: EventEmitter<Task> = new EventEmitter<Task>();
    private _displayDetails: EventEmitter<Task> = new EventEmitter<Task>();

    editTicket() {
        this._editTicket.emit(this.task);
    }

    removeTicket() {
        this._removeTicket.emit(this.task);
    }

    selectTicket() {
        this._displayDetails.emit(this.task);
    }
}
