var qsparse = require('querystring').parse;
var extend = require('util')._extend;

function Request (args) {
  var self = this;

  // workaround
  if (args._ && args._[0] === 'curl')
    args._ = args._.slice(1);

  this.data = {};
  this.method = 'GET';
  this.url = args._[0];
  this.headers = {};

  if (args.header) {
    extend(this.headers, toArr(args.header)
      .reduce(function (obj, header) {
        var m = header.split(': ');
        obj[m[0]] = m[1];
        return obj;
      }, {}));
  }

  if (!args.extended) {
    Request.ignoreHeaders.forEach(function (key) {
      delete(self.headers[key]);
    });
  }

  if (args.data) {
    if (args.data.match(/^[\{\[].*[\]\}]$/))
      extend(this.data, JSON.parse(args.data));
    else
      extend(this.data, qsparse(args.data));
    this.method = 'POST';
  }

  if (args.get) {
    this.method = 'GET';
  }

  if (~this.url.indexOf('?')) {
    var qs = this.url.split('?');
    this.url = qs[0];
    extend(this.data, qsparse(qs[1]));
  }

  if (args.request)
    this.method = args.request.toUpperCase();

  if (!this.url)
    throw new Error("No URL");
}

Request.ignoreHeaders = [
  'Host', 'User-Agent', 'Accept', 'Accept-Language', 'Accept-Encoding',
  'Origin', 'Connection', 'X-Requested-With', 'Content-Type', 'Pragma',
  'Cache-Control', 'Referer', 'Cookie', 'Content-Length'
];

Request.prototype.toString = function () {
  var cmd = 'http ' + this.method + ' ' + quote(this.url);
  var cr = ' \\\n';
  var args = [];
  var self = this;

  if (self.data) {
    Object.keys(self.data).forEach(function (key) {
      args.push('  ' + key + '=' + quote(self.data[key]));
    });
  }

  if (self.headers) {
    Object.keys(self.headers).forEach(function (key) {
      args.push('  ' + key + ':' + quote(self.headers[key]));
    });
  }
    
  if (args.length)
    return cmd + cr + args.join(cr);
  else
    return cmd;
};

module.exports = Request;

function toArr (val) {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  else return [val];
}

function quote (str) {
  return JSON.stringify(str);
}
