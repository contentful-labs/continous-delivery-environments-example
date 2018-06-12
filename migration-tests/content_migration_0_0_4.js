const migration_expected_version = "0.0.3";
const migration_upgrade_version = "0.0.4";

function runMigration(migration) {
  const post = migration.editContentType("post");
  post.deleteField("last_appearance");
  return;
}

module.exports = {
  runMigration
};
