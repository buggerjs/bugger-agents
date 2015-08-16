'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function CSSAgent(client) {
  if (!(this instanceof CSSAgent))
    return new CSSAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(CSSAgent, BaseAgent);
_.extend(CSSAgent, require('./types'));
module.exports = CSSAgent;

/**
 * Enables the CSS agent for the given page.
 * Clients should not assume that the CSS agent has been enabled until the result of this command is received.
 */
CSSAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables the CSS agent for the given page.
 */
CSSAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Returns requested styles for a DOM node identified by <code>nodeId</code>.
 * 
 * @param {DOM.NodeId} nodeId
 * @param {boolean=} excludePseudo Whether to exclude pseudo styles (default: false).
 * @param {boolean=} excludeInherited Whether to exclude inherited styles (default: false).
 * 
 * @returns {Array.<RuleMatch>=} matchedCSSRules CSS rules matching this node, from all applicable stylesheets.
 * @returns {Array.<PseudoIdMatches>=} pseudoElements Pseudo style matches for this node.
 * @returns {Array.<InheritedStyleEntry>=} inherited A chain of inherited styles (from the immediate node parent up to the DOM tree root).
 */
CSSAgent.prototype.getMatchedStylesForNode =
function getMatchedStylesForNode() {
  throw new Error('Not implemented');
};

/**
 * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.
 * 
 * @param {DOM.NodeId} nodeId
 * 
 * @returns {CSSStyle=} inlineStyle Inline style for the specified DOM node.
 * @returns {CSSStyle=} attributesStyle Attribute-defined element style (e.g. resulting from "width=20 height=100%").
 */
CSSAgent.prototype.getInlineStylesForNode =
function getInlineStylesForNode() {
  throw new Error('Not implemented');
};

/**
 * Returns the computed style for a DOM node identified by <code>nodeId</code>.
 * 
 * @param {DOM.NodeId} nodeId
 * 
 * @returns {Array.<CSSComputedStyleProperty>} computedStyle Computed style for the specified DOM node.
 */
CSSAgent.prototype.getComputedStyleForNode =
function getComputedStyleForNode() {
  throw new Error('Not implemented');
};

/**
 * Requests information about platform fonts which we used to render child TextNodes in the given node.
 * 
 * @param {DOM.NodeId} nodeId
 * 
 * @returns {Array.<PlatformFontUsage>} fonts Usage statistics for every employed platform font.
 */
CSSAgent.prototype.getPlatformFontsForNode =
function getPlatformFontsForNode() {
  throw new Error('Not implemented');
};

/**
 * Returns metainfo entries for all known stylesheets.
 * 
 * @returns {Array.<CSSStyleSheetHeader>} headers Descriptor entries for all available stylesheets.
 */
CSSAgent.prototype.getAllStyleSheets = function() {
  throw new Error('Not implemented');
};

/**
 * Returns stylesheet data for the specified <code>styleSheetId</code>.
 * 
 * @param {StyleSheetId} styleSheetId
 * 
 * @returns {CSSStyleSheetBody} styleSheet Stylesheet contents for the specified <code>styleSheetId</code>.
 */
CSSAgent.prototype.getStyleSheet = function() {
  throw new Error('Not implemented');
};

/**
 * Returns the current textual content and the URL for a stylesheet.
 * 
 * @param {StyleSheetId} styleSheetId
 * 
 * @returns {string} text The stylesheet text.
 */
CSSAgent.prototype.getStyleSheetText =
function getStyleSheetText() {
  throw new Error('Not implemented');
};

/**
 * Sets the new stylesheet text.
 * 
 * @param {StyleSheetId} styleSheetId
 * @param {string} text
 */
CSSAgent.prototype.setStyleSheetText =
function setStyleSheetText() {
  throw new Error('Not implemented');
};

/**
 * Modifies the style text.
 * 
 * @param {StyleSheetId} styleSheetId
 * @param {SourceRange} range
 * @param {string} text
 * 
 * @returns {CSSStyle} style The resulting style after the selector modification.
 */
CSSAgent.prototype.setStyleText =
function setStyleText() {
  throw new Error('Not implemented');
};

/**
 * Either replaces a property identified by <code>styleSheetId</code> and <code>range</code> with <code>text</code> or inserts a new property <code>text</code> at the position identified by an empty <code>range</code>.
 * 
 * @param {StyleSheetId} styleSheetId
 * @param {SourceRange} range Either a source range of the property to be edited or an empty range representing a position for the property insertion.
 * @param {string} text
 * 
 * @returns {CSSStyle} style The resulting style after the property text modification.
 */
CSSAgent.prototype.setPropertyText =
function setPropertyText() {
  throw new Error('Not implemented');
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
  throw new Error('Not implemented');
};

/**
 * Modifies the rule selector.
 * 
 * @param {StyleSheetId} styleSheetId
 * @param {SourceRange} range
 * @param {string} selector
 * 
 * @returns {CSSRule} rule The resulting rule after the selector modification.
 */
CSSAgent.prototype.setRuleSelector =
function setRuleSelector() {
  throw new Error('Not implemented');
};

/**
 * Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>.
 * 
 * @param {StyleSheetId} styleSheetId The css style sheet identifier where a new rule should be inserted.
 * @param {string} ruleText The text of a new rule.
 * @param {SourceRange} location Text position of a new rule in the target style sheet.
 * 
 * @returns {CSSRule} rule The newly created rule.
 */
CSSAgent.prototype.addRule =
function addRule() {
  throw new Error('Not implemented');
};

/**
 * Returns all supported CSS property names.
 * 
 * @returns {Array.<CSSPropertyInfo>} cssProperties Supported property metainfo.
 */
CSSAgent.prototype.getSupportedCSSProperties = function() {
  throw new Error('Not implemented');
};

/**
 * Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser.
 * 
 * @param {DOM.NodeId} nodeId The element id for which to force the pseudo state.
 * @param {Array.<string active|focus|hover|visited>} forcedPseudoClasses Element pseudo classes to force when computing the element's style.
 */
CSSAgent.prototype.forcePseudoState =
function forcePseudoState() {
  throw new Error('Not implemented');
};

/**
 * Returns the Named Flows from the document.
 * 
 * @param {DOM.NodeId} documentNodeId The document node id for which to get the Named Flow Collection.
 * 
 * @returns {Array.<NamedFlow>} namedFlows An array containing the Named Flows in the document.
 */
CSSAgent.prototype.getNamedFlowCollection = function() {
  throw new Error('Not implemented');
};

/**
 * Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>.
 * 
 * @param {Page.FrameId} frameId Identifier of the frame where "via-inspector" stylesheet should be created.
 * 
 * @returns {StyleSheetId} styleSheetId Identifier of the created "via-inspector" stylesheet.
 */
CSSAgent.prototype.createStyleSheet =
function createStyleSheet() {
  throw new Error('Not implemented');
};

/**
 * Returns all media queries parsed by the rendering engine.
 * 
 * @returns {Array.<CSSMedia>} medias
 */
CSSAgent.prototype.getMediaQueries =
function getMediaQueries() {
  throw new Error('Not implemented');
};

/**
 * Modifies the rule selector.
 * 
 * @param {StyleSheetId} styleSheetId
 * @param {SourceRange} range
 * @param {string} text
 * 
 * @returns {CSSMedia} media The resulting CSS media rule after modification.
 */
CSSAgent.prototype.setMediaText =
function setMediaText() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Find a rule with the given active property for the given node and set the new value for this property
 * 
 * @param {DOM.NodeId} nodeId The element id for which to set property.
 * @param {string} propertyName
 * @param {string} value
 */
CSSAgent.prototype.setEffectivePropertyValueForNode =
function setEffectivePropertyValueForNode() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
