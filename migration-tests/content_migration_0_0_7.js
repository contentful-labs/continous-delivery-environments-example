function runMigration(migration) {
    const post = migration.editContentType("post");
    post
        .createField("author")
        .name('author')
        .type('Symbol')
        .require('false');
        return;
}

module.exports = {
  runMigration
};
