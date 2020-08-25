module.exports = function runMigration(migration) {
  const procedure = migration.editContentType("procedure");
  procedure
    .createField("browserPageTitle")
    .name("Browser Page Title")
    .type("Symbol");
  return;
};
