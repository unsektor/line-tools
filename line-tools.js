/**
  *	PARSE ARGUMENTS
  *
  *	@author				tm.unsektor <unsektor@tm-ln.ru>
  * @since				April 15, 2013
  *
  *	@description		Based on <http://pwfisher.com/2009/commandline-parseargs-php-cli-options-parser.html>
  * 					by Patrick Fisher <patrick@pwfisher.com> @ August 21, 2009
  *
  *	@usage				var arguments = require('line-tools').parse(process.argv);
  * @web-site			<https://github.com/unsektor/line-tools>
  */

var strpos = 
	function(haystack,needle,offset)
		{	
			//	original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		
			var i = haystack.indexOf( needle, offset ); // returns -1
			return i >= 0 ? i : false;
		},
	_ = function(key)
		{
			console.log(key);process.exit();
		};
	
module.exports.parse = function (argv, ready)
	{
		if (!ready) argv = argv.splice(2);
		
		var out	= {};
		
		for (arg in argv)
			{
				var arg = argv[arg];
				// --foo --bar=baz
				if (arg.substr(0, 2) == '--')
					{
						var eqPos	=	strpos(arg, '=');
					// --foo
						if (eqPos === false)
							{
								var key		=	arg.substr(2);
								var value	=	(typeof(out[key]) != 'undefined') ? out[key] : true;
								out[key]	=	value;
							}
					// --bar=baz
						else
							{
								var key		=	arg.substr(2, eqPos-2);
								var value	=	arg.substr(eqPos+1);
								out[key]	=	value;
							}
					}
				// -k=value -abc
				else if (arg.substr(0, 1) == '-')
					{
						// -k=value
						if (arg.substr(2, 1) == '=')
							{
								var key		=	arg.substr(1, 1);
								var value	=	arg.substr(3);
								out[key]	=	value;
							}
						// -abc
						else
							{
								var chars	=	arg.substr(1);
								for (char in chars)
									{
										var char	=	chars[char];
										var key		=	char;
										var value	=	(typeof(out[key]) != 'undefined') ? out[key] : true;
										out[key]	=	value;
									}
							}
					}
				// plain-arg
				else
					{
						value		=	arg;
						out[value]	=	true;
					}
			}
		return out;
	};