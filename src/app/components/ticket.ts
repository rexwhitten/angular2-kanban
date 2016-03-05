import {Component, EventEmitter} from 'angular2/core';

import {Task} from '../model/task';

@Component({
    selector: 'ticket',
    inputs: ['task'],
    outputs: ['_editTicket: onEdit', '_removeTicket: onRemove', '_displayDetails: onSelect'],
    template: `
        <div *ngIf="task" class="ticket"
             [class.minor]="task.priority == 2"
             [class.major]="task.priority == 1"
             [class.critical]="task.priority == 0">
            <h4 class="ticket-id">
                <a href="/JV-{{task.id}}" title="{{task.name}}"
                   (click)="selectTicket($event)" >JV-{{task.id}}</a>
            </h4>
            <p class="ticket-name">{{task.name}}</p>
            <div class="ticket-description">{{task.description}}</div>
            <span class="ticket-priority"></span>
            <div class="ticket-points"><span>{{task.points}}</span></div>
            <div class="controls">
                <button class="btn btn-glass btn-edit icon-pencil" title="Edit" (click)="editTicket()"></button>
                <button class="btn btn-glass btn-remove icon-cross" title="Remove" (click)="removeTicket()"></button>
            </div>
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

    selectTicket(evt) {
        if (evt) {
            evt.preventDefault();
        }
        this._displayDetails.emit(this.task);
    }
}
