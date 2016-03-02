declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
require('../stylesheet/main.scss');

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

// App routes
import routes from './routes/index';

// Project
import {databaseUtil} from './utils/databaseUtil';

let app = express();

// Express View
app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Other utility libs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist/legacyServer')));

mongoose.connect('mongodb://localhost/kanban');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('---------------------');
    console.log('Database opened');
    databaseUtil.db = db;
});

app.use('/', routes);

// Server
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000, () => {
    console.log('---------------------');
    console.log('Legacy Server - Listen on http://localhost:3000');
});
module.exports = app;