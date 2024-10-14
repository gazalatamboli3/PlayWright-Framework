// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  retries : 1,
  //workers : 3, // suggest us how many test cases to run in parallel
  expect:
  {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on',
        //viewport: {width:720, height:720} //Changes the view of browser, webresponsiveness, minimising, mobile view etc
      //...devices['iPhone 11'] //chooses automatically teh resolution mentioned in devices array
      //ignoreHTTPSErrors: true, //handles SSL certs
      //permissions: ['geolocation'], //allows permissions

      }
    },
    // {
    //   name: 'safari',
    //   use: {
    //     browserName: 'webkit',
    //     headless: true,
    //     screenshot: 'only-on-failure',
    //     trace: 'off'
    //   }
    // }
  ]




});

