'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function CSSAgent(client) {
  if (!(this instanceof CSSAgent))
    return new CSSAgent(client);

  BaseAgent.call(this, CSSAgent, client);
}
util.inherits(CSSAgent, BaseAgent);
_.extend(CSSAgent, require('./css.types'));
module.exports = CSSAgent;

/**
 * Enables the CSS agent for the given page.
 * Clients should not assume that the CSS agent has been enabled until the result of this command is received.
 */
CSSAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables the CSS agent for the given page.
 */
CSSAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns requested styles for a DOM node identified by <code>nodeId</code>.
 * 
 * @param {DOM.NodeId} nodeId
 * @param {boolean=} includePseudo Whether to include pseudo styles (default: true).
 * @param {boolean=} includeInherited Whether to include inherited styles (default: true).
 * 
 * @returns {Array.<RuleMatch>=} matchedCSSRules CSS rules matching this node, from all applicable stylesheets.
 * @returns {Array.<PseudoIdMatches>=} pseudoElements Pseudo style matches for this node.
 * @returns {Array.<InheritedStyleEntry>=} inherited A chain of inherited styles (from the immediate node parent up to the DOM tree root).
 */
CSSAgent.prototype.getMatchedStylesForNode = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.
 * 
 * @param {DOM.NodeId} nodeId
 * 
 * @returns {CSSStyle=} inlineStyle Inline style for the specified DOM node.
 * @returns {CSSStyle=} attributesStyle Attribute-defined element style (e.g. resulting from "width=20 height=100%").
 */
CSSAgent.prototype.getInlineStylesForNode = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the computed style for a DOM node identified by <code>nodeId</code>.
 * 
 * @param {DOM.NodeId} nodeId
 * 
 * @returns {Array.<CSSComputedStyleProperty>} computedStyle Computed style for the specified DOM node.
 */
CSSAgent.prototype.getComputedStyleForNode = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests information about platform fonts which we used to render child TextNodes in the given node.
 * 
 * @param {DOM.NodeId} nodeId
 * 
 * @returns {string} cssFamilyName Font family name which is determined by computed style.
 * @returns {Array.<PlatformFontUsage>} fonts Usage statistics for every employed platform font.
 */
CSSAgent.prototype.getPlatformFontsForNode = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns metainfo entries for all known stylesheets.
 * 
 * @returns {Array.<CSSStyleSheetHeader>} headers Descriptor entries for all available stylesheets.
 */
CSSAgent.prototype.getAllStyleSheets = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns stylesheet data for the specified <code>styleSheetId</code>.
 * 
 * @param {StyleSheetId} styleSheetId
 * 
 * @returns {CSSStyleSheetBody} styleSheet Stylesheet contents for the specified <code>styleSheetId</code>.
 */
CSSAgent.prototype.getStyleSheet = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the current textual content and the URL for a stylesheet.
 * 
 * @param {StyleSheetId} styleSheetId
 * 
 * @returns {string} text The stylesheet text.
 */
CSSAgent.prototype.getStyleSheetText = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets the new stylesheet text, thereby invalidating all existing <code>CSSStyleId</code>'s and <code>CSSRuleId</code>'s contained by this stylesheet.
 * 
 * @param {StyleSheetId} styleSheetId
 * @param {string} text
 */
CSSAgent.prototype.setStyleSheetText = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Updates the CSSStyleDeclaration text.
 * 
 * @param {CSSStyleId} styleId
 * @param {string} text
 * 
 * @returns {CSSStyle} style The resulting style after the text modification.
 */
CSSAgent.prototype.setStyleText = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets the new <code>text</code> for a property in the respective style, at offset <code>propertyIndex</code>.
 * If <code>overwrite</code> is <code>true</code>, a property at the given offset is overwritten, otherwise inserted.
 * <code>text</code> entirely replaces the property <code>name: value</code>.
 * 
 * @param {CSSStyleId} styleId
 * @param {integer} propertyIndex
 * @param {string} text
 * @param {boolean} overwrite
 * 
 * @returns {CSSStyle} style The resulting style after the property text modification.
 */
CSSAgent.prototype.setPropertyText = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Toggles the property in the respective style, at offset <code>propertyIndex</code>.
 * The <code>disable</code> parameter denotes whether the property should be disabled (i.e.
 * removed from the style declaration).
 * If <code>disable == false</code>, the property gets put back into its original place in the style declaration.
 * 
 * @param {CSSStyleId} styleId
 * @param {integer} propertyIndex
 * @param {boolean} disable
 * 
 * @returns {CSSStyle} style The resulting style after the property toggling.
 */
CSSAgent.prototype.toggleProperty = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Modifies the rule selector.
 * 
 * @param {CSSRuleId} ruleId
 * @param {string} selector
 * 
 * @returns {CSSRule} rule The resulting rule after the selector modification.
 */
CSSAgent.prototype.setRuleSelector = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Creates a new empty rule with the given <code>selector</code> in a special "inspector" stylesheet in the owner document of the context node.
 * 
 * @param {DOM.NodeId} contextNodeId
 * @param {string} selector
 * 
 * @returns {CSSRule} rule The newly created rule.
 */
CSSAgent.prototype.addRule = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns all supported CSS property names.
 * 
 * @returns {Array.<CSSPropertyInfo>} cssProperties Supported property metainfo.
 */
CSSAgent.prototype.getSupportedCSSProperties = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser.
 * 
 * @param {DOM.NodeId} nodeId The element id for which to force the pseudo state.
 * @param {Array.<string active|focus|hover|visited>} forcedPseudoClasses Element pseudo classes to force when computing the element's style.
 */
CSSAgent.prototype.forcePseudoState = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the Named Flows from the document.
 * 
 * @param {DOM.NodeId} documentNodeId The document node id for which to get the Named Flow Collection.
 * 
 * @returns {Array.<NamedFlow>} namedFlows An array containing the Named Flows in the document.
 */
CSSAgent.prototype.getNamedFlowCollection = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
