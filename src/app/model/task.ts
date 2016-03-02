export class Task {
    constructor(
        public id: number,
        public name: string = '',
        public description: string = '',
        public status: string = 'todo',
        public priority: number = 2,
        public points: number = 0
    ){ }

    newTask: boolean;
}
