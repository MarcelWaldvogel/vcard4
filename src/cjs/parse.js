const {
  MissingArgument,
  InvalidArgument
} = require('./errors');

module.exports = function(vcard) {
  if (typeof vcard === 'undefined')
  throw new MissingArgument('vCard to be parsed must be supplied');

  else if (typeof vcard !== 'string')
  throw new TypeError('vCard to be parsed must be of type string');

  vcard = vcard.replaceAll('\r\n ', '');

  let contentLines = vcard.split('\r\n');

  if (contentLines.length < 4)
  throw new InvalidArgument('vCard content lines must be delimited by CRLF sequence');

  let parsedVcard = {};

  for (let line of contentLines) {
    let prop;
    let params;
    let paramList;
    let value;
    let propAndParams;

    for (let index = 0; index < line.length; index++) {
      if (line[index] === ':' && line[index - 1] !== '\\') {
        value = line.substr(index + 1);
        propAndParams = line.substr(0,index);
        break;
      }
    }

    if (typeof propAndParams === 'undefined') break;

    for (let index = 0; index < propAndParams.length; index++) {
      if (line[index] === ';' && line[index - 1] !== '\\') {
        params = propAndParams.substr(index + 1);
        prop = propAndParams.substr(0,index);
        break;
      }
    }

    if (typeof prop === 'undefined')
    prop = propAndParams;

    paramList = params?.split(';');

    paramList = paramList?.reduce((accumulatedParams, currentParam) => {
      let [ param, paramVal ]= currentParam.split('=');
      accumulatedParams[param] = paramVal;
      return accumulatedParams;
    }, {});

    if (parsedVcard.hasOwnProperty(prop)) {
      if (Array.isArray(parsedVcard[prop]))
      parsedVcard[prop].push({
        parameters: paramList,
        value
      });
      else {
        let currentValue = parsedVcard[prop];
        parsedVcard[prop] = [
          currentValue,
          {
            parameters: paramList,
            value
          }
        ];
      }
    }
    else parsedVcard[prop] = {
      parameters: paramList,
      value
    };
  }

  if (
    (typeof parsedVcard['BEGIN'] === 'undefined') ||
    (typeof parsedVcard['VERSION'] === 'undefined') ||
    (typeof parsedVcard['END'] === 'undefined')
  )
  throw new InvalidArgument('Invalid vCard');

  return parsedVcard;
}