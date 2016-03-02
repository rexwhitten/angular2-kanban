import {Component, EventEmitter} from 'angular2/core';

import {Task} from '../model/task';
import {Ticket} from './ticket';

@Component({
    selector: 'lane',
    directives: [Ticket],
    inputs: ['tasks', 'type'],
    outputs: ['_onTicketEdit: onTicketEdit', '_onTicketRemove: onTicketRemove', '_onTicketSelect: onTicketSelect'],
    template: `
        <div class="lane"
             [class.lane-inprogress]="type === 'inprogress'"
             [class.lane-todo]="type === 'todo'"
             [class.lane-done]="type === 'done'">
            <ticket *ngFor="#task of tasks" [task]="task"
                    (onEdit)="editTicket($event)"
                    (onRemove)="removeTicket($event)"
                    (onSelect)="selectTicket($event)"></ticket>
        </div>
    `
})
export class Lane {
    tasks: Task[];

    private _onTicketEdit: EventEmitter<Task> = new EventEmitter<Task>();
    private _onTicketRemove: EventEmitter<Task> = new EventEmitter<Task>();
    private _onTicketSelect: EventEmitter<Task> = new EventEmitter<Task>();

    editTicket(task: Task) {
        this._onTicketEdit.emit(task);
    }

    removeTicket(task: Task) {
        this._onTicketRemove.emit(task);
    }

    selectTicket(task: Task) {
        this._onTicketSelect.emit(task);
    }
}
