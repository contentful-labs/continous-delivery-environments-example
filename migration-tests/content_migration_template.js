const migrationExpectedVersion = <expected content version>;
const migrationUpgradeVersion = <expected upgrade version>;


function runMigration(migration){
    // Insert migration code here
}


function validateVersion(expectedVersion,upgradeVersion){
        //Validates that this migration file should be run.
        if (upgradeVersion == migrationUpgradeVersion){
            if (expectedVersion == migrationExpectedVersion){
                return true;
            }
        }
        return false;

}

module.exports = {
    runMigration, validateVersion
}
