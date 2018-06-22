#!/usr/bin/env node

(async () => {
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
  const environment = await space.getEnvironment(ENVIRONMENT_ID);
  const defaultLocale = (await environment.getLocales()).items
    .find(locale => locale.default).code;

  console.log('Running with the following configuration');
  console.log(`SPACE_ID: ${SPACE_ID}`);
  console.log(`ENVIRONMENT_ID: ${ENVIRONMENT_ID}`);

  // ---------------------------------------------------------------------------
  // 1. Read all the available migrations from the file system
  const availableMigrations = (await readdirAsync(MIGRATIONS_DIR))
    .filter(file => /^\d+?_\d+?_\d+?\.js$/.test(file))
    .map(file => getVersionOfFile(file));

  // ---------------------------------------------------------------------------
  // 2. Figure out latest ran migration of the contentful space
  const {items: versions} = await environment.getEntries({
    content_type: 'versionTracking'
  });

  if (!versions.length || versions.length > 1) {
    throw new Error(
      'There should only be one entry of type \'versionTracking\''
    );
  }

  let storedVersionEntry = versions[0];
  const currentVersionString = storedVersionEntry.fields.version[defaultLocale];

  // ---------------------------------------------------------------------------
  // 3. Evaluate which migrations to run
  const currentMigrationIndex = availableMigrations.indexOf(currentVersionString);

  if (currentMigrationIndex === -1) {
    throw new Error(
      `Version ${currentVersionString} is not matching with any known migration`
    );
  }
  const migrationsToRun = availableMigrations.slice(currentMigrationIndex + 1);
  const migrationOptions = {
    spaceId: SPACE_ID,
    environmentId: ENVIRONMENT_ID,
    accessToken: CMA_ACCESS_TOKEN,
    yes: true
  };

  // ---------------------------------------------------------------------------
  // 4. Run migrations and update version entry
  while(migrationToRun = migrationsToRun.shift()) {
    const filePath = path.join(__dirname, '..', 'migrations', getFileOfVersion(migrationToRun));
    console.log(`Running ${filePath}`);
    await runMigration(Object.assign(migrationOptions, {
      filePath
    }));
    console.log(`${migrationToRun} succeeded`);

    storedVersionEntry.fields.version[defaultLocale] = migrationToRun;
    storedVersionEntry = await storedVersionEntry.update();
    storedVersionEntry = await storedVersionEntry.publish();

    console.log(`Updated version entry to ${migrationToRun}`);
  }

  console.log('All done!');
})();
