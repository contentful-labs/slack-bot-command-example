Welcome to a Contentful Command Slack Bot
=========================

This app was build to run on [Gomix](https://gomix.com) and will help you to display entries a given post type right in Slack.

It implements a simple slash command handler which will help you to quickly access and create data stored in [Contentful](https://www.contentful.com).

Features included:
- show all entries of a given content type (including drafts) - `/contentful all-posts`
- show all draft entries of a given content type - `/contentful all-drafts`
- create a new entry of a given content type with a given title - `/contentful create-post "You post name"`

![Show all entries using Contentful slack command](https://cdn.gomix.com/0e7166c0-de2d-4965-8448-0e932e9f7efa%2FBildschirmfoto%202016-12-15%20um%2012.58.37.png)

This app provides a basic template that you can remix to create your own Slash Command handler.

Setup
------------

For detailed setup instructions please head over to `SETUP.md`.


Your Project
------------

This project should only help you to get started. Contentful is really flexible and everybody has different needs. By editing the `commands.js` you can quickly adjust everything to your needs and start interacting with Contentful via Slack easily.
