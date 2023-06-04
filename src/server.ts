import { App } from '@/app';
import { GatewayRoute } from '@routes/gateway.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new GatewayRoute()]);

app.listen();
