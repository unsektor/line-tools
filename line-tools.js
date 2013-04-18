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

var strpos =	function(haystack,needle,offset)
		{	
				//	original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			
				var i = haystack.indexOf( needle, offset ); // returns -1
				return i >= 0 ? i : false;
		},
	is_int	=	function is_int (mixed_var)
		{
			// http://kevin.vanzonneveld.net
			// +   original by: Alex
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +    revised by: Matt Bradley
			// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
			// +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
			// %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
			// %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
			// *     example 1: is_int(23)
			// *     returns 1: true
			// *     example 2: is_int('23')
			// *     returns 2: false
			// *     example 3: is_int(23.5)
			// *     returns 3: false
			// *     example 4: is_int(true)
			// *     returns 4: false
			
			return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
		},		
	_ = function(key) // just debug function
		{
			console.log(key);process.exit();
		};
	
module.exports = 

new function()
	{
		var arguments;
		
		this.parse = function (argv, ready)
			{
				if ((typeof(argv)) != 'object') return;
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
				arguments = out;
				
				return out;
			};
		
		this.getbool = function(value, xdefault)
			{
				var xdefault = !(typeof(xdefault) != 'undefined') ? false : xdefault;
				
				if (typeof(value) == 'boolean')
					{
						return value;
					}
				
				if (is_int(value))
					{
						return (value > 0) ? true : false;
					}
				
				if (typeof(value) == 'string')
					{
						value	= value.toLowerCase();
						var map	=	
							{
								'y': 		true,
								'n':		false,
								
								'yes':		true,
								'no':		false,
								
								'true':		true,
								'false':	false,
								
								'1':		true,
								'0':		false,
								
								'on':		true,
								'off':		false
							};
						
						if (typeof(map[value]) != 'undefined')
							{
								return map[value];
							}
					}
				
				return xdefault;
			}
	}