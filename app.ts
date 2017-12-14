import * as express from 'express';
import {db} from "./db";
import apiController from "./controller/apiController";

const app = express();
app.use('/assets', express.static('./public'));
app.set('view engine', 'ejs');
apiController(app);

db.initWithSeed().then(() => app.listen(4445));