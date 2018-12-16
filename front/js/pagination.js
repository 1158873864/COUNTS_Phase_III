
(function(){
if(!window.addEventListener) {
  return;
}
var self = window.StyleFix = {
  link: function(link) {
    try {
      if(link.rel !== 'stylesheet' || link.hasAttribute('data-noprefix')) {
        return;
      }
    }
    catch(e) {
      return;
    }
    var url = link.href || link.getAttribute('data-href'),
        base = url.replace(/[^\/]+$/, ''),
        base_scheme = (/^[a-z]{3,10}:/.exec(base) || [''])[0],
        base_domain = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(base) || [''])[0],
        base_query = /^([^?]*)\??/.exec(url)[1],
        parent = link.parentNode,
        xhr = new XMLHttpRequest(),
        process;
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        process();
      }
    };
    process = function() {
        var css = xhr.responseText;
        if(css && link.parentNode && (!xhr.status || xhr.status < 400 || xhr.status > 600)) {
          css = self.fix(css, true, link);
          if(base) {
            css = css.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function($0, quote, url) {
              if(/^([a-z]{3,10}:|#)/i.test(url)) { // Absolute & or hash-relative
                return $0;
              }
              else if(/^\/\//.test(url)) { // Scheme-relative
                return 'url("' + base_scheme + url + '")';
              }
              else if(/^\//.test(url)) { // Domain-relative
                return 'url("' + base_domain + url + '")';
              }
              else if(/^\?/.test(url)) { // Query-relative
                return 'url("' + base_query + url + '")';
              }
              else {
                return 'url("' + base + url + '")';
              }
            });
            var escaped_base = base.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");
            css = css.replace(RegExp('\\b(behavior:\\s*?url\\(\'?"?)' + escaped_base, 'gi'), '$1');
            }
          var style = document.createElement('style');
          style.textContent = css;
          style.media = link.media;
          style.disabled = link.disabled;
          style.setAttribute('data-href', link.getAttribute('href'));
          parent.insertBefore(style, link);
          parent.removeChild(link);
          style.media = link.media; // Duplicate is intentional. See issue #31
        }
    };
    try {
      xhr.open('GET', url);
      xhr.send(null);
    } catch (e) {
      if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.onerror = xhr.onprogress = function() {};
        xhr.onload = process;
        xhr.open("GET", url);
        xhr.send(null);
      }
    }
    link.setAttribute('data-inprogress', '');
  },
  styleElement: function(style) {
    if (style.hasAttribute('data-noprefix')) {
      return;
    }
    var disabled = style.disabled;
    style.textContent = self.fix(style.textContent, true, style);
    style.disabled = disabled;
  },
  styleAttribute: function(element) {
    var css = element.getAttribute('style');
    css = self.fix(css, false, element);
    element.setAttribute('style', css);
  },
  process: function() {
    $('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);
    $('style').forEach(StyleFix.styleElement);
    $('[style]').forEach(StyleFix.styleAttribute);
  },
  register: function(fixer, index) {
    (self.fixers = self.fixers || [])
      .splice(index === undefined? self.fixers.length : index, 0, fixer);
  },
  fix: function(css, raw, element) {
    for(var i=0; i<self.fixers.length; i++) {
      css = self.fixers[i](css, raw, element) || css;
    }
    return css;
  },
  camelCase: function(str) {
    return str.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase(); }).replace('-','');
  },
  deCamelCase: function(str) {
    return str.replace(/[A-Z]/g, function($0) { return '-' + $0.toLowerCase() });
  }
};
(function(){
  setTimeout(function(){
    $('link[rel="stylesheet"]').forEach(StyleFix.link);
  }, 10);
  document.addEventListener('DOMContentLoaded', StyleFix.process, false);
})();
function $(expr, con) {
  return [].slice.call((con || document).querySelectorAll(expr));
}
})();
(function(root){
if(!window.StyleFix || !window.getComputedStyle) {
  return;
}
function fix(what, before, after, replacement, css) {
  what = self[what];
  if(what.length) {
    var regex = RegExp(before + '(' + what.join('|') + ')' + after, 'gi');
    css = css.replace(regex, replacement);
  }
  return css;
}
var self = window.PrefixFree = {
  prefixCSS: function(css, raw, element) {
    var prefix = self.prefix;
    if(self.functions.indexOf('linear-gradient') > -1) {
      css = css.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, function ($0, delim, repeating, deg) {
        return delim + (repeating || '') + 'linear-gradient(' + (90-deg) + 'deg';
      });
    }
    css = fix('functions', '(\\s|:|,)', '\\s*\\(', '$1' + prefix + '$2(', css);
    css = fix('keywords', '(\\s|:)', '(\\s|;|\\}|$)', '$1' + prefix + '$2$3', css);
    css = fix('properties', '(^|\\{|\\s|;)', '\\s*:', '$1' + prefix + '$2:', css);
    if (self.properties.length) {
      var regex = RegExp('\\b(' + self.properties.join('|') + ')(?!:)', 'gi');
      css = fix('valueProperties', '\\b', ':(.+?);', function($0) {
        return $0.replace(regex, prefix + "$1")
      }, css);
    }
    if(raw) {
      css = fix('selectors', '', '\\b', self.prefixSelector, css);
      css = fix('atrules', '@', '\\b', '@' + prefix + '$1', css);
    }
    css = css.replace(RegExp('-' + prefix, 'g'), '-');
    css = css.replace(/-\*-(?=[a-z]+)/gi, self.prefix);
    return css;
  },
  property: function(property) {
    return (self.properties.indexOf(property)? self.prefix : '') + property;
  },
  value: function(value, property) {
    value = fix('functions', '(^|\\s|,)', '\\s*\\(', '$1' + self.prefix + '$2(', value);
    value = fix('keywords', '(^|\\s)', '(\\s|$)', '$1' + self.prefix + '$2$3', value);
    return value;
  },
  prefixSelector: function(selector) {
    return selector.replace(/^:{1,2}/, function($0) { return $0 + self.prefix })
  },
  prefixProperty: function(property, camelCase) {
    var prefixed = self.prefix + property;
    return camelCase? StyleFix.camelCase(prefixed) : prefixed;
  }
};
(function() {
  var prefixes = {},
    properties = [],
    shorthands = {},
    style = getComputedStyle(document.documentElement, null),
    dummy = document.createElement('div').style;
  var iterate = function(property) {
    if(property.charAt(0) === '-') {
      properties.push(property);
      var parts = property.split('-'),
        prefix = parts[1];
      prefixes[prefix] = ++prefixes[prefix] || 1;
      while(parts.length > 3) {
        parts.pop();
        var shorthand = parts.join('-');
        if(supported(shorthand) && properties.indexOf(shorthand) === -1) {
          properties.push(shorthand);
        }
      }
    }
  },
  supported = function(property) {
    return StyleFix.camelCase(property) in dummy;
  }
  if(style.length > 0) {
    for(var i=0; i<style.length; i++) {
      iterate(style[i])
    }
  }
  else {
    for(var property in style) {
      iterate(StyleFix.deCamelCase(property));
    }
  }
  var highest = {uses:0};
  for(var prefix in prefixes) {
    var uses = prefixes[prefix];
    if(highest.uses < uses) {
      highest = {prefix: prefix, uses: uses};
    }
  }
  self.prefix = '-' + highest.prefix + '-';
  self.Prefix = StyleFix.camelCase(self.prefix);
  self.properties = [];
  for(var i=0; i<properties.length; i++) {
    var property = properties[i];
    if(property.indexOf(self.prefix) === 0) { // we might have multiple prefixes, like Opera
      var unprefixed = property.slice(self.prefix.length);
      if(!supported(unprefixed)) {
        self.properties.push(unprefixed);
      }
    }
  }
  // IE fix
  if(self.Prefix == 'Ms'
    && !('transform' in dummy)
    && !('MsTransform' in dummy)
    && ('msTransform' in dummy)) {
    self.properties.push('transform', 'transform-origin');
  }
  self.properties.sort();
})();

(function() {
var functions = {
  'linear-gradient': {
    property: 'backgroundImage',
    params: 'red, teal'
  },
  'calc': {
    property: 'width',
    params: '1px + 5%'
  },
  'element': {
    property: 'backgroundImage',
    params: '#foo'
  },
  'cross-fade': {
    property: 'backgroundImage',
    params: 'url(a.png), url(b.png), 50%'
  }
};
functions['repeating-linear-gradient'] =
functions['repeating-radial-gradient'] =
functions['radial-gradient'] =
functions['linear-gradient'];
var keywords = {
  'initial': 'color',
  'zoom-in': 'cursor',
  'zoom-out': 'cursor',
  'box': 'display',
  'flexbox': 'display',
  'inline-flexbox': 'display',
  'flex': 'display',
  'inline-flex': 'display',
  'grid': 'display',
  'inline-grid': 'display',
  'min-content': 'width'
};
self.functions = [];
self.keywords = [];
var style = document.createElement('div').style;
function supported(value, property) {
  style[property] = '';
  style[property] = value;
  return !!style[property];
}
for (var func in functions) {
  var test = functions[func],
    property = test.property,
    value = func + '(' + test.params + ')';
  if (!supported(value, property)
    && supported(self.prefix + value, property)) {
    self.functions.push(func);
  }
}
for (var keyword in keywords) {
  var property = keywords[keyword];
  if (!supported(keyword, property)
    && supported(self.prefix + keyword, property)) {
    self.keywords.push(keyword);
  }
}

})();
(function() {
var
selectors = {
  ':read-only': null,
  ':read-write': null,
  ':any-link': null,
  '::selection': null
},
atrules = {
  'keyframes': 'name',
  'viewport': null,
  'document': 'regexp(".")'
};
self.selectors = [];
self.atrules = [];
var style = root.appendChild(document.createElement('style'));
function supported(selector) {
  style.textContent = selector + '{}';  // Safari 4 has issues with style.innerHTML
  return !!style.sheet.cssRules.length;
}
for(var selector in selectors) {
  var test = selector + (selectors[selector]? '(' + selectors[selector] + ')' : '');
  if(!supported(test) && supported(self.prefixSelector(test))) {
    self.selectors.push(selector);
  }
}
for(var atrule in atrules) {
  var test = atrule + ' ' + (atrules[atrule] || '');
  if(!supported('@' + test) && supported('@' + self.prefix + test)) {
    self.atrules.push(atrule);
  }
}
root.removeChild(style);
})();
self.valueProperties = [
  'transition',
  'transition-property'
]
root.className += ' ' + self.prefix;
StyleFix.register(self.prefixCSS);
})(document.documentElement);