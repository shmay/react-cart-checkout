const { href } = location;

import uuidv5 from 'uuid/v5';

export const serializeForm = function(form) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;

			if( name ) {
				obj[ name ] = element.value;
			}
		}

    return obj;
	}

// http://stackoverflow.com/a/33286686/548170
export const centsToDollaString = function(x, dollar_sign) {
  if (dollar_sign == null) { dollar_sign = true; }
  let cents = x + '';
  while (cents.length < 4) {
    cents = `0${cents}`;
  }
  let dollars = cents.substr(0, cents.length - 2);
  const decimal = cents.substr(cents.length - 2, 2);
  while ((dollars.length % 3) !== 0) {
    dollars = `0${dollars}`;
  }
  const str = dollars.replace(/(\d{3})(?=\d)/g, '$1,').replace(/^0*(?=.)/, '');
  return (dollar_sign ? '$' : '') + str + '.' + decimal;
}

// https://stackoverflow.com/a/8726353/548170
// 12341234 -> "12,341,234.00"
export const toCurrencyString = function(n) {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1,');
}

export const genUUID = function() {
  return uuidv5(href, uuidv5.URL);
}

// https://stackoverflow.com/a/1026087/548170
export const capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
