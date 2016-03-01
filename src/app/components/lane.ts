import {Component} from 'angular2/core';

import {Task} from '../model/task';
import {Ticket} from './ticket';

@Component({
    selector: 'lane',
    directives: [Ticket],
    inputs: ['tasks', 'type'],
    template: `
        <div class="lane"
             [class.lane-inprogress]="type === 'inprogress'"
             [class.lane-todo]="type === 'todo'"
             [class.lane-done]="type === 'done'">
            <ticket *ngFor="#task of tasks" [task]="task"></ticket>
        </div>
    `
})
export class Lane {
    tasks: Task[];

}
