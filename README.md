# CheckmateInOne.com

CheckmateInOne.com is built with [Middleman](https://middlemanapp.com/), a static site generator.

## Installation

### Installation tasks run once per computer

If Ruby 2.5.1 and the Middleman gem are not installed, install Ruby 2.5.1 with [RVM](https://rvm.io/rvm/install) and then install Middleman with:

    gem install middleman

If Homebrew is not installed, install [Homebrew](https://brew.sh/) with:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

If ImageMagick is not installed, install ImageMagick with:

    brew install imagemagick

### Installation tasks run (multiple times) per project

Clone this repo to the local directory of your choice, `cd` into the clone and run the following:

    bundle install

**Note**: All `middleman` commands can be prefaced with `bundle exec`, which will execute the command in the context of the bundle.

## Build the static version

    middleman build

To generate all the favicons, there needs to be a `_favicon_template.png` in the source directory. The favicon template should be square and between 152 and 300 pixels per dimension.

## Deploy

To deploy the site via SFTP, update the `deploy` function in `config.rb` with the host and path of the SFTP server. You’ll also need to create an `.ftppass` file in the repo root with the following format:

  {
    "keyMain": {
      "user": "username",
      "pass": "password"
    }
  }

Once the above setup is complete, the site can be deployed with the following:

    middleman deploy

Note: Middleman will do a production build _prior_ to deploy.

## Tips and tricks

* Middleman has template helpers. The helpers are all built on the Padrino framework ([view Padrino's documentation](http://padrinorb.com/guides/application-helpers/overview/)).
