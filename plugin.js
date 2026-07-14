"use strict";
var plugins = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // plugin.js
  var plugin_exports = {};
  __export(plugin_exports, {
    Plugin: () => Plugin
  });

  // ../../shared/settings-ui/tokens.css
  var tokens_default = `/*
 * Thymer Plugin Settings UI \u2014 Design Tokens
 *
 * Canonical CSS custom properties for the plugin settings panel system.
 * Plugins consume this verbatim; component CSS reads from these vars.
 *
 * See shared/settings-ui/DESIGN.md for rationale.
 *
 * Thymer var names verified against library/css-tokens/ (ripped from shipped CSS).
 * Fallbacks use color-mix(currentColor) so panels work when a token is absent.
 *
 * SCOPE IS DOUBLED ON PURPOSE (.tps-panel.tps-panel, specificity 0,2,0).
 * Every plugin bundles its own copy of this file and injects it into the same
 * document, all declaring the same global .tps-panel class. At equal specificity
 * the last stylesheet injected wins for EVERY panel in the app, so one plugin
 * running an outdated bundle silently redefines these tokens for all the others.
 * That shipped: pre-1f753f6 builds set --tps-accent from --accent-color, a var
 * Thymer never defines, which collapsed the accent to currentColor (white text)
 * across every installed plugin's panel. Doubling the class lets a current copy
 * outrank any stale plain-.tps-panel copy regardless of injection order.
 * Do not "simplify" this back to a single class.
 */

.tps-panel.tps-panel {
  /* \u2500\u2500 Color: text \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-text:           var(--text-default,   currentColor);
  --tps-text-muted:     var(--text-muted,     color-mix(in srgb, currentColor 62%, transparent));
  --tps-text-faint:     var(--text-subtle,    color-mix(in srgb, currentColor 48%, transparent));
  --tps-text-whisper:   var(--text-disabled,  color-mix(in srgb, currentColor 34%, transparent));

  /* \u2500\u2500 Color: surfaces \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-bg-input:       var(--input-bg-color,
                        color-mix(in srgb, currentColor 6%, transparent));
  --tps-bg-hover:       var(--hover-subtle,
                        var(--sidebar-bg-hover,
                        color-mix(in srgb, currentColor 8%, transparent)));
  --tps-bg-active:      var(--active-bg-color,
                        color-mix(in srgb, currentColor 12%, transparent));

  /* \u2500\u2500 Color: borders / dividers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-divider:        var(--divider-color,
                        var(--thin-divider-color,
                        color-mix(in srgb, currentColor 14%, transparent)));
  --tps-border:         var(--input-border-color,
                        var(--divider-color,
                        color-mix(in srgb, currentColor 22%, transparent)));
  --tps-border-strong:  var(--titlebar-border-color,
                        var(--selection-border,
                        color-mix(in srgb, currentColor 32%, transparent)));

  /* \u2500\u2500 Color: accent (Thymer uses --logo-color) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  /* Fallback is a real color, never currentColor: an accent that degrades into
     the text color fails invisibly. Deliberately the brand mark, not the theme's
     --color-primary-500 \u2014 that one is a muted slate on themes like
     basalt-bedrock, which would make checked rows harder to read, not easier. */
  --tps-accent:         var(--logo-color, #04d1ab);
  --tps-accent-soft:    color-mix(in srgb, var(--tps-accent) 15%, transparent);
  --tps-accent-strong:  color-mix(in srgb, var(--tps-accent) 80%, var(--tps-text));

  /* \u2500\u2500 Color: semantic \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-danger:         var(--enum-red-fg, #ef4444);
  --tps-danger-soft:    color-mix(in srgb, var(--tps-danger) 15%, transparent);
  --tps-warning:        var(--text-warning,
                        var(--enum-yellow-fg, #f59e0b));
  --tps-success:        var(--enum-green-fg, #10b981);
  --tps-success-soft:   color-mix(in srgb, var(--tps-success) 12%, transparent);

  --tps-on-accent:      var(--text-on-accent, light-dark(#111111, #fafafa));

  /* Panel chrome */
  --tps-panel-bg:       var(--panel-bg-color, transparent);
  --tps-swatch-inset:   color-mix(in srgb, var(--tps-text) 8%, transparent);

  /* \u2500\u2500 Typography \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  /* Font is INHERITED from Thymer's panel chrome (see components.css). */

  --tps-fs-title:       18px;
  --tps-fs-lede:        13px;
  --tps-fs-section:     11px;
  --tps-fs-hint:        12px;
  --tps-fs-label:       13px;
  --tps-fs-desc:        12px;
  --tps-fs-body:        13px;
  --tps-fs-value:       12px;
  --tps-fs-button:      12px;
  --tps-fs-list-header: 10px;

  --tps-lh-tight:       1;
  --tps-lh-snug:        1.2;
  --tps-lh-base:        1.4;
  --tps-lh-loose:       1.5;

  --tps-fw-regular:     400;
  --tps-fw-medium:      500;
  --tps-fw-semibold:    600;
  --tps-fw-bold:        700;

  --tps-ls-section:     0.06em;
  --tps-ls-list:        0.08em;
  --tps-ls-title:       0;

  /* \u2500\u2500 Spacing (8px scale) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-space-1:        4px;
  --tps-space-2:        8px;
  --tps-space-3:        12px;
  --tps-space-4:        16px;
  --tps-space-5:        24px;
  --tps-space-6:        32px;
  --tps-space-7:        48px;

  /* \u2500\u2500 Radii \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-radius-sm:      4px;
  --tps-radius-md:      6px;
  --tps-radius-lg:      8px;
  --tps-radius-pill:    999px;
  --tps-radius-circle:  50%;

  /* \u2500\u2500 Motion \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-ease-out:       cubic-bezier(0.2, 0.6, 0.2, 1);
  --tps-ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
  --tps-dur-fast:       80ms;
  --tps-dur-base:       160ms;

  --tps-shadow-thumb:   0 1px 3px color-mix(in srgb, var(--tps-text) 28%, transparent);

  /* \u2500\u2500 Component dimensions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  --tps-control-h-sm:   28px;
  --tps-control-h-md:   32px;
  --tps-input-w:        64px;
  --tps-num-step-w:     28px;
  --tps-swatch-size:    22px;
  --tps-thumb-size:     16px;
  --tps-track-h:        6px;

  --tps-slider-track:   color-mix(in srgb, var(--tps-text) 22%, transparent);
  --tps-slider-thumb-border: color-mix(in srgb, var(--tps-text) 28%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .tps-panel.tps-panel {
    --tps-dur-fast:     1ms;
    --tps-dur-base:     1ms;
  }
}
`;

  // ../../shared/settings-ui/components.css
  var components_default = `/*
 * Thymer Plugin Panel \u2014 Component Primitives
 *
 * All primitives scope under .tps-panel. Plugin-specific styles live elsewhere.
 * Reads tokens from tokens.css.
 */

/* \u2500\u2500 Panel root \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Inherit Thymer's font + sizing \u2014 DO NOT override. plugin-collection-icons
   demonstrates the right approach: simply \`font-family: inherit\`. Forcing a
   custom var fights both Thymer's body font AND the .ti icon font. */
.tps-panel {
  font-family: inherit;
  font-size: var(--tps-fs-body);
  line-height: var(--tps-lh-base);
  color: var(--tps-text);
  padding: 0 var(--tps-space-5) var(--tps-space-7);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.tps-panel *,
.tps-panel *::before,
.tps-panel *::after {
  box-sizing: border-box;
}

/* Mono opt-ins are explicit per-element, never via a panel-wide override. */
.tps-panel .tps-num-input,
.tps-panel .tps-slider-value,
.tps-panel .tps-mono,
.tps-panel .tps-mono * {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Courier New", monospace;
}

/* \u2500\u2500 Title block \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-title {
  font-size: var(--tps-fs-title);
  line-height: var(--tps-lh-snug);
  font-weight: var(--tps-fw-semibold);
  letter-spacing: var(--tps-ls-title);
  color: var(--tps-text);
  margin: 0 0 var(--tps-space-1);
}

.tps-lede {
  font-size: var(--tps-fs-lede);
  line-height: var(--tps-lh-loose);
  color: var(--tps-text-muted);
  margin: 0 0 var(--tps-space-3);
}

/* \u2500\u2500 Canonical plugin header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-plugin-header {
  position: relative;
  margin: var(--tps-space-5) 0 var(--tps-space-5);
  padding: 18px var(--tps-space-4);
  overflow: hidden;
  background:
    linear-gradient(to right,
      #f26548  8%, #f26548 28%,
      #fbac56 28%, #fbac56 48%,
      #fff460 48%, #fff460 68%,
      #f067a6 68%, #f067a6 88%,
      #03bdf2 88%
    ) top left / 100% 1px no-repeat,
    linear-gradient(to right,
      #f26548  0%, #f26548 12%,
      #fbac56 12%, #fbac56 32%,
      #fff460 32%, #fff460 52%,
      #f067a6 52%, #f067a6 72%,
      #03bdf2 72%, #03bdf2 92%
    ) bottom left / 100% 1px no-repeat,
    var(--tps-panel-bg, var(--panel-bg-color, var(--plg-ci-theme-bg, transparent)));
  border-left: 1px solid #f26548;
  border-right: 1px solid #03bdf2;
}

.tps-plugin-header-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--tps-space-2, 8px);
  margin: 0 0 var(--tps-space-3, 12px);
  background: var(--tps-bg-hover);
  border-radius: var(--tps-radius-md, 6px);
}

.tps-plugin-header-logo-icon {
  flex: 0 0 auto;
  font-size: 34px;
  line-height: 1;
  color: var(--tps-text, currentColor);
}

.tps-plugin-header-title {
  font-size: 22px;
  line-height: var(--tps-lh-snug, 1.2);
  font-weight: var(--tps-fw-semibold, 600);
  letter-spacing: 0;
  color: var(--tps-text, var(--text-default, currentColor));
  margin: 0 0 var(--tps-space-3, 12px);
}

.tps-panel .tps-plugin-header-version {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  font-size: 11px;
  line-height: inherit;
  font-weight: var(--tps-fw-medium, 500);
  letter-spacing: 0;
  color: var(--tps-text-faint) !important;
  white-space: nowrap;
}

.tps-plugin-header-lede {
  font-size: 14px;
  line-height: var(--tps-lh-base, 1.4);
  color: var(--tps-text-muted);
  margin: 0 0 var(--tps-space-3, 12px);
}

.tps-plugin-header-helper-wrap {
  margin: 0 0 var(--tps-space-3, 12px);
}

.tps-plugin-header-helper-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  color: inherit;
  opacity: 0.28;
  font: inherit;
  font-size: var(--tps-fs-section, 11px);
  font-weight: var(--tps-fw-semibold, 600);
  line-height: var(--tps-lh-tight, 1);
  letter-spacing: var(--tps-ls-section, 0.06em);
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out);
}

.tps-plugin-header-helper-toggle:hover {
  opacity: 0.72;
}

.tps-plugin-header-helper-toggle:focus-visible {
  outline: 1px solid color-mix(in srgb, var(--tps-accent, currentColor) 45%, transparent);
  outline-offset: 2px;
}

.tps-plugin-header-helper-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 13px;
  height: 13px;
  font-size: 13px;
  line-height: 1;
  color: inherit;
}

.tps-plugin-header-helper-wrap[data-open="true"] .tps-plugin-header-helper-toggle {
  opacity: 0.72;
}

.tps-plugin-header-helper-wrap[data-open="true"] .tps-plugin-header-helper-toggle:hover {
  opacity: 1;
}

.tps-plugin-header-helper-body {
  display: none;
  margin: 8px 0 0;
  padding-left: 18px;
}

.tps-plugin-header-helper-wrap[data-open="true"] .tps-plugin-header-helper-body {
  display: block;
  cursor: pointer;
}

.tps-plugin-header-helper-line {
  margin: 0;
  font-size: var(--tps-fs-hint, 12px);
  line-height: var(--tps-lh-base, 1.4);
  color: inherit;
  opacity: 0.72;
  transition: opacity var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out);
}

.tps-plugin-header-helper-wrap[data-open="true"] .tps-plugin-header-helper-body:hover .tps-plugin-header-helper-line {
  opacity: 1;
}

/* Scoped .tps-panel on purpose: every plugin injects its own copy of this
   file, and older copies baseline-align this row (plus translateY icon
   shims). Higher specificity here makes the newest layout win the cascade
   war regardless of plugin load order. */
.tps-panel .tps-plugin-header-attr {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  width: 100%;
  font-size: 11.5px;
  line-height: var(--tps-lh-base, 1.4);
  color: var(--tps-text-muted);
  margin: var(--tps-space-3, 12px) 0 0;
  padding-top: var(--tps-space-3, 12px);
  border-top: 0;
}

.tps-plugin-header-attr::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: clamp(40%, 50%, 55%);
  height: 1px;
  background: var(--tps-bg-hover);
}

.tps-plugin-header-link-group + .tps-plugin-header-link-group {
  margin-left: var(--tps-space-3, 12px);
  padding-left: var(--tps-space-3, 12px);
  border-left: 1px solid var(--tps-bg-hover);
}

.tps-panel .tps-plugin-header-icon,
.tps-panel .tps-plugin-header-attr .ti {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  font-size: 12px;
  line-height: 1;
  color: var(--tps-text-muted);
  margin-right: var(--tps-space-1, 4px);
}

.tps-plugin-header-iconify {
  background-color: currentColor;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.tps-plugin-header-iconify-github {
  --tps-iconify-github: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E");
  -webkit-mask-image: var(--tps-iconify-github);
  mask-image: var(--tps-iconify-github);
}

.tps-plugin-header-link {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 42%, transparent);
  transition: color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),
              text-decoration-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),
              filter var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out);
}

.tps-plugin-header-link--blue,
.tps-plugin-header-link--blue:hover {
  color: #03bdf2;
  text-decoration-color: #03bdf2;
}

.tps-plugin-header-link--pink,
.tps-plugin-header-link--pink:hover {
  color: #f067a6;
  text-decoration-color: #f067a6;
}

.tps-plugin-header-link--muted,
.tps-plugin-header-link--muted:hover {
  color: var(--tps-text-faint) !important;
  text-decoration-color: color-mix(in srgb, currentColor 42%, transparent);
}

.tps-plugin-header-link:hover {
  text-decoration: none;
  text-decoration-color: transparent;
  filter: brightness(1.2);
}

/* \u2500\u2500 Header controls: scope pill + bug report + kill switch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Settings-scope cluster. Resting: one dim "All devices" pill. Diverged:
   pill lights amber (full-perimeter border + tint \u2014 never a single-edge
   accent) and the \u2191 push / \u21BA discard icon buttons appear beside it. Amber
   rides Thymer's orange enum tokens so it tracks the theme. */
.tps-scope {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.tps-scope-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 8px;
  border: 1px solid var(--tps-border, rgba(127, 127, 127, 0.16));
  border-radius: 999px;
  font-size: 10.5px;
  line-height: 1;
  white-space: nowrap;
  color: var(--tps-text-muted);
  background: transparent;
  user-select: none;
}

.tps-scope-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--tps-text-muted);
  opacity: 0.55;
}

.tps-scope-pill[data-diverged="true"] {
  color: var(--enum-orange-fg, #d98324);
  border-color: var(--enum-orange-border, rgba(217, 131, 36, 0.45));
  background: var(--enum-orange-bg, rgba(217, 131, 36, 0.12));
}

.tps-scope-pill[data-diverged="true"] .tps-scope-dot {
  background: var(--enum-orange-fg, #d98324);
  opacity: 1;
}

/* Device cannot persist settings locally \u2014 the store is falling back to the
   synced config so nothing is lost. Warning tone, full-perimeter border. */
.tps-scope-pill[data-local-unavailable="true"] {
  color: var(--enum-red-fg, #d64545);
  border-color: var(--enum-red-border, rgba(214, 69, 69, 0.5));
  background: var(--enum-red-bg, rgba(214, 69, 69, 0.12));
}

.tps-scope-pill[data-local-unavailable="true"] .tps-scope-dot {
  background: var(--enum-red-fg, #d64545);
  opacity: 1;
}

.tps-scope-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid var(--tps-border, rgba(127, 127, 127, 0.16));
  border-radius: var(--tps-radius-sm, 4px);
  background: transparent;
  color: var(--tps-text-muted);
  cursor: pointer;
  transition: color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),
              background-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),
              border-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out);
}

/* Inline-SVG icons: a viewBox-centered vector in a block box has no font
   metrics \u2014 no baseline, no ascent/descent ink drift. The 14px vector in the
   22px button gives an exact 4px inset on every side. */
.tps-panel .tps-scope-svg {
  display: flex;
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
}

.tps-panel .tps-scope-svg svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Optical correction for the (still webfont) bug glyph: near-zero descent
   rides the ink ~1px high of any line-box centering. */
.tps-panel .tps-plugin-header-bug .ti::before {
  display: inline-block;
  transform: translateY(1px);
}

.tps-scope-btn:hover {
  color: var(--tps-text);
  background: var(--tps-bg-hover);
  border-color: var(--tps-border);
}

.tps-scope-btn:focus-visible {
  outline: 2px solid var(--tps-accent);
  outline-offset: 2px;
}

.tps-scope-btn--push:hover {
  color: var(--enum-green-fg, #3fa653);
  border-color: var(--enum-green-border, rgba(63, 166, 83, 0.45));
  background: var(--enum-green-bg, rgba(63, 166, 83, 0.12));
}

/* Armed state must beat the generic :hover recolor (same specificity, order-
   dependent) \u2014 scope it up so the icon reddens with the box, hovered or not. */
.tps-panel .tps-scope-btn--discard[data-armed="true"],
.tps-panel .tps-scope-btn--discard[data-armed="true"]:hover {
  color: var(--enum-red-fg, #d64545);
  border-color: var(--enum-red-border, rgba(214, 69, 69, 0.5));
  background: var(--enum-red-bg, rgba(214, 69, 69, 0.12));
}

.tps-scope-btn[disabled] {
  opacity: 0.5;
  cursor: default;
}

/* \u2500\u2500 Header controls: bug report + kill switch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Last flex item of the attr row; margin-left:auto pins the group to the
   right edge, align-self:center opts out of the row's baseline alignment. */
.tps-plugin-header-controls {
  display: inline-flex;
  align-items: center;
  gap: var(--tps-space-2, 8px);
  margin-left: auto;
  padding-left: var(--tps-space-3, 12px);
}

/* In-row placement (right of the version link). */
.tps-panel .tps-plugin-header-attr > .tps-plugin-header-bug {
  margin-left: var(--tps-space-2, 8px);
}

.tps-plugin-header-bug {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--tps-radius-sm, 4px);
  background: transparent;
  color: var(--tps-text-muted);
  cursor: pointer;
  transition: color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),
              background-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),
              border-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out);
}

/* Undo the attr row's generic .ti treatment (translateY + margin) inside the button. */
.tps-panel .tps-plugin-header-bug .ti {
  width: 14px;
  height: 14px;
  font-size: 14px;
  transform: none;
  margin: 0;
}

.tps-plugin-header-bug:hover {
  color: var(--tps-text);
  background: var(--tps-bg-hover);
  border-color: var(--tps-border);
}

.tps-plugin-header-bug:focus-visible {
  outline: 2px solid var(--tps-accent);
  outline-offset: 2px;
}

.tps-switch {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  width: 30px;
  height: 16px;
  padding: 0;
  border: 1px solid var(--tps-border);
  border-radius: var(--tps-radius-pill, 999px);
  background: var(--tps-bg-input);
  cursor: pointer;
  transition: background-color var(--tps-dur-base, 160ms) var(--tps-ease-out, ease-out),
              border-color var(--tps-dur-base, 160ms) var(--tps-ease-out, ease-out);
}

.tps-switch-knob {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 12px;
  height: 12px;
  border-radius: var(--tps-radius-circle, 50%);
  background: var(--tps-text-muted);
  transition: transform var(--tps-dur-base, 160ms) var(--tps-ease-out, ease-out),
              background-color var(--tps-dur-base, 160ms) var(--tps-ease-out, ease-out);
}

.tps-switch[aria-checked="true"] {
  background: var(--tps-accent);
  border-color: var(--tps-accent);
}

.tps-switch[aria-checked="true"] .tps-switch-knob {
  transform: translateX(14px);
  background: var(--tps-on-accent, #fff);
}

.tps-switch:focus-visible {
  outline: 2px solid var(--tps-accent);
  outline-offset: 2px;
}

.tps-switch[data-busy],
.tps-switch:disabled {
  opacity: 0.55;
  pointer-events: none;
}

/* Off-state "safe mode": dim the body, keep it interactive \u2014 edits stage in the
   plugin's local drafts and apply on re-enable. Keyed off the pill's aria state
   so the optimistic flip dims instantly and heal re-renders stay correct with
   no JS. The header (pill, bug button, off-note) stays full opacity \u2014 exclude
   any direct child containing it (collection-icons wraps the header in a row
   element, so exclude by content, not class). */
.tps-panel:has(.tps-plugin-header .tps-switch[aria-checked="false"]) > :not(:has(.tps-plugin-header)) {
  opacity: 0.65;
  transition: opacity var(--tps-dur-base, 160ms) var(--tps-ease-out, ease-out);
}

/* Rendered whenever the header has a kill switch; shown only while it's off. */
.tps-plugin-header-off-note {
  display: none;
  margin: var(--tps-space-2, 8px) 0 0;
  font-size: var(--tps-fs-hint, 12px);
  line-height: var(--tps-lh-base, 1.4);
  color: var(--tps-text-muted);
}

.tps-plugin-header:has(.tps-switch[aria-checked="false"]) .tps-plugin-header-off-note {
  display: block;
}

/* \u2500\u2500 Feedback dialog (panel-scoped modal) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* The overlay positions against the .tps-panel root (the scroll container). */
.tps-panel {
  position: relative;
}

.tps-feedback-overlay {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--tps-space-4);
  background: color-mix(in srgb, var(--panel-bg-color, light-dark(#ffffff, #131316)) 55%, transparent);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

@supports not ((backdrop-filter: blur(6px)) or (-webkit-backdrop-filter: blur(6px))) {
  .tps-feedback-overlay {
    background: color-mix(in srgb, var(--panel-bg-color, light-dark(#ffffff, #131316)) 90%, transparent);
  }
}

/* Flex column with a growing description field: the card stretches to the
   available panel height (capped) and the textarea absorbs the difference,
   so the card itself never needs a scrollbar. */
.tps-feedback-card {
  display: flex;
  flex-direction: column;
  width: min(440px, 100%);
  height: min(760px, 100%);
  overflow: auto;
  background: var(--panel-bg-color, light-dark(#ffffff, #17171b));
  border: 1px solid var(--tps-border);
  border-radius: var(--tps-radius-lg);
  padding: var(--tps-space-4);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

/* Rows keep their natural height \u2014 when content doesn't fit (e.g. the system
   report drawer opens in a short panel) the CARD scrolls; rows must never be
   squeezed into overlapping each other. Only the description field flexes. */
.tps-feedback-card > * {
  flex: 0 0 auto;
}

.tps-feedback-card > .tps-feedback-field--grow {
  flex: 1 1 auto;
}

.tps-feedback-field--grow {
  display: flex;
  flex-direction: column;
}

.tps-feedback-field--grow .tps-feedback-textarea {
  flex: 1 1 auto;
  min-height: 72px;
}

.tps-feedback-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 var(--tps-space-2);
}

.tps-feedback-title {
  margin: 0;
  font-size: var(--tps-fs-label, 12.5px);
  font-weight: var(--tps-fw-semibold, 600);
  letter-spacing: var(--tps-ls-section, 0.06em);
  text-transform: uppercase;
  color: var(--tps-text);
}

.tps-feedback-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--tps-radius-sm, 4px);
  background: transparent;
  color: var(--tps-text-muted);
  cursor: pointer;
  font-size: 14px;
}

.tps-feedback-close:hover {
  color: var(--tps-text);
  background: var(--tps-bg-hover);
  border-color: var(--tps-border);
}

.tps-feedback-close:focus-visible {
  outline: 2px solid var(--tps-accent);
  outline-offset: 2px;
}

.tps-feedback-hint {
  margin: 0 0 var(--tps-space-3);
  font-size: var(--tps-fs-hint, 12px);
  line-height: var(--tps-lh-base, 1.4);
  color: var(--tps-text-muted);
}

.tps-feedback-field {
  display: block;
  margin: 0 0 var(--tps-space-3);
}

.tps-feedback-label {
  display: block;
  margin: 0 0 var(--tps-space-1);
  font-size: var(--tps-fs-label, 12.5px);
  font-weight: var(--tps-fw-medium, 500);
  color: var(--tps-text);
}

.tps-feedback-input,
.tps-feedback-textarea {
  width: 100%;
  padding: var(--tps-space-1, 4px) var(--tps-space-2, 8px);
  font-family: inherit;
  font-size: var(--tps-fs-body, 13px);
  line-height: var(--tps-lh-base, 1.4);
  color: var(--tps-text);
  background: var(--tps-bg-input);
  border: 1px solid var(--tps-border);
  border-radius: var(--tps-radius-sm, 4px);
}

.tps-feedback-textarea {
  resize: vertical;
  min-height: 72px;
}

.tps-feedback-input:focus,
.tps-feedback-textarea:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--tps-accent) 60%, transparent);
}

.tps-feedback-input[aria-invalid="true"],
.tps-feedback-textarea[aria-invalid="true"] {
  border-color: var(--tps-danger);
}

.tps-feedback-details {
  margin: 0 0 var(--tps-space-3);
}

.tps-feedback-summary {
  font-size: var(--tps-fs-hint, 12px);
  color: var(--tps-text-muted);
  cursor: pointer;
}

.tps-feedback-summary:hover {
  color: var(--tps-text);
}

.tps-feedback-report {
  margin: var(--tps-space-2) 0 0;
  padding: var(--tps-space-2);
  max-height: 140px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Courier New", monospace;
  font-size: 11px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--tps-text-muted);
  background: var(--tps-bg-input);
  border: 1px solid var(--tps-divider);
  border-radius: var(--tps-radius-sm, 4px);
}

/* Themed thin scrollbars \u2014 the card (short panels) and the report pre both scroll. */
.tps-feedback-card,
.tps-feedback-report {
  scrollbar-width: thin;
  scrollbar-color: var(--tps-border, rgba(127, 127, 127, 0.25)) transparent;
}

.tps-feedback-card::-webkit-scrollbar,
.tps-feedback-report::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.tps-feedback-card::-webkit-scrollbar-track,
.tps-feedback-report::-webkit-scrollbar-track {
  background: transparent;
}

.tps-feedback-card::-webkit-scrollbar-thumb,
.tps-feedback-report::-webkit-scrollbar-thumb {
  background: var(--tps-border, rgba(127, 127, 127, 0.25));
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.tps-feedback-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--tps-space-2);
}

/* \u2500\u2500 Section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-section {
  padding: 0;
}

.tps-section + .tps-section {
  border-top: 1px solid var(--tps-divider);
  margin-top: var(--tps-space-4);
  padding-top: var(--tps-space-4);
}

.tps-section-label {
  display: block;
  font-size: var(--tps-fs-section);
  line-height: var(--tps-lh-tight);
  font-weight: var(--tps-fw-semibold);
  letter-spacing: var(--tps-ls-section);
  text-transform: uppercase;
  color: var(--tps-text-muted);
  margin: 0 0 var(--tps-space-2);
}

.tps-section-hint {
  font-size: var(--tps-fs-hint);
  line-height: var(--tps-lh-base);
  color: var(--tps-text-muted);
  margin: 0 0 var(--tps-space-3);
}

.tps-section-body {
  display: flex;
  flex-direction: column;
  gap: var(--tps-space-3);
  margin-top: var(--tps-space-2);
}

.tps-section-body:first-child {
  margin-top: 0;
}

/* When the body is full of list rows (mode rows), drop the gap and the top
   margin entirely so the first row's hover background sits flush under the
   section label and adjacent rows tile with no dead space between them. */
.tps-section-body:has(> .tps-list-row),
.tps-section-body:has(> .tps-opt) {
  margin-top: 0;
  gap: 0;
}

/* Collapsible variant: header is a button, body is hidden when closed */

.tps-section--collapsible > .tps-section-header {
  display: flex;
  align-items: center;
  gap: var(--tps-space-2);
  width: 100%;
  min-height: 34px;
  padding: 0;
  margin: 0 0 var(--tps-space-2);
  background: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.tps-section--collapsible > .tps-section-header:hover .tps-section-label {
  color: var(--tps-text);
}

.tps-section--collapsible > .tps-section-header .tps-section-label {
  margin: 0;
}

.tps-section-chev {
  display: inline-block;
  width: 10px;
  font-size: 10px;
  line-height: 1;
  color: var(--tps-text-faint);
  transition: transform var(--tps-dur-base) var(--tps-ease-out);
}

.tps-section--collapsible[data-open="true"] .tps-section-chev {
  transform: rotate(90deg);
}

.tps-section-summary {
  margin-left: auto;
  min-width: 0;
  min-height: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: var(--tps-fs-hint);
  color: var(--tps-text-muted);
  font-weight: var(--tps-fw-regular);
  letter-spacing: 0;
  text-transform: none;
}

/* Reserve header height when expanded; summary text only shows collapsed */
.tps-section--collapsible[data-open="true"] .tps-section-summary {
  visibility: hidden;
}

.tps-section--collapsible[data-open="false"] > .tps-section-body {
  display: none;
}

/* \u2500\u2500 Option row (checkbox / radio + label + desc) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-opt {
  display: grid;
  grid-template-columns: 18px 1fr;
  column-gap: var(--tps-space-3);
  row-gap: 0;
  align-items: start;
  padding: 6px 10px;
  margin: 0 -10px;
  border-radius: var(--tps-radius-md);
  cursor: pointer;
  transition: background-color var(--tps-dur-fast) var(--tps-ease-out);
}

/* Stack option rows tight so the hover background of one meets the next
   without a visible gap above. Outer section gap is handled by the section
   itself, not by spacing between opts. */
.tps-section-body > .tps-opt + .tps-opt {
  margin-top: 0;
}
.tps-section-body:has(> .tps-opt) {
  gap: 0;
}

.tps-opt:hover {
  background: var(--tps-bg-hover);
}

.tps-opt > input[type="checkbox"],
.tps-opt > input[type="radio"] {
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--tps-accent);
  cursor: pointer;
}

.tps-opt > .tps-opt-label {
  grid-column: 2;
  grid-row: 1;
  font-size: var(--tps-fs-label);
  line-height: var(--tps-lh-base);
  font-weight: var(--tps-fw-medium);
  color: var(--tps-text);
  cursor: pointer;
  transition: color var(--tps-dur-fast) var(--tps-ease-out);
}

.tps-opt > .tps-opt-desc {
  grid-column: 2;
  grid-row: 2;
  margin-top: 1px;
  font-size: var(--tps-fs-desc);
  line-height: var(--tps-lh-base);
  color: var(--tps-text-muted);
  cursor: pointer;
}

.tps-section-body > .tps-opt-note {
  margin: var(--tps-space-2) -10px 0;
  padding: 0 10px 0 calc(10px + 18px + var(--tps-space-3));
  font-size: var(--tps-fs-desc);
  line-height: var(--tps-lh-base);
  color: var(--tps-text-muted);
}

.tps-opt > input:checked ~ .tps-opt-label {
  color: var(--tps-accent);
}

/* Checkbox option + nested number row (e.g. tuned value under a toggle) */
.tps-section-body:has(> .tps-opt-group) {
  margin-top: 0;
  gap: 0;
}

.tps-opt-group {
  display: flex;
  flex-direction: column;
}

.tps-opt-group + .tps-opt-group {
  margin-top: 0;
}

.tps-opt-group .tps-opt-group__value,
.tps-opt-group > .tps-num {
  margin-left: calc(18px + var(--tps-space-3));
  margin-top: var(--tps-space-1);
  margin-bottom: var(--tps-space-3);
  padding-right: 10px;
  max-width: 100%;
  box-sizing: border-box;
}

.tps-opt-group .tps-num-grid {
  margin-left: calc(18px + var(--tps-space-3));
  margin-top: var(--tps-space-1);
  margin-bottom: var(--tps-space-3);
  grid-template-columns: minmax(0, 1fr);
}

/* \u2500\u2500 Numeric stepper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-num {
  display: flex;
  align-items: center;
  gap: var(--tps-space-1);
}

.tps-num-label {
  flex: 0 0 auto;
  min-width: 0;
  font-size: var(--tps-fs-label);
  color: var(--tps-text);
  margin-right: var(--tps-space-2);
}

.tps-num-step,
.tps-num-input,
.tps-num-reset {
  font-family: inherit;
  font-size: var(--tps-fs-button);
  height: var(--tps-control-h-sm);
  border: 1px solid var(--tps-divider);
  border-radius: var(--tps-radius-sm);
  background: transparent;
  color: var(--tps-text);
  transition: border-color var(--tps-dur-fast) var(--tps-ease-out),
              background-color var(--tps-dur-fast) var(--tps-ease-out),
              color var(--tps-dur-fast) var(--tps-ease-out);
}

.tps-num-step {
  width: var(--tps-num-step-w);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tps-num-step:hover {
  border-color: var(--tps-border);
  background: var(--tps-bg-hover);
}

.tps-num-step:active {
  background: var(--tps-bg-active);
}

.tps-num-input {
  width: var(--tps-input-w);
  padding: 0 var(--tps-space-2);
  background: var(--tps-bg-input);
  text-align: center;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}

.tps-num-input::-webkit-outer-spin-button,
.tps-num-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.tps-num-input:focus {
  outline: none;
  border-color: var(--tps-accent);
}

.tps-num-unit {
  font-size: var(--tps-fs-hint);
  color: var(--tps-text-muted);
  margin: 0 var(--tps-space-2);
}

.tps-num-reset {
  font-size: 11px;
  color: var(--tps-text-muted);
  padding: 0 var(--tps-space-2);
  cursor: pointer;
}

.tps-num-reset:hover {
  color: var(--tps-text);
  border-color: var(--tps-border);
}

.tps-num-reset[hidden] {
  display: none !important;
}

/* Stacked layout: label / control row in a 200px / 1fr grid */

.tps-num-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  column-gap: var(--tps-space-3);
  row-gap: var(--tps-space-2);
}

.tps-num-grid > .tps-num-label {
  margin: 0;
  text-align: left;
}

.tps-num-grid > .tps-num {
  justify-self: start;
}

/* \u2500\u2500 Slider row \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Shared range styling for sliderRow and any other range input in a panel.
   Exclude hue pickers that paint their own gradient track. */
.tps-panel input[type="range"]:not(.plg-collection-colors__hue) {
  width: 100%;
  height: 22px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  touch-action: pan-y;
}

.tps-panel input[type="range"]:not(.plg-collection-colors__hue)::-webkit-slider-runnable-track {
  height: var(--tps-track-h);
  border-radius: 3px;
  background: var(--tps-slider-track);
}

.tps-panel input[type="range"]:not(.plg-collection-colors__hue)::-moz-range-track {
  height: var(--tps-track-h);
  border-radius: 3px;
  background: var(--tps-slider-track);
}

.tps-panel input[type="range"]:not(.plg-collection-colors__hue)::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: var(--tps-thumb-size);
  height: var(--tps-thumb-size);
  border-radius: var(--tps-radius-circle);
  background: var(--tps-accent);
  border: 2px solid var(--tps-slider-thumb-border);
  box-shadow: var(--tps-shadow-thumb);
  cursor: grab;
  margin-top: -5px;
}

.tps-panel input[type="range"]:not(.plg-collection-colors__hue)::-moz-range-thumb {
  width: var(--tps-thumb-size);
  height: var(--tps-thumb-size);
  border-radius: var(--tps-radius-circle);
  background: var(--tps-accent);
  border: 2px solid var(--tps-slider-thumb-border);
  box-shadow: var(--tps-shadow-thumb);
  cursor: grab;
}

.tps-panel input[type="range"]:not(.plg-collection-colors__hue):active::-webkit-slider-thumb {
  cursor: grabbing;
}

.tps-slider {
  display: grid;
  grid-template-columns: 90px 1fr 56px auto;
  align-items: center;
  gap: var(--tps-space-3);
}

.tps-slider-label {
  font-size: var(--tps-fs-section);
  font-weight: var(--tps-fw-semibold);
  letter-spacing: var(--tps-ls-section);
  text-transform: uppercase;
  color: var(--tps-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tps-slider-input {
  width: 100%;
  height: 22px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  touch-action: pan-y;
}

.tps-slider-input::-webkit-slider-runnable-track {
  height: var(--tps-track-h);
  border-radius: 3px;
  background: var(--tps-slider-track);
}

.tps-slider-input::-moz-range-track {
  height: var(--tps-track-h);
  border-radius: 3px;
  background: var(--tps-slider-track);
}

.tps-slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: var(--tps-thumb-size);
  height: var(--tps-thumb-size);
  border-radius: var(--tps-radius-circle);
  background: var(--tps-accent);
  border: 2px solid var(--tps-slider-thumb-border);
  box-shadow: var(--tps-shadow-thumb);
  cursor: grab;
  margin-top: -5px;
}

.tps-slider-input::-moz-range-thumb {
  width: var(--tps-thumb-size);
  height: var(--tps-thumb-size);
  border-radius: var(--tps-radius-circle);
  background: var(--tps-accent);
  border: 2px solid var(--tps-slider-thumb-border);
  box-shadow: var(--tps-shadow-thumb);
  cursor: grab;
}

.tps-slider-input:active::-webkit-slider-thumb {
  cursor: grabbing;
}

/* Hue picker keeps its gradient track; only style the thumb. */
.tps-panel input[type="range"].plg-collection-colors__hue {
  width: 100%;
  height: 10px;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.tps-panel input[type="range"].plg-collection-colors__hue::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: var(--tps-radius-circle);
  background: var(--panel-bg-color, var(--tps-panel-bg, currentColor));
  border: 2px solid var(--tps-slider-thumb-border);
  box-shadow: var(--tps-shadow-thumb);
  cursor: grab;
}

.tps-panel input[type="range"].plg-collection-colors__hue::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: var(--tps-radius-circle);
  background: var(--panel-bg-color, var(--tps-panel-bg, currentColor));
  border: 2px solid var(--tps-slider-thumb-border);
  box-shadow: var(--tps-shadow-thumb);
  cursor: grab;
}

.tps-slider-value {
  font-family: var(--tps-font-mono);
  font-size: var(--tps-fs-value);
  color: var(--tps-text);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* \u2500\u2500 Swatch + grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--tps-swatch-size));
  gap: var(--tps-space-2) 6px;
}

.tps-swatch {
  width: var(--tps-swatch-size);
  height: var(--tps-swatch-size);
  border-radius: var(--tps-radius-circle);
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  box-shadow: inset 0 0 0 1px var(--tps-swatch-inset);
  transition: transform var(--tps-dur-fast) var(--tps-ease-out),
              box-shadow var(--tps-dur-fast) var(--tps-ease-out);
}

.tps-swatch:hover {
  transform: scale(1.1);
}

.tps-swatch[aria-pressed="true"] {
  box-shadow: 0 0 0 2px var(--tps-accent);
}

/* \u2500\u2500 List rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-list {
  display: flex;
  flex-direction: column;
}

.tps-list-header {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: var(--tps-space-3);
  padding: var(--tps-space-2) var(--tps-space-3);
  border-bottom: 1px solid var(--tps-divider);
  font-size: var(--tps-fs-list-header);
  font-weight: var(--tps-fw-bold);
  letter-spacing: var(--tps-ls-list);
  text-transform: uppercase;
  color: var(--tps-text-faint);
}

.tps-list-row {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: var(--tps-space-3);
  padding: var(--tps-space-2) var(--tps-space-3);
  border-bottom: 1px solid var(--tps-divider);
  transition: background-color var(--tps-dur-fast) var(--tps-ease-out);
}

.tps-list-row:last-child {
  border-bottom: 0;
}

.tps-list-row:hover {
  background: var(--tps-bg-hover);
}

.tps-list-name {
  font-size: var(--tps-fs-label);
  color: var(--tps-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* \u2500\u2500 Tabs / segmented control \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-tabs {
  display: inline-flex;
  align-items: center;
  gap: var(--tps-space-1);
  padding: 0;
}

.tps-tab {
  height: var(--tps-control-h-sm);
  padding: 0 var(--tps-space-2);
  font-family: inherit;
  font-size: var(--tps-fs-button);
  font-weight: var(--tps-fw-medium);
  color: var(--tps-text-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--tps-radius-sm);
  cursor: pointer;
  transition: background-color var(--tps-dur-fast) var(--tps-ease-out),
              border-color var(--tps-dur-fast) var(--tps-ease-out),
              color var(--tps-dur-fast) var(--tps-ease-out);
}

.tps-tab:hover {
  background: var(--tps-bg-hover);
  color: var(--tps-text);
}

.tps-tab[aria-pressed="true"],
.tps-tab[aria-selected="true"] {
  background: var(--tps-accent-soft);
  color: var(--tps-accent);
  border-color: color-mix(in srgb, var(--tps-accent) 50%, transparent);
}

/* \u2500\u2500 Buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--tps-space-1);
  height: var(--tps-control-h-sm);
  padding: 0 var(--tps-space-3);
  font-family: inherit;
  font-size: var(--tps-fs-button);
  font-weight: var(--tps-fw-medium);
  border-radius: var(--tps-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color var(--tps-dur-fast) var(--tps-ease-out),
              border-color var(--tps-dur-fast) var(--tps-ease-out),
              color var(--tps-dur-fast) var(--tps-ease-out);
}

.tps-button--md { height: var(--tps-control-h-md); padding: 0 var(--tps-space-4); }

.tps-button--primary {
  background: var(--tps-accent);
  color: var(--tps-on-accent);
}

.tps-button--primary:hover {
  filter: brightness(1.08);
}

.tps-button--ghost {
  background: transparent;
  border-color: var(--tps-divider);
  color: var(--tps-text);
}

.tps-button--ghost:hover {
  background: var(--tps-bg-hover);
  border-color: var(--tps-border);
}

.tps-button--danger {
  background: transparent;
  border-color: var(--tps-divider);
  color: var(--tps-text-muted);
}

.tps-button--danger:hover {
  background: var(--tps-danger-soft);
  border-color: color-mix(in srgb, var(--tps-danger) 40%, transparent);
  color: var(--tps-danger);
}

/* \u2500\u2500 Focus rings (custom controls only \u2014 native inputs use accent-color) \u2500 */

.tps-tab:focus-visible,
.tps-button:focus-visible,
.tps-num-step:focus-visible,
.tps-num-reset:focus-visible,
.tps-swatch:focus-visible {
  outline: 2px solid var(--tps-accent);
  outline-offset: 2px;
}

/* \u2500\u2500 Inset card variant (rare \u2014 for palette-picker body, etc.) \u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.tps-card {
  padding: var(--tps-space-3);
  border-radius: var(--tps-radius-lg);
  background: var(--tps-bg-input);
  border: 1px solid var(--tps-divider);
}
`;

  // ../../shared/settings-ui/color-field.css
  var color_field_default = `/*
 * colorField \u2014 shared color picker (Theme | Tailwind | Custom).
 * Scoped under .tps-panel .tps-color-field; styled through --tps-* tokens.
 * Every selectable swatch is the same .tps-cf-dot across all three tabs.
 */

.tps-panel .tps-color-field { display: block; }

/* \u2500\u2500 Tabs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-tabs {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px;
  background: var(--tps-bg-input, rgba(127,127,127,0.06));
  border: 1px solid var(--tps-border, rgba(127,127,127,0.14));
  border-radius: var(--tps-radius-md, 8px);
  padding: 4px; margin-bottom: var(--tps-space-3, 12px);
}
.tps-panel .tps-cf-tab {
  cursor: pointer; border: 0; background: transparent;
  border-radius: var(--tps-radius-sm, 6px); padding: 8px 10px; font: inherit;
  font-size: var(--tps-fs-body, 13px); font-weight: var(--tps-fw-semibold, 600);
  color: var(--tps-text-muted, rgba(127,127,127,0.75));
  transition: background var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease),
              color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease);
}
.tps-panel .tps-cf-tab:hover { color: var(--tps-text, inherit); }
.tps-panel .tps-cf-tab.is-active {
  background: var(--tps-panel-bg, var(--bg-default, #fff));
  color: var(--tps-text, inherit); box-shadow: 0 1px 2px rgba(0,0,0,0.12);
}

/* \u2500\u2500 Panes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-pane { display: none; }
.tps-panel .tps-cf-pane.is-active { display: block; }

/* \u2500\u2500 Featured theme picks \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-featured {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  margin-bottom: var(--tps-space-3, 12px);
}
.tps-panel .tps-cf-tile {
  display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; cursor: pointer;
  background: var(--tps-bg-hover, rgba(127,127,127,0.04));
  border: 1px solid var(--tps-border, rgba(127,127,127,0.14));
  border-radius: var(--tps-radius-md, 8px); padding: 10px 12px; color: var(--tps-text, inherit);
  transition: border-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease),
              background var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease);
}
.tps-panel .tps-cf-tile:hover { border-color: var(--tps-border-strong, rgba(127,127,127,0.28)); }
.tps-panel .tps-cf-tile.is-sel {
  border-color: var(--tps-accent, currentColor);
  background: var(--tps-accent-soft, rgba(127,127,127,0.08));
}
.tps-panel .tps-cf-tile-dot {
  width: 22px; height: 22px; flex: 0 0 auto; border-radius: var(--tps-radius-sm, 6px);
  box-shadow: inset 0 0 0 1px var(--tps-swatch-inset, rgba(127,127,127,0.18));
}
.tps-panel .tps-cf-tile-label {
  font-size: var(--tps-fs-body, 13px); font-weight: var(--tps-fw-semibold, 600);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* \u2500\u2500 Groups + the universal swatch dot \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-group { margin-bottom: var(--tps-space-3, 12px); }
.tps-panel .tps-cf-group-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: var(--tps-space-2, 8px); }
.tps-panel .tps-cf-group-label {
  font-size: var(--tps-fs-section, 11px); letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--tps-text-faint, var(--tps-text-muted, rgba(127,127,127,0.6))); font-weight: var(--tps-fw-semibold, 600);
}
.tps-panel .tps-cf-group-hint { font-size: var(--tps-fs-section, 11px); color: var(--tps-text-faint, rgba(127,127,127,0.5)); }

/* \u2500\u2500 Swatches: square dots that fill the row width (22 across in the Tailwind
 *    hue row); every swatch elsewhere matches that width. \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-dots {
  display: grid; grid-template-columns: repeat(22, minmax(0, 1fr)); gap: 5px;
  /* explicit resets so a stale accumulated .tps-cf-dots rule (old edge-to-edge
   * build injected an inset-ring outline) can't linger after a plugin reload. */
  border: 0; border-radius: 0; overflow: visible; box-shadow: none; background: none; padding: 0;
}
.tps-panel .tps-cf-dot {
  aspect-ratio: 1 / 1; min-width: 0; width: 100%; height: auto; border: 0; padding: 0; margin: 0;
  cursor: pointer; position: relative;
  border-radius: var(--tps-radius-sm, 6px);
  box-shadow: inset 0 0 0 1px var(--tps-swatch-inset, rgba(127,127,127,0.18));
  transition: transform var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease),
              box-shadow var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease);
}
.tps-panel .tps-cf-dot:hover { transform: scale(1.12); z-index: 3; }
.tps-panel .tps-cf-dot:focus-visible,
.tps-panel .tps-cf-dot.is-sel,
.tps-panel .tps-cf-dot.is-active {
  outline: none; z-index: 4;
  box-shadow: inset 0 0 0 1px var(--tps-swatch-inset, rgba(127,127,127,0.18)),
              0 0 0 2px var(--tps-panel-bg, #fff), 0 0 0 4px var(--tps-accent, currentColor);
}

/* \u2500\u2500 Lightness "tints": full-width ramp, shade number inside (do not touch) \u2500 */
.tps-panel .tps-cf-ramp {
  display: grid; grid-template-columns: repeat(11, minmax(0, 1fr));
  border-radius: var(--tps-radius-md, 8px); overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--tps-border, rgba(127,127,127,0.14));
}
.tps-panel .tps-cf-ramp-cell {
  border: 0; padding: 0; cursor: pointer; height: 30px; position: relative;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: var(--tps-fw-semibold, 600); font-variant-numeric: tabular-nums; letter-spacing: -0.02em;
  transition: box-shadow var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease);
}
.tps-panel .tps-cf-ramp-cell:hover { z-index: 3; box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--tps-panel-bg, #fff) 60%, transparent); }
.tps-panel .tps-cf-ramp-cell:focus-visible,
.tps-panel .tps-cf-ramp-cell.is-sel {
  outline: none; z-index: 4;
  box-shadow: inset 0 0 0 2px var(--tps-panel-bg, #fff), inset 0 0 0 4px var(--tps-accent, currentColor);
}
/* Faint secondary ring on the inverted ("invert lightness") mirror shade \u2014
   present alongside the prominent ring on the actually-selected shade. */
.tps-panel .tps-cf-ramp-cell.is-sel-mirror {
  z-index: 3;
  box-shadow: inset 0 0 0 2px var(--tps-panel-bg, #fff),
              inset 0 0 0 3px color-mix(in srgb, var(--tps-accent, currentColor) 42%, transparent);
}

/* \u2500\u2500 Invert-lightness toggle \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-invert {
  display: flex; align-items: center; gap: 8px; margin-top: var(--tps-space-3, 12px);
  cursor: pointer; font-size: var(--tps-fs-hint, 12px); color: var(--tps-text, inherit); font-weight: var(--tps-fw-medium, 500);
}
.tps-panel .tps-cf-invert-cb { margin: 0; cursor: pointer; accent-color: var(--tps-accent, currentColor); }
.tps-panel .tps-cf-invert-hint { color: var(--tps-text-faint, rgba(127,127,127,0.5)); font-weight: var(--tps-fw-regular, 400); }
/* Dimmed + non-interactive until a real, non-500 shade is picked (500 mirrors
   to itself, so inverting it is a no-op). */
.tps-panel .tps-cf-invert.is-disabled { opacity: 0.42; cursor: default; }
.tps-panel .tps-cf-invert.is-disabled .tps-cf-invert-cb { cursor: default; }

/* \u2500\u2500 Custom palette \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-custom-row { min-height: 30px; margin-bottom: var(--tps-space-3, 12px); }
.tps-panel .tps-cf-custom-empty {
  grid-column: 1 / -1; display: flex; align-items: center; padding: 0 10px; min-height: 30px;
  font-size: var(--tps-fs-hint, 12px); font-weight: var(--tps-fw-regular, 400); letter-spacing: 0;
  color: var(--tps-text-faint, rgba(127,127,127,0.55));
}
.tps-panel .tps-cf-custom-dot { cursor: grab; }
.tps-panel .tps-cf-custom-dot.is-dragging { opacity: 0.4; cursor: grabbing; }

.tps-panel .tps-cf-addrow { display: flex; align-items: center; gap: 8px; }
.tps-panel .tps-cf-remove {
  cursor: pointer; border: 1px solid var(--tps-border, rgba(127,127,127,0.14));
  background: var(--tps-bg-input, rgba(127,127,127,0.06)); color: var(--tps-text-muted, rgba(127,127,127,0.75));
  border-radius: var(--tps-radius-md, 8px); height: 32px; padding: 0 14px; font: inherit;
  font-size: var(--tps-fs-hint, 12px); font-weight: var(--tps-fw-medium, 500);
}
.tps-panel .tps-cf-remove[hidden] { display: none; }
.tps-panel .tps-cf-remove:hover { border-color: var(--tps-border-strong, rgba(127,127,127,0.28)); color: var(--tps-text, inherit); }
.tps-panel .tps-cf-add {
  cursor: pointer; border: 1px solid var(--tps-border, rgba(127,127,127,0.14));
  background: var(--tps-bg-input, rgba(127,127,127,0.06)); color: var(--tps-text, inherit);
  border-radius: var(--tps-radius-md, 8px); height: 32px; padding: 0 14px; font: inherit;
  font-size: var(--tps-fs-hint, 12px); font-weight: var(--tps-fw-semibold, 600);
}
.tps-panel .tps-cf-add:hover { border-color: var(--tps-border-strong, rgba(127,127,127,0.28)); }
.tps-panel .tps-cf-custom-count {
  margin-left: auto; font-size: var(--tps-fs-section, 11px);
  color: var(--tps-text-faint, rgba(127,127,127,0.5)); font-variant-numeric: tabular-nums;
}

/* \u2500\u2500 Hex input \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-hexbox {
  display: inline-flex; align-items: center; gap: 8px; box-sizing: border-box; height: 32px;
  background: var(--tps-bg-input, rgba(127,127,127,0.06));
  border: 1px solid var(--tps-border, rgba(127,127,127,0.14));
  border-radius: var(--tps-radius-md, 8px); padding: 0 8px 0 10px;
}
.tps-panel .tps-cf-hex-dot {
  width: 15px; height: 15px; border-radius: var(--tps-radius-sm, 5px);
  box-shadow: inset 0 0 0 1px var(--tps-swatch-inset, rgba(127,127,127,0.22));
}
.tps-panel .tps-cf-hex-input {
  border: 0; background: transparent; outline: none;
  font-family: var(--tps-font-mono, ui-monospace, monospace);
  font-size: var(--tps-fs-hint, 12px); color: var(--tps-text, inherit); width: 84px;
  font-variant-numeric: tabular-nums;
}
.tps-panel .tps-cf-hex-input::placeholder { color: var(--tps-text-faint, rgba(127,127,127,0.5)); }

/* \u2500\u2500 Universal: No color \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.tps-panel .tps-cf-divider {
  height: 1px; margin: var(--tps-space-3, 12px) 0; background: var(--tps-divider, rgba(127,127,127,0.12));
}
.tps-panel .tps-cf-universal { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.tps-panel .tps-cf-none {
  display: inline-flex; align-items: center; gap: 7px; cursor: pointer; box-sizing: border-box; height: 32px;
  background: var(--tps-bg-input, rgba(127,127,127,0.06));
  border: 1px solid var(--tps-border, rgba(127,127,127,0.14));
  border-radius: var(--tps-radius-md, 8px); padding: 0 12px; font: inherit;
  font-size: var(--tps-fs-hint, 12px); font-weight: var(--tps-fw-medium, 500);
  color: var(--tps-text-muted, rgba(127,127,127,0.7));
}
.tps-panel .tps-cf-none:hover { border-color: var(--tps-border-strong, rgba(127,127,127,0.28)); color: var(--tps-text, inherit); }
.tps-panel .tps-cf-none.is-sel { border-color: var(--tps-accent, currentColor); color: var(--tps-text, inherit); }
.tps-panel .tps-cf-none-sw {
  width: 15px; height: 15px; border-radius: 50%; position: relative; overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--tps-border-strong, rgba(127,127,127,0.3));
}
.tps-panel .tps-cf-none-sw::after {
  content: ""; position: absolute; left: 50%; top: -3px; width: 1.5px; height: 21px;
  background: var(--tps-danger, #e2555f); transform: rotate(45deg);
}

/* \u2500\u2500 Instant tooltip (drawn by the component, not native title delay) \u2500\u2500\u2500 */
.tps-panel .tps-cf-tip {
  position: fixed; z-index: 2147483000; transform: translate(-50%, calc(-100% - 8px));
  padding: 3px 8px; border-radius: var(--tps-radius-sm, 5px);
  background: var(--tps-text, #1a1a1a); color: var(--tps-panel-bg, #fff);
  font-size: var(--tps-fs-section, 11px); font-weight: var(--tps-fw-medium, 500);
  line-height: 1.3; white-space: nowrap; pointer-events: none; opacity: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
}
.tps-panel .tps-cf-tip.is-visible { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .tps-panel .tps-cf-dot,
  .tps-panel .tps-cf-tab,
  .tps-panel .tps-cf-tile,
  .tps-panel .tps-cf-remove { transition: none; }
}
`;

  // ../../shared/settings-ui/feedback.js
  var MAX_URL_LENGTH = 7600;
  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    const dom = (
      /** @type {any} */
      node
    );
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === "class") node.className = v;
        else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k in dom && typeof dom[k] !== "function") {
          try {
            dom[k] = v;
          } catch {
            node.setAttribute(k, v);
          }
        } else node.setAttribute(k, v === true ? "" : String(v));
      }
    }
    for (const c of children.flat(Infinity)) {
      if (c == null || c === false) continue;
      node.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }
  __name(el, "el");
  function versionFromConf(conf) {
    if (!conf || typeof conf !== "object") return "";
    if (typeof conf.version === "string" && conf.version) return conf.version;
    const custom = conf.custom;
    if (custom && typeof custom === "object") {
      const v = (
        /** @type {Record<string, unknown>} */
        custom.pluginVersion
      );
      if (typeof v === "string") return v;
    }
    return "";
  }
  __name(versionFromConf, "versionFromConf");
  async function collectSystemReport({ pluginName = "", pluginVersion = "", disabled = false, data } = {}) {
    const ua = navigator.userAgent || "";
    const lines = [];
    lines.push(`Plugin: ${pluginName} v${pluginVersion}${disabled ? " (kill switch: OFF)" : ""}`);
    lines.push(`App: ${/electron/i.test(ua) ? "Thymer desktop app (Electron)" : "Thymer web"}${location && location.host ? ` \xB7 ${location.host}` : ""}`);
    lines.push(`UA: ${ua}`);
    lines.push(`Platform: ${navigator.platform || "?"} \xB7 lang ${navigator.language || "?"} \xB7 tz ${Intl.DateTimeFormat().resolvedOptions().timeZone || "?"}`);
    const dpr = Math.round((window.devicePixelRatio || 1) * 100) / 100;
    lines.push(`Screen (css px): ${screen.width}x${screen.height} @${dpr}x (\u2248${Math.round(screen.width * dpr)}x${Math.round(screen.height * dpr)} device px) \xB7 viewport ${window.innerWidth}x${window.innerHeight}`);
    try {
      const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const themeClasses = Array.from(document.body.classList).filter((c) => /theme/i.test(c)).join(" ");
      lines.push(`Appearance: ${dark ? "dark" : "light"}${reducedMotion ? " \xB7 reduced-motion" : ""}${themeClasses ? ` \xB7 body: ${themeClasses}` : ""}`);
    } catch {
    }
    try {
      const bits = [];
      if (navigator.hardwareConcurrency) bits.push(`${navigator.hardwareConcurrency} cores`);
      const devMem = (
        /** @type {any} */
        navigator.deviceMemory
      );
      if (devMem) bits.push(devMem >= 8 ? `RAM \u22658GB (API cap)` : `~${devMem}GB RAM`);
      const heap = (
        /** @type {any} */
        performance.memory
      );
      if (heap && heap.usedJSHeapSize) bits.push(`JS heap ${Math.round(heap.usedJSHeapSize / 1048576)}MB of ${Math.round(heap.jsHeapSizeLimit / 1048576)}MB limit`);
      bits.push(navigator.onLine === false ? "OFFLINE" : "online");
      if (typeof performance.now === "function") bits.push(`session up ${Math.round(performance.now() / 6e4)}m`);
      lines.push(`System: ${bits.join(" \xB7 ")}`);
    } catch {
    }
    try {
      if (navigator.storage && typeof navigator.storage.estimate === "function") {
        const est = await navigator.storage.estimate();
        if (est && est.usage != null) {
          lines.push(`Storage: ${Math.round((est.usage || 0) / 1048576)}MB used${est.quota ? ` of ${Math.round(est.quota / 1048576)}MB quota` : ""}`);
        }
      }
    } catch {
    }
    try {
      if (data && typeof data.getAllGlobalPlugins === "function") {
        const plugins = await data.getAllGlobalPlugins();
        const listed = plugins.slice(0, 25).map((p) => {
          let name = "";
          let ver = "";
          try {
            name = p.getName?.() || "";
          } catch {
          }
          try {
            ver = versionFromConf(p.getConfiguration?.());
          } catch {
          }
          return ver ? `${name} v${ver}` : name;
        }).filter(Boolean);
        if (listed.length) {
          lines.push(`Global plugins, all installed (${plugins.length}): ${listed.join(", ")}${plugins.length > 25 ? ", \u2026" : ""}`);
        }
      }
      if (data && typeof /** @type {any} */
      data.getAllCollections === "function") {
        const collections = await /** @type {any} */
        data.getAllCollections();
        if (Array.isArray(collections)) lines.push(`Collection-level plugins: ${collections.length} (names withheld)`);
      }
    } catch {
    }
    return lines.join("\n");
  }
  __name(collectSystemReport, "collectSystemReport");
  function buildIssueUrl({ repository, description, discord, email, report }) {
    const repo = repository.replace(/\/+$/, "");
    const firstLine = description.split("\n")[0].trim();
    const title = `[bug] ${firstLine.length > 60 ? `${firstLine.slice(0, 57)}...` : firstLine}`;
    const bodyFor = /* @__PURE__ */ __name((desc2) => {
      const parts = [`**Describe the bug**

${desc2}`];
      if (discord || email) {
        const contact = [];
        if (discord) contact.push(`- Discord: ${discord}`);
        if (email) contact.push(`- Email: ${email}`);
        parts.push(`**Contact**

${contact.join("\n")}`);
      }
      parts.push(`**System report**

\`\`\`
${report}
\`\`\``);
      parts.push("_Screenshots: paste or drag images directly into this text box._");
      return parts.join("\n\n");
    }, "bodyFor");
    const urlFor = /* @__PURE__ */ __name((desc2) => `${repo}/issues/new?${new URLSearchParams({ title, body: bodyFor(desc2) })}`, "urlFor");
    let desc = description;
    let url = urlFor(desc);
    while (url.length > MAX_URL_LENGTH && desc.length > 200) {
      desc = `${desc.slice(0, Math.max(200, desc.length - 500)).trimEnd()}

[description truncated \u2014 URL length limit]`;
      url = urlFor(desc);
    }
    return url;
  }
  __name(buildIssueUrl, "buildIssueUrl");
  function openFeedbackDialog({ host, opener, pluginName = "", pluginVersion = "", repository = "", disabled = false, data } = {}) {
    const panelHost = host || /** @type {HTMLElement | null} */
    (opener ? opener.closest(".tps-panel") : null);
    if (!panelHost || !repository) return;
    if (panelHost.querySelector(".tps-feedback-overlay")) return;
    const reportPromise = collectSystemReport({ pluginName, pluginVersion, disabled, data });
    const discordInput = el("input", { class: "tps-feedback-input", type: "text", placeholder: "e.g. akaready", autocomplete: "off", spellcheck: "false" });
    const emailInput = el("input", { class: "tps-feedback-input", type: "email", placeholder: "e.g. you@example.com", autocomplete: "off", spellcheck: "false" });
    const descInput = el("textarea", { class: "tps-feedback-textarea", rows: "5", placeholder: "What happened? What did you expect instead?" });
    const reportPre = el("pre", { class: "tps-feedback-report" }, "Collecting\u2026");
    reportPromise.then((text) => {
      reportPre.textContent = text;
    }).catch(() => {
      reportPre.textContent = "Report unavailable.";
    });
    const fieldRow = /* @__PURE__ */ __name((label, field, extraClass) => el(
      "label",
      { class: `tps-feedback-field${extraClass ? ` ${extraClass}` : ""}` },
      el("span", { class: "tps-feedback-label" }, label),
      field
    ), "fieldRow");
    const prevOverflow = panelHost.style.overflow;
    const close = /* @__PURE__ */ __name(() => {
      overlay.remove();
      panelHost.style.overflow = prevOverflow;
      try {
        opener?.focus();
      } catch {
      }
    }, "close");
    const submit = /* @__PURE__ */ __name(async () => {
      const description = descInput.value.trim();
      if (!description) {
        descInput.setAttribute("aria-invalid", "true");
        descInput.focus();
        return;
      }
      let report = "";
      try {
        report = await reportPromise;
      } catch {
      }
      const url = buildIssueUrl({
        repository,
        description,
        discord: discordInput.value.trim(),
        email: emailInput.value.trim(),
        report
      });
      window.open(url, "_blank", "noopener");
      close();
    }, "submit");
    const card = el(
      "div",
      { class: "tps-feedback-card", role: "dialog", "aria-modal": "true", "aria-label": `Report a bug in ${pluginName}` },
      el(
        "div",
        { class: "tps-feedback-head" },
        el("h2", { class: "tps-feedback-title" }, "Report a bug"),
        el(
          "button",
          { type: "button", class: "tps-feedback-close", "aria-label": "Close", onClick: close },
          el("i", { class: "ti ti-x", "aria-hidden": "true" })
        )
      ),
      // Fixed short copy — no variable repo name, so each line stays on one line.
      el(
        "p",
        { class: "tps-feedback-hint" },
        "Opens a prefilled GitHub issue on the repo.",
        el("br"),
        "Please add relevant screenshots to the GitHub issue."
      ),
      fieldRow("Discord username (optional)", discordInput),
      fieldRow("Email (optional)", emailInput),
      fieldRow("What happened?", descInput, "tps-feedback-field--grow"),
      el(
        "details",
        { class: "tps-feedback-details" },
        el("summary", { class: "tps-feedback-summary" }, "System report (included with the issue)"),
        reportPre
      ),
      el(
        "div",
        { class: "tps-feedback-actions" },
        el("button", { type: "button", class: "tps-button tps-button--ghost", onClick: close }, "Cancel"),
        el("button", { type: "button", class: "tps-button tps-button--primary", onClick: submit }, "Open GitHub issue")
      )
    );
    const overlay = el("div", { class: "tps-feedback-overlay" }, card);
    overlay.addEventListener("mousedown", (e) => {
      if (e.target === overlay) close();
    });
    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    });
    descInput.addEventListener("input", () => descInput.removeAttribute("aria-invalid"));
    panelHost.style.overflow = "hidden";
    overlay.style.top = `${panelHost.scrollTop}px`;
    overlay.style.height = `${panelHost.clientHeight}px`;
    panelHost.appendChild(overlay);
    descInput.focus();
  }
  __name(openFeedbackDialog, "openFeedbackDialog");

  // ../../shared/settings-ui/helpers.js
  var PANEL_CSS = tokens_default + "\n" + components_default + "\n" + color_field_default;
  function h(tag, props, ...children) {
    const el2 = document.createElement(tag);
    const dom = (
      /** @type {any} */
      el2
    );
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === "class" || k === "className") {
          el2.className = v;
        } else if (k === "style" && typeof v === "object") {
          Object.assign(el2.style, v);
        } else if (k === "dataset" && typeof v === "object") {
          for (const dk in v) el2.dataset[dk] = v[dk];
        } else if (k.startsWith("on") && typeof v === "function") {
          el2.addEventListener(k.slice(2).toLowerCase(), v);
        } else if (k in dom && typeof dom[k] !== "function") {
          try {
            dom[k] = v;
          } catch {
            el2.setAttribute(k, v);
          }
        } else {
          el2.setAttribute(k, v === true ? "" : String(v));
        }
      }
    }
    appendChildren(el2, children);
    return el2;
  }
  __name(h, "h");
  function appendChildren(parent, children) {
    for (const c of children) {
      if (c == null || c === false) continue;
      if (Array.isArray(c)) {
        appendChildren(parent, c);
        continue;
      }
      parent.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
  }
  __name(appendChildren, "appendChildren");
  function panel({ pluginClass } = {}, children = []) {
    const cls = ["tps-panel", pluginClass].filter(Boolean).join(" ");
    return h("div", { class: cls }, ...children);
  }
  __name(panel, "panel");
  function pluginHeader({
    title: heading,
    lede: ledeText,
    helper,
    helperOpen,
    helperDefaultOpen = false,
    onHelperToggle,
    icon = "",
    version = "1.0",
    author = "@akaready",
    homepage = "https://akaready.com",
    repository = "https://github.com/akaready",
    coffee = "https://buymeacoffee.com/akaready",
    killSwitch = null,
    feedback = null,
    scope = null
  }) {
    const iconClass = icon ? icon.startsWith("ti-") ? icon : `ti-${icon}` : "";
    const helperLines = normalizeHelperLines(helper);
    const fb = feedback ? {
      pluginName: (feedback === true ? "" : feedback.pluginName) || heading,
      pluginVersion: (feedback === true ? "" : feedback.pluginVersion) || version,
      repository: (feedback === true ? "" : feedback.repository) || repository,
      disabled: (feedback === true ? void 0 : feedback.disabled) ?? (killSwitch ? !killSwitch.on : false),
      data: feedback === true ? void 0 : feedback.data
    } : null;
    const children = [
      iconClass ? h(
        "div",
        { class: "tps-plugin-header-logo", "aria-hidden": "true" },
        h("i", { class: `ti ${iconClass} tps-plugin-header-logo-icon`, "aria-hidden": "true" })
      ) : null,
      h("h1", { class: "tps-plugin-header-title" }, heading),
      ledeText ? h("p", { class: "tps-plugin-header-lede" }, ledeText) : null,
      helperLines.length ? renderPluginHeaderHelper({
        lines: helperLines,
        defaultOpen: helperDefaultOpen,
        open: helperOpen,
        onToggle: onHelperToggle
      }) : null,
      h(
        "p",
        { class: "tps-plugin-header-attr" },
        h(
          "span",
          { class: "tps-plugin-header-link-group" },
          h("i", { class: "ti ti-link tps-plugin-header-icon", "aria-hidden": "true" }),
          h("a", {
            class: "tps-plugin-header-link tps-plugin-header-link--blue",
            href: homepage,
            target: "_blank",
            rel: "noopener noreferrer"
          }, author)
        ),
        h(
          "span",
          { class: "tps-plugin-header-link-group" },
          h("i", { class: "ti ti-coffee tps-plugin-header-icon", "aria-hidden": "true" }),
          h("a", {
            class: "tps-plugin-header-link tps-plugin-header-link--pink",
            href: coffee,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "buy me a coffee")
        ),
        version ? h(
          "span",
          { class: "tps-plugin-header-link-group" },
          h("span", { class: "tps-plugin-header-icon tps-plugin-header-iconify tps-plugin-header-iconify-github", "aria-hidden": "true" }),
          h("a", { class: "tps-plugin-header-link tps-plugin-header-link--muted tps-plugin-header-version", href: repository, target: "_blank", rel: "noopener noreferrer" }, `v${version}`)
        ) : null,
        // Bug report sits with the attribution links (right of the version);
        // the far-right corner is reserved for state toggles (scope pill,
        // kill switch).
        fb ? renderFeedbackButton(fb) : null,
        killSwitch || scope ? h(
          "span",
          { class: "tps-plugin-header-controls" },
          scope ? scopeCluster(scope) : null,
          killSwitch ? renderKillSwitch(killSwitch) : null
        ) : null
      ),
      // Always rendered with a kill switch; CSS shows it only while the pill is
      // off, so it appears instantly on the optimistic flip with no re-render.
      killSwitch ? h(
        "p",
        { class: "tps-plugin-header-off-note" },
        "Plugin is off \u2014 settings stay editable and your changes apply when you switch it back on."
      ) : null
    ];
    return h("div", { class: "tps-plugin-header" }, ...children);
  }
  __name(pluginHeader, "pluginHeader");
  var SCOPE_SVG_NS = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  function scopeSvgIcon(paths) {
    const wrap = h("span", { class: "tps-scope-svg", "aria-hidden": "true" });
    wrap.innerHTML = `${SCOPE_SVG_NS}${paths}</svg>`;
    return wrap;
  }
  __name(scopeSvgIcon, "scopeSvgIcon");
  function scopeCluster(scope) {
    if (scope.localUnavailable) {
      return h(
        "span",
        { class: "tps-scope" },
        h(
          "span",
          {
            class: "tps-scope-pill tooltip",
            "data-local-unavailable": "true",
            "data-tooltip": "This device can't store settings locally, so they're saved to all devices instead.",
            "data-tooltip-dir": "top"
          },
          h("span", { class: "tps-scope-dot", "aria-hidden": "true" }),
          "All devices (no local storage)"
        )
      );
    }
    const pill = h(
      "span",
      {
        class: "tps-scope-pill tooltip",
        "data-diverged": String(!!scope.diverged),
        "data-tooltip": scope.diverged ? "These settings currently apply to this device only" : "Settings are synced \u2014 changes here start as this-device-only",
        "data-tooltip-dir": "top"
      },
      h("span", { class: "tps-scope-dot", "aria-hidden": "true" }),
      scope.diverged ? "This device" : "All devices"
    );
    if (!scope.diverged) {
      return h("span", { class: "tps-scope" }, pill);
    }
    const push = h("button", {
      type: "button",
      class: "tps-scope-btn tps-scope-btn--push tooltip",
      "data-tooltip": "Apply these settings to all devices",
      "data-tooltip-dir": "top",
      "aria-label": "Apply these settings to all devices",
      onClick: /* @__PURE__ */ __name((e) => {
        const btn = (
          /** @type {HTMLButtonElement} */
          e.currentTarget
        );
        if (btn.disabled) return;
        btn.disabled = true;
        try {
          scope.onPush();
        } catch {
          btn.disabled = false;
        }
      }, "onClick")
    }, scopeSvgIcon('<path d="M12 5v14"/><path d="M18 11l-6-6"/><path d="M6 11l6-6"/>'));
    let disarmTimer = 0;
    const discard = h("button", {
      type: "button",
      class: "tps-scope-btn tps-scope-btn--discard tooltip",
      "data-tooltip": "Discard device changes \u2014 revert to synced settings",
      "data-tooltip-dir": "top",
      "aria-label": "Discard device changes",
      onClick: /* @__PURE__ */ __name((e) => {
        const btn = (
          /** @type {HTMLButtonElement} */
          e.currentTarget
        );
        if (btn.getAttribute("data-armed") !== "true") {
          btn.setAttribute("data-armed", "true");
          btn.setAttribute("data-tooltip", "Tap again to discard device changes");
          clearTimeout(disarmTimer);
          disarmTimer = window.setTimeout(() => {
            btn.removeAttribute("data-armed");
            btn.setAttribute("data-tooltip", "Discard device changes \u2014 revert to synced settings");
          }, 3e3);
          return;
        }
        clearTimeout(disarmTimer);
        try {
          scope.onDiscard();
        } catch {
        }
      }, "onClick")
    }, scopeSvgIcon('<path d="M9 14L5 10l4-4"/><path d="M5 10h11a4 4 0 1 1 0 8h-1"/>'));
    return h("span", { class: "tps-scope" }, pill, push, discard);
  }
  __name(scopeCluster, "scopeCluster");
  function renderFeedbackButton(fb) {
    return h("button", {
      type: "button",
      class: "tps-plugin-header-bug",
      title: "Report a bug",
      "aria-label": "Report a bug",
      onClick: /* @__PURE__ */ __name((e) => {
        const btn = (
          /** @type {HTMLElement} */
          e.currentTarget
        );
        openFeedbackDialog({
          host: (
            /** @type {HTMLElement | null} */
            btn.closest(".tps-panel")
          ),
          opener: btn,
          ...fb
        });
      }, "onClick")
    }, h("i", { class: "ti ti-bug", "aria-hidden": "true" }));
  }
  __name(renderFeedbackButton, "renderFeedbackButton");
  function renderKillSwitch(killSwitch) {
    const sw = h("button", {
      type: "button",
      class: "tps-switch",
      role: "switch",
      "aria-checked": String(!!killSwitch.on),
      "aria-label": killSwitch.label || "Plugin enabled",
      title: killSwitch.on ? "Plugin enabled \u2014 click to disable all of its effects" : "Plugin disabled \u2014 click to re-enable"
    }, h("span", { class: "tps-switch-knob" }));
    const unlock = /* @__PURE__ */ __name(() => {
      sw.removeAttribute("data-busy");
      sw.disabled = false;
    }, "unlock");
    sw.addEventListener("click", () => {
      if (sw.disabled) return;
      const nextOn = sw.getAttribute("aria-checked") !== "true";
      sw.setAttribute("aria-checked", String(nextOn));
      sw.setAttribute("data-busy", "");
      sw.disabled = true;
      setTimeout(unlock, 700);
      try {
        killSwitch.onToggle(nextOn);
      } catch {
        unlock();
        sw.setAttribute("aria-checked", String(!nextOn));
      }
    });
    return sw;
  }
  __name(renderKillSwitch, "renderKillSwitch");
  function normalizeHelperLines(helper) {
    if (!helper) return [];
    if (typeof helper === "string") {
      const text = helper.trim();
      return text ? [text] : [];
    }
    if (Array.isArray(helper)) {
      return helper.map((line) => String(line).trim()).filter(Boolean);
    }
    return [];
  }
  __name(normalizeHelperLines, "normalizeHelperLines");
  function renderPluginHeaderHelper({ lines, defaultOpen = false, open, onToggle }) {
    const initialOpen = open == null ? !!defaultOpen : !!open;
    const wrap = h("div", {
      class: "tps-plugin-header-helper-wrap",
      dataset: { open: String(initialOpen) }
    });
    const icon = h("i", { class: "ti ti-info-circle tps-plugin-header-helper-icon", "aria-hidden": "true" });
    const toggle = h("button", {
      type: "button",
      class: "tps-plugin-header-helper-toggle",
      "aria-expanded": String(initialOpen)
    }, icon, h("span", { class: "tps-plugin-header-helper-toggle-label" }, "Instructions"));
    const body = h(
      "div",
      { class: "tps-plugin-header-helper-body" },
      h("p", { class: "tps-plugin-header-helper-line" }, lines.join(" "))
    );
    const setOpen = /* @__PURE__ */ __name((nextOpen) => {
      wrap.dataset.open = String(nextOpen);
      toggle.setAttribute("aria-expanded", String(nextOpen));
      if (onToggle) onToggle(nextOpen);
    }, "setOpen");
    toggle.addEventListener("click", () => {
      setOpen(wrap.dataset.open !== "true");
    });
    body.addEventListener("click", () => {
      if (wrap.dataset.open === "true") setOpen(false);
    });
    wrap.appendChild(toggle);
    wrap.appendChild(body);
    return wrap;
  }
  __name(renderPluginHeaderHelper, "renderPluginHeaderHelper");
  function pluginHeaderFromConfig(conf, { version, helper, helperOpen, helperDefaultOpen, onHelperToggle, killSwitch, feedback, scope } = {}) {
    const resolvedHelper = helper ?? conf.instructions;
    return pluginHeader({
      title: conf.name || "",
      lede: conf.description,
      helper: resolvedHelper,
      helperOpen,
      helperDefaultOpen,
      onHelperToggle,
      icon: conf.icon,
      version: version ?? conf.version,
      author: conf.author,
      homepage: conf.homepage,
      repository: conf.repository,
      coffee: conf.coffee,
      killSwitch,
      feedback,
      scope
    });
  }
  __name(pluginHeaderFromConfig, "pluginHeaderFromConfig");
  function section({ label, hint, collapsible, defaultOpen = true, open, onToggle, summary, body = [] }) {
    const bodyChildren = Array.isArray(body) ? body : [body];
    const bodyEl = h("div", { class: "tps-section-body" }, ...bodyChildren);
    if (!collapsible) {
      return h(
        "section",
        { class: "tps-section" },
        h("div", { class: "tps-section-label" }, label),
        hint ? h("p", { class: "tps-section-hint" }, hint) : null,
        bodyEl
      );
    }
    const initialOpen = open == null ? !!defaultOpen : !!open;
    const sectionEl = h("section", {
      class: "tps-section tps-section--collapsible",
      dataset: { open: String(initialOpen) }
    });
    const chev = h("span", { class: "tps-section-chev", "aria-hidden": "true" }, "\u25B8");
    const labelEl = h("span", { class: "tps-section-label" }, label);
    const summaryEl = h("span", { class: "tps-section-summary" });
    const paintSummary = /* @__PURE__ */ __name((isOpen) => {
      summaryEl.replaceChildren();
      if (isOpen || summary == null) return;
      const content = typeof summary === "function" ? summary() : summary;
      if (content == null || content === "") return;
      if (typeof content === "string") summaryEl.textContent = content;
      else summaryEl.appendChild(content);
    }, "paintSummary");
    const setOpen = /* @__PURE__ */ __name((nextOpen) => {
      sectionEl.dataset.open = String(nextOpen);
      header.setAttribute("aria-expanded", String(nextOpen));
      paintSummary(nextOpen);
      if (onToggle) onToggle(nextOpen);
    }, "setOpen");
    const header = h("button", {
      type: "button",
      class: "tps-section-header",
      "aria-expanded": String(initialOpen),
      onClick: /* @__PURE__ */ __name(() => setOpen(sectionEl.dataset.open !== "true"), "onClick")
    }, chev, labelEl, summaryEl);
    paintSummary(initialOpen);
    sectionEl.appendChild(header);
    if (hint) sectionEl.appendChild(h("p", { class: "tps-section-hint" }, hint));
    sectionEl.appendChild(bodyEl);
    return sectionEl;
  }
  __name(section, "section");
  function optionRow({ type = "checkbox", name, value, label, desc, checked, onChange }) {
    const input = h("input", {
      type,
      name,
      value,
      checked: !!checked,
      onChange: onChange ? (e) => onChange(e) : null
    });
    const labelEl = h("span", { class: "tps-opt-label" }, label);
    const descEl = desc ? h("span", { class: "tps-opt-desc" }, desc) : null;
    return h("label", { class: "tps-opt" }, input, labelEl, descEl);
  }
  __name(optionRow, "optionRow");
  function sliderRow({ label, value, min = 0, max = 100, step = 1, format, defaultValue, onChange, onReset }) {
    const fmt = format || ((v) => String(v));
    const input = h("input", {
      type: "range",
      class: "tps-slider-input",
      value,
      min,
      max,
      step,
      onInput: /* @__PURE__ */ __name((e) => {
        const target = (
          /** @type {HTMLInputElement} */
          e.target
        );
        const v = Number(target.value);
        readout.textContent = fmt(v);
        onChange && onChange(v, e);
      }, "onInput")
    });
    const readout = h("span", { class: "tps-slider-value" }, fmt(value));
    const reset = defaultValue != null ? h("button", {
      type: "button",
      class: "tps-num-reset",
      onClick: /* @__PURE__ */ __name(() => {
        input.value = String(defaultValue);
        readout.textContent = fmt(defaultValue);
        onChange && onChange(defaultValue);
        onReset && onReset();
      }, "onClick")
    }, "Reset") : null;
    return h(
      "div",
      { class: "tps-slider" },
      h("span", { class: "tps-slider-label" }, label),
      input,
      readout,
      reset
    );
  }
  __name(sliderRow, "sliderRow");
  function listRow({ icon, name, controls }) {
    const ctrlChildren = controls == null ? [] : Array.isArray(controls) ? controls : [controls];
    return h(
      "div",
      { class: "tps-list-row" },
      h("div", null, icon || null),
      h("div", { class: "tps-list-name" }, name),
      h("div", null, ...ctrlChildren)
    );
  }
  __name(listRow, "listRow");
  function tabs({ options, value, onChange, multiSelect = false }) {
    const isActive = /* @__PURE__ */ __name((v) => multiSelect ? Array.isArray(value) && value.includes(v) : value === v, "isActive");
    return h(
      "div",
      { class: "tps-tabs", role: "tablist" },
      ...options.map((opt) => h("button", {
        type: "button",
        class: "tps-tab",
        role: "tab",
        "aria-pressed": String(isActive(opt.value)),
        onClick: /* @__PURE__ */ __name(() => {
          if (!onChange) return;
          if (multiSelect) {
            const cur = Array.isArray(value) ? value.slice() : [];
            const i = cur.indexOf(opt.value);
            if (i >= 0) cur.splice(i, 1);
            else cur.push(opt.value);
            onChange(cur);
          } else {
            onChange(opt.value);
          }
        }, "onClick")
      }, opt.label))
    );
  }
  __name(tabs, "tabs");

  // ../../shared/plugin-version.js
  function readPluginVersion(conf, fallback = "0.0.1") {
    if (!conf || typeof conf !== "object") return fallback;
    if (typeof conf.version === "string" && conf.version) return conf.version;
    const custom = (
      /** @type {Record<string, unknown> | undefined} */
      conf.custom
    );
    if (custom && typeof custom === "object" && typeof custom.pluginVersion === "string" && custom.pluginVersion) {
      return custom.pluginVersion;
    }
    return fallback;
  }
  __name(readPluginVersion, "readPluginVersion");
  function configWithPluginVersion(conf, customPatch, pluginVersion) {
    const base = conf && typeof conf === "object" ? conf : {};
    const custom = base.custom && typeof base.custom === "object" ? base.custom : {};
    return {
      ...base,
      version: pluginVersion,
      custom: {
        ...custom,
        ...customPatch,
        pluginVersion
      }
    };
  }
  __name(configWithPluginVersion, "configWithPluginVersion");
  async function resolveConfigApi(plugin) {
    if (!plugin) return null;
    if (typeof plugin.saveConfiguration === "function") return plugin;
    try {
      const data = plugin.data;
      const guid = typeof plugin.getGuid === "function" && plugin.getGuid() || plugin.collection && typeof plugin.collection.getGuid === "function" && plugin.collection.getGuid() || null;
      if (guid && data && typeof data.getPluginByGuid === "function") {
        const byGuid = data.getPluginByGuid(guid);
        if (byGuid && typeof byGuid.saveConfiguration === "function") return byGuid;
      }
      if (guid && data && typeof data.getAllCollections === "function") {
        const all = await data.getAllCollections();
        const found = (all || []).find((c) => c && typeof c.getGuid === "function" && c.getGuid() === guid);
        if (found && typeof found.saveConfiguration === "function") return found;
      }
      if (data && typeof data.getAllGlobalPlugins === "function") {
        const all = await data.getAllGlobalPlugins();
        const name = plugin.getConfiguration?.()?.name;
        const found = all.find((p) => p && typeof p.getGuid === "function" && p.getGuid() === guid) || (name ? all.find((p) => p && typeof p.getName === "function" && p.getName() === name) : null);
        if (found && typeof found.saveConfiguration === "function") return found;
      }
    } catch {
    }
    return null;
  }
  __name(resolveConfigApi, "resolveConfigApi");
  async function syncPluginVersionOnLoad(plugin, pluginVersion, customPatch = {}) {
    const api = await resolveConfigApi(plugin);
    if (!api) return;
    let conf = {};
    try {
      conf = api.getConfiguration?.() || plugin.getConfiguration?.() || {};
    } catch {
      return;
    }
    if (typeof conf.name !== "string" || !conf.name.trim()) return;
    const custom = conf.custom && typeof conf.custom === "object" ? { .../** @type {Record<string, unknown>} */
    conf.custom, ...customPatch } : { ...customPatch };
    if (readPluginVersion(conf, "") === pluginVersion) return;
    try {
      let ws = "default";
      try {
        ws = plugin.getWorkspaceGuid?.() || "default";
      } catch {
      }
      const guardKey = `tps-version-synced/${ws}/${conf.name}`;
      if (sessionStorage.getItem(guardKey) === pluginVersion) return;
      sessionStorage.setItem(guardKey, pluginVersion);
    } catch {
    }
    try {
      await api.saveConfiguration(configWithPluginVersion(conf, custom, pluginVersion));
    } catch {
    }
  }
  __name(syncPluginVersionOnLoad, "syncPluginVersionOnLoad");

  // ../../shared/plugin-kill-switch.js
  var MARKER_SYNC_HORIZON_MS = 9e4;
  function isPluginDisabled(conf) {
    if (!conf || typeof conf !== "object") return false;
    const custom = conf.custom;
    return !!(custom && typeof custom === "object" && /** @type {Record<string, unknown>} */
    custom.pluginDisabled === true);
  }
  __name(isPluginDisabled, "isPluginDisabled");
  function markerKey(plugin) {
    let ws = "default";
    try {
      ws = plugin.getWorkspaceGuid?.() || "default";
    } catch {
    }
    let name = "plugin";
    try {
      name = plugin.getConfiguration?.()?.name || "plugin";
    } catch {
    }
    return `tps-kill-switch/${ws}/${name}`;
  }
  __name(markerKey, "markerKey");
  function writeKillSwitchMarker(plugin, disabled) {
    try {
      localStorage.setItem(markerKey(plugin), JSON.stringify({ disabled, ts: Date.now() }));
    } catch {
    }
  }
  __name(writeKillSwitchMarker, "writeKillSwitchMarker");
  function clearKillSwitchMarker(plugin) {
    try {
      localStorage.removeItem(markerKey(plugin));
    } catch {
    }
  }
  __name(clearKillSwitchMarker, "clearKillSwitchMarker");
  function readKillSwitch(plugin) {
    let conf = {};
    try {
      conf = plugin.getConfiguration?.() || {};
    } catch {
    }
    const confDisabled = isPluginDisabled(conf);
    try {
      const raw = localStorage.getItem(markerKey(plugin));
      if (raw) {
        const marker = JSON.parse(raw);
        if (marker && typeof marker.disabled === "boolean") {
          if (marker.disabled === confDisabled) {
            clearKillSwitchMarker(plugin);
            return confDisabled;
          }
          if (Date.now() - (Number(marker.ts) || 0) < MARKER_SYNC_HORIZON_MS) {
            return marker.disabled;
          }
          clearKillSwitchMarker(plugin);
        }
      }
    } catch {
    }
    return confDisabled;
  }
  __name(readKillSwitch, "readKillSwitch");
  async function setPluginDisabled(plugin, disabled, pluginVersion, customPatch = {}) {
    const api = await resolveConfigApi(plugin);
    if (!api) return;
    let conf = {};
    try {
      conf = api.getConfiguration?.() || plugin.getConfiguration?.() || {};
    } catch {
      return;
    }
    if (typeof conf.name !== "string" || !conf.name.trim()) return;
    if (readKillSwitch(plugin) === disabled && isPluginDisabled(conf) === disabled) return;
    writeKillSwitchMarker(plugin, disabled);
    try {
      await api.saveConfiguration(configWithPluginVersion(conf, { ...customPatch, pluginDisabled: disabled }, pluginVersion));
    } catch {
      clearKillSwitchMarker(plugin);
    }
  }
  __name(setPluginDisabled, "setPluginDisabled");

  // ../../shared/plugin-settings.js
  function createSettingsStore(plugin, {
    slug,
    key = "settings",
    version,
    normalize = /* @__PURE__ */ __name((raw) => raw && typeof raw === "object" ? raw : {}, "normalize"),
    scopeKey = null,
    readSynced = null,
    pickSynced = null
  }) {
    const readSyncedBlob = readSynced || ((custom) => custom?.[key]);
    const pickSyncedSubset = pickSynced || ((s) => s);
    let current = {};
    let diverged = false;
    let pushInFlight = false;
    let localUnavailable = false;
    let fallbackTimer = null;
    const WS_FALLBACK = "default";
    const SCOPE_FALLBACK = "collection";
    let cachedWs = "";
    let cachedScope = "";
    const resolveWs = /* @__PURE__ */ __name(() => {
      if (cachedWs) return cachedWs;
      try {
        const guid = plugin.getWorkspaceGuid?.();
        if (guid) cachedWs = String(guid);
      } catch {
      }
      return cachedWs;
    }, "resolveWs");
    const resolveScope = /* @__PURE__ */ __name(() => {
      if (!scopeKey) return "";
      if (cachedScope) return cachedScope;
      try {
        const s = scopeKey();
        if (s) cachedScope = String(s);
      } catch {
      }
      return cachedScope;
    }, "resolveScope");
    const keyFor = /* @__PURE__ */ __name((ws, scope) => {
      const seg = scopeKey ? `/${scope || SCOPE_FALLBACK}` : "";
      return `${slug}/${ws || WS_FALLBACK}${seg}/settings`;
    }, "keyFor");
    const storageKey = /* @__PURE__ */ __name(() => keyFor(resolveWs(), resolveScope()), "storageKey");
    const candidateKeys = /* @__PURE__ */ __name(() => {
      const ws = resolveWs();
      const scope = resolveScope();
      const keys = [];
      const push = /* @__PURE__ */ __name((k) => {
        if (!keys.includes(k)) keys.push(k);
      }, "push");
      push(keyFor(ws, scope));
      if (ws) push(keyFor("", scope));
      if (scopeKey && scope) push(keyFor(ws, ""));
      if (ws && scopeKey && scope) push(keyFor("", ""));
      return keys;
    }, "candidateKeys");
    const orphanKey = /* @__PURE__ */ __name(() => {
      if (resolveWs()) return null;
      const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`^${esc}/[^/]+${scopeKey ? "/[^/]+" : ""}/settings$`);
      const hits = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (typeof k === "string" && re.test(k)) hits.push(k);
        }
      } catch {
        return null;
      }
      return hits.length === 1 ? hits[0] : null;
    }, "orphanKey");
    const readCustom = /* @__PURE__ */ __name(() => {
      try {
        const conf = plugin.getConfiguration?.();
        const custom = conf && conf.custom;
        return custom && typeof custom === "object" ? (
          /** @type {Record<string, unknown>} */
          custom
        ) : {};
      } catch {
        return {};
      }
    }, "readCustom");
    const readLocalRaw = /* @__PURE__ */ __name(() => {
      const keys = candidateKeys();
      const canonical = keys[0];
      const orphan = orphanKey();
      if (orphan && !keys.includes(orphan)) keys.push(orphan);
      for (const k of keys) {
        let raw = null;
        try {
          raw = localStorage.getItem(k);
        } catch {
          return null;
        }
        if (raw === null) continue;
        if (k !== canonical && resolveWs()) {
          try {
            localStorage.setItem(canonical, raw);
            localStorage.removeItem(k);
          } catch {
          }
        }
        try {
          const parsed = JSON.parse(raw);
          return parsed && typeof parsed === "object" ? parsed : {};
        } catch {
          return null;
        }
      }
      return null;
    }, "readLocalRaw");
    const writeLocal = /* @__PURE__ */ __name((value) => {
      try {
        const k = storageKey();
        localStorage.setItem(k, value);
        if (localStorage.getItem(k) !== value) throw new Error("localStorage read-back mismatch");
        localUnavailable = false;
        return true;
      } catch {
        localUnavailable = true;
        return false;
      }
    }, "writeLocal");
    const removeLocal = /* @__PURE__ */ __name((k = storageKey()) => {
      try {
        localStorage.removeItem(k);
      } catch {
      }
    }, "removeLocal");
    const normalizedStringify = /* @__PURE__ */ __name((raw) => JSON.stringify(normalize(raw)), "normalizedStringify");
    const FALLBACK_DELAY_MS = 2e3;
    const cancelFallback = /* @__PURE__ */ __name(() => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
    }, "cancelFallback");
    const flushFallback = /* @__PURE__ */ __name(async () => {
      cancelFallback();
      if (!localUnavailable || !diverged) return;
      await store.pushToAll();
    }, "flushFallback");
    const scheduleFallback = /* @__PURE__ */ __name(() => {
      cancelFallback();
      fallbackTimer = setTimeout(() => {
        fallbackTimer = null;
        void flushFallback();
      }, FALLBACK_DELAY_MS);
    }, "scheduleFallback");
    const store = {
      /** Read-only: never writes either store. */
      load() {
        const local = readLocalRaw();
        if (local !== null) {
          current = normalize(local);
          diverged = true;
        } else {
          current = normalize(readSyncedBlob(readCustom()) || {});
          diverged = false;
        }
        return { settings: current, diverged };
      },
      get() {
        return current;
      },
      isDiverged() {
        return diverged;
      },
      /** True when this device cannot persist settings locally (see `writeLocal`). */
      isLocalUnavailable() {
        return localUnavailable;
      },
      /**
       * Every edit is device-local. First edit snapshots the FULL settings
       * (inherited values of untouched keys survive).
       *
       * If the local write cannot be made to stick (blocked / quota / no-op
       * localStorage — a Linux-Electron report was losing 100% of settings on
       * restart this way, silently), fall back to persisting into the SYNCED
       * config, which is the only other durable store Thymer gives us. That
       * device's settings then apply to all devices — strictly better than
       * discarding them, and the panel says so.
       */
      update(patch) {
        current = normalize({ ...current, ...patch });
        if (normalizedStringify(readSyncedBlob(readCustom())) === JSON.stringify(current)) {
          removeLocal();
          diverged = false;
          cancelFallback();
          return { settings: current, diverged };
        }
        diverged = true;
        if (!writeLocal(JSON.stringify(current))) scheduleFallback();
        return { settings: current, diverged };
      },
      /**
       * The explicit ↑ "Apply to all devices": ONE saveConfiguration (which
       * reloads the plugin), then the local blob is cleared so this device
       * goes back to following the synced config. Resolves true when the
       * settings are known to be in synced config (pushed or already equal).
       */
      async pushToAll() {
        if (pushInFlight) return false;
        pushInFlight = true;
        try {
          const api = await resolveConfigApi(plugin);
          if (!api || typeof api.saveConfiguration !== "function") return false;
          let conf = {};
          try {
            conf = api.getConfiguration?.() || plugin.getConfiguration?.() || {};
          } catch {
            return false;
          }
          if (typeof conf.name !== "string" || !conf.name.trim()) return false;
          const custom = conf.custom && typeof conf.custom === "object" ? conf.custom : {};
          const subset = pickSyncedSubset(normalize(current));
          removeLocal();
          diverged = false;
          try {
            if (normalizedStringify(readSyncedBlob(
              /** @type {any} */
              custom
            )) !== normalizedStringify(subset)) {
              await api.saveConfiguration(configWithPluginVersion(conf, { [key]: subset }, version));
            }
          } catch (err) {
            writeLocal(JSON.stringify(current));
            diverged = true;
            throw err;
          }
          return true;
        } catch {
          return false;
        } finally {
          pushInFlight = false;
        }
      },
      /** The ↺ "Discard device changes": drop local, re-adopt synced. */
      discardLocal() {
        cancelFallback();
        removeLocal();
        current = normalize(readSyncedBlob(readCustom()) || {});
        diverged = false;
        return current;
      },
      /**
       * For folding into `setPluginDisabled(plugin, off, version, customPatch)`
       * so a kill-switch toggle carries staged device settings in the SAME
       * save (one reload, no race — CLAUDE.md rule). Call markFlushed() after
       * that save succeeds if the fold should count as a push.
       */
      pendingCustomPatch() {
        return diverged ? { [key]: pickSyncedSubset(normalize(current)) } : {};
      },
      markFlushed() {
        cancelFallback();
        removeLocal();
        diverged = false;
      },
      /**
       * Live-follow for non-diverged devices: when another device pushes,
       * `global-plugin.updated` fires here; re-read the synced blob and, if
       * it changed semantically, hand the fresh settings to the plugin's
       * central apply (which each plugin already guards with its kill
       * switch). Returns a detach function for onUnload.
       */
      attachLifecycle({ onRemoteChange } = {}) {
        const handlerIds = [];
        const onHide = /* @__PURE__ */ __name(() => {
          if (document.visibilityState === "hidden") void flushFallback();
        }, "onHide");
        const onPageHide = /* @__PURE__ */ __name(() => {
          void flushFallback();
        }, "onPageHide");
        try {
          document.addEventListener("visibilitychange", onHide);
          window.addEventListener("pagehide", onPageHide);
        } catch {
        }
        try {
          const id = plugin.events?.on?.("global-plugin.updated", (event) => {
            try {
              if (diverged) return;
              if (event?.source?.isLocal) return;
              const guid = plugin.getGuid?.();
              const eventGuid = event?.pluginGuid || event?.guid || event?.rootId || null;
              if (eventGuid && guid && eventGuid !== guid) return;
              const next = normalize(readSyncedBlob(readCustom()) || {});
              if (JSON.stringify(next) === JSON.stringify(current)) return;
              current = next;
              onRemoteChange?.(current);
            } catch {
            }
          });
          if (id) handlerIds.push(id);
        } catch {
        }
        return () => {
          cancelFallback();
          try {
            document.removeEventListener("visibilitychange", onHide);
            window.removeEventListener("pagehide", onPageHide);
          } catch {
          }
          for (const id of handlerIds) {
            try {
              plugin.events?.off?.(id);
            } catch {
            }
          }
        };
      }
    };
    return store;
  }
  __name(createSettingsStore, "createSettingsStore");

  // plugin.js
  var PLUGIN_VERSION = "1.2.1";
  var ROOT_CLASS = "plg-status-bar-manager";
  var PANEL_CLASS = `${ROOT_CLASS}-panel`;
  var TRIGGER_CLASS = "plg-sbm-trigger";
  var PANEL_TYPE = "sbm-settings";
  var TRIGGER_KEY = "__trigger__";
  var BAR_SELECTOR = ".statusbar--status-bar";
  var LEFT_SELECTOR = ".statusbar--left";
  var RIGHT_SELECTOR = ".statusbar--right";
  var BODY_BARTENDER_OPEN = "plg-sbm-bartender-open";
  var BODY_BARTENDER_CLOSING = "plg-sbm-bartender-closing";
  var BODY_ICON_ONLY_PLUGINS = "plg-sbm-icon-only-plugins";
  var BODY_ICON_ONLY_SHORTCUTS = "plg-sbm-icon-only-shortcuts";
  var BODY_CUSTOM_SPACING = "plg-sbm-custom-spacing";
  var BODY_UNIFORM_HOVER = "plg-sbm-uniform-hover";
  var BODY_SPLIT_HOVER_ZONES = "plg-sbm-split-hover-zones";
  var HOVER_TAG_CLASS = "plg-sbm-hover-tagged";
  var HOVER_OVERLAY_CLASS = "plg-sbm-hover-overlay";
  var HOVER_ANIM_MS = 220;
  var REVEAL_STAGGER_MS = 12;
  var MODES = Object.freeze({
    SHOW: "show",
    HIDE: "hide",
    HOVER: "hover",
    BARTENDER: "bartender"
  });
  var BUILTIN = Object.freeze({
    shortcuts: { key: "shortcuts", label: "Keyboard shortcuts", icon: "ti-keyboard", selector: LEFT_SELECTOR, reorderable: false, tooltip: "Keyboard shortcuts" },
    markdownMirror: { key: "markdownMirror", label: "Markdown mirror", icon: "ti-folder-bolt", selector: `${RIGHT_SELECTOR} .statusbar--markdown-mirror`, reorderable: true, tooltip: "Markdown mirror" },
    mcpBridge: { key: "mcpBridge", label: "MCP bridge", icon: "ti-plug", selector: `${RIGHT_SELECTOR} .statusbar--mcp-bridge`, reorderable: true, tooltip: "MCP bridge" },
    hotReload: { key: "hotReload", label: "Hot reload", icon: "ti-progress-bolt", selector: `${RIGHT_SELECTOR} .statusbar--hotreload`, reorderable: true, tooltip: "Plugin hot reload" },
    thymer: { key: "thymer", label: "Thymer logo", icon: "ti-sparkles", selector: `${RIGHT_SELECTOR} .statusbar-item[event="onLogo"]`, reorderable: true, tooltip: "Thymer" },
    user: { key: "user", label: "User & invite", icon: "ti-users", selector: `${RIGHT_SELECTOR} .statusbar--users, ${RIGHT_SELECTOR} .statusbar-item:has(.id--users-button)`, reorderable: true, tooltip: "User & invite" },
    statusMsg: { key: "statusMsg", label: "Status message", icon: "ti-message-circle", selector: `${RIGHT_SELECTOR} .id--statusbar-msg`, reorderable: true, tooltip: "Status message" },
    sync: { key: "sync", label: "Sync indicator", icon: "ti-refresh", selector: `${RIGHT_SELECTOR} .id--sync`, reorderable: true, tooltip: "Sync indicator" }
  });
  var DEFAULT_STATE = {
    spacing: 0,
    iconOnlyPlugins: true,
    iconOnlyShortcuts: false,
    uniformHover: true,
    hoverRadius: 0,
    splitHoverZones: true,
    overrideTooltips: false,
    triggerIcon: "adjustments",
    tooltipOverrides: {},
    // Built-in defaults. Any status-bar item NOT listed here (i.e. every other
    // plugin's contributions, keyed `item:*`) defaults to `hide` — see
    // `_defaultModeFor`. Keeps the bar to the built-ins out of the box.
    modes: {
      shortcuts: (
        /** @type {ItemMode} */
        MODES.HOVER
      ),
      markdownMirror: (
        /** @type {ItemMode} */
        MODES.SHOW
      ),
      mcpBridge: (
        /** @type {ItemMode} */
        MODES.SHOW
      ),
      hotReload: (
        /** @type {ItemMode} */
        MODES.SHOW
      ),
      thymer: (
        /** @type {ItemMode} */
        MODES.HIDE
      ),
      user: (
        /** @type {ItemMode} */
        MODES.HIDE
      ),
      statusMsg: (
        /** @type {ItemMode} */
        MODES.SHOW
      ),
      sync: (
        /** @type {ItemMode} */
        MODES.SHOW
      ),
      [TRIGGER_KEY]: (
        /** @type {ItemMode} */
        MODES.SHOW
      )
    },
    order: {}
  };
  var TRIGGER_ICON_OPTIONS = [
    "adjustments",
    "settings",
    "tools",
    "eye",
    "sparkles",
    "gauge",
    "target",
    "bolt",
    "layout-grid",
    "layout-list",
    "layout-dashboard",
    "puzzle"
  ];
  var SPACING_MIN = -16;
  var SPACING_MAX = 16;
  var HOVER_RADIUS_MIN = 0;
  var HOVER_RADIUS_MAX = 16;
  var ACTIVE_INSTANCE_KEY = "__plgSbmActiveInstance";
  var ITEM_MODE_OPTIONS = [
    { value: MODES.SHOW, label: "Show" },
    { value: MODES.HOVER, label: "On hover" },
    { value: MODES.BARTENDER, label: "On click" },
    { value: MODES.HIDE, label: "Hide" }
  ];
  var TELEMETRY_ENDPOINT = "https://thymer-plugins.goatcounter.com/count";
  var TELEMETRY_SCRIPT_SRC = "https://gc.zgo.at/count.js";
  var _telemetryScriptPromise = null;
  function _loadGoatCounter() {
    if (_telemetryScriptPromise) return _telemetryScriptPromise;
    _telemetryScriptPromise = new Promise((resolve) => {
      window.goatcounter = window.goatcounter || {};
      window.goatcounter.no_onload = true;
      window.goatcounter.allow_local = false;
      if (typeof window.goatcounter.count === "function") {
        resolve();
        return;
      }
      const s = document.createElement("script");
      s.async = true;
      s.src = TELEMETRY_SCRIPT_SRC;
      s.setAttribute("data-goatcounter", TELEMETRY_ENDPOINT);
      s.setAttribute("data-goatcounter-settings", '{"no_onload": true}');
      s.onload = () => resolve();
      s.onerror = () => resolve();
      document.head.appendChild(s);
    });
    return _telemetryScriptPromise;
  }
  __name(_loadGoatCounter, "_loadGoatCounter");
  function _fireTelemetry(path) {
    _loadGoatCounter().then(() => {
      try {
        window.goatcounter?.count?.({ path, title: "", event: false });
      } catch (_) {
      }
    });
  }
  __name(_fireTelemetry, "_fireTelemetry");
  function _telemetryBlocked() {
    try {
      if (navigator.doNotTrack === "1") return true;
      if (localStorage.getItem("tps-telemetry-opt-out") === "1") return true;
    } catch (_) {
      return true;
    }
    return false;
  }
  __name(_telemetryBlocked, "_telemetryBlocked");
  function pingInstall(slug) {
    try {
      if (_telemetryBlocked()) return;
      const key = "tps-tcm-" + slug;
      if (localStorage.getItem(key) === "1") return;
      localStorage.setItem(key, "1");
      _fireTelemetry("thymer-" + slug);
    } catch (_) {
    }
  }
  __name(pingInstall, "pingInstall");
  function pingActive(slug) {
    try {
      if (_telemetryBlocked()) return;
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const key = "tps-act-" + slug;
      if (localStorage.getItem(key) === today) return;
      localStorage.setItem(key, today);
      _fireTelemetry("thymer-" + slug + "/active");
    } catch (_) {
    }
  }
  __name(pingActive, "pingActive");
  var Plugin = class extends AppPlugin {
    static {
      __name(this, "Plugin");
    }
    /**
     * Class-field declarations (not a constructor override — the SDK injects
     * context after construction; onLoad replaces both values before use).
     * @type {SbmState}
     */
    _state = DEFAULT_STATE;
    /** @type {ReturnType<typeof createSettingsStore>} */
    _settingsStore = (
      /** @type {any} */
      null
    );
    onLoad() {
      pingInstall("status-bar-manager");
      pingActive("status-bar-manager");
      void syncPluginVersionOnLoad(this, PLUGIN_VERSION);
      this._disabled = readKillSwitch(this);
      this._handlerIds = [];
      this._statusItem = null;
      this._commandItem = null;
      this._panelEl = null;
      this._barObserver = null;
      this._resizeHandler = null;
      this._hoverOverlayEl = null;
      this._hoverMouseOverHandler = null;
      this._hoverMouseOutHandler = null;
      this._hoverMouseMoveHandler = null;
      this._documentPointerDownHandler = null;
      this._hoverCloseTimer = null;
      this._bartenderCloseTimer = null;
      this._renderRaf = 0;
      this._panelOpenPromise = null;
      this._tooltipEditRows = /* @__PURE__ */ new Set();
      try {
        /** @type {any} */
        window[ACTIVE_INSTANCE_KEY] = this;
      } catch {
      }
      this._settingsStore = createSettingsStore(this, {
        slug: "status-bar-manager",
        key: "state",
        version: PLUGIN_VERSION,
        normalize: /* @__PURE__ */ __name((raw) => this._normalizeState(raw), "normalize")
      });
      this._state = /** @type {SbmState} */
      this._settingsStore.load().settings;
      this.ui.injectCSS(PANEL_CSS);
      this._injectStaticCSS();
      this._statusItem = this.ui.addStatusBarItem({
        icon: this._state.triggerIcon || DEFAULT_STATE.triggerIcon,
        tooltip: "Status Bar Manager",
        onClick: /* @__PURE__ */ __name(() => {
        }, "onClick")
      });
      const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
      if (triggerEl) {
        triggerEl.classList.add(TRIGGER_CLASS);
        triggerEl.setAttribute("data-tooltip", "Status Bar Manager");
        triggerEl.setAttribute("data-tooltip-dir", "top");
        triggerEl.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          this._openPanel();
        }, true);
      }
      this._commandItem = this.ui.addCommandPaletteCommand({
        label: "Plugin: Status Bar Manager",
        icon: "adjustments",
        onSelected: /* @__PURE__ */ __name(() => this._openPanel(), "onSelected")
      });
      this.ui.registerCustomPanelType(PANEL_TYPE, (pluginPanel) => {
        try {
          pluginPanel.setTitle("Configure Status Bar Manager");
        } catch {
        }
        const el2 = pluginPanel.getElement();
        if (!el2) return;
        this._panelEl = el2;
        this._renderPanel();
      });
      this._detachSettingsLifecycle = this._settingsStore.attachLifecycle({
        onRemoteChange: /* @__PURE__ */ __name((state) => {
          this._state = /** @type {SbmState} */
          state;
          this._applyAll();
          this._renderPanel();
        }, "onRemoteChange")
      });
      try {
        const staleRoot = document.querySelector(".plg-status-bar-manager-panel");
        if (staleRoot && staleRoot.parentElement) {
          this._panelEl = staleRoot.parentElement;
          this._renderPanel();
        }
      } catch {
      }
      if (this._disabled) return;
      this._applyAll();
      this._observeBar();
    }
    onUnload() {
      for (const id of this._handlerIds || []) this.events.off(id);
      this._handlerIds = [];
      if (this._barObserver) {
        this._barObserver.disconnect();
        this._barObserver = null;
      }
      if (this._resizeHandler) {
        window.removeEventListener("resize", this._resizeHandler);
        this._resizeHandler = null;
      }
      const bar = document.querySelector(BAR_SELECTOR);
      if (bar instanceof HTMLElement && this._hoverMouseOverHandler) {
        bar.removeEventListener("mouseover", this._hoverMouseOverHandler, true);
      }
      if (bar instanceof HTMLElement && this._hoverMouseOutHandler) {
        bar.removeEventListener("mouseout", this._hoverMouseOutHandler, true);
      }
      if (bar instanceof HTMLElement && this._hoverMouseMoveHandler) {
        bar.removeEventListener("mousemove", this._hoverMouseMoveHandler, true);
      }
      if (this._documentPointerDownHandler) {
        document.removeEventListener("pointerdown", this._documentPointerDownHandler, true);
      }
      this._hoverMouseOverHandler = null;
      this._hoverMouseOutHandler = null;
      this._hoverMouseMoveHandler = null;
      this._documentPointerDownHandler = null;
      if (this._hoverCloseTimer) {
        clearTimeout(this._hoverCloseTimer);
        this._hoverCloseTimer = null;
      }
      if (this._bartenderCloseTimer) {
        clearTimeout(this._bartenderCloseTimer);
        this._bartenderCloseTimer = null;
      }
      try {
        this._detachSettingsLifecycle?.();
      } catch {
      }
      if (this._hoverOverlayEl) {
        this._hoverOverlayEl.remove();
        this._hoverOverlayEl = null;
      }
      if (this._renderRaf) {
        cancelAnimationFrame(this._renderRaf);
        this._renderRaf = 0;
      }
      document.body.classList.remove(
        BODY_BARTENDER_OPEN,
        BODY_BARTENDER_CLOSING,
        BODY_ICON_ONLY_PLUGINS,
        BODY_ICON_ONLY_SHORTCUTS,
        BODY_CUSTOM_SPACING,
        BODY_UNIFORM_HOVER,
        BODY_SPLIT_HOVER_ZONES
      );
      document.body.style.removeProperty("--plg-sbm-icon-gap");
      document.body.style.removeProperty("--plg-sbm-bar-h");
      this._clearHoverMetrics();
      this._clearHoverSide(false);
      for (const el2 of document.querySelectorAll(`[data-sbm-mode]`)) el2.removeAttribute("data-sbm-mode");
      for (const el2 of document.querySelectorAll(`[data-sbm-force-show]`)) el2.removeAttribute("data-sbm-force-show");
      for (const el2 of document.querySelectorAll("[data-sbm-original-tooltip]")) {
        if (!(el2 instanceof HTMLElement)) continue;
        const orig = el2.getAttribute("data-sbm-original-tooltip");
        if (orig) el2.setAttribute("data-tooltip", orig);
        el2.removeAttribute("data-sbm-original-tooltip");
      }
      for (const el2 of document.querySelectorAll("[data-sbm-key]")) {
        if (el2 instanceof HTMLElement) {
          el2.style.order = "";
          el2.style.removeProperty("--plg-sbm-reveal-delay");
        }
        el2.removeAttribute("data-sbm-key");
      }
      for (const el2 of document.querySelectorAll(`${LEFT_SELECTOR} > .statusbar-item`)) {
        if (el2 instanceof HTMLElement) el2.style.removeProperty("--plg-sbm-reveal-delay");
      }
      for (const el2 of document.querySelectorAll('[data-sbm-added-tooltip-class="true"]')) {
        el2.classList.remove("tooltip");
        el2.removeAttribute("data-sbm-added-tooltip-class");
      }
      if (this._statusItem) {
        this._statusItem.remove();
        this._statusItem = null;
      }
      if (this._commandItem) {
        this._commandItem.remove();
        this._commandItem = null;
      }
      this._panelEl = null;
      this._panelOpenPromise = null;
      try {
        const w = (
          /** @type {any} */
          window
        );
        if (w[ACTIVE_INSTANCE_KEY] === this) w[ACTIVE_INSTANCE_KEY] = null;
      } catch {
      }
    }
    _toggleBartenderDrawer() {
      if (document.body.classList.contains(BODY_BARTENDER_OPEN)) this._closeBartenderDrawer(true);
      else this._openBartenderDrawer();
    }
    _openBartenderDrawer() {
      if (this._bartenderCloseTimer) {
        clearTimeout(this._bartenderCloseTimer);
        this._bartenderCloseTimer = null;
      }
      document.body.classList.remove(BODY_BARTENDER_CLOSING);
      document.body.classList.add(BODY_BARTENDER_OPEN);
    }
    /** @param {boolean} animate */
    _closeBartenderDrawer(animate) {
      if (this._bartenderCloseTimer) {
        clearTimeout(this._bartenderCloseTimer);
        this._bartenderCloseTimer = null;
      }
      if (!document.body.classList.contains(BODY_BARTENDER_OPEN)) {
        document.body.classList.remove(BODY_BARTENDER_CLOSING);
        return;
      }
      document.body.classList.remove(BODY_BARTENDER_OPEN);
      if (!animate) {
        document.body.classList.remove(BODY_BARTENDER_CLOSING);
        return;
      }
      document.body.classList.add(BODY_BARTENDER_CLOSING);
      this._bartenderCloseTimer = setTimeout(() => {
        this._bartenderCloseTimer = null;
        document.body.classList.remove(BODY_BARTENDER_CLOSING);
      }, HOVER_ANIM_MS);
    }
    _hasBartenderItems() {
      const modes = this._state.modes || {};
      for (const k of Object.keys(modes)) {
        if (modes[k] === MODES.BARTENDER) return true;
      }
      return false;
    }
    async _openPanel() {
      if (this._panelEl && document.contains(this._panelEl)) return;
      if (this._panelOpenPromise) return this._panelOpenPromise;
      this._panelOpenPromise = (async () => {
        try {
          const p = await this.ui.createPanel();
          if (p) p.navigateToCustomType(PANEL_TYPE);
        } finally {
          this._panelOpenPromise = null;
        }
      })();
      return this._panelOpenPromise;
    }
    // ── CSS (rules that apply to the live bar) ──────────────────────────────
    _injectStaticCSS() {
      this.ui.injectCSS(`
				/* \u2500\u2500 Trigger appearance \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
				   Keep native statusbar item geometry intact. Cursor only. */
			.${TRIGGER_CLASS} {
				cursor: pointer !important;
			}
			.${TRIGGER_CLASS}:hover,
			.${TRIGGER_CLASS}:active,
			.${TRIGGER_CLASS}:focus {
				transform: none !important;
				translate: none !important;
			}
			/* Anchor the right column to the right edge of the bar so collapsing
			   the keyboard-shortcut column doesn't drag the icons leftward. */
			${BAR_SELECTOR} ${RIGHT_SELECTOR} {
				margin-left: auto !important;
			}

			/* \u2500\u2500 Per-item mode rules \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
			body ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--markdown-mirror[data-sbm-force-show="true"],
			body ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--mcp-bridge[data-sbm-force-show="true"],
			body ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--hotreload[data-sbm-force-show="true"] {
				display: flex !important;
			}

			body ${BAR_SELECTOR} > [data-sbm-mode="${MODES.HIDE}"],
			body ${BAR_SELECTOR} [data-sbm-mode="${MODES.HIDE}"] { display: none !important; }

			body ${BAR_SELECTOR} > [data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR} [data-sbm-mode="${MODES.HOVER}"] { display: none !important; }

			body ${BAR_SELECTOR} > [data-sbm-mode="${MODES.BARTENDER}"],
			body ${BAR_SELECTOR} [data-sbm-mode="${MODES.BARTENDER}"] { display: none !important; }

			/* Hover mode reuses drawer reveal/close motion. Without split zones, any
			   bar hover opens both sides. With split zones, only the hovered half opens. */
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-side="left"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"],
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-closing-side="left"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] {
				display: flex !important;
			}
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-side="left"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-closing-side="left"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-side="right"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-closing-side="right"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-side="right"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body:not(.${BODY_SPLIT_HOVER_ZONES}) ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_SPLIT_HOVER_ZONES} ${BAR_SELECTOR}[data-sbm-hover-closing-side="right"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"] {
				display: flex !important;
			}

			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] > .statusbar-item,
			body ${BAR_SELECTOR}[data-sbm-hover-side="left"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] > .statusbar-item,
			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="left"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"] {
				animation: plg-sbm-slide-in-left ${HOVER_ANIM_MS}ms cubic-bezier(0.2,0.6,0.2,1);
			}
			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="right"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="right"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"] {
				animation: plg-sbm-slide-in-right ${HOVER_ANIM_MS}ms cubic-bezier(0.2,0.6,0.2,1);
			}
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] > .statusbar-item,
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="left"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] > .statusbar-item,
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="left"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"] {
				animation: plg-sbm-slide-out-left ${HOVER_ANIM_MS}ms cubic-bezier(0.4,0,0.2,1);
			}
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="right"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="all"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-closing-side="right"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"] {
				animation: plg-sbm-slide-out-right ${HOVER_ANIM_MS}ms cubic-bezier(0.4,0,0.2,1);
			}

			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${LEFT_SELECTOR}[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${LEFT_SELECTOR}[data-sbm-mode="${MODES.BARTENDER}"] {
				display: flex !important;
			}
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.BARTENDER}"] {
				display: flex !important;
			}
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${LEFT_SELECTOR}[data-sbm-mode="${MODES.BARTENDER}"] > .statusbar-item,
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"] {
				animation: plg-sbm-slide-in-left ${HOVER_ANIM_MS}ms cubic-bezier(0.2,0.6,0.2,1);
			}
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.BARTENDER}"] {
				animation: plg-sbm-slide-in-right ${HOVER_ANIM_MS}ms cubic-bezier(0.2,0.6,0.2,1);
			}

			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] > .statusbar-item,
			body ${BAR_SELECTOR}[data-sbm-hover-side="left"] ${LEFT_SELECTOR}[data-sbm-mode="${MODES.HOVER}"] > .statusbar-item,
			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="left"] ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="right"] ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="all"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body ${BAR_SELECTOR}[data-sbm-hover-side="right"] ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.HOVER}"],
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${LEFT_SELECTOR}[data-sbm-mode="${MODES.BARTENDER}"] > .statusbar-item,
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_OPEN} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.BARTENDER}"] {
				animation-fill-mode: both;
				animation-delay: var(--plg-sbm-reveal-delay, 0ms);
			}
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${LEFT_SELECTOR}[data-sbm-mode="${MODES.BARTENDER}"] > .statusbar-item,
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${LEFT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"] {
				animation: plg-sbm-slide-out-left ${HOVER_ANIM_MS}ms cubic-bezier(0.4,0,0.2,1);
			}
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item[data-sbm-mode="${MODES.BARTENDER}"],
			body.${BODY_BARTENDER_CLOSING} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users[data-sbm-mode="${MODES.BARTENDER}"] {
				animation: plg-sbm-slide-out-right ${HOVER_ANIM_MS}ms cubic-bezier(0.4,0,0.2,1);
			}

			/* Bartender drawer-open state: trigger inherits theme accent \u2014 we use
			   currentColor with a brightness boost rather than --logo-color so it
			   tracks the active theme/vibe instead of the default mint. */
			body.${BODY_BARTENDER_OPEN} .${TRIGGER_CLASS} {
				filter: brightness(1.4);
			}

			/* \u2500\u2500 Icon-only modes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
			body.${BODY_ICON_ONLY_PLUGINS} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item .statusbar-item--label {
				display: none !important;
			}
			body.${BODY_ICON_ONLY_SHORTCUTS} ${BAR_SELECTOR} ${LEFT_SELECTOR} .statusbar--kbd-label {
				display: none !important;
			}

			/* \u2500\u2500 Custom spacing (supports negative for overlap) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
			body.${BODY_CUSTOM_SPACING} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item + .statusbar-item,
			body.${BODY_CUSTOM_SPACING} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item + .statusbar-item {
				margin-left: var(--plg-sbm-icon-gap, 4px) !important;
			}

				/* \u2500\u2500 Uniform hover (visual only, no layout reflow) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
				   Native item display/alignment stays untouched. A single measured
				   overlay inside the bar paints the full-height hover background,
				   so logo transforms and tooltip arrows keep their original boxes. */
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} {
					position: relative !important;
				}
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} .${HOVER_OVERLAY_CLASS} {
					position: absolute;
					top: 0;
					left: 0;
					width: var(--plg-sbm-hover-width, 0px);
					height: var(--plg-sbm-bar-h, 100%);
					transform: translateX(var(--plg-sbm-hover-left, 0px));
					background: color-mix(in srgb, var(--text-default, currentColor) 16%, transparent) !important;
					border-radius: var(--plg-sbm-hover-radius, 0px) !important;
					pointer-events: none;
					opacity: 0;
					z-index: 0;
					transition:
						opacity 120ms cubic-bezier(0.2, 0.6, 0.2, 1),
						transform 240ms cubic-bezier(0.22, 0.61, 0.36, 1),
						width 240ms cubic-bezier(0.22, 0.61, 0.36, 1);
				}
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} .${HOVER_OVERLAY_CLASS}.is-visible {
					opacity: 1;
				}
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR},
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR},
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users {
					position: relative !important;
					z-index: 1;
				}
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item *,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item *,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users * {
					cursor: pointer !important;
				}
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item:hover,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item:hover,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users:hover,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item:active,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item:active,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users:active,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item:focus,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item:focus,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users:focus,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item:hover *,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item:hover *,
				body.${BODY_UNIFORM_HOVER} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar--users:hover * {
					background: transparent !important;
					background-color: transparent !important;
					box-shadow: none !important;
				}

			@keyframes plg-sbm-slide-in-right {
				from { opacity: 0; transform: translateX(12px); }
				to   { opacity: 1; transform: translateX(0); }
			}
			@keyframes plg-sbm-slide-out-right {
				from { opacity: 1; transform: translateX(0); }
				to   { opacity: 0; transform: translateX(12px); }
			}
			@keyframes plg-sbm-slide-in-left {
				from { opacity: 0; transform: translateX(-12px); }
				to   { opacity: 1; transform: translateX(0); }
			}
			@keyframes plg-sbm-slide-out-left {
				from { opacity: 1; transform: translateX(0); }
				to   { opacity: 0; transform: translateX(-12px); }
			}

			@media (prefers-reduced-motion: reduce) {
				body ${BAR_SELECTOR} [data-sbm-mode="${MODES.HOVER}"],
				body ${BAR_SELECTOR} [data-sbm-mode="${MODES.BARTENDER}"] {
					animation-duration: 1ms !important;
					transform: none !important;
				}
			}

				/* \u2500\u2500 Settings panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
				.${PANEL_CLASS} {
					container-type: inline-size;
				}
				.${PANEL_CLASS} .${PANEL_CLASS}__row-icon {
					display: inline-flex; align-items: center; justify-content: center;
				width: 18px; height: 30px;
				color: var(--text-muted, currentColor);
				font-size: 14px;
				line-height: 1;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__row-icon--blank { opacity: 0.25; }
			.${PANEL_CLASS} .${PANEL_CLASS}__align {
				display: flex; align-items: center; justify-content: space-between;
				gap: 12px;
				padding: 8px 0;
			}
				.${PANEL_CLASS} .tps-list-row {
					grid-template-columns: 18px minmax(160px, 1fr) minmax(220px, auto);
					gap: 6px 12px;
					padding: 10px 0;
					align-items: center;
					position: relative;
					z-index: 0;
				}
				.${PANEL_CLASS} .tps-list-name {
					min-width: 0;
					overflow: visible;
					white-space: normal;
				}
				/* Make sure the controls cell sits above the input so its click
				   targets are never intercepted by an adjacent stretching element. */
			.${PANEL_CLASS} .tps-list-row > div:last-child,
			.${PANEL_CLASS} .${PANEL_CLASS}__row-controls,
			.${PANEL_CLASS} .${PANEL_CLASS}__row-controls * {
				position: relative;
				z-index: 2;
				pointer-events: auto;
			}
				.${PANEL_CLASS} .${PANEL_CLASS}__tooltip-input {
					max-width: 100%;
				}
				.${PANEL_CLASS} .tps-list-row[data-sbm-has-tooltip="true"] {
					align-items: end;
				}
				.${PANEL_CLASS} .tps-list-row[data-sbm-has-tooltip="true"] > div:first-child,
				.${PANEL_CLASS} .tps-list-row[data-sbm-has-tooltip="true"] > div:last-child {
					align-self: end;
					min-height: 30px;
					display: flex;
					align-items: center;
				}
			.${PANEL_CLASS} .tps-list-row[data-sbm-row-mode="${MODES.HIDE}"],
			.${PANEL_CLASS} .tps-list-row[data-sbm-row-mode="${MODES.BARTENDER}"] {
				opacity: 0.45;
			}
			.${PANEL_CLASS} .tps-list-row[data-sbm-row-mode="${MODES.HOVER}"] {
				opacity: 0.7;
			}
			/* Keep the buttons interactive even when the row is faded \u2014 opacity
			   alone never blocks clicks, but defensive specificity here helps
			   guarantee Show/Hide/Hover/Drawer always respond. */
			.${PANEL_CLASS} .tps-list-row[data-sbm-row-mode] .tps-tab,
			.${PANEL_CLASS} .tps-list-row[data-sbm-row-mode] .${PANEL_CLASS}__drag-handle {
				pointer-events: auto !important;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__icon-picker {
				display: flex; flex-wrap: wrap; gap: 4px; padding: 8px 0;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__icon-btn {
				display: inline-flex; align-items: center; justify-content: center;
				width: 36px; height: 36px;
				border-radius: 6px;
				background: transparent;
				border: 1px solid var(--tps-divider, color-mix(in srgb, currentColor 14%, transparent));
				color: var(--text-muted, currentColor);
				font-size: 18px;
				cursor: pointer;
				padding: 0;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__icon-btn:hover {
				background: var(--tps-bg-hover, color-mix(in srgb, currentColor 8%, transparent));
				color: var(--text-default, currentColor);
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__icon-btn[aria-pressed="true"] {
				border-color: currentColor;
				color: inherit;
			}
				.${PANEL_CLASS} .${PANEL_CLASS}__row-controls {
					display: inline-flex;
					align-items: center;
					justify-content: flex-end;
					gap: 8px;
					min-width: 0;
					width: 100%;
					min-height: 30px;
				}
				.${PANEL_CLASS} .${PANEL_CLASS}__row-controls .tps-tabs {
					flex-wrap: wrap;
					justify-content: flex-end;
					min-width: 0;
					align-items: center;
				}
				.${PANEL_CLASS} .${PANEL_CLASS}__row-controls .tps-tab {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					height: 30px;
					cursor: pointer !important;
				}
				.${PANEL_CLASS} button,
				.${PANEL_CLASS} .tps-tab,
				.${PANEL_CLASS} .${PANEL_CLASS}__icon-btn {
					cursor: pointer !important;
				}

				/* Active mode tab gets a mode-specific colour so the selected
				   state reads at a glance: show=green, hover=yellow, click=orange,
				   hide=red. Uses Thymer's enum tokens with rgba fallbacks. */
				.${PANEL_CLASS} .tps-tab[data-sbm-mode-opt="${MODES.SHOW}"][aria-pressed="true"] {
					background: var(--enum-green-bg, rgba(34,197,94,0.16));
					color: var(--enum-green-fg, #15803d);
					border-color: var(--enum-green-border, rgba(34,197,94,0.5));
				}
				.${PANEL_CLASS} .tps-tab[data-sbm-mode-opt="${MODES.HOVER}"][aria-pressed="true"] {
					background: var(--enum-yellow-bg, rgba(234,179,8,0.16));
					color: var(--enum-yellow-fg, #a16207);
					border-color: var(--enum-yellow-border, rgba(234,179,8,0.5));
				}
				.${PANEL_CLASS} .tps-tab[data-sbm-mode-opt="${MODES.BARTENDER}"][aria-pressed="true"] {
					background: var(--enum-orange-bg, rgba(249,115,22,0.16));
					color: var(--enum-orange-fg, #c2410c);
					border-color: var(--enum-orange-border, rgba(249,115,22,0.5));
				}
				.${PANEL_CLASS} .tps-tab[data-sbm-mode-opt="${MODES.HIDE}"][aria-pressed="true"] {
					background: var(--enum-red-bg, rgba(239,68,68,0.16));
					color: var(--enum-red-fg, #b91c1c);
					border-color: var(--enum-red-border, rgba(239,68,68,0.5));
				}

				/* Column-header row for the Right side \u2014 bulk controls above the
				   item list, its buttons aligned over each item's buttons. */
				.${PANEL_CLASS} .tps-list-row[data-sbm-set-all="true"] {
					border-bottom: 1px solid var(--border-default, rgba(127,127,127,0.14));
					margin-bottom: 4px;
					padding-bottom: 8px;
				}
				/* Spacer that occupies the same width as an item row's drag handle
				   so the header's mode tabs line up above the item tabs. */
				.${PANEL_CLASS} .${PANEL_CLASS}__drag-spacer {
					width: 20px;
					height: 24px;
					flex-shrink: 0;
					pointer-events: none;
				}

			/* \u2500\u2500 Drag handle (6 dots) on the far right of each reorderable row */
			.${PANEL_CLASS} .${PANEL_CLASS}__drag-handle {
				display: inline-flex; align-items: center; justify-content: center;
				width: 20px; height: 24px;
				background: transparent; border: 0; padding: 0;
				color: var(--text-muted, currentColor);
				cursor: grab;
				opacity: 0.55;
				transition: opacity 120ms ease, color 120ms ease;
				touch-action: none;
				user-select: none;
				flex-shrink: 0;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__drag-handle:hover {
				opacity: 1;
				color: inherit;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__drag-handle:active,
			.${PANEL_CLASS} .${PANEL_CLASS}__drag-handle.is-dragging {
				cursor: grabbing;
			}
			/* Per-row "edit tooltip" toggle \u2014 matches the drag handle's weight. */
			.${PANEL_CLASS} .${PANEL_CLASS}__tooltip-toggle {
				display: inline-flex; align-items: center; justify-content: center;
				width: 24px; height: 24px;
				background: transparent; border: 0; padding: 0;
				color: var(--text-muted, currentColor);
				cursor: pointer;
				opacity: 0.55;
				border-radius: 4px;
				transition: opacity 120ms ease, color 120ms ease, background-color 120ms ease;
				flex-shrink: 0;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__tooltip-toggle:hover { opacity: 1; }
			.${PANEL_CLASS} .${PANEL_CLASS}__tooltip-toggle[aria-pressed="true"] {
				opacity: 1;
				color: var(--enum-blue-fg, #1d4ed8);
				background: var(--enum-blue-bg, rgba(59,130,246,0.16));
			}
			/* SVG-free 6-dot grip drawn with a tight 2\xD73 grid of pseudo-circles. */
			.${PANEL_CLASS} .${PANEL_CLASS}__drag-grip {
				display: grid;
				grid-template-columns: 3px 3px;
				grid-template-rows: 3px 3px 3px;
				gap: 3px;
				pointer-events: none;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__drag-grip span {
				width: 3px; height: 3px;
				background: currentColor;
				border-radius: 50%;
			}

			/* Drop-target indicators while dragging. */
			.${PANEL_CLASS} .tps-list-row.is-drag-source { opacity: 0.35; }
			.${PANEL_CLASS} .tps-list-row.is-drop-above {
				box-shadow: inset 0 2px 0 0 currentColor;
			}
			.${PANEL_CLASS} .tps-list-row.is-drop-below {
				box-shadow: inset 0 -2px 0 0 currentColor;
			}

			/* Editable tooltip input below each row label when override is on. */
				.${PANEL_CLASS} .${PANEL_CLASS}__name-stack {
					display: flex;
					flex-direction: column;
					gap: 4px;
					min-width: 0;
					width: 100%;
				}
				.${PANEL_CLASS} .${PANEL_CLASS}__row-label {
					font: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.${PANEL_CLASS} .${PANEL_CLASS}__tooltip-input {
					font: inherit;
					background: var(--tps-panel-bg, color-mix(in srgb, currentColor 4%, transparent));
					border: 1px solid var(--tps-divider, color-mix(in srgb, currentColor 14%, transparent));
					border-radius: 4px;
					padding: 4px 6px;
					color: inherit;
					outline: none;
					width: 100%;
					min-width: 0;
					height: 30px;
					box-sizing: border-box;
				}
				.${PANEL_CLASS} .${PANEL_CLASS}__tooltip-input:focus {
					border-color: currentColor;
				}

				@container (max-width: 620px) {
					.${PANEL_CLASS} .tps-list-row {
						grid-template-columns: 18px minmax(0, 1fr);
						grid-template-areas:
							"icon name"
							". controls";
						align-items: start;
						gap: 8px 12px;
						padding: 12px 0;
					}
					.${PANEL_CLASS} .tps-list-row > div:first-child { grid-area: icon; padding-top: 4px; }
					.${PANEL_CLASS} .tps-list-row[data-sbm-has-tooltip="true"] > div:first-child { padding-top: 0; }
					.${PANEL_CLASS} .tps-list-row > div:nth-child(2) { grid-area: name; min-width: 0; width: 100%; }
					.${PANEL_CLASS} .tps-list-row > div:last-child {
						grid-area: controls;
						width: 100%;
						justify-self: stretch;
					}
					.${PANEL_CLASS} .${PANEL_CLASS}__row-controls {
						justify-content: flex-start;
						align-items: center;
					}
					.${PANEL_CLASS} .${PANEL_CLASS}__row-controls .tps-tabs {
						display: grid;
						grid-template-columns: repeat(4, minmax(0, 1fr));
						width: min(100%, 360px);
						justify-content: stretch;
					}
					.${PANEL_CLASS} .${PANEL_CLASS}__row-controls .tps-tab {
						min-width: 0;
						padding-inline: 6px;
					}
					.${PANEL_CLASS} .${PANEL_CLASS}__drag-handle {
						margin-left: auto;
					}
				}

				@container (max-width: 380px) {
					.${PANEL_CLASS} .${PANEL_CLASS}__row-controls {
						align-items: flex-start;
					}
					.${PANEL_CLASS} .${PANEL_CLASS}__row-controls .tps-tabs {
						grid-template-columns: repeat(2, minmax(0, 1fr));
						width: 100%;
					}
					.${PANEL_CLASS} .${PANEL_CLASS}__drag-handle {
						height: 32px;
					}
				}
			`);
    }
    // ── Apply state to the live DOM ─────────────────────────────────────────
    // Every _apply* early-outs while the kill switch is off so panel edits made
    // in the disabled state can't leak effects into the bar.
    /**
     * Re-apply the whole state to the live bar — used at load and whenever the
     * device adopts a different blob wholesale (remote push, discard). Each
     * _apply* guards the kill switch itself.
     */
    _applyAll() {
      this._applySpacing();
      this._applyIconOnly();
      this._applyHoverRadius();
      this._applyUniformHover();
      this._applySplitHoverZones();
      this._applyTriggerIcon();
      this._scheduleApplyItems();
      if (!this._hasBartenderItems()) this._closeBartenderDrawer(false);
    }
    /**
     * Sync the trigger's icon to `state.triggerIcon`. Deliberately NOT gated on
     * the kill switch: the trigger stays visible while disabled (it's a settings
     * entry point), so its icon should track the setting live.
     */
    _applyTriggerIcon() {
      const name = this._state.triggerIcon || DEFAULT_STATE.triggerIcon;
      if (this._statusItem && this._statusItem.setIcon) {
        try {
          this._statusItem.setIcon(name);
        } catch {
        }
      }
      const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
      if (triggerEl) {
        const iconEl = triggerEl.querySelector(".statusbar-item--icon");
        if (iconEl instanceof HTMLElement) {
          const cleaned = iconEl.className.replace(/\bti-[a-z0-9-]+/g, "").replace(/\s+/g, " ").trim();
          iconEl.className = `${cleaned} ti-${name}`.trim();
          if (!iconEl.classList.contains("ti")) iconEl.classList.add("ti");
        }
      }
    }
    _applySpacing() {
      if (this._disabled) return;
      const px = Math.max(SPACING_MIN, Math.min(SPACING_MAX, Number(this._state.spacing) || 0));
      if (px !== 0) {
        document.body.classList.add(BODY_CUSTOM_SPACING);
        document.body.style.setProperty("--plg-sbm-icon-gap", `${px}px`);
      } else {
        document.body.classList.remove(BODY_CUSTOM_SPACING);
        document.body.style.removeProperty("--plg-sbm-icon-gap");
      }
    }
    _applyIconOnly() {
      if (this._disabled) return;
      document.body.classList.toggle(BODY_ICON_ONLY_PLUGINS, !!this._state.iconOnlyPlugins);
      document.body.classList.toggle(BODY_ICON_ONLY_SHORTCUTS, !!this._state.iconOnlyShortcuts);
    }
    _applyHoverRadius() {
      if (this._disabled) return;
      const px = Math.max(HOVER_RADIUS_MIN, Math.min(HOVER_RADIUS_MAX, Number(this._state.hoverRadius) || 0));
      document.body.style.setProperty("--plg-sbm-hover-radius", `${px}px`);
    }
    _applyUniformHover() {
      if (this._disabled) return;
      const enable = !!this._state.uniformHover;
      document.body.classList.toggle(BODY_UNIFORM_HOVER, enable);
      const targets = this._statusbarHoverTargets();
      if (enable) {
        this._ensureHoverOverlay();
        this._syncHoverMetrics(targets);
      } else {
        this._hideHoverOverlay();
        this._clearHoverMetrics(targets);
      }
    }
    _applySplitHoverZones() {
      if (this._disabled) return;
      document.body.classList.toggle(BODY_SPLIT_HOVER_ZONES, !!this._state.splitHoverZones);
    }
    /**
     * Statusbar items keep their native display/alignment. These targets only
     * receive measured CSS variables used by the pseudo-element hover layer.
     * @returns {HTMLElement[]}
     */
    _statusbarHoverTargets() {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!(bar instanceof HTMLElement)) return [];
      const targets = [];
      const seen = /* @__PURE__ */ new Set();
      const collect = /* @__PURE__ */ __name((selector) => {
        for (const el2 of bar.querySelectorAll(selector)) {
          if (!(el2 instanceof HTMLElement)) continue;
          if (seen.has(el2)) continue;
          seen.add(el2);
          targets.push(el2);
        }
      }, "collect");
      collect(`${RIGHT_SELECTOR} > .statusbar-item`);
      collect(`${RIGHT_SELECTOR} > .statusbar--users`);
      collect(`${LEFT_SELECTOR} > .statusbar-item`);
      return targets;
    }
    /** @param {HTMLElement[]=} targets */
    _clearHoverMetrics(targets = this._statusbarHoverTargets()) {
      document.body.style.removeProperty("--plg-sbm-bar-h");
      for (const el2 of targets) {
        el2.classList.remove(HOVER_TAG_CLASS);
      }
    }
    /** @param {HTMLElement[]=} targets */
    _syncHoverMetrics(targets = this._statusbarHoverTargets()) {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!(bar instanceof HTMLElement)) return;
      const barRect = bar.getBoundingClientRect();
      if (!barRect.height) return;
      document.body.style.setProperty("--plg-sbm-bar-h", `${barRect.height}px`);
      for (const el2 of targets) {
        const rect = el2.getBoundingClientRect();
        if (!rect.width && !rect.height) continue;
        el2.classList.add(HOVER_TAG_CLASS);
      }
    }
    /** @returns {HTMLElement|null} */
    _ensureHoverOverlay() {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!(bar instanceof HTMLElement)) return null;
      if (this._hoverOverlayEl && this._hoverOverlayEl.isConnected) return this._hoverOverlayEl;
      const overlay = document.createElement("div");
      overlay.className = HOVER_OVERLAY_CLASS;
      overlay.setAttribute("aria-hidden", "true");
      bar.prepend(overlay);
      this._hoverOverlayEl = overlay;
      return overlay;
    }
    _hideHoverOverlay() {
      if (this._hoverOverlayEl) this._hoverOverlayEl.classList.remove("is-visible");
    }
    /** @param {MouseEvent} evt */
    _setHoverSideFromPointer(evt) {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!(bar instanceof HTMLElement)) return;
      const rect = bar.getBoundingClientRect();
      if (!rect.width) return;
      const side = this._state.splitHoverZones ? evt.clientX - rect.left < rect.width / 2 ? "left" : "right" : "all";
      const prev = bar.getAttribute("data-sbm-hover-side");
      if (prev === side) return;
      if (prev) this._setHoverClosingSide(prev);
      bar.setAttribute("data-sbm-hover-side", side);
    }
    /**
     * @param {boolean} animate
     */
    _clearHoverSide(animate = true) {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!(bar instanceof HTMLElement)) return;
      const prev = bar.getAttribute("data-sbm-hover-side");
      bar.removeAttribute("data-sbm-hover-side");
      if (animate && prev) this._setHoverClosingSide(prev);
      else bar.removeAttribute("data-sbm-hover-closing-side");
    }
    /** @param {string} side */
    _setHoverClosingSide(side) {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!(bar instanceof HTMLElement)) return;
      if (this._hoverCloseTimer) clearTimeout(this._hoverCloseTimer);
      bar.setAttribute("data-sbm-hover-closing-side", side);
      this._hoverCloseTimer = setTimeout(() => {
        this._hoverCloseTimer = null;
        bar.removeAttribute("data-sbm-hover-closing-side");
      }, HOVER_ANIM_MS);
    }
    /**
     * @param {EventTarget|null} target
     * @returns {HTMLElement|null}
     */
    _hoverTargetFromEvent(target) {
      if (!(target instanceof Element)) return null;
      const el2 = target.closest(`${RIGHT_SELECTOR} > .statusbar-item, ${RIGHT_SELECTOR} > .statusbar--users, ${LEFT_SELECTOR} > .statusbar-item`);
      return el2 instanceof HTMLElement ? el2 : null;
    }
    /** @param {HTMLElement} target */
    _showHoverOverlayFor(target) {
      if (!document.body.classList.contains(BODY_UNIFORM_HOVER)) return;
      const bar = document.querySelector(BAR_SELECTOR);
      const overlay = this._ensureHoverOverlay();
      if (!(bar instanceof HTMLElement) || !overlay) return;
      const barRect = bar.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (!barRect.height || !targetRect.width) return;
      document.body.style.setProperty("--plg-sbm-bar-h", `${barRect.height}px`);
      overlay.style.setProperty("--plg-sbm-hover-left", `${targetRect.left - barRect.left}px`);
      overlay.style.setProperty("--plg-sbm-hover-width", `${targetRect.width}px`);
      overlay.classList.add("is-visible");
    }
    /**
     * Thymer's tooltip arrow CSS expects the `.tooltip` class and data dir.
     * Add that class only when missing, and mark it so unload can restore.
     * @param {HTMLElement} el
     */
    _normalizeTooltipEl(el2) {
      if (!el2.getAttribute("data-tooltip")) return;
      el2.setAttribute("data-tooltip-dir", "top");
      if (!el2.classList.contains("tooltip")) {
        el2.classList.add("tooltip");
        el2.setAttribute("data-sbm-added-tooltip-class", "true");
      }
    }
    _scheduleApplyItems() {
      if (this._disabled) return;
      if (this._renderRaf) return;
      this._renderRaf = requestAnimationFrame(() => {
        this._renderRaf = 0;
        this._applyItems();
        this._applyOrder();
        this._applyUniformHover();
        this._ensureTooltips();
      });
    }
    /**
     * Backfill `data-tooltip` / `data-tooltip-dir` on items that lack them.
     * If overrideTooltips is enabled, FORCE-write tooltips on every item too —
     * built-ins get our curated label; plugin items get a label derived from
     * their existing tooltip (or short-fall to the data-cid). Either way, the
     * tooltip arrow is always positioned via data-tooltip-dir="top".
     */
    _ensureTooltips() {
      if (this._disabled) return;
      const force = !!this._state.overrideTooltips;
      const overrides = this._state.tooltipOverrides || {};
      for (const def of Object.values(BUILTIN)) {
        for (const el2 of document.querySelectorAll(def.selector)) {
          if (!(el2 instanceof HTMLElement)) continue;
          const userOverride = def.key === BUILTIN.shortcuts.key ? "" : overrides[def.key];
          if (userOverride) {
            el2.setAttribute("data-tooltip", userOverride);
          } else if (force && def.tooltip) {
            el2.setAttribute("data-tooltip", def.tooltip);
          } else if (!el2.getAttribute("data-tooltip") && def.tooltip) {
            el2.setAttribute("data-tooltip", def.tooltip);
          }
          this._normalizeTooltipEl(el2);
        }
      }
      for (const item of this._discoverPluginItems()) {
        const userOverride = overrides[item.key];
        if (force) {
          const tip = userOverride || this._shortLabel(item.el.getAttribute("data-tooltip") || "") || item.label;
          if (tip) item.el.setAttribute("data-tooltip", tip);
        } else if (userOverride) {
          item.el.setAttribute("data-tooltip", userOverride);
        }
        this._normalizeTooltipEl(item.el);
      }
      const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
      if (triggerEl instanceof HTMLElement) {
        const userOverride = overrides[TRIGGER_KEY];
        triggerEl.setAttribute("data-tooltip", userOverride || "Status Bar Manager");
        this._normalizeTooltipEl(triggerEl);
      }
      for (const el2 of document.querySelectorAll(`${BAR_SELECTOR} .statusbar-item, ${BAR_SELECTOR} .statusbar--users, ${BAR_SELECTOR} ${LEFT_SELECTOR}`)) {
        if (!(el2 instanceof HTMLElement)) continue;
        if (!el2.getAttribute("data-tooltip")) {
          const fallback = el2.getAttribute("title") || el2.getAttribute("aria-label") || el2.getAttribute("data-cid") || this._shortLabel(el2.textContent || "");
          if (fallback) el2.setAttribute("data-tooltip", fallback);
        }
        this._normalizeTooltipEl(el2);
      }
    }
    /**
     * Default mode for a key with no saved value: built-ins use their
     * `DEFAULT_STATE.modes` entry (else Show); every discovered plugin item
     * (`item:*`) defaults to Hide, so new plugins don't clutter the bar.
     * @param {string} key @returns {ItemMode}
     */
    _defaultModeFor(key) {
      const d = (
        /** @type {Record<string, ItemMode>} */
        DEFAULT_STATE.modes[key]
      );
      if (d) return d;
      if (typeof key === "string" && key.startsWith("item:")) return (
        /** @type {ItemMode} */
        MODES.HIDE
      );
      return (
        /** @type {ItemMode} */
        MODES.SHOW
      );
    }
    _applyItems() {
      if (this._disabled) return;
      if (!this._isActiveInstance()) return;
      const bar = document.querySelector(BAR_SELECTOR);
      if (!bar) return;
      for (const el2 of bar.querySelectorAll("[data-sbm-mode]")) el2.removeAttribute("data-sbm-mode");
      for (const el2 of bar.querySelectorAll("[data-sbm-force-show]")) el2.removeAttribute("data-sbm-force-show");
      const modes = this._state.modes || {};
      for (const def of Object.values(BUILTIN)) {
        const mode = modes[def.key] || this._defaultModeFor(def.key);
        for (const el2 of bar.querySelectorAll(def.selector)) {
          if (!(el2 instanceof HTMLElement)) continue;
          if (mode === MODES.SHOW) {
            if (def.key === BUILTIN.markdownMirror.key || def.key === BUILTIN.mcpBridge.key || def.key === BUILTIN.hotReload.key) {
              el2.setAttribute("data-sbm-force-show", "true");
            }
          } else {
            el2.setAttribute("data-sbm-mode", mode);
          }
        }
      }
      for (const item of this._discoverPluginItems()) {
        const mode = modes[item.key] || this._defaultModeFor(item.key);
        if (mode === MODES.SHOW) continue;
        item.el.setAttribute("data-sbm-mode", mode);
      }
      const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
      if (triggerEl instanceof HTMLElement) {
        const mode = modes[TRIGGER_KEY] || this._defaultModeFor(TRIGGER_KEY);
        if (mode !== MODES.SHOW) triggerEl.setAttribute("data-sbm-mode", mode);
      }
    }
    /**
     * Apply the order map to the live bar. Tags each managed element with
     * `data-sbm-key` and sets inline `style.order`. Items without an explicit
     * order get a position derived from their discovery index, so a fresh
     * install behaves identically to Thymer's default layout.
     */
    _applyOrder() {
      if (this._disabled) return;
      const right = document.querySelector(RIGHT_SELECTOR);
      if (!right) return;
      const items = this._enumerateRightColumn();
      const order = this._state.order || {};
      const orderedItems = [];
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const stored = order[it.key];
        const value = typeof stored === "number" && Number.isFinite(stored) ? stored : it.key === TRIGGER_KEY ? 1e3 : i;
        it.el.setAttribute("data-sbm-key", it.key);
        it.el.style.order = String(value);
        orderedItems.push({ el: it.el, value, index: i });
      }
      orderedItems.sort((a, b) => a.value - b.value || a.index - b.index).forEach((it, index) => {
        it.el.style.setProperty("--plg-sbm-reveal-delay", `${index * REVEAL_STAGGER_MS}ms`);
      });
      const leftItems = document.querySelectorAll(`${LEFT_SELECTOR} > .statusbar-item`);
      let leftIndex = 0;
      for (const el2 of leftItems) {
        if (!(el2 instanceof HTMLElement)) continue;
        el2.style.setProperty("--plg-sbm-reveal-delay", `${leftIndex * REVEAL_STAGGER_MS}ms`);
        leftIndex++;
      }
    }
    /**
     * Enumerate every reorderable element in the right column with a stable key.
     * Icon glyph is looked up live from the matched DOM element so the panel
     * mirrors the EXACT glyph that ships in the bar (no random hardcoded
     * substitutes).
     *
     * @returns {{ key: string, label: string, iconClass: string|null, el: HTMLElement }[]}
     */
    _enumerateRightColumn() {
      const right = document.querySelector(RIGHT_SELECTOR);
      if (!right) return [];
      const out = [];
      for (const def of Object.values(BUILTIN)) {
        if (!def.reorderable) continue;
        const el2 = right.querySelector(def.selector);
        if (el2 instanceof HTMLElement) {
          out.push({ key: def.key, label: def.label, iconClass: this._liveIcon(el2) || def.icon, el: el2 });
        }
      }
      for (const item of this._discoverPluginItems()) {
        out.push(item);
      }
      const triggerEl = right.querySelector(`.${TRIGGER_CLASS}`);
      if (triggerEl instanceof HTMLElement) {
        const triggerIcon = this._liveIcon(triggerEl) || `ti-${this._state.triggerIcon || DEFAULT_STATE.triggerIcon}`;
        out.push({ key: TRIGGER_KEY, label: "Status Bar Manager (this plugin)", iconClass: triggerIcon, el: triggerEl });
      }
      return out;
    }
    /**
     * Read the `.statusbar-item--icon` glyph class out of an item element so
     * the panel can render the exact same icon that's visible in the bar.
     * @param {HTMLElement} el
     * @returns {string|null}
     */
    _liveIcon(el2) {
      const iconEl = el2.querySelector('.statusbar-item--icon, .ti, [class*="ti-"]');
      if (!iconEl) return null;
      return this._extractTiClass(iconEl.className);
    }
    /** @param {string} selector @returns {string|null} */
    _liveIconBySelector(selector) {
      const el2 = document.querySelector(selector);
      if (!(el2 instanceof HTMLElement)) return null;
      return this._liveIcon(el2);
    }
    /** @returns {PluginItem[]} */
    _discoverPluginItems() {
      const right = document.querySelector(RIGHT_SELECTOR);
      if (!right) return [];
      const out = [];
      const candidates = right.querySelectorAll(":scope > .statusbar-item");
      for (const el2 of candidates) {
        if (!(el2 instanceof HTMLElement)) continue;
        if (el2.classList.contains(TRIGGER_CLASS)) continue;
        if (el2.classList.contains("statusbar--users")) continue;
        if (el2.classList.contains("id--sync")) continue;
        if (el2.classList.contains("statusbar--markdown-mirror")) continue;
        if (el2.classList.contains("statusbar--mcp-bridge")) continue;
        if (el2.classList.contains("statusbar--hotreload")) continue;
        if (el2.classList.contains("id--statusbar-msg")) continue;
        if (el2.getAttribute("event") === "onLogo") continue;
        if (el2.querySelector(":scope > .id--users-button")) continue;
        if (!el2.classList.contains("tooltip")) continue;
        let original = el2.getAttribute("data-sbm-original-tooltip");
        const live = el2.getAttribute("data-tooltip") || "";
        if (!original && live) {
          el2.setAttribute("data-sbm-original-tooltip", live);
          original = live;
        }
        const cid = el2.getAttribute("data-cid") || "";
        const iconEl = el2.querySelector(".statusbar-item--icon");
        const iconClass = iconEl ? this._extractTiClass(iconEl.className) : null;
        const key = cid ? `item:${cid}` : `item:${original || live}`;
        if (cid) this._migrateItemKey(`item:${original || live}`, key);
        const override = (this._state.tooltipOverrides || {})[key];
        const label = this._shortLabel(
          override || original || live || el2.getAttribute("aria-label") || el2.getAttribute("title") || ""
        ) || "(unnamed item)";
        out.push({ key, label, iconClass, el: el2 });
      }
      return out;
    }
    /**
     * One-time, best-effort migration of a plugin item's saved settings from the
     * old tooltip-derived key to the stable cid key. Only copies when the new key
     * has no value yet and the old key does, so it never clobbers newer edits.
     * Device-local (store.update — no reload).
     * @param {string} oldKey @param {string} newKey
     */
    _migrateItemKey(oldKey, newKey) {
      if (!oldKey || oldKey === newKey) return;
      const state = (
        /** @type {Record<string, any>} */
        this._state
      );
      const patch = {};
      for (const bag of ["modes", "order", "tooltipOverrides"]) {
        const map = state[bag];
        if (map && map[oldKey] !== void 0 && map[newKey] === void 0) {
          patch[bag] = { ...map, [newKey]: map[oldKey] };
        }
      }
      if (Object.keys(patch).length) {
        this._state = /** @type {SbmState} */
        this._settingsStore.update(patch).settings;
        this._refreshScopePill();
      }
    }
    /** @param {string} tooltip */
    _shortLabel(tooltip) {
      if (!tooltip) return "";
      const cut = tooltip.split(/\s[–-]\s/)[0].trim();
      return cut.length > 48 ? cut.slice(0, 47) + "\u2026" : cut;
    }
    /** @param {string} className @returns {string|null} */
    _extractTiClass(className) {
      const m = String(className || "").match(/\bti-[a-z0-9-]+/);
      return m ? m[0] : null;
    }
    // ── Bar observer ────────────────────────────────────────────────────────
    _observeBar() {
      const bar = document.querySelector(BAR_SELECTOR);
      if (!bar) {
        setTimeout(() => this._observeBar(), 500);
        return;
      }
      this._barObserver = new MutationObserver(() => this._scheduleApplyItems());
      this._barObserver.observe(bar, { childList: true, subtree: true });
      if (!this._resizeHandler) {
        this._resizeHandler = () => this._applyUniformHover();
        window.addEventListener("resize", this._resizeHandler);
      }
      if (!this._hoverMouseOverHandler) {
        this._hoverMouseOverHandler = /** @type {EventListener} */
        ((e) => {
          const evt = (
            /** @type {MouseEvent} */
            e
          );
          this._setHoverSideFromPointer(evt);
          const target = this._hoverTargetFromEvent(evt.target);
          if (target) this._showHoverOverlayFor(target);
        });
        this._hoverMouseMoveHandler = /** @type {EventListener} */
        ((e) => {
          const evt = (
            /** @type {MouseEvent} */
            e
          );
          this._setHoverSideFromPointer(evt);
          const target = this._hoverTargetFromEvent(evt.target);
          if (target) this._showHoverOverlayFor(target);
        });
        this._hoverMouseOutHandler = /** @type {EventListener} */
        ((e) => {
          const evt = (
            /** @type {MouseEvent} */
            e
          );
          const next = this._hoverTargetFromEvent(evt.relatedTarget);
          if (!next) this._hideHoverOverlay();
          if (!(evt.relatedTarget instanceof Node) || !bar.contains(evt.relatedTarget)) {
            this._clearHoverSide(true);
          }
        });
        bar.addEventListener("mouseover", this._hoverMouseOverHandler, true);
        bar.addEventListener("mousemove", this._hoverMouseMoveHandler, true);
        bar.addEventListener("mouseout", this._hoverMouseOutHandler, true);
      }
      if (!this._documentPointerDownHandler) {
        this._documentPointerDownHandler = /** @type {EventListener} */
        ((e) => {
          if (!document.body.classList.contains(BODY_BARTENDER_OPEN)) return;
          const target = e.target;
          if (!(target instanceof Node)) return;
          const currentBar = document.querySelector(BAR_SELECTOR);
          if (currentBar instanceof HTMLElement && currentBar.contains(target)) return;
          if (this._panelEl && this._panelEl.contains(target)) return;
          this._closeBartenderDrawer(true);
        });
        document.addEventListener("pointerdown", this._documentPointerDownHandler, true);
      }
      if (!this._barClickAttached) {
        bar.addEventListener("click", (e) => {
          if (!this._hasBartenderItems()) return;
          const target = (
            /** @type {HTMLElement} */
            e.target
          );
          if (!target) return;
          if (target.closest(`.${TRIGGER_CLASS}`)) return;
          e.stopPropagation();
          e.preventDefault();
          this._toggleBartenderDrawer();
        }, true);
        this._barClickAttached = true;
      }
    }
    // ── Settings panel ──────────────────────────────────────────────────────
    _renderPanel() {
      if (!this._panelEl) return;
      this._panelEl.replaceChildren();
      this._applyItems();
      this._applyOrder();
      const enumerated = this._enumerateRightColumn();
      const ordered = enumerated.slice().sort((a, b) => {
        const oa = Number(a.el.style.order) || 0;
        const ob = Number(b.el.style.order) || 0;
        return oa - ob;
      });
      this._panelEl.appendChild(panel({ pluginClass: PANEL_CLASS }, [
        (() => {
          const conf = typeof this.getConfiguration === "function" ? this.getConfiguration() || {} : {};
          return pluginHeaderFromConfig(conf, {
            version: PLUGIN_VERSION,
            scope: this._scopeArgs(),
            killSwitch: {
              on: !this._disabled,
              onToggle: /* @__PURE__ */ __name((nextOn) => {
                void setPluginDisabled(this, !nextOn, PLUGIN_VERSION);
              }, "onToggle")
            },
            feedback: { data: this.data }
          });
        })(),
        section({
          label: "Layout",
          body: [
            h(
              "div",
              { class: `${PANEL_CLASS}__align` },
              h("div", { class: "tps-list-name" }, "Icon"),
              this._renderTriggerIconPicker()
            ),
            sliderRow({
              label: "Spacing",
              value: this._state.spacing,
              min: SPACING_MIN,
              max: SPACING_MAX,
              step: 1,
              format: /* @__PURE__ */ __name((v) => v === 0 ? "default" : v > 0 ? `+${v}px` : `${v}px`, "format"),
              defaultValue: 0,
              onChange: /* @__PURE__ */ __name((v) => this._setSpacing(v), "onChange")
            }),
            optionRow({
              type: "checkbox",
              name: "sbm-icon-only-plugins",
              label: "Icon-only plugin items",
              checked: !!this._state.iconOnlyPlugins,
              onChange: /* @__PURE__ */ __name((e) => this._setIconOnlyPlugins(!!/** @type {HTMLInputElement} */
              e.target.checked), "onChange")
            }),
            optionRow({
              type: "checkbox",
              name: "sbm-icon-only-shortcuts",
              label: "Icon-only keyboard shortcuts",
              checked: !!this._state.iconOnlyShortcuts,
              onChange: /* @__PURE__ */ __name((e) => this._setIconOnlyShortcuts(!!/** @type {HTMLInputElement} */
              e.target.checked), "onChange")
            }),
            optionRow({
              type: "checkbox",
              name: "sbm-uniform-hover",
              label: "Continuous hover highlight",
              desc: "One highlight slides under whichever bar icon you point at, instead of each icon lighting up in its own separate box.",
              checked: !!this._state.uniformHover,
              onChange: /* @__PURE__ */ __name((e) => this._setUniformHover(!!/** @type {HTMLInputElement} */
              e.target.checked), "onChange")
            }),
            sliderRow({
              label: "Hover radius",
              value: this._state.hoverRadius,
              min: HOVER_RADIUS_MIN,
              max: HOVER_RADIUS_MAX,
              step: 1,
              format: /* @__PURE__ */ __name((v) => `${v}px`, "format"),
              defaultValue: 0,
              onChange: /* @__PURE__ */ __name((v) => this._setHoverRadius(v), "onChange")
            }),
            optionRow({
              type: "checkbox",
              name: "sbm-split-hover-zones",
              label: "Split hover zones left / right",
              desc: "Left half reveals keyboard shortcuts; right half reveals plugin icons.",
              checked: !!this._state.splitHoverZones,
              onChange: /* @__PURE__ */ __name((e) => this._setSplitHoverZones(!!/** @type {HTMLInputElement} */
              e.target.checked), "onChange")
            })
          ]
        }),
        section({
          label: "Left side",
          body: [
            this._modeRow({
              label: BUILTIN.shortcuts.label,
              iconClass: this._liveIconBySelector(BUILTIN.shortcuts.selector) || BUILTIN.shortcuts.icon,
              value: this._state.modes[BUILTIN.shortcuts.key] || this._defaultModeFor(BUILTIN.shortcuts.key),
              options: ITEM_MODE_OPTIONS,
              onChange: /* @__PURE__ */ __name((v) => this._setItemMode(
                BUILTIN.shortcuts.key,
                /** @type {ItemMode} */
                v
              ), "onChange")
            })
          ]
        }),
        section({
          label: `Right side (${ordered.length})`,
          body: [
            this._setAllRow(ordered),
            ...ordered.map((it) => this._modeRow({
              label: it.label,
              iconClass: it.iconClass,
              value: this._state.modes[it.key] || this._defaultModeFor(it.key),
              options: ITEM_MODE_OPTIONS,
              onChange: /* @__PURE__ */ __name((v) => this._setItemMode(
                it.key,
                /** @type {ItemMode} */
                v
              ), "onChange"),
              draggableKey: it.key,
              tooltipKey: it.key
            }))
          ]
        })
      ]));
    }
    _renderTriggerIconPicker() {
      const current = this._state.triggerIcon || DEFAULT_STATE.triggerIcon;
      return h(
        "div",
        { class: `${PANEL_CLASS}__icon-picker` },
        ...TRIGGER_ICON_OPTIONS.map((name) => h("button", {
          type: "button",
          class: `${PANEL_CLASS}__icon-btn`,
          "aria-pressed": String(name === current),
          "aria-label": name,
          title: name,
          onClick: /* @__PURE__ */ __name(() => this._setTriggerIcon(name), "onClick")
        }, h("span", { class: `ti ti-${name}` })))
      );
    }
    /**
     * @param {{
     *   label: string,
     *   iconClass: string|null,
     *   value: string,
     *   options: {value:string,label:string}[],
     *   onChange: (v:string) => void,
     *   modeDisabled?: boolean,
     *   draggableKey?: string | null,
     *   tooltipKey?: string | null,
     * }} args
     */
    _modeRow({ label, iconClass, value, options, onChange, modeDisabled, draggableKey, tooltipKey }) {
      const icon = iconClass ? h("span", { class: `${PANEL_CLASS}__row-icon ti ${iconClass}` }) : h("span", { class: `${PANEL_CLASS}__row-icon ${PANEL_CLASS}__row-icon--blank` });
      const modeCtrl = modeDisabled ? h("span", { class: `${PANEL_CLASS}__row-icon ${PANEL_CLASS}__row-icon--blank`, style: { width: "auto" } }, "\u2014") : tabs({ options, value, onChange });
      if (!modeDisabled && modeCtrl instanceof HTMLElement) {
        const btns = modeCtrl.querySelectorAll(".tps-tab");
        options.forEach((opt, i) => {
          const btn = btns[i];
          if (btn instanceof HTMLElement) btn.setAttribute("data-sbm-mode-opt", opt.value);
        });
      }
      const dragHandle = draggableKey ? h("div", {
        role: "button",
        tabIndex: 0,
        class: `${PANEL_CLASS}__drag-handle`,
        draggable: "true",
        "aria-label": "Drag to reorder",
        title: "Drag to reorder"
      }, h(
        "span",
        { class: `${PANEL_CLASS}__drag-grip` },
        h("span"),
        h("span"),
        h("span"),
        h("span"),
        h("span"),
        h("span")
      )) : null;
      const tooltipExpanded = !!tooltipKey && (this._state.overrideTooltips || !!this._tooltipEditRows?.has(tooltipKey));
      const tooltipToggle = tooltipKey ? h("button", {
        type: "button",
        class: `${PANEL_CLASS}__tooltip-toggle`,
        "aria-pressed": String(tooltipExpanded),
        "aria-label": "Edit tooltip",
        title: "Edit tooltip",
        onClick: /* @__PURE__ */ __name(() => this._toggleTooltipEdit(tooltipKey), "onClick")
      }, h("span", { class: "ti ti-pencil" })) : null;
      const controls = h(
        "div",
        { class: `${PANEL_CLASS}__row-controls` },
        modeCtrl,
        tooltipToggle,
        dragHandle
      );
      let nameSlot = (
        /** @type {Node | string} */
        label
      );
      if (tooltipExpanded) {
        const overrides = this._state.tooltipOverrides || {};
        const currentValue = overrides[tooltipKey] !== void 0 ? overrides[tooltipKey] : this._defaultTooltipFor(tooltipKey) || "";
        const input = h("input", {
          type: "text",
          class: `${PANEL_CLASS}__tooltip-input`,
          value: currentValue,
          placeholder: this._defaultTooltipFor(tooltipKey) || "Tooltip text",
          onInput: /* @__PURE__ */ __name((e) => {
            const v = (
              /** @type {HTMLInputElement} */
              e.target.value
            );
            this._setTooltipOverride(tooltipKey, v);
          }, "onInput")
        });
        nameSlot = h(
          "div",
          { class: `${PANEL_CLASS}__name-stack` },
          h("div", { class: `${PANEL_CLASS}__row-label` }, label),
          input
        );
      }
      const row = listRow({ icon, name: nameSlot, controls });
      if (row instanceof HTMLElement) {
        row.dataset.sbmRowMode = value;
        if (tooltipExpanded) row.dataset.sbmHasTooltip = "true";
        if (draggableKey) {
          row.dataset.sbmRowKey = draggableKey;
          this._wireDragRow(row, dragHandle, draggableKey);
        }
      }
      return row;
    }
    /**
     * Column-header row for the Right side. Its mode buttons sit directly above
     * each item's buttons and set every item at once; the pencil is the global
     * tooltip-edit toggle (formerly the "Override every tooltip" checkbox). No
     * text label — it reads as the header for the columns below.
     * @param {{ key: string }[]} items
     */
    _setAllRow(items) {
      const first = items.length ? this._state.modes[items[0].key] || this._defaultModeFor(items[0].key) : "";
      const allSame = items.length > 0 && items.every((it) => (this._state.modes[it.key] || this._defaultModeFor(it.key)) === first);
      const modeCtrl = tabs({
        options: ITEM_MODE_OPTIONS,
        value: allSame ? first : "",
        onChange: /* @__PURE__ */ __name((v) => this._setAllRightMode(
          /** @type {ItemMode} */
          v,
          items
        ), "onChange")
      });
      if (modeCtrl instanceof HTMLElement) {
        const btns = modeCtrl.querySelectorAll(".tps-tab");
        ITEM_MODE_OPTIONS.forEach((opt, i) => {
          const btn = btns[i];
          if (btn instanceof HTMLElement) btn.setAttribute("data-sbm-mode-opt", opt.value);
        });
      }
      const allOn = !!this._state.overrideTooltips;
      const globalPencil = h("button", {
        type: "button",
        class: `${PANEL_CLASS}__tooltip-toggle`,
        "aria-pressed": String(allOn),
        "aria-label": "Edit every tooltip",
        title: "Edit every tooltip",
        onClick: /* @__PURE__ */ __name(() => this._setOverrideTooltips(!allOn), "onClick")
      }, h("span", { class: "ti ti-pencil" }));
      const dragSpacer = h("div", { class: `${PANEL_CLASS}__drag-spacer`, "aria-hidden": "true" });
      const controls = h("div", { class: `${PANEL_CLASS}__row-controls` }, modeCtrl, globalPencil, dragSpacer);
      const icon = h("span", { class: `${PANEL_CLASS}__row-icon ${PANEL_CLASS}__row-icon--blank` });
      const row = listRow({ icon, name: "", controls });
      if (row instanceof HTMLElement) row.dataset.sbmSetAll = "true";
      return row;
    }
    /**
     * Apply one mode to every right-column item at once.
     * @param {ItemMode} value @param {{ key: string }[]} items
     */
    _setAllRightMode(value, items) {
      if (!Object.values(MODES).includes(value)) return;
      const modes = { ...this._state.modes || {} };
      for (const it of items) modes[it.key] = value;
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ modes }).settings;
      this._applyItems();
      if (!this._hasBartenderItems()) this._closeBartenderDrawer(false);
      this._renderPanel();
    }
    /**
     * Toggle the per-row tooltip editor open/closed. Transient UI state only —
     * not persisted. Re-renders so the input appears/disappears.
     * @param {string} key
     */
    _toggleTooltipEdit(key) {
      if (!this._tooltipEditRows) this._tooltipEditRows = /* @__PURE__ */ new Set();
      if (this._tooltipEditRows.has(key)) this._tooltipEditRows.delete(key);
      else this._tooltipEditRows.add(key);
      this._renderPanel();
    }
    /**
     * Default tooltip text for a given key — used as the placeholder/fallback
     * when overrideTooltips is on. Falls back to the discovered short label.
     * @param {string} key
     */
    _defaultTooltipFor(key) {
      if (key === TRIGGER_KEY) return "Status Bar Manager";
      const builtin = BUILTIN[
        /** @type {keyof typeof BUILTIN} */
        key
      ];
      if (builtin && builtin.tooltip) return builtin.tooltip;
      for (const item of this._discoverPluginItems()) {
        if (item.key === key) {
          return this._shortLabel(item.el.getAttribute("data-tooltip") || "") || item.label;
        }
      }
      return "";
    }
    /**
     * Native HTML5 drag/drop on a row. Drag handle is the only `draggable`
     * surface; drop targets are sibling rows. On drop, we move the source
     * key to before/after the target depending on cursor Y within the row.
     *
     * @param {HTMLElement} row
     * @param {HTMLElement | null} handle
     * @param {string} key
     */
    _wireDragRow(row, handle, key) {
      if (!handle) return;
      handle.addEventListener("dragstart", (e) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", key);
          e.dataTransfer.effectAllowed = "move";
          try {
            e.dataTransfer.setDragImage(row, 12, 12);
          } catch {
          }
        }
        row.classList.add("is-drag-source");
        handle.classList.add("is-dragging");
      });
      handle.addEventListener("dragend", () => {
        row.classList.remove("is-drag-source");
        handle.classList.remove("is-dragging");
        if (this._panelEl) {
          for (const el2 of this._panelEl.querySelectorAll(".is-drop-above, .is-drop-below")) {
            el2.classList.remove("is-drop-above", "is-drop-below");
          }
        }
      });
      row.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
        const rect = row.getBoundingClientRect();
        const above = e.clientY - rect.top < rect.height / 2;
        row.classList.toggle("is-drop-above", above);
        row.classList.toggle("is-drop-below", !above);
      });
      row.addEventListener("dragleave", () => {
        row.classList.remove("is-drop-above", "is-drop-below");
      });
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        const sourceKey = e.dataTransfer && e.dataTransfer.getData("text/plain");
        row.classList.remove("is-drop-above", "is-drop-below");
        if (!sourceKey || sourceKey === key) return;
        const rect = row.getBoundingClientRect();
        const dropBefore = e.clientY - rect.top < rect.height / 2;
        this._moveItemTo(sourceKey, key, dropBefore);
      });
    }
    // ── State setters ───────────────────────────────────────────────────────
    // Every edit routes through the store (device-local, auto-reconverging),
    // then applies to the live bar. Live drag/typing paths (sliders, tooltip
    // inputs) must not full-re-render — they refresh only the scope pill.
    /** @param {number} value */
    _setSpacing(value) {
      const v = Math.max(SPACING_MIN, Math.min(SPACING_MAX, Number(value) || 0));
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ spacing: v }).settings;
      this._applySpacing();
      this._refreshScopePill();
    }
    /** @param {boolean} value */
    _setIconOnlyPlugins(value) {
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ iconOnlyPlugins: !!value }).settings;
      this._applyIconOnly();
      this._renderPanel();
    }
    /** @param {boolean} value */
    _setIconOnlyShortcuts(value) {
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ iconOnlyShortcuts: !!value }).settings;
      this._applyIconOnly();
      this._renderPanel();
    }
    /** @param {string} name */
    _setTriggerIcon(name) {
      if (!TRIGGER_ICON_OPTIONS.includes(name)) return;
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ triggerIcon: name }).settings;
      this._applyTriggerIcon();
      this._renderPanel();
    }
    /** @param {boolean} value */
    _setUniformHover(value) {
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ uniformHover: !!value }).settings;
      this._applyUniformHover();
      this._renderPanel();
    }
    /** @param {number} value */
    _setHoverRadius(value) {
      const v = Math.max(HOVER_RADIUS_MIN, Math.min(HOVER_RADIUS_MAX, Math.round(Number(value) || 0)));
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ hoverRadius: v }).settings;
      this._applyHoverRadius();
      this._refreshScopePill();
    }
    /** @param {boolean} value */
    _setSplitHoverZones(value) {
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ splitHoverZones: !!value }).settings;
      this._applySplitHoverZones();
      this._clearHoverSide(false);
      this._renderPanel();
    }
    /** @param {boolean} value */
    _setOverrideTooltips(value) {
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ overrideTooltips: !!value }).settings;
      this._ensureTooltips();
      this._renderPanel();
    }
    /** @param {string} key @param {string} text */
    _setTooltipOverride(key, text) {
      const next = { ...this._state.tooltipOverrides || {}, [key]: text };
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ tooltipOverrides: next }).settings;
      this._ensureTooltips();
      this._refreshScopePill();
    }
    /** @param {string} key @param {ItemMode} value */
    _setItemMode(key, value) {
      if (!Object.values(MODES).includes(value)) return;
      const modes = { ...this._state.modes || {}, [key]: value };
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ modes }).settings;
      this._applyItems();
      if (!this._hasBartenderItems()) {
        this._closeBartenderDrawer(false);
      }
      this._renderPanel();
    }
    /**
     * Move `sourceKey` to land before/after `targetKey` in the right-column
     * ordering. Rebuilds the entire order map from the current sort, removes
     * the source from its position, re-inserts it relative to the target,
     * then re-normalises 0..N-1.
     *
     * @param {string} sourceKey
     * @param {string} targetKey
     * @param {boolean} dropBefore  true → insert before target; false → after
     */
    _moveItemTo(sourceKey, targetKey, dropBefore) {
      if (sourceKey === targetKey) return;
      const ordered = this._enumerateRightColumn().slice().sort((a, b) => {
        const oa = Number(a.el.style.order) || 0;
        const ob = Number(b.el.style.order) || 0;
        return oa - ob;
      });
      const keys = ordered.map((it) => it.key);
      const fromIdx = keys.indexOf(sourceKey);
      const targetIdx = keys.indexOf(targetKey);
      if (fromIdx < 0 || targetIdx < 0) return;
      keys.splice(fromIdx, 1);
      const adjustedTarget = keys.indexOf(targetKey);
      const insertAt = dropBefore ? adjustedTarget : adjustedTarget + 1;
      keys.splice(insertAt, 0, sourceKey);
      const next = {};
      for (let i = 0; i < keys.length; i++) next[keys[i]] = i;
      this._state = /** @type {SbmState} */
      this._settingsStore.update({ order: next }).settings;
      this._applyOrder();
      this._renderPanel();
    }
    // ── Settings scope (per-device store) ───────────────────────────────────
    /**
     * Scope-cluster wiring for the header pill: push = one saveConfiguration
     * (the reload's hot-reload heal re-renders the panel); discard = two-tap
     * armed in the shared cluster, then re-adopt synced values here.
     */
    _scopeArgs() {
      return {
        diverged: this._settingsStore.isDiverged(),
        localUnavailable: !!this._settingsStore.isLocalUnavailable(),
        onPush: /* @__PURE__ */ __name(() => {
          void this._settingsStore.pushToAll().then((ok) => {
            if (!ok) return;
            try {
              this.ui.addToaster({ title: "Status Bar Manager", message: "Settings applied to all devices", dismissible: true, autoDestroyTime: 3e3 });
            } catch {
            }
            this._refreshScopePill();
          });
        }, "onPush"),
        onDiscard: /* @__PURE__ */ __name(() => {
          this._state = /** @type {SbmState} */
          this._settingsStore.discardLocal();
          this._applyAll();
          this._renderPanel();
          try {
            this.ui.addToaster({ title: "Status Bar Manager", message: "Reverted to synced settings", dismissible: true, autoDestroyTime: 3e3 });
          } catch {
          }
        }, "onDiscard")
      };
    }
    /** Swap just the pill cluster — never nukes inputs mid-edit. */
    _refreshScopePill() {
      const el2 = this._panelEl?.querySelector?.(".tps-scope");
      if (el2) el2.replaceWith(scopeCluster(this._scopeArgs()));
    }
    // ── State normalization ─────────────────────────────────────────────────
    /** True only for the newest live instance (see `ACTIVE_INSTANCE_KEY`). */
    _isActiveInstance() {
      try {
        const active = (
          /** @type {any} */
          window[ACTIVE_INSTANCE_KEY]
        );
        return !active || active === this;
      } catch {
        return true;
      }
    }
    /**
     * Normalizer for the settings store: idempotent, junk-tolerant, and emits a
     * FIXED top-level key set/order/types — both sides of every convergence
     * compare run through it, so map keys are sorted and every value is coerced
     * to its declared type. Schema migration lives here too: the legacy synced
     * blob's sibling `custom.schemaVersion` was write-only (nothing ever read
     * it), so the defaults-spread below IS the whole migration path, and any
     * stray key in a raw blob is dropped by the fixed key set.
     * @param {any} raw @returns {SbmState}
     */
    _normalizeState(raw) {
      raw = raw && typeof raw === "object" ? raw : {};
      const bool = /* @__PURE__ */ __name((v, dflt) => v === void 0 ? dflt : !!v, "bool");
      const int = /* @__PURE__ */ __name((v, dflt, min, max) => {
        const n = Math.round(Number(v));
        return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : dflt;
      }, "int");
      const modeValues = (
        /** @type {string[]} */
        Object.values(MODES)
      );
      const modes = {};
      const rawModes = raw.modes && typeof raw.modes === "object" ? raw.modes : {};
      const modeKeys = [.../* @__PURE__ */ new Set([...Object.keys(DEFAULT_STATE.modes), ...Object.keys(rawModes)])].sort();
      for (const k of modeKeys) {
        const v = modeValues.includes(rawModes[k]) ? rawModes[k] : DEFAULT_STATE.modes[k];
        if (v) modes[k] = /** @type {ItemMode} */
        v;
      }
      const order = {};
      const rawOrder = raw.order && typeof raw.order === "object" ? raw.order : {};
      for (const k of Object.keys(rawOrder).sort()) {
        const n = Number(rawOrder[k]);
        if (Number.isFinite(n)) order[k] = n;
      }
      const tooltipOverrides = {};
      const rawTips = raw.tooltipOverrides && typeof raw.tooltipOverrides === "object" ? raw.tooltipOverrides : {};
      for (const k of Object.keys(rawTips).sort()) {
        if (typeof rawTips[k] === "string") tooltipOverrides[k] = rawTips[k];
      }
      return {
        spacing: int(raw.spacing, DEFAULT_STATE.spacing, SPACING_MIN, SPACING_MAX),
        iconOnlyPlugins: bool(raw.iconOnlyPlugins, DEFAULT_STATE.iconOnlyPlugins),
        iconOnlyShortcuts: bool(raw.iconOnlyShortcuts, DEFAULT_STATE.iconOnlyShortcuts),
        uniformHover: bool(raw.uniformHover, DEFAULT_STATE.uniformHover),
        hoverRadius: int(raw.hoverRadius, DEFAULT_STATE.hoverRadius, HOVER_RADIUS_MIN, HOVER_RADIUS_MAX),
        splitHoverZones: bool(raw.splitHoverZones, DEFAULT_STATE.splitHoverZones),
        overrideTooltips: bool(raw.overrideTooltips, DEFAULT_STATE.overrideTooltips),
        triggerIcon: typeof raw.triggerIcon === "string" && raw.triggerIcon ? raw.triggerIcon : DEFAULT_STATE.triggerIcon,
        tooltipOverrides,
        modes,
        order
      };
    }
  };
  return __toCommonJS(plugin_exports);
})();
var Plugin = plugins.Plugin;
