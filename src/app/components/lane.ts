import {Component, EventEmitter} from 'angular2/core';

import {Task} from '../model/task';
import {Ticket} from './ticket';

@Component({
    selector: 'lane',
    directives: [Ticket],
    inputs: ['tasks', 'type', 'laneTitle'],
    outputs: ['_onTicketEdit: onTicketEdit', '_onTicketRemove: onTicketRemove', '_onTicketSelect: onTicketSelect'],
    host: {
        'class': 'lane'
    },
    template: `
        <div>
            <div class="lane-title">
                <strong class="lane-task-count">{{tasks.length}}</strong>
                <span>{{laneTitle}}</span>
            </div>
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
