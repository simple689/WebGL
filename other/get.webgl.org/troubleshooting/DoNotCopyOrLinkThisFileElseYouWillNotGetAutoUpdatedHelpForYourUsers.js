/* Do not copy this file. Instead, do something like this in your
   own code.

  if (!window.WebGLRenderingContext) {
     // Browser has no idea what WebGL is. Suggest they
     // get a new browser by presenting the user with link to
     // http://get.webgl.org
     return;
  }

  gl = canvas.getContext("webgl");
  if (!gl) {
    // Browser could not initialize WebGL. User probably needs to
    // update their drivers or get a new browser. Present a link to
    // http://get.webgl.org/troubleshooting
    return;
  }

*/

var BrowserDetect = {
  init: function () {
    var info = this.searchString(this.dataBrowser) || {identity:"unknown"}
    this.browser = info.identity;
    this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
    this.platformInfo = this.searchString(this.dataPlatform) || this.dataPlatform["unknown"];
    this.platform = this.platformInfo.identity;
    var browserInfo = this.urls[this.browser];
    if (!browserInfo) {
      browserInfo = this.urls["unknown"];
    } else if (browserInfo.platforms) {
      var info = browserInfo.platforms[this.platform];
      if (info) {
        browserInfo = info;
      }
    }
    this.urls = browserInfo;
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++){
      var info = data[i];
      var dataString = info.string;
      var dataProp = info.prop;
      this.versionSearchString = info.versionSearch || info.identity;
      if (dataString) {
        if (dataString.indexOf(info.subString) != -1) {
          return info;
        }
      } else if (dataProp) {
        return info;
      }
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) {
      return;
    }
    return parseFloat(dataString.substring(
        index + this.versionSearchString.length + 1));
  },
  dataBrowser: [
  { string: navigator.userAgent,
    subString: "Chrome",
    identity: "Chrome"
  },
  { string: navigator.userAgent,
    subString: "OmniWeb",
    versionSearch: "OmniWeb/",
    identity: "OmniWeb"
  },
  { string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    versionSearch: "Version"
  },
  { string: navigator.userAgent,
    subString: "Android",
    identity: "Android"
  },
  { prop: window.opera,
    identity: "Opera"
  },
  { string: navigator.vendor,
    subString: "iCab",
    identity: "iCab"
  },
  { string: navigator.vendor,
    subString: "KDE",
    identity: "Konqueror"
  },
  { string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox"
  },
  { string: navigator.vendor,
    subString: "Camino",
    identity: "Camino"
  },
  {// for newer Netscapes (6+)
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape"
  },
  { string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE"
  },
  { string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv"
  },
  { // for older Netscapes (4-)
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
  }
  ],
  dataPlatform: [
  { string: navigator.platform,
    subString: "Win",
    identity: "Windows",
    browsers: [
      {url: "http://www.mozilla.com/en-US/firefox/new/", name: "Mozilla Firefox"},
    // add back in when opera is stable {url: "http://www.opera.com/browser/next/" name: "Opera Next"},
      {url: "http://www.google.com/chrome/", name: "Google Chrome"}
    ]
  },
  { string: navigator.platform,
    subString: "Mac",
    identity: "Mac",
    browsers: [
      {url: "http://www.mozilla.com/en-US/firefox/new/", name: "Mozilla Firefox"},
      {url: "http://www.google.com/chrome/", name: "Google Chrome"},
      // add back in when opera is stable {url: "http://www.opera.com/browser/next/", name: "Opera Next"},
      {url: "http://www.webkit.org/", name: "WebKit Developer Builds"}
    ]
  },
  { string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod",
    browsers: [
      {url: "http://www.mozilla.com/en-US/firefox/new/", name: "Mozilla Firefox"}
    ]
  },
  { string: navigator.platform,
    subString: "iPad",
    identity: "iPad",
    browsers: [
      {url: "http://www.mozilla.com/en-US/firefox/new/", name: "Mozilla Firefox"}
    ]
  },
  { string: navigator.userAgent,
    subString: "Android",
    identity: "Android",
    browsers: [
      {url: "https://market.android.com/details?id=org.mozilla.firefox", name: "Mozilla Firefox"},
      {url: "https://market.android.com/details?id=com.opera.browser", name: "Opera Mobile"}
    ]
  },
  { string: navigator.platform,
    subString: "Linux",
    identity: "Linux",
    browsers: [
      {url: "http://www.mozilla.com/en-US/firefox/new/", name: "Mozilla Firefox"},
      {url: "http://www.google.com/chrome/", name: "Google Chrome"},
      {url: "http://www.opera.com/browser/next/", name: "Opera Next"}
    ]
  },
  { string: "unknown",
    subString: "unknown",
    identity: "unknown",
    browsers: [
      {url: "http://www.mozilla.com/en-US/firefox/new/", name: "Mozilla Firefox"},
      {url: "http://www.google.com/chrome/", name: "Google Chrome"},
      {url: "http://www.opera.com/browser/next/", name: "Opera Next"},
      {url: "http://www.webkit.org/", name: "WebKit Developer Builds"}
    ]
  }
  ],
  /*
  upgradeUrl:         Tell the user how to upgrade their browser.
  troubleshootingUrl: Help the user.
  platforms:          Urls by platform. See dataPlatform.identity for valid platform names.
  */
  urls: {
    "Chrome": {
      upgradeUrl: "http://www.google.com/support/chrome/bin/answer.py?answer=95346",
      troubleshootingUrl: "http://www.google.com/support/chrome/bin/answer.py?answer=1220892"
    },
    "Firefox": {
      upgradeUrl: "http://www.mozilla.com/en-US/firefox/new/",
      troubleshootingUrl: "https://support.mozilla.com/en-US/kb/how-do-i-upgrade-my-graphics-drivers"
    },
    "Opera": {
      platforms: {
        "Android": {
          upgradeUrl: "https://market.android.com/details?id=com.opera.browser",
          troubleshootingUrl: "http://www.opera.com/support/"
        }
      },
      upgradeUrl: "http://www.opera.com/browser/next/",
      troubleshootingUrl: "http://www.opera.com/support/"
    },
    "Android": {
      upgradeUrl: null,
      troubleshootingUrl: null
    },
    "Safari": {
      platforms: {
        "iPhone/iPod": {
          upgradeUrl: "http://www.apple.com/ios/",
          troubleshootingUrl: "http://www.apple.com/support/iphone/"
        },
        "iPad": {
          upgradeUrl: "http://www.apple.com/ios/",
          troubleshootingUrl: "http://www.apple.com/support/ipad/"
        },
        "Mac": {
          upgradeUrl: "http://www.webkit.org/",
          troubleshootingUrl: "http://www.webkit.org/blog/919/webgl-draft-specification-now-available/"
        }
      },
      upgradeUrl: "http://www.webkit.org/",
      troubleshootingUrl: "http://www.webkit.org/blog/919/webgl-draft-specification-now-available/"
    },
    "unknown": {
      upgradeUrl: null,
      troubleshootingUrl: null
    }
  }
};



