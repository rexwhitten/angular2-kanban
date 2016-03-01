import {Injectable} from 'angular2/core';

import {MOCK_ITEMS} from '../mock-items';
import {Item} from '../model/item';

@Injectable()
export class ItemService {
    getItems() {
        return Promise.resolve(MOCK_ITEMS);
    }

    removeItem(id) {
        let array: Item[] = MOCK_ITEMS.filter(item => {return item.id !== id});
        MOCK_ITEMS = array;
    }

    updateItem(item: Item) {
        for (let i = 0; i < MOCK_ITEMS.length; i++) {
            if (MOCK_ITEMS[i].id === item.id) {
                MOCK_ITEMS[i] = item;
                return;
            }
        }

        // Add new item
        MOCK_ITEMS.push(item);
    }
}
