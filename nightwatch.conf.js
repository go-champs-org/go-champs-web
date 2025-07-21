const config = {
  "src_folders": ["e2e"],
  "output_folder": "reports",

  "webdriver": {
    "start_process": true,
    "server_path": process.env.CHROMEDRIVER_PATH || "./node_modules/.bin/chromedriver",
    "cli_args": ["--verbose"],
    "port": 9515
  },

  "test_settings": {
    "default": {
      "launch_url": "http://localhost:3000/",
      "selenium_port" : 4444,
      "selenium_host" : "localhost",
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions": {
          "args": [
            "window-size=1600,900"
          ]
        }
      }
    },

    "ci:staging": {
      "launch_url": process.env.STAGING_APP_HOST,
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
              "--headless",
              "--no-sandbox",
              "window-size=1600,900"
          ]
        }
      }
    },

    "ci:prod": {
      "launch_url": process.env.PROD_APP_HOST,
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
              "--headless",
              "--no-sandbox",
              "window-size=1600,900"
          ]
        }
      }
    }
  }
}

console.log(config);

module.exports = config;