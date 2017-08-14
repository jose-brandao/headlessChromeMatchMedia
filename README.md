# Match Media queries working with Headless Chrome

**A code snippet that shows how to fully emulate a mobile device with Headless Chrom via node(match media queries included).**

When playing around with headless browsers I come to the fact that it's hard to find a solution where I could completely emulate a mobile device due to match media not working properly.

Until now and there is not much documentation about Headless Chrome.

After some time struggling, I found a way to make Headless Chrome to respect match media queries.

This example completely emulates an iPhone6 Plus, making match media queries working properly.

```javascript 
  Emulation.setDeviceMetricsOverride({
        width: viewport.width, //Set your device view port here
        height: viewport.height,
        deviceScaleFactor: 0,
        mobile: true //Media queries will answer as if you are a mobile phone
    });
```

```javascript
    Network.setUserAgentOverride({userAgent: 'USERAGENT'}); //Pass your device user agent

```

## Setup and run

Install the node modules required to run this sript:

`
npm install chrome-remote-interface
`

`
npm install chrome-launcher
`


Run it with node:

`
node index.js
`

___

Many thanks to this [tutorial](https://www.sitepoint.com/headless-chrome-node-js/) for providing a simple way to use Headless Chrome.




