// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: strong-remoting
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var debug = require('debug')('strong-remoting:http-coercion');
var g = require('strong-globalize')();

module.exports = {
  fromTypedValue: function(ctx, value) {
    var result = new Date(value);
    var error = this.validate(result);
    return error ? { error: error } : { value: result };
  },

  fromSloppyValue: function(ctx, value) {
    // we don't have any special sloppy conversion yet
    // TODO(bajtos) convert numeric strings to numbers first
    return this.fromTypedValue(ctx, value);
  },

  validate: function(ctx, value) {
    if (value === undefined || !Number.isNaN(value.getTime()))
        return null;

    var err = new Error(g.f('Value is not a valid date.'));
    err.statusCode = 400;
    return err;
  },
};