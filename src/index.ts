import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { useExpressServer } from 'routing-controllers';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as expressSession from 'express-session';
import * as mySQLSessionStore from 'express-mysql-session';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { localStrategyVerifyCB, serializeUserCB, deserializeUserCB } from './utils/passport';

// import { Request, Response } from 'express';
// import { Routes } from './routes/api/routes';
// import { User } from './entity/User';
// import { DooDoo } from './entity/DooDoo';
// import { DooDooController2 } from '../src/controller/DooDooController2';

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();

    // setup express app here
    app.use(bodyParser.json());
    app.use(cors());
    app.use(compression());
    app.use(helmet());

    // setup mysql session storage
    // https://www.npmjs.com/package/express-mysql-session
    const expressMySQLSessionStore = mySQLSessionStore(expressSession);
    const expressMySQLSessionStoreOptions = {
      host: 'host.docker.internal',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'test',
    };
    const sessionStore = new expressMySQLSessionStore(expressMySQLSessionStoreOptions);
    app.use(
      expressSession({
        key: 'my_session_cookie_name',
        secret: 'this is the bigsecret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
      }),
    );

    // use express app
    useExpressServer(app, {
      routePrefix: '/api/v2',
      defaultErrorHandler: false,
      middlewares: [
        `${__dirname}/middleware/*.ts`, // register error handler
      ],
      controllers: [`${__dirname}/controller/*.ts`],
    });

    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new LocalStrategy(localStrategyVerifyCB));
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(serializeUserCB);
    passport.deserializeUser(deserializeUserCB);
    // initialize passport and restore authentication state, if any, from the
    // session
    app.use(passport.initialize());
    app.use(passport.session());

    // register express routes from defined application routes
    // Routes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     route.middlewares,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](req, res, next);
    //       if (result instanceof Promise) {
    //         result.then(result => (result !== null && result !== undefined ? res.send(result) : undefined));
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result);
    //       }
    //     },
    //   );
    // });

    // start express server
    app.listen(3000);

    // create initial dummy user
    // const user = new User();
    // user.email_address = 'sunny.wong@backatyou.com';
    // user.password_hash = 'password';
    // user.is_doer = true;
    // await user.save();

    // create initial doodoo
    // const doodoo = new DooDoo();
    // doodoo.title = 'Fuck ths shit';
    // doodoo.created_by = 1;
    // doodoo.assigned_to = 1;
    // await doodoo.save();

    console.log(
      'Express server has started on port 3000. Open http://0.0.0.0:3000/api/v2/doodoo to see results',
    );
  })
  .catch(error => console.log(error));
