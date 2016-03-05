import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

// Angular 2
import {ng2engine, REQUEST_URL, NODE_LOCATION_PROVIDERS, HTTP_PROVIDERS} from 'angular2-universal-preview';
import {provide, enableProdMode} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import {App} from './app/app';

let app = express();
let root = path.join(path.resolve(__dirname, '..'));

enableProdMode();

// Express View
app.engine('.html', ng2engine);
app.set('views', __dirname);
app.set('view engine', 'html');

function kanbanApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';
  res.render('index', {
    App,
    providers: [
      HTTP_PROVIDERS,
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(REQUEST_URL, {useValue: url}),
      ROUTER_PROVIDERS,
      NODE_LOCATION_PROVIDERS,
    ],
    preboot: true
  });
}

// Other utility libs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(root));
app.use(express.static(root + '/public'));

// Routes
app.use('/', kanbanApp);
app.use('/about', kanbanApp);
app.use('/home', kanbanApp);

// Server
app.listen(3000, () => {
  console.log('Listen on http://localhost:3000');
});
