import * as express from 'express';

import {Task, TaskSchema} from '../model/task';
import {databaseUtil}from '../utils/databaseUtil';

let router = express.Router();
let db = databaseUtil.db;

// Main page
router.get('/', function(req, res, next) {
    Task.find(function (err, tasks) {
        res.render('index', {title: 'Kanban board', lanes: getLanes(tasks)});
    });
});

// Detail page
router.get('/JV-:id', function(req, res, next) {
    getTaskThenRender(res, req.params.id, 'detail');
});

// Add page
router.get('/new', function(req, res, next) {
    Task.find(function (err, tasks) {
        res.render('edit', {title: 'Kanban board', lanes: getLanes(tasks), task: new Task(), formAction: '/insert'});
    });
});

// Edit page
router.get('/edit/JV-:id', function(req, res, next) {
    let id = req.params.id;
    getTaskThenRender(res, id, 'edit', {formAction: '/update/JV-' + id});
});

// Action --------------------------
// Insert
router.post('/insert', function (req, res, next) {
    Task.find(function (err, tasks) {
        let biggestId = 0;
        let params = req.body;
        let newTask;
        tasks.forEach(function (task) {
            if (task.id > biggestId) {
                biggestId = task.id;
            }
        });

        biggestId++;
        newTask = new Task({
            id: biggestId,
            name: params.name,
            description: params.description,
            priority: params.priority,
            points: params.points
        });

        console.log(newTask);
        newTask.save(() => res.redirect('/'));
    });
});

// Update
router.post('/update/JV-:id', function(req, res, next) {
    getTaskThenDispatch(req.params.id, function (data) {
        let task = data.task;
        let params = req.body;
        task.name = params.name;
        task.description = params.description;
        task.status = params.status;
        task.priority = params.priority;
        task.points = params.priority;
        task.save(function (error, task) {
            res.redirect('/');
        });
    });
});

// Remove
router.get('/remove/JV-:id', function (req, res, next) {
    let id = req.params.id;
    getTaskThenDispatch(id, function (data) {
        Task.remove({ id: id}, function (error, removed) {
            res.redirect('/');
        });
    });
});

function getTaskThenRender(response, id, pageName: string, params:any = null) {
    getTaskThenDispatch(id, function (data) {
        let task = data.task;
        let pageParams: any = {
            title: data.task ? 'JV-' + data.task.id : 'Kanban board',
            lanes: data.lanes,
            task: task
        };

        if (task) {
            pageParams.isMinor = task.priority == 2;
            pageParams.isMajor = task.priority == 1;
            pageParams.isCritical = task.priority == 0;
            pageParams.isTodo = task.priority == 'todo';
            pageParams.isInProgress = task.priority == 'inprogress';
            pageParams.isDone = task.priority == 'done';
        }

        if (params) {
            for (let key: string in params) {
                pageParams[key] = params[key];
            }
        }

        response.render(pageName, pageParams);
    });
}

function getTaskThenDispatch(id, callback) {
    Task.find(function (err, tasks) {
        var task;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                task = tasks[i];
            }
        }
        callback({
            task: task,
            lanes: getLanes(tasks)
        });
    });
}

function getLanes(tasks) {
    let lanes = [];
    tasks.forEach(function(task) {
        task.priorityString = TaskSchema.methods.getPriorityString.call(task);
        task.priorityImageSource = TaskSchema.methods.getPriorityImageSource.call(task);
    });
    lanes.push(getLane(tasks, 'To Do', 'todo'));
    lanes.push(getLane(tasks, 'In Progress', 'inprogress'));
    lanes.push(getLane(tasks, 'Done', 'done'));

    return lanes;
}

function getLane(tasks, laneTitle, status) {
    let tasks = tasks.filter(task => task.status === status);
    return {
        title: laneTitle,
        tasks: tasks,
        count: tasks.length
    };
}

export default router;
