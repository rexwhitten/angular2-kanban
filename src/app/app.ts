declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
require('../../stylesheet/main.scss');
import {Component, Directive, ElementRef, Renderer} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {KanbanBoard} from './components/kanbanBoard';

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
  <div>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
@RouteConfig([
    { path: '/', component: KanbanBoard, name: 'Home' },
    { path: '/insert', component: KanbanBoard, name: 'NewTicket'}
])
export class App {
}


