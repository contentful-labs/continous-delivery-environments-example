module.exports = function runMigration(migration) {
  const post = migration.editContentType("post");
  post
    .createField("movies")
    .name("movies")
    .type("Symbol")
    .required(false);
  return;
};
