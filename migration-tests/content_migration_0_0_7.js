function runMigration(migration) {
  const post = migration.editContentType("post");
  post
    .createField("author")
    .name("author")
    .type("Symbol")
    .required(false);
  return;

  // migration.transformEntries({
  //   contentType: "post",
  //   from: ["author"],
  //   to: ["author"],
  //   transformEntryForLocale: function(fromFields, currentLocale) {
  //     return { author: "Stan Lee" };
  //   }
  // });
}

module.exports = {
  runMigration
};
