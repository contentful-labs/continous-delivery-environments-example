const migration_expected_version = "0.0.8";
const migration_upgrade_version = "0.0.9";

function runMigration(migration) {
    const post = migration.editContentType("post");
    post
        .createField("author")
        .name("author")
        .type("Symbol")
        .required(false);
    return;
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
