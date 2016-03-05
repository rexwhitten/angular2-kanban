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

let root = path.join(path.resolve(__dirname, '..'));
let app = express();
let routes = express.Router();

routes.get('/', function(req, res, next) {
    res.render('index');
});

// Express View
app.set('views', __dirname);
app.set('view engine', 'jade');
app.locals.pretty = true;

// Other utility libs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(root));
app.use(express.static(root + '/public'));
app.use(express.static(path.join(__dirname, '../dist/legacyServer')));


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
    console.log('Web App Server - Listen on http://localhost:3000');
});