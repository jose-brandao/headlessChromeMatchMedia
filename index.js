const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const file = require('fs');

const viewport = [414,736];

(async function () {
    async function launchChrome() {
        return await chromeLauncher.launch({
            chromeFlags: [
                '--disable-gpu',
                '--headless'
            ]
        });
    }
    const chrome = await launchChrome();
    const protocol = await CDP({
        port: chrome.port
    });

    const {
        DOM,
        Page,
        Emulation,
        Runtime,
        Network
    } = protocol;

    await Promise.all([Page.enable(), Runtime.enable(), DOM.enable(), Network.enable()]);

    await Emulation.setDeviceMetricsOverride({
        width: viewport[0], //Set your view port here
        height: viewport[1],
        deviceScaleFactor: 0,
        mobile: true //Media queries will answer as if you are a mobile phone
    });

    //Pass a proper user agent
    Network.setUserAgentOverride({userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1'});

    Page.navigate({
        url: 'https://josebrandao13.github.io/'
    });

    Page.loadEventFired(async () => {
        
        //Let's take a screenshot after a few seconds
        setTimeout(async function() {
            const ss = await Page.captureScreenshot({ format: 'png', fromSurface: true});
            file.writeFile('screenshot.png', ss.data, 'base64', function (err) {
                if (err) {
                    console.log(err);
                }
            });

            protocol.close();
            chrome.kill();
        },5000);
    });

})();