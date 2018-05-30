Continous Delivery Environments Example
=====
An example application for how you can integrating migrations in your continous delivery pipeline.

You can read our [conceptual guide](https://www.contentful.com/developers/docs/concepts/deployment-pipeline/) on how to utilize Contentful Enivorments inside your continous delivery pipelipe.


Setup
=====
This example deploys a simple flask site integrated with Contentful onto heroku utilizing CircleCi.

 * Fork and Clone this repository
 * Sign up for Contentful if you haven't already.
   * Follow the [instructions](https://www.contentful.com/r/knowledgebase/personal-access-tokens/#how-to-get-a-personal-access-token-the-web-app) to create a personal access token
   * Create a new space
   * Using the [Contentful CLI](https://github.com/contentful/contentful-cli) import the Json File in the import directory.
 * To run locally after cloning the directory:
   * `cd` into the directory, create a [virtualenv](https://virtualenv.pypa.io/en/stable/) and use pip to install the python depencides inside the virtual environment.
   * Install the [Contentful migrations CLI](https://github.com/contentful/contentful-migration)
   * Create a .env file that contains the following in the root directory.

 ```
SPACE_ID=<SPACE_ID>
DELIVERY_API_KEY=<DELIVERY_API_KEY>
MANGEMENT_API_KEY=<MANGEMENT_API_KEY>
```
  *Import the following into your conntentful

 * To deploy using CircleCI and Heroku
   * Create a CircleCI Account and add this repo as a project
   * Create a Heroku Account and create an API Key
   * In CircleCI set the project environment variables for the following:
      * DELIVERY_API_KEY
      * HEROKU_API_KEY
      * MANGEMENT_API_KEY
      * SPACE_ID
   * Update the HEROKU_APP variable in the config.yml file with your heroku app name.
   * Hit deploy on CircleCI
   * All done!

License
=======

Copyright (c) 2018 Contentful GmbH. Code released under the MIT license. See [LICENSE](LICENSE) for further details.
