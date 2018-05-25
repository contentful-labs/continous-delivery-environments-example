const migrationExpectedVersion = "<expected content version>";
const migrationUpgradeVersion = "<expected upgrade version>";

function runMigration(migration) {
    console.log("Insert migration code here");
}

function validateVersion(expected_version, upgrade_version) {
    if (upgrade_version == migration_upgrade_version) {
        if (expected_version == migration_expected_version) {
            return true;
        }
    }
    return false;
}

module.exports = {
    runMigration,
    validateVersion
};
