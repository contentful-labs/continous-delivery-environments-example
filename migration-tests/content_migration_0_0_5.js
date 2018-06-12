const migration_expected_version = "0.0.4";
const migration_upgrade_version = "0.0.5";

function runMigration(migration) {
  const post = migration.editContentType("post");
  post
    .createField("last_appearance")
    .name("last_appearance")
    .type("Symbol")
    .required(false);
  return;
}

module.exports = {
  runMigration
};
