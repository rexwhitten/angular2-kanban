import {Component, ViewChild, EventEmitter} from 'angular2/core';

import {Item} from '../model/item';
import {AutoFocus} from '../directives/autoFocus';

@Component({
    selector: 'itemEditor',
    directives: [AutoFocus],
    inputs: ['item'],
    outputs: ['_updateItem: updateItem', '_removeItem: removeItem', '_startEditingItem: startEditingItem'],
    template: `
        <div *ngIf="item" class="test_" [class.editing]="item.editing" [class.done]="item.done">
            <span>{{item.name}}</span>
            <div *ngIf="item.editing">
                <input autoFocus [(ngModel)]="item.name" (keyup.enter)="onConfirm()" (keyup.escape)="onCancel()"/>
                <div class="controls">
                    <button (click)="onConfirm()">Confirm</button>
                    <button (click)="onCancel()">Cancel</button>
                </div>
            </div>
            <div class="controls">
                <input type="checkbox" [(ngModel)]="item.done" />
                <button (click)="startEditingItem()">Edit</button>
                <button (click)="onRemove()">Remove</button>
            </div>
        </div>
    `
})
export class ItemEditorComponent {
    item: Item;
    @ViewChild(AutoFocus) itemNameInput;
    private _removeItem: EventEmitter<number> = new EventEmitter<number>();
    private _updateItem: EventEmitter<Item> = new EventEmitter<Item>();
    private _startEditingItem: EventEmitter<Item> = new EventEmitter<Item>();

    onCancel() {
        this.item.editing = false;
    }

    startEditingItem() {
        this.item.editing = true;
        this._startEditingItem.emit(this.item);
        if (this.itemNameInput) {
            this.itemNameInput.setFocus();
        }
    }

    onConfirm() {
        this._updateItem.emit(this.item);
        this.item.editing = false;
    }

    onRemove() {
        this._removeItem.emit(this.item.id);
    }
}