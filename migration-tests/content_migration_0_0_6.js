function runMigration(migration) {
  const post = migration.editContentType("post");
  post.deleteField("last_appearance");
  return;
}

module.exports = {
  runMigration
};
