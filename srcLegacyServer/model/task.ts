import * as mongoose from 'mongoose';

let TaskSchema = new mongoose.Schema({
    id: Number,
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    status: {type: String, default: 'todo'},
    priority: {type: Number, default: 2},
    points: Number
});

TaskSchema.methods.getPriorityImageSource = function (): string {
    let priority: string;
    switch (this.priority) {
        case 0:
            priority = 'critical';
            break;
        case 1:
            priority = 'major';
            break;
        default:
            priority = 'minor';
    }
    return '//learnosity.atlassian.net/images/icons/priorities/' + priority + '.svg';
};

TaskSchema.methods.getPriorityString = function (): string {
    let priority: string;
    switch (this.priority) {
        case 0:
            priority = 'critical';
            break;
        case 1:
            priority = 'major';
            break;
        default:
            priority = 'minor';
    }

    return priority;
};

let Task = mongoose.model('Task', TaskSchema);

export {Task, TaskSchema};
