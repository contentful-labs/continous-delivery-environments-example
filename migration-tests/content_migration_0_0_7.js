function runMigration(migration) {
  const post = migration.editContentType("post");
  post
    .createField("author")
    .name("author")
    .type("Symbol")
    .required(false);
  return;

}

module.exports = {
  runMigration
};
