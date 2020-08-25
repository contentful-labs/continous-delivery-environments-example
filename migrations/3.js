module.exports = function runMigration(migration) {
  const procedure = migration.editContentType("procedure");
  procedure.deleteField("browserPageTitle");
  return;
};
