Continuous Delivery Environments Example
=====

An example application for how you can integrating content migrations in your continuous delivery pipeline. This specfic example showcases using Contentful with CircleCI to manage content model changes. 

What is this about?
=====

This example deploys a simple flask site integrated with Contentful onto Heroku utilizing CircleCi.

You can read our [tutorial that outlines showcases how to utilize this repository](https://www.contentful.com/developers/docs/tutorials/general/continuous-integration-with-circleci/), our [conceptual guide](https://www.contentful.com/developers/docs/concepts/deployment-pipeline/) on how to broadly utilize Contentful Environments inside your continuous delivery pipeline, or checkout our GitHub Action example that takes advantage of [GitHub Actions](https://github.com/contentful-labs/contentful-action-example) rather than CircleCI.

Getting started
=====

### Requirements

To use the continuous delivery pipeline of this project you need accounts for the following services:

- Python3
- Node 8.0+
- [Contentful](https://www.contentful.com)
- [CircleCI](https://circleci.com/)
- [Heroku](https://www.heroku.com/)

And to automate the Contentful operations install the [Contentful CLI](https://github.com/contentful/contentful-cli/) globally using [npm]().

```bash
npm install -g contentful-cli
```

Use the `contentful login` command to authenticate the CLI with Contentful.

```bash
contentful login
```

### Setup

* Fork and clone this repository

#### The Contentful part (required)

* Create a new space using the Contentful CLI
  * `$ contentful space create --name "continuous delivery example"`
* Set the newly created space as default space for all further CLI operations
  * `$ contentful space use` (this will present you with a list of all available spaces – choose the one you just created)
* Import the provided content model (`./import/export.json`) into the newly created space
  * `$ contentful space import --content-file ./import/export.json`

#### Local development environment (optional)

* Create a virtual environment
  * `$ virtualenv env`
* Activate the virtual environment
  * `source env/bin/activate`
* Install all Python dependencies
  * `pip install -r requirements.txt`
* Start the Flask app
  * `python myapp.py`
* Rename config file `.env.example` to `.env` and add missing keys

#### The continuous delivery pipeline

* Add this repository as a project on CircleCI
* Create an API Key on Heroku
* Define the following environment variables on CircleCI:
  * DELIVERY_API_KEY
  * HEROKU_API_KEY
  * HEROKU_LOGIN
  * MANGEMENT_API_KEY
  * SPACE_ID
* Update the HEROKU_APP variable in the config.yml file with your Heroku app name.
* Hit deploy on CircleCI

License
=======

Copyright (c) 2019 Contentful GmbH. Code released under the MIT license. See [LICENSE](LICENSE) for further details.
