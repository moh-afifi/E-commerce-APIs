import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users_handler';
import productRoutes from './handlers/product_handler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

userRoutes(app);
productRoutes(app);

app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});

export default app;