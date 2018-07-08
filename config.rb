# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Domains and paths
hostname = 'http://checkmateinone.com'

set :css_dir, 'stylesheets'
set :fonts_dir, 'fonts'
set :images_dir, 'images'
set :js_dir, 'javascripts'

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# Dev server-specific configuration
configure :development do
  # Reload the browser automatically whenever files change.
  activate :livereload
end

configure :build do
  # Minify assets in production.
  activate :minify_html
  activate :minify_css
  activate :minify_javascript

  # Enable cache buster in production.
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets
end

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :deploy do |deploy|
  keyFilename = '.ftppass'
  # @TODO: Make this a parameter, so that multiple
  # environments can be deployed to.
  keyName = 'keyMain'

  if File.file?(keyFilename)
    # Do _not_ build prior to deploying.
    # Let Jenkins do this in a verbose fashion.
    deploy.build_before = true

    # Open, parse and close the nonversioned credentials file.
    keyFile = open(keyFilename)
    key = JSON.parse(keyFile.read)
    keyFile.close

    # SFTP deploy config.
    deploy.deploy_method = :sftp
    deploy.port = 22
    # @TODO: Move this into the .ftppass file? Or an .ftpconfig file?
    deploy.host = ''
    deploy.path = ''
    deploy.user = key[keyName]['user']
    deploy.password = key[keyName]['pass']
  end
end

# config.rb
activate :robots,
  :rules => [
    {
      :user_agent => '*',
      :allow => %w(/)}
  ],
  :sitemap => hostname + '/sitemap.xml'

# Generate sitemap.xml
activate :sitemap, :hostname => hostname

activate :favicon_maker,
  :icons => {
    '_favicon_template.png' => [
      # iPhone 6 Plus with @3× display
      {
        icon: 'apple-touch-icon-180x180-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for retina iPad with iOS7
      {
        icon: 'apple-touch-icon-152x152-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for retina iPad with iOS6 or prior.
      {
        icon: 'apple-touch-icon-144x144-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for retina iPhone with iOS7.
      {
        icon: 'apple-touch-icon-120x120-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for retina iPhone with iOS6 or prior.
      {
        icon: 'apple-touch-icon-114x114-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for non-retina iPad with iOS7.
      {
        icon: 'apple-touch-icon-76x76-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for non-retina iPad with iOS6 or prior.
      {
        icon: 'apple-touch-icon-72x72-precomposed.png'
      },
      # Same as apple-touch-icon-57x57.png, for non-retina iPhone with iOS7.
      {
        icon: 'apple-touch-icon-60x60-precomposed.png'
      },
      # iPhone and iPad users can turn web pages into icons on their home
      # screen. Such link appears as a regular iOS native application. When
      # this happens, the device looks for a specific picture. The 57x57
      # resolution is convenient for non-retina iPhone with iOS6 or prior.
      # Learn more in Apple docs.
      {
        icon: 'apple-touch-icon-57x57-precomposed.png'
      },
      # Same as apple-touch-icon.png, expect that is already have rounded
      # corners (but neither drop shadow nor gloss effect).
      {
        icon: 'apple-touch-icon-precomposed.png',
        size: '57x57'
      },
      # Same as apple-touch-icon-57x57.png, for 'default' requests, as some
      # devices may look for this specific file. This picture may save some
      # 404 errors in your HTTP logs. See Apple docs
      {
        icon: 'apple-touch-icon.png',
        size: '57x57'
      },
      # For Android Chrome M31+.
      {
        icon: 'favicon-196x196.png'
      },
      # For Google TV.
      {
        icon: 'favicon-96x96.png'
      },
      # For Safari on Mac OS.
      {
        icon: 'favicon-32x32.png'
      },
      # The classic favicon, displayed in the tabs.
      {
        icon: 'favicon-16x16.png'
      },
      # The classic favicon, displayed in the tabs.
      {
        icon: 'favicon.png',
        size: '16x16'
      },
      # Used by IE, and also by some other browsers if we are not careful.
      {
        icon: 'favicon.ico',
        size: '64x64,32x32,24x24,16x16'
      },
      # For Windows 8 / IE11.
      {
        icon: 'mstile-70x70.png',
        size: '70x70'
      },
      {
        icon: 'mstile-144x144.png',
        size: '144x144'
      },
      {
        icon: 'mstile-150x150.png',
        size: '150x150'
      },
      {
        icon: 'mstile-310x310.png',
        size: '310x310'
      },
      {
        icon: 'mstile-310x150.png',
        size: '310x150'
      }
    ]
  }
