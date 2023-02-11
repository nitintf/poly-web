require('localenv');

const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
const path = require('path');

const PORT = process.env.SERVER_PORT || 3001;
const ENV = process.env.environmentType;

// 🚨WARNING: do NOT include any secrets/API keys below! These vars get exposed to client side
const serverVars = ['baseQueryUrl', 'baseWsUrl'];

const config = {};

for (const value of serverVars) {
  config[value] = process.env[value];
}

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'web-service' },
  transports: [new winston.transports.Console({})],
});

// Vend static resources
app.use(express.static(path.join(__dirname, 'dist')));

// https://helmetjs.github.io/
app.use(helmet.frameguard({ action: 'deny' }));

// Only use CORS in the dev environment, otherwise all requests between Starfleet Client/Backend are on the same origin.
if (ENV === 'dev') {
  const cors = require('cors');
  app.use(cors({ origin: '*' }));
}

// Disable "X-Powered-By: Express" HTTP header
app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  logger.info(`listening on ${PORT}`);
});

// Setting views path is required to be able to vend index.ejs and related assets/icons
app.set('views', path.join(__dirname, './dist'));
app.get('/_healthz', (_req, res) => res.status(200).send());
app.get('/_readyz', (_req, res) => res.status(200).send());

// Returns React app
app.get('*', (_req, res) => {
  res.render('index.ejs', { serverVars, config });
});
