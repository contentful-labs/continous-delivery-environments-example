const migration_expected_version = <expected content version>;
const migration_upgrade_version = <expected upgrade version>;



function runMigration(migration){
    // Insert migration code here
}



function validateVersion(expected_version,upgrade_version){
        //Validates that this migration file should be run.
        if (upgrade_version == migration_upgrade_version){
            if (expected_version == migration_expected_version){
                return true;
            }
        }
        return false;

}

module.exports = {
    runMigration, validateVersion
}
