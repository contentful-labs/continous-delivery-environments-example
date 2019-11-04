#!/usr/bin/env node

(async () => {
  try {
    const {promisify} = require('util');
    const {readdir} = require('fs');
    const readdirAsync = promisify(readdir);
    const path = require('path');
    const { createClient } = require('contentful-management');
    const {default: runMigration} = require('contentful-migration/built/bin/cli');

    // utility fns
    const getVersionOfFile = (file) => file.replace('.js', '').replace(/_/g, '.');
    const getFileOfVersion = (version) => version.replace(/\./g, '_') + '.js';

    //
    // Configuration variables
    //
    const [,, SPACE_ID, ENVIRONMENT_ID, CMA_ACCESS_TOKEN] = process.argv;
    const MIGRATIONS_DIR = path.join('.', 'migrations');

    const client = createClient({
      accessToken: CMA_ACCESS_TOKEN
    });
    const space = await client.getSpace(SPACE_ID);

    let environment;
    console.log('Running with the following configuration');
    console.log(`SPACE_ID: ${SPACE_ID}`);
    console.log(`ENVIRONMENT_ID: ${ENVIRONMENT_ID}`);


    // ---------------------------------------------------------------------------
    console.log(`Checking for existing versions of environment: ${ENVIRONMENT_ID}`);

    try {
      environment = await space.getEnvironment(ENVIRONMENT_ID);
    } catch(e) {
      console.error('Environment not found');
      process.exit(1);
    }

    // ---------------------------------------------------------------------------
    console.log('Update master environment alias');
    await space.getEnvironmentAlias('master'))
    .then((alias) => {
      alias.environment.sys.id = ENVIRONMENT_ID
      return alias.update()
    })
    .then((alias) => console.log(`alias ${alias.sys.id} updated.`))
    .catch(console.error)

    console.log('Master Updated to Alias');

    console.log('All done!');
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
