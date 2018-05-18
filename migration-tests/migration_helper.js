

module.exports = function (migration) {
    var parsedJSON = require('./version.json');
    const expectedVersion = parsedJSON.expected_version;
    const upgradeVersion = parsedJSON.upgrade_version;

    //Checks if this code base is able to work with this content schema version. If not the migration CLI will cause the build to fail.
    migration.transformEntries({
        contentType: 'versionTracking',
        from: ['version'],
        to: ['version'],
        transformEntryForLocale: function (fromFields, currentLocale) {
            if (fromFields.version[currentLocale] == expectedVersion){
                return { version: upgradeVersion };

            }else{
                return { version: "Triggering Migration unsuccessful" };
            }
        }
    });

    // Checks if we need to run any migration code:
    if (expectedVersion != upgradeVersion){
        migrationString = './content_migration_'+ upgradeVersion.split('.').join('_') + '.js';

        var migrationCode = require(migrationString);

        if (migrationCode.validateVersion(expectedVersion,upgradeVersion)){
            migrationCode.runMigration(migration);
        }else{
            console.log("Migration Version Mismatch");
            process.exit(1);
        }
    }
}
