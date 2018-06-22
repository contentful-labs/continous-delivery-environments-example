module.exports = function runMigration(migration) {
  migration.transformEntries({
    contentType: "post",
    from: ["author"],
    to: ["author"],
    transformEntryForLocale: function(fromFields, currentLocale) {
      const newAuthor = `Stan Lee`;
      return { author: newAuthor };
    }
  });
};
