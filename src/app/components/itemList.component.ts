import {OnInit, Component} from 'angular2/core';

import {Item} from '../model/item';
import {ItemService} from '../services/item.service';
import {ItemEditorComponent} from './itemEditor.component';

@Component({
    selector: 'itemList',
    inputs: ['items'],
    providers: [ItemService],
    directives: [ItemEditorComponent],
    template: `
        <div class="toDoList">
            <itemEditor *ngFor="#item of items" [item]="item"
            (removeItem)="removeItem($event)"
            (updateItem)="updateItem($event)"
            (startEditingItem)="onItemEditingStart($event)"></itemEditor>
            <div class="controls">
                <button (click)="addItem()">Add</button>
            </div>
        </div>
    `
})
export class ItemListComponent implements OnInit {
    items: Item[];
    constructor(private _itemService: ItemService) {}

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this._itemService.getItems()
            .then(items => { this.items = items});
    }

    addItem() {
        let greatestId = 0;
        let newItem = new Item();
        for (let i = 0; i < this.items.length; i++) {
            let curId = this.items[i].id;
            if (curId > greatestId) {
                greatestId = curId;
            }
        }
        newItem.id = greatestId + 1;
        this.items.push(newItem);
        this.onItemEditingStart(newItem);
    }

    removeItem(itemId: number) {
        let array: Item[] = this.items.filter(item => {return item.id !== itemId});
        this.items = array;
        this._itemService.removeItem(itemId);
    }

    updateItem(item: Item) {
        this._itemService.updateItem(item);
    }

    onItemEditingStart(item: Item) {
        this.items.forEach(function (_item) {
            if (item.id !== _item.id) {
                _item.editing = false;
            }
        });
    }
}