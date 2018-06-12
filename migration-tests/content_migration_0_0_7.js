function runMigration(migration) {
  const post = migration.editContentType("post");
  post
    .createField("author")
    .name("author")
    .type("Symbol")
    .required(false);
  return;

  migration.transformEntries({
    contentType: "post",
    to: ["author"],
    transformEntryForLocale: function(fromFields, currentLocale) {
      return "Stan Lee";
    }
  });
}

module.exports = {
  runMigration
};
