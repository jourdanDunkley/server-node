import 'reflect-metadata';

import registerRoutes from './bootstrap/routes';
import dbConnection from "./bootstrap/postgres";
import { logger } from "./common/utils/logger";
import Express from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { RecipeResolver } from './resolvers';
import { ApolloServer } from 'apollo-server-express';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import methodOverride from 'method-override';
import initialize from './bootstrap/passport';
import cookieParser from "cookie-parser";

(async () => {
  await dbConnection();
  const app = Express();
   
  app.use(cors({credentials: true, origin:"http://localhost:3000"}));

  app.use(Express.urlencoded({extended: true}));
  app.use(Express.json());
  app.use(flash());
  app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  }));
  app.use(cookieParser("secret"));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride('_method'));
  initialize(passport);

  app.set('views', __dirname + '/views');
  app.set('view-engine', 'ejs'); 
  registerRoutes(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver],
      validate: false
    })
  });

  apolloServer.applyMiddleware({app});

  const port = process.env.PORT ?? 4000;  

  app.listen(port, () => {
    logger.info(`🚀 Server listening on port: ${port}`);
  });
})();

