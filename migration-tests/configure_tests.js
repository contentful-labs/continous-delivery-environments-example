// Basic example: update existing content type
module.exports = function (migration) {
    const expected_version = '0.0.1'
    const upgrade_version = '0.0.2'

    migration.transformEntries({
        contentType: 'versionTracking',
        from: ['version'],
        to: ['version'],
        transformEntryForLocale: function (fromFields, currentLocale) {
            console.log(fromFields.version[currentLocale])
            if (fromFields.version[currentLocale] == expected_version){
                return { version: upgrade_version };

            }else{
                return { version: "Triggering Migration unsuccessful" };
            }
            console.log(fromFields.version[currentLocale])
        }
    });

    const post = migration.editContentType('post');

    post.createField('first_appearance')
        .type('Symbol')
        .name('First Appearance of the character')
        .required(false);
}
