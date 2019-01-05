import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';

import { Request, Response } from 'express';
import { Routes } from './routes/api/routes';
// import { Account } from './entity/Account';
// import { DooDoo } from './entity/DooDoo';

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup express app here
    app.use(cors());
    app.use(compression());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then(result => (result !== null && result !== undefined ? res.send(result) : undefined));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    // start express server
    app.listen(3000);

    // create initial dummy user
    // const account = new Account();
    // account.email_address = 'sunny.wong@backatyou.com';
    // account.password_hash = 'password';
    // account.is_doer = true;
    // await account.save();

    // create initial doodoo
    // const doodoo = new DooDoo();
    // doodoo.title = 'Fuck ths shit';
    // doodoo.created_by = 1;
    // doodoo.assigned_to = 1;
    // await doodoo.save();

    console.log(
      'Express server has started on port 3000. Open http://0.0.0.0:3000/doodoo to see results',
    );
  })
  .catch(error => console.log(error));
