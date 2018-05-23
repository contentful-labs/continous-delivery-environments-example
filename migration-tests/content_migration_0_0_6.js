const migration_expected_version = "0.0.5";
const migration_upgrade_version = "0.0.6";


function runMigration(migration){
    const post = migration.editContentType('post');
    post.deleteField('last_appearance');
    return;
}

function validateVersion(expected_version,upgrade_version){
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
