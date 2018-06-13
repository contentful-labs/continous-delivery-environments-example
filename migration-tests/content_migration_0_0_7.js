const migration_expected_version = "0.0.6";
const migration_upgrade_version = "0.0.7";

function runMigration(migration) {
  const post = migration.editContentType("post");

  post
    .createField("author")
    .name("author")
    .type("Symbol")
    .required(false);
}

module.exports = {
  runMigration
};
