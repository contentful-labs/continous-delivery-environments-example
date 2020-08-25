module.exports = function runMigration(migration) {
  const procedure = migration.editContentType("procedure");
  procedure.moveField("browserPageTitle").afterField("realselfAuthor");
  return;
};
