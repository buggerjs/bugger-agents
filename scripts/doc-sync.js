#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');

var _ = require('lodash');

var protocolVersion = require('../package.json').protocolVersion;
var protocol = require(
  '../../blink/Source/devtools/Inspector-' + protocolVersion);

function toSpinalCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

var agentsDirectory = path.join(__dirname, '..', 'lib', 'agents');
function getAgentFilename(domainName) {
  return path.join(agentsDirectory, toSpinalCase(domainName) + '.js');
}

function commentLines(str) {
  return str.replace(/\. /g, '.\n * ');
}

function formatType(obj) {
  var optMarker = obj.optional ? '=' : '';
  var typename = obj.$ref || obj.type;
  if (typename === 'array') {
    typename = 'Array.<' + formatType(obj.items) + '>';
  } else if (typename === 'object') {
    if (Array.isArray(obj.properties)) {
      typename = '{' + obj.properties.map(function(prop) {
        return prop.name + ': ' + formatType(prop);
      }).join(', ') + '}';
    } else {
      typename = 'Object';
    }
  }

  if (obj.enum) {
    typename += ' ' + obj.enum.join('|');
  }

  return typename + optMarker;
}

function formatCommand(command) {
  function formatParameters(parameters) {
    if (!Array.isArray(parameters)) return '';
    return ' * \n * ' + parameters.map(function(param) {
      return '@param {' + formatType(param) + '} ' +
        param.name + (param.description ? (' ' + param.description) : '');
    }).join('\n * ') + '\n';
  }

  function formatReturns(returns) {
    if (!Array.isArray(returns)) return '';
    return ' * \n * ' + returns.map(function(ret) {
      return '@returns {' + formatType(ret) + '} ' +
        ret.name + (ret.description ? (' ' + ret.description) : '');
    }).join('\n * ') + '\n';
  }

  function formatThrows(error) {
    if (!error) return '';
    return ' * \n * @throws {' + formatType(error) + '} \n';
  }

  function formatDescription(description) {
    if (!description) return '';
    return ' * ' + commentLines(description) + '\n';
  }

  return (
    '/**\n' +
    formatDescription(command.description) +
    formatParameters(command.parameters || command.properties) +
    formatReturns(command.returns) +
    formatThrows(command.error) +
    ' */\n');
}

function showChange(old, replacement) {
  old = old.trim();
  replacement = replacement.trim();
  return '  - ' + old.replace(/\n/g, '\n  - ') + '\n' +
         '  + ' + replacement.replace(/\n/g, '\n  + ');
}

function templateMethod(agentClass, cmd) {
  return ('{agentClass}.prototype.{cmd} = function() {\n' +
          '  return this._withClient(function() {\n' +
          '    throw new Error(\'Not implemented\');\n' +
          '  });\n' +
          '};\n')
            .replace('{agentClass}', agentClass)
            .replace('{cmd}', cmd);
}

protocol.domains.forEach(function(domain) {
  var name = domain.domain;
  var agentClass = name + 'Agent';
  var methodPattern = new RegExp(
    '(/\\*\\*\n(?: \\*[^\n]*\n)* \\*/\n)?' +
    agentClass + '\\.prototype\\.([\\w]+) =', 'g');

  var implFilename = getAgentFilename(name);

  if (!fs.existsSync(implFilename)) {
    console.error('[warn] Not found: %j', name);
    return;
  }

  var source = fs.readFileSync(implFilename, 'utf8');
  var methodsFound = [];
  var fixed = source.replace(methodPattern,
    function(text, oldComment, cmd) {
      methodsFound.push(cmd);

      var cmdDesc = _.find(domain.commands, { name: cmd });
      var properComment = formatCommand(cmdDesc);
      if (oldComment !== undefined && oldComment !== properComment) {
        console.error(
          '[info] Replacing comment for %s:\n%s', name + '.' + cmd,
          showChange(oldComment, properComment));
      }
      var postfix = agentClass + '.prototype.' + cmd + ' =';
      return properComment + postfix;
    });

  domain.commands.forEach(function(cmdDesc) {
    var cmd = cmdDesc.name;

    if (methodsFound.indexOf(cmd) !== -1) {
      return;
    }
    console.error('[info] Adding missing %s', name + '.' + cmd);
    var properComment = formatCommand(cmdDesc);

    var newSource =
      '\n' + properComment +
      templateMethod(agentClass, cmd);
    fixed += newSource;
  });

  fs.writeFileSync(implFilename, fixed, 'utf8');

  // Generate types file
  var typesFilename = implFilename.replace(/\.js$/, '.types.js');
  var typesSource = '\'use strict\';\n' +
    '// This file is auto-generated using scripts/doc-sync.js' +
    '\n\n';

  typesSource += domain.types.map(function(typeSpec) {
    var prefix = formatCommand(typeSpec) + 'exports.' + typeSpec.id + ' =';
    switch (typeSpec.type) {
      case 'object':
        return prefix + '\nfunction ' + typeSpec.id +
          '(props) {\n  ' + typeSpec.properties.map(function(prop) {
            return 'this.' + prop.name + ' = props.' + prop.name + ';';
          }).join('\n  ') + '\n};\n';

      case 'string':
        return prefix + ' String;\n';

      default:
        throw new Error('Unknown type: ' + typeSpec.type);
    }
  }).join('\n');

  fs.writeFileSync(typesFilename, typesSource, 'utf8');
});
