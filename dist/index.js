'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var _desc, _value, _obj, _init, _init2, _init3;

  var signInData = {};

  function withSignedInUser(fn) {
    return function () {
      if ((0, _lodash.isEmpty)(signInData)) {
        throw new Error('[NuBank] You must sign in first');
      }

      return fn.apply(undefined, arguments);
    };
  }

  return _obj = {
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

    getCustomer: function getCustomer() {
      return (0, _nodeFetch2.default)(_api_uris2.default.customers, {
        headers: _extends({}, REQUEST_HEADERS_SAUCE, {
          Authorization: 'Bearer ' + signInData.access_token
        })
      }).then(function (res) {
        return res.json();
      });
    },

    getCustomerAccount: function getCustomerAccount() {
      return (0, _nodeFetch2.default)(signInData._links.account.href, {
        headers: _extends({}, REQUEST_HEADERS_SAUCE, {
          Authorization: 'Bearer ' + signInData.access_token
        })
      }).then(function (res) {
        return res.json();
      });
    },

    getWholeFeed: function getWholeFeed() {
      return (0, _nodeFetch2.default)(signInData._links.events.href, {
        headers: _extends({}, REQUEST_HEADERS_SAUCE, {
          Authorization: 'Bearer ' + signInData.access_token
        })
      }).then(function (res) {
        return res.json();
      });
    },

    get signInData() {
      return signInData;
    }
  }, (_applyDecoratedDescriptor(_obj, 'getCustomer', [withSignedInUser], (_init = Object.getOwnPropertyDescriptor(_obj, 'getCustomer'), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, 'getCustomerAccount', [withSignedInUser], (_init2 = Object.getOwnPropertyDescriptor(_obj, 'getCustomerAccount'), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, 'getWholeFeed', [withSignedInUser], (_init3 = Object.getOwnPropertyDescriptor(_obj, 'getWholeFeed'), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init3;
    }
  }), _obj)), _obj;
};

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _lodash = require('lodash');

var _api_uris = require('./api_uris');

var _api_uris2 = _interopRequireDefault(_api_uris);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var REQUEST_HEADERS_SAUCE = {
  'Content-Type': 'application/json',
  'X-Correlation-Id': 'WEB-APP.jO4x1',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  'Origin': 'https://conta.nubank.com.br',
  'Referer': 'https://conta.nubank.com.br/'
};