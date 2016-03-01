import {Component} from 'angular2/core';

import {Task} from '../model/task';

@Component({
    selector: 'ticket',
    inputs: ['task'],
    template: `
        <div *ngIf="task" class="ticket">
            <h6 class="ticket-name">{{task.name}}</h6>
            <div class="ticket-description">{{task.description}}</div>
            <div class="controls">
                <button>Edit</button>
                <button>Remove</button>
            </div>
            <div class="ticket-points"><span>{{task.points}}</span></div>
        </div>
    `
})
export class Ticket {
    task: Task;
}