require('dotenv').config();
const { execSync } = require('child_process');

const command = `graphile-worker -c ${process.env.DATABASE_URL}`;
execSync(command, { stdio: 'inherit' });
