module.exports = function runMigration(migration) {
  const post = migration.editContentType("post");
  post
    .createField("last_appearance")
    .name("last_appearance")
    .type("Symbol")
    .required(false);
  return;
};
