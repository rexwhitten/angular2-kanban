import {Component} from 'angular2/core';
import {Task} from "../model/task";

@Component({
    selector: 'detailPanel',
    inputs: ['task'],
    template: `
        <div *ngIf="task" class="detailPanel">
            <h4 class="detailPanel-name">{{task.name}}</h4>
            <ul class="detailPanel-info">
                <li>
                    <label>Story point</label>
                    <span>{{task.points}}</span>
                </li>
            </ul>
            <div>{{task.description}}</div>
        </div>
    `
})
export class DetailPanel {
    task: Task;
}
