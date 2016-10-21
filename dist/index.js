'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var signInData = {};

  return {
    getLoginToken: function getLoginToken(_ref) {
      var password = _ref.password;
      var login = _ref.login;

      return (0, _nodeFetch2.default)(_api_uris2.default.token, {
        body: JSON.stringify({
          password: password,
          login: login,
          grant_type: 'password',
          client_id: 'other.conta',
          client_secret: 'yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO'
        }),
        method: 'POST',
        headers: _extends({}, REQUEST_HEADERS_SAUCE)
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        return signInData = data;
      });
    },


    /**
     * Fetchs all transaction history since the very beginning
     * @returns {object} history
    */
    getWholeFeed: function getWholeFeed() {
      if ((0, _lodash.isEmpty)(signInData)) {
        throw new Error('[NuBank] You must sign in first');
      }

      return (0, _nodeFetch2.default)(signInData._links.events.href, {
        headers: _extends({
          Authorization: 'Bearer ' + signInData.access_token
        }, REQUEST_HEADERS_SAUCE)
      }).then(function (res) {
        return res.json();
      });
    },


    get signInData() {
      return signInData;
    }
  };
};

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _lodash = require('lodash');

var _api_uris = require('./api_uris');

var _api_uris2 = _interopRequireDefault(_api_uris);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_HEADERS_SAUCE = {
  'Content-Type': 'application/json',
  'X-Correlation-Id': 'WEB-APP.jO4x1',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  'Origin': 'https://conta.nubank.com.br',
  'Referer': 'https://conta.nubank.com.br/'
};