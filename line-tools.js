/**
 *	line-tools.js - NodeJS CLI Arguments parser
 *
 *	@author			Михаил Драгункин <contact@unsektor.com>
 *	@ver			0.1.0
 *	@since			April 15, 2013
 *
 *	@description	Based on <http://pwfisher.com/2009/commandline-parseargs-php-cli-options-parser.html>
 * 	by Patrick Fisher <patrick@pwfisher.com> @ August 21, 2009
 *
 *	@usage			var arguments = require('line-tools').parse(process.argv);
 *	@web-site 		<https://github.com/unsektor/line-tools>
 */

module.exports = {
    /**
     *	@method parse
     *	@param {Object} argv - process.argv object
     *	@param {Boolean} options_only - flag
     *	@returns {(Bool|Object)} - returns false if type of argv is not 'object', and object of arguments 
     */
    parse: function(argv, options_only) {
        if (typeof(argv) != 'object') {
            return false;
        };

        if (!options_only) {
            argv = argv.splice(2);
        };

        var key, value, result = {};

        for (i in argv) {
            if (argv[i].substr(0, 2) == '--') {
                // --foo --bar=baz
                var eqPos = argv[i].indexOf('=');

                if (eqPos === -1) {
                    // --foo
                    key = argv[i].substr(2);
                    value = (typeof(result[key]) != 'undefined') ? result[key] : true;
                    result[key] = value;
                } else {
                    // --bar=baz
                    key = argv[i].substr(2, eqPos - 2);
                    value = argv[i].substr(eqPos + 1);
                    result[key] = value;
                }
            } else if (argv[i].substr(0, 1) == '-') {
                // -k=value -abc
                if (argv[i].substr(2, 1) == '=') {
                    // -k=value
                    key = argv[i].substr(1, 1);
                    value = argv[i].substr(3);
                    result[key] = value;
                } else {
                    // -abc
                    var chars = argv[i].substr(1);
                    for (char in chars) {
                        key = chars[char];
                        value = (typeof(result[key]) != 'undefined') ? result[key] : true;
                        result[key] = value;
                    };
                };
            } else {
                // plain-arg
                value = argv[i];
                result[value] = true;
            };
        };

        return result;
    },

    /**
     *	@method getbool
     *	@param {String} value
     *	@param {Mixed} defaultValue - what to return if passed value is not in special keywords list 
     *	@returns {Boolean} - boolean value of passed value
     */
    getbool: function(value, defaultValue) {
        switch (typeof(value)) {
            case 'boolean':
                return value;
                break;

            case 'string':
                var keywords = {
                    'y': true,
                    'n': false,
                    'yes': true,
                    'no': false,
                    'true': true,
                    'false': false,
                    '1': true,
                    '0': false,
                    'on': true,
                    'off': false
                };

                value = value.toLowerCase();
                return (typeof(keywords[value]) != 'undefined') ? keywords[value] : (!(defaultValue !== undefined) ? false : defaultValue);
                break;

            default:
                return Boolean(value);
                break;
        };
    }
};