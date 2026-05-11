/**
 * Status Bar Manager — fine-grained control over Thymer's bottom status bar.
 *
 * For every item in the bar (built-ins + every plugin's contributions), the
 * user picks one of four modes:
 *   • show       — normal (default)
 *   • hide       — fully hidden
 *   • hover      — hidden until the bar is hovered
 *   • bartender  — hidden until the status bar surface is clicked
 *
 * Plus: alignment, spacing (negative allowed), per-icon hover unification,
 * icon-only modes (split between plugin items and shortcut hints), reorderable
 * positions for every item including the trigger itself.
 *
 * Trigger interaction:
 *   • single-click → open settings
 *   • status bar surface click → toggle drawer when any item is in Drawer mode
 *
 * AppPlugin (global). Settings panel rendered with `_panel-system/`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * DANGER: pins to Thymer's internal status-bar DOM. Last verified: 2026-05-04
 *   bar root  → .statusbar--status-bar
 *   left col  → .statusbar--left  (keyboard-shortcut hints)
 *   right col → .statusbar--right (icons, sync, logo, users)
 * ─────────────────────────────────────────────────────────────────────────
 */

const PANEL_CSS = "/*\n * Thymer Plugin Panel — Design Tokens\n *\n * Canonical CSS custom properties for the plugin panel system.\n * Plugins consume this verbatim; component CSS reads from these vars.\n *\n * See _panel-system/DESIGN.md for rationale.\n *\n * Accent inherits from Thymer's active theme through --tps-accent. Plugins\n * must not declare their own panel accent.\n */\n\n.tps-panel {\n  /* ── Color: read directly from Thymer's exposed vars ──────────────── */\n  /* Verified against plugin-collection-icons (which uses these directly): Thymer\n     exposes --text-default, --text-muted, --border-subtle, --bg-hover, etc.\n     Hardcoded values are last-resort fallbacks if the var isn't present. */\n  --tps-text:           var(--text-default,   #e8e8e8);\n  --tps-text-muted:     var(--text-muted,     #9a9a9a);\n  --tps-text-faint:     var(--text-subtle,    #888);\n\n  --tps-bg-input:       var(--input-bg,       rgba(127,127,127,0.06));\n  --tps-bg-hover:       var(--bg-hover,       rgba(127,127,127,0.06));\n  --tps-bg-active:      var(--bg-active,      rgba(127,127,127,0.12));\n\n  --tps-divider:        var(--border-subtle,  rgba(255,255,255,0.07));\n  --tps-border:         var(--border-default, rgba(255,255,255,0.14));\n  --tps-border-strong:  var(--border-strong,  rgba(255,255,255,0.22));\n\n  /* ── Color: accent ────────────────────────────────────────────────────\n   * Always follows the user's Thymer theme. The cascade prefers the most\n   * specific Thymer-exposed variable, falling back through softer signals\n   * to a neutral text-tinted accent if Thymer exposes nothing. Plugins\n   * MUST NOT hardcode their own accent.\n   */\n  --tps-accent:         var(--accent-color,\n                        var(--color-accent,\n                        var(--theme-accent,\n                        var(--color-primary,\n                          currentColor))));\n  --tps-accent-soft:    color-mix(in srgb, var(--tps-accent) 15%, transparent);\n  --tps-accent-strong:  color-mix(in srgb, var(--tps-accent) 80%, var(--tps-text));\n\n  /* ── Color: semantic ──────────────────────────────────────────────── */\n  --tps-danger:         #ef4444;\n  --tps-danger-soft:    rgba(239, 68, 68, 0.15);\n  --tps-warning:        #f59e0b;\n  --tps-success:        #10b981;\n\n  /* ── Typography ───────────────────────────────────────────────────── */\n  /* Font is INHERITED from Thymer's panel chrome (see components.css). Don't\n     override — that fights both the body font and the .ti icon font. */\n\n  --tps-fs-title:       18px;\n  --tps-fs-lede:        13px;\n  --tps-fs-section:     11px;\n  --tps-fs-hint:        12px;\n  --tps-fs-label:       13px;\n  --tps-fs-desc:        12px;\n  --tps-fs-body:        13px;\n  --tps-fs-value:       12px;\n  --tps-fs-button:      12px;\n  --tps-fs-list-header: 10px;\n\n  --tps-lh-tight:       1;\n  --tps-lh-snug:        1.2;\n  --tps-lh-base:        1.4;\n  --tps-lh-loose:       1.5;\n\n  --tps-fw-regular:     400;\n  --tps-fw-medium:      500;\n  --tps-fw-semibold:    600;\n  --tps-fw-bold:        700;\n\n  --tps-ls-section:     0.06em;\n  --tps-ls-list:        0.08em;\n  --tps-ls-title:       0;\n\n  /* ── Spacing (8px scale) ──────────────────────────────────────────── */\n  --tps-space-1:        4px;\n  --tps-space-2:        8px;\n  --tps-space-3:        12px;\n  --tps-space-4:        16px;\n  --tps-space-5:        24px;\n  --tps-space-6:        32px;\n  --tps-space-7:        48px;\n\n  /* ── Radii ────────────────────────────────────────────────────────── */\n  --tps-radius-sm:      4px;\n  --tps-radius-md:      6px;\n  --tps-radius-lg:      8px;\n  --tps-radius-pill:    999px;\n  --tps-radius-circle:  50%;\n\n  /* ── Motion ───────────────────────────────────────────────────────── */\n  --tps-ease-out:       cubic-bezier(0.2, 0.6, 0.2, 1);\n  --tps-ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);\n  --tps-dur-fast:       80ms;\n  --tps-dur-base:       160ms;\n\n  /* ── Shadows (used sparingly — slider thumb only) ─────────────────── */\n  --tps-shadow-thumb:   0 1px 3px rgba(0, 0, 0, 0.3);\n\n  /* ── Component dimensions ─────────────────────────────────────────── */\n  --tps-control-h-sm:   28px;\n  --tps-control-h-md:   32px;\n  --tps-input-w:        64px;\n  --tps-num-step-w:     28px;\n  --tps-swatch-size:    22px;\n  --tps-thumb-size:     16px;\n  --tps-track-h:        6px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .tps-panel {\n    --tps-dur-fast:     1ms;\n    --tps-dur-base:     1ms;\n  }\n}\n\n/*\n * Thymer Plugin Panel — Component Primitives\n *\n * All primitives scope under .tps-panel. Plugin-specific styles live elsewhere.\n * Reads tokens from tokens.css.\n */\n\n/* ── Panel root ─────────────────────────────────────────────────────── */\n\n/* Inherit Thymer's font + sizing — DO NOT override. plugin-collection-icons\n   demonstrates the right approach: simply `font-family: inherit`. Forcing a\n   custom var fights both Thymer's body font AND the .ti icon font. */\n.tps-panel {\n  font-family: inherit;\n  font-size: var(--tps-fs-body);\n  line-height: var(--tps-lh-base);\n  color: var(--tps-text);\n  padding: 0 var(--tps-space-5) var(--tps-space-7);\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  overflow: auto;\n}\n\n.tps-panel *,\n.tps-panel *::before,\n.tps-panel *::after {\n  box-sizing: border-box;\n}\n\n/* Mono opt-ins are explicit per-element, never via a panel-wide override. */\n.tps-panel .tps-num-input,\n.tps-panel .tps-slider-value,\n.tps-panel .tps-mono,\n.tps-panel .tps-mono * {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, \"Courier New\", monospace;\n}\n\n/* ── Title block ────────────────────────────────────────────────────── */\n\n.tps-title {\n  font-size: var(--tps-fs-title);\n  line-height: var(--tps-lh-snug);\n  font-weight: var(--tps-fw-semibold);\n  letter-spacing: var(--tps-ls-title);\n  color: var(--tps-text);\n  margin: 0 0 var(--tps-space-1);\n}\n\n.tps-lede {\n  font-size: var(--tps-fs-lede);\n  line-height: var(--tps-lh-loose);\n  color: var(--tps-text-muted);\n  margin: 0 0 var(--tps-space-3);\n}\n\n/* ── Canonical plugin header ───────────────────────────────────────── */\n\n.tps-plugin-header {\n  position: relative;\n  margin: var(--tps-space-5) 0 var(--tps-space-5);\n  padding: 18px var(--tps-space-4);\n  overflow: hidden;\n  background:\n    linear-gradient(to right,\n      #f26548  8%, #f26548 28%,\n      #fbac56 28%, #fbac56 48%,\n      #fff460 48%, #fff460 68%,\n      #f067a6 68%, #f067a6 88%,\n      #03bdf2 88%\n    ) top left / 100% 1px no-repeat,\n    linear-gradient(to right,\n      #f26548  0%, #f26548 12%,\n      #fbac56 12%, #fbac56 32%,\n      #fff460 32%, #fff460 52%,\n      #f067a6 52%, #f067a6 72%,\n      #03bdf2 72%, #03bdf2 92%\n    ) bottom left / 100% 1px no-repeat,\n    var(--tps-panel-bg, var(--bg-default, var(--plg-ci-theme-bg, transparent)));\n  border-left: 1px solid #f26548;\n  border-right: 1px solid #03bdf2;\n}\n\n.tps-plugin-header-logo {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin: 0 0 var(--tps-space-2, 8px);\n}\n\n.tps-plugin-header-logo-icon {\n  flex: 0 0 auto;\n  font-size: 30px;\n  line-height: 1;\n  color: var(--tps-accent, currentColor);\n}\n\n.tps-plugin-header-title {\n  font-size: 22px;\n  line-height: var(--tps-lh-snug, 1.2);\n  font-weight: var(--tps-fw-semibold, 600);\n  letter-spacing: 0;\n  color: var(--tps-text, var(--text-default, #e8e8e8));\n  margin: 0 0 var(--tps-space-3, 12px);\n}\n\n.tps-plugin-header-version {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: baseline;\n  align-self: baseline;\n  font-size: 11px;\n  line-height: inherit;\n  font-weight: var(--tps-fw-medium, 500);\n  letter-spacing: 0;\n  color: var(--tps-text-faint, var(--text-subtle, #888)) !important;\n  white-space: nowrap;\n}\n\n.tps-plugin-header-lede {\n  font-size: 14px;\n  line-height: var(--tps-lh-base, 1.4);\n  color: var(--tps-text-muted, var(--text-muted, #9a9a9a));\n  margin: 0 0 var(--tps-space-4, 16px);\n}\n\n.tps-plugin-header-attr {\n  display: flex;\n  align-items: baseline;\n  flex-wrap: wrap;\n  gap: var(--tps-space-3, 12px);\n  width: 100%;\n  font-size: 11.5px;\n  line-height: var(--tps-lh-base, 1.4);\n  color: var(--tps-text-muted, var(--text-muted, #888));\n  margin: 0;\n}\n\n.tps-plugin-header-link-group {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 4px;\n}\n\n.tps-plugin-header-icon,\n.tps-plugin-header-attr .ti {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  width: 12px;\n  height: 12px;\n  font-size: 12px;\n  line-height: 1;\n  color: var(--tps-text-muted, var(--text-muted, #888));\n  transform: translateY(2px);\n}\n\n.tps-plugin-header-iconify {\n  background-color: currentColor;\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.tps-plugin-header-iconify-github {\n  --tps-iconify-github: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E\");\n  -webkit-mask-image: var(--tps-iconify-github);\n  mask-image: var(--tps-iconify-github);\n}\n\n.tps-plugin-header-link {\n  color: inherit;\n  text-decoration: underline;\n  text-decoration-color: color-mix(in srgb, currentColor 42%, transparent);\n  transition: color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),\n              text-decoration-color var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out),\n              filter var(--tps-dur-fast, 80ms) var(--tps-ease-out, ease-out);\n}\n\n.tps-plugin-header-link--blue,\n.tps-plugin-header-link--blue:hover {\n  color: #03bdf2;\n  text-decoration-color: #03bdf2;\n}\n\n.tps-plugin-header-link--pink,\n.tps-plugin-header-link--pink:hover {\n  color: #f067a6;\n  text-decoration-color: #f067a6;\n}\n\n.tps-plugin-header-link--muted,\n.tps-plugin-header-link--muted:hover {\n  color: var(--tps-text-faint, var(--text-subtle, #888)) !important;\n  text-decoration-color: color-mix(in srgb, currentColor 42%, transparent);\n}\n\n.tps-plugin-header-link:hover {\n  text-decoration: none;\n  text-decoration-color: transparent;\n  filter: brightness(1.2);\n}\n\n/* ── Section ────────────────────────────────────────────────────────── */\n\n.tps-section {\n  padding: var(--tps-space-6) 0 0;\n}\n\n.tps-section:first-of-type {\n  padding-top: 0;\n}\n\n.tps-section + .tps-section {\n  border-top: 1px solid var(--tps-divider);\n}\n\n.tps-section-label {\n  display: block;\n  font-size: var(--tps-fs-section);\n  line-height: var(--tps-lh-tight);\n  font-weight: var(--tps-fw-semibold);\n  letter-spacing: var(--tps-ls-section);\n  text-transform: uppercase;\n  color: var(--tps-text-muted);\n  margin: 0 0 var(--tps-space-2);\n}\n\n.tps-section-hint {\n  font-size: var(--tps-fs-hint);\n  line-height: var(--tps-lh-base);\n  color: var(--tps-text-muted);\n  margin: 0 0 var(--tps-space-3);\n}\n\n.tps-section-body {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tps-space-3);\n  margin-top: var(--tps-space-2);\n}\n\n.tps-section-body:first-child {\n  margin-top: 0;\n}\n\n/* When the body is full of list rows (mode rows), drop the gap and the top\n   margin entirely so the first row's hover background sits flush under the\n   section label and adjacent rows tile with no dead space between them. */\n.tps-section-body:has(> .tps-list-row),\n.tps-section-body:has(> .tps-opt) {\n  margin-top: 0;\n  gap: 0;\n}\n\n/* Collapsible variant: header is a button, body is hidden when closed */\n\n.tps-section--collapsible > .tps-section-header {\n  display: flex;\n  align-items: center;\n  gap: var(--tps-space-2);\n  width: 100%;\n  padding: 0;\n  margin: 0 0 var(--tps-space-2);\n  background: transparent;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n.tps-section--collapsible > .tps-section-header:hover .tps-section-label {\n  color: var(--tps-text);\n}\n\n.tps-section--collapsible > .tps-section-header .tps-section-label {\n  margin: 0;\n}\n\n.tps-section-chev {\n  display: inline-block;\n  width: 10px;\n  font-size: 10px;\n  line-height: 1;\n  color: var(--tps-text-faint);\n  transition: transform var(--tps-dur-base) var(--tps-ease-out);\n}\n\n.tps-section--collapsible[data-open=\"true\"] .tps-section-chev {\n  transform: rotate(90deg);\n}\n\n.tps-section-summary {\n  margin-left: auto;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  font-size: var(--tps-fs-hint);\n  color: var(--tps-text-muted);\n  font-weight: var(--tps-fw-regular);\n  letter-spacing: 0;\n  text-transform: none;\n}\n\n.tps-section--collapsible[data-open=\"false\"] > .tps-section-body {\n  display: none;\n}\n\n/* ── Option row (checkbox / radio + label + desc) ───────────────────── */\n\n.tps-opt {\n  display: grid;\n  grid-template-columns: 18px 1fr;\n  column-gap: var(--tps-space-3);\n  row-gap: 2px;\n  align-items: start;\n  padding: 6px 10px;\n  margin: 0 -10px;\n  border-radius: var(--tps-radius-md);\n  cursor: pointer;\n  transition: background-color var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n/* Stack option rows tight so the hover background of one meets the next\n   without a visible gap above. Outer section gap is handled by the section\n   itself, not by spacing between opts. */\n.tps-section-body > .tps-opt + .tps-opt {\n  margin-top: 0;\n}\n.tps-section-body:has(> .tps-opt) {\n  gap: 0;\n}\n\n.tps-opt:hover {\n  background: var(--tps-bg-hover);\n}\n\n.tps-opt > input[type=\"checkbox\"],\n.tps-opt > input[type=\"radio\"] {\n  grid-column: 1;\n  grid-row: 1;\n  align-self: center;\n  width: 16px;\n  height: 16px;\n  margin: 0;\n  accent-color: var(--tps-accent);\n  cursor: pointer;\n}\n\n.tps-opt > .tps-opt-label {\n  grid-column: 2;\n  grid-row: 1;\n  font-size: var(--tps-fs-label);\n  line-height: var(--tps-lh-base);\n  font-weight: var(--tps-fw-medium);\n  color: var(--tps-text);\n  transition: color var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n.tps-opt > .tps-opt-desc {\n  grid-column: 2;\n  grid-row: 2;\n  font-size: var(--tps-fs-desc);\n  line-height: var(--tps-lh-base);\n  color: var(--tps-text-muted);\n}\n\n.tps-opt > input:checked ~ .tps-opt-label {\n  color: var(--tps-accent);\n}\n\n/* ── Numeric stepper ────────────────────────────────────────────────── */\n\n.tps-num {\n  display: flex;\n  align-items: center;\n  gap: var(--tps-space-1);\n}\n\n.tps-num-label {\n  flex: 0 0 auto;\n  min-width: 0;\n  font-size: var(--tps-fs-label);\n  color: var(--tps-text);\n  margin-right: var(--tps-space-2);\n}\n\n.tps-num-step,\n.tps-num-input,\n.tps-num-reset {\n  font-family: inherit;\n  font-size: var(--tps-fs-button);\n  height: var(--tps-control-h-sm);\n  border: 1px solid var(--tps-divider);\n  border-radius: var(--tps-radius-sm);\n  background: transparent;\n  color: var(--tps-text);\n  transition: border-color var(--tps-dur-fast) var(--tps-ease-out),\n              background-color var(--tps-dur-fast) var(--tps-ease-out),\n              color var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n.tps-num-step {\n  width: var(--tps-num-step-w);\n  font-size: 14px;\n  line-height: 1;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.tps-num-step:hover {\n  border-color: var(--tps-border);\n  background: var(--tps-bg-hover);\n}\n\n.tps-num-step:active {\n  background: var(--tps-bg-active);\n}\n\n.tps-num-input {\n  width: var(--tps-input-w);\n  padding: 0 var(--tps-space-2);\n  background: var(--tps-bg-input);\n  text-align: center;\n  font-variant-numeric: tabular-nums;\n  -moz-appearance: textfield;\n}\n\n.tps-num-input::-webkit-outer-spin-button,\n.tps-num-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.tps-num-input:focus {\n  outline: none;\n  border-color: var(--tps-accent);\n}\n\n.tps-num-unit {\n  font-size: var(--tps-fs-hint);\n  color: var(--tps-text-muted);\n  margin: 0 var(--tps-space-2);\n}\n\n.tps-num-reset {\n  font-size: 11px;\n  color: var(--tps-text-muted);\n  padding: 0 var(--tps-space-2);\n  cursor: pointer;\n}\n\n.tps-num-reset:hover {\n  color: var(--tps-text);\n  border-color: var(--tps-border);\n}\n\n.tps-num-reset[hidden] {\n  display: none !important;\n}\n\n/* Stacked layout: label / control row in a 200px / 1fr grid */\n\n.tps-num-grid {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  align-items: center;\n  column-gap: var(--tps-space-3);\n  row-gap: var(--tps-space-2);\n}\n\n.tps-num-grid > .tps-num-label {\n  margin: 0;\n  text-align: left;\n}\n\n.tps-num-grid > .tps-num {\n  justify-self: start;\n}\n\n/* ── Slider row ─────────────────────────────────────────────────────── */\n\n.tps-slider {\n  display: grid;\n  grid-template-columns: 90px 1fr 56px auto;\n  align-items: center;\n  gap: var(--tps-space-3);\n}\n\n.tps-slider-label {\n  font-size: var(--tps-fs-section);\n  font-weight: var(--tps-fw-semibold);\n  letter-spacing: var(--tps-ls-section);\n  text-transform: uppercase;\n  color: var(--tps-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.tps-slider-input {\n  width: 100%;\n  height: 22px;\n  appearance: none;\n  -webkit-appearance: none;\n  background: transparent;\n  outline: none;\n  cursor: pointer;\n  touch-action: pan-y;\n}\n\n.tps-slider-input::-webkit-slider-runnable-track {\n  height: var(--tps-track-h);\n  border-radius: 3px;\n  background: var(--tps-divider);\n}\n\n.tps-slider-input::-moz-range-track {\n  height: var(--tps-track-h);\n  border-radius: 3px;\n  background: var(--tps-divider);\n}\n\n.tps-slider-input::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: var(--tps-thumb-size);\n  height: var(--tps-thumb-size);\n  border-radius: var(--tps-radius-circle);\n  background: var(--tps-accent);\n  border: 2px solid rgba(0, 0, 0, 0.3);\n  box-shadow: var(--tps-shadow-thumb);\n  cursor: grab;\n  margin-top: -5px;\n}\n\n.tps-slider-input::-moz-range-thumb {\n  width: var(--tps-thumb-size);\n  height: var(--tps-thumb-size);\n  border-radius: var(--tps-radius-circle);\n  background: var(--tps-accent);\n  border: 2px solid rgba(0, 0, 0, 0.3);\n  box-shadow: var(--tps-shadow-thumb);\n  cursor: grab;\n}\n\n.tps-slider-input:active::-webkit-slider-thumb {\n  cursor: grabbing;\n}\n\n.tps-slider-value {\n  font-family: var(--tps-font-mono);\n  font-size: var(--tps-fs-value);\n  color: var(--tps-text);\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n\n/* ── Swatch + grid ──────────────────────────────────────────────────── */\n\n.tps-swatch-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, var(--tps-swatch-size));\n  gap: var(--tps-space-2) 6px;\n}\n\n.tps-swatch {\n  width: var(--tps-swatch-size);\n  height: var(--tps-swatch-size);\n  border-radius: var(--tps-radius-circle);\n  border: 0;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);\n  transition: transform var(--tps-dur-fast) var(--tps-ease-out),\n              box-shadow var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n.tps-swatch:hover {\n  transform: scale(1.1);\n}\n\n.tps-swatch[aria-pressed=\"true\"] {\n  box-shadow: 0 0 0 2px var(--tps-accent);\n}\n\n/* ── List rows ──────────────────────────────────────────────────────── */\n\n.tps-list {\n  display: flex;\n  flex-direction: column;\n}\n\n.tps-list-header {\n  display: grid;\n  grid-template-columns: 18px 1fr auto;\n  align-items: center;\n  gap: var(--tps-space-3);\n  padding: var(--tps-space-2) var(--tps-space-3);\n  border-bottom: 1px solid var(--tps-divider);\n  font-size: var(--tps-fs-list-header);\n  font-weight: var(--tps-fw-bold);\n  letter-spacing: var(--tps-ls-list);\n  text-transform: uppercase;\n  color: var(--tps-text-faint);\n}\n\n.tps-list-row {\n  display: grid;\n  grid-template-columns: 18px 1fr auto;\n  align-items: center;\n  gap: var(--tps-space-3);\n  padding: var(--tps-space-2) var(--tps-space-3);\n  border-bottom: 1px solid var(--tps-divider);\n  transition: background-color var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n.tps-list-row:last-child {\n  border-bottom: 0;\n}\n\n.tps-list-row:hover {\n  background: var(--tps-bg-hover);\n}\n\n.tps-list-name {\n  font-size: var(--tps-fs-label);\n  color: var(--tps-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n/* ── Tabs / segmented control ───────────────────────────────────────── */\n\n.tps-tabs {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--tps-space-1);\n  padding: 0;\n}\n\n.tps-tab {\n  height: var(--tps-control-h-sm);\n  padding: 0 var(--tps-space-2);\n  font-family: inherit;\n  font-size: var(--tps-fs-button);\n  font-weight: var(--tps-fw-medium);\n  color: var(--tps-text-muted);\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--tps-radius-sm);\n  cursor: pointer;\n  transition: background-color var(--tps-dur-fast) var(--tps-ease-out),\n              border-color var(--tps-dur-fast) var(--tps-ease-out),\n              color var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n.tps-tab:hover {\n  background: var(--tps-bg-hover);\n  color: var(--tps-text);\n}\n\n.tps-tab[aria-pressed=\"true\"],\n.tps-tab[aria-selected=\"true\"] {\n  background: var(--tps-accent-soft);\n  color: var(--tps-accent);\n  border-color: color-mix(in srgb, var(--tps-accent) 50%, transparent);\n}\n\n/* ── Buttons ────────────────────────────────────────────────────────── */\n\n.tps-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--tps-space-1);\n  height: var(--tps-control-h-sm);\n  padding: 0 var(--tps-space-3);\n  font-family: inherit;\n  font-size: var(--tps-fs-button);\n  font-weight: var(--tps-fw-medium);\n  border-radius: var(--tps-radius-sm);\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition: background-color var(--tps-dur-fast) var(--tps-ease-out),\n              border-color var(--tps-dur-fast) var(--tps-ease-out),\n              color var(--tps-dur-fast) var(--tps-ease-out);\n}\n\n.tps-button--md { height: var(--tps-control-h-md); padding: 0 var(--tps-space-4); }\n\n.tps-button--primary {\n  background: var(--tps-accent);\n  color: #0b0b0b;\n}\n\n.tps-button--primary:hover {\n  filter: brightness(1.08);\n}\n\n.tps-button--ghost {\n  background: transparent;\n  border-color: var(--tps-divider);\n  color: var(--tps-text);\n}\n\n.tps-button--ghost:hover {\n  background: var(--tps-bg-hover);\n  border-color: var(--tps-border);\n}\n\n.tps-button--danger {\n  background: transparent;\n  border-color: var(--tps-divider);\n  color: var(--tps-text-muted);\n}\n\n.tps-button--danger:hover {\n  background: var(--tps-danger-soft);\n  border-color: color-mix(in srgb, var(--tps-danger) 40%, transparent);\n  color: var(--tps-danger);\n}\n\n/* ── Focus rings (custom controls only — native inputs use accent-color) ─ */\n\n.tps-tab:focus-visible,\n.tps-button:focus-visible,\n.tps-num-step:focus-visible,\n.tps-num-reset:focus-visible,\n.tps-swatch:focus-visible {\n  outline: 2px solid var(--tps-accent);\n  outline-offset: 2px;\n}\n\n/* ── Inset card variant (rare — for palette-picker body, etc.) ─────── */\n\n.tps-card {\n  padding: var(--tps-space-3);\n  border-radius: var(--tps-radius-lg);\n  background: var(--tps-bg-input);\n  border: 1px solid var(--tps-divider);\n}\n";

/**
 * @param {string} tag
 * @param {Record<string, any> | null} [props]
 * @param {...any} children
 * @returns {any}
 */
function h(tag, props, ...children) {
	const el = document.createElement(tag);
	const dom = /** @type {any} */ (el);
	if (props) {
		for (const k in props) {
			const v = props[k];
			if (v == null || v === false) continue;
			if (k === 'class' || k === 'className') el.className = v;
			else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
			else if (k === 'dataset' && typeof v === 'object') { for (const dk in v) el.dataset[dk] = v[dk]; }
			else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
			else if (k in dom && typeof dom[k] !== 'function') { try { dom[k] = v; } catch { el.setAttribute(k, v); } }
			else el.setAttribute(k, v === true ? '' : String(v));
		}
	}
	appendChildren(el, children);
	return el;
}

/**
 * @param {HTMLElement} parent
 * @param {any[]} children
 */
function appendChildren(parent, children) {
	for (const c of children) {
		if (c == null || c === false) continue;
		if (Array.isArray(c)) { appendChildren(parent, c); continue; }
		parent.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
	}
}

/**
 * @param {{pluginClass?: string}} [opts]
 * @param {any[]} [children]
 * @returns {any}
 */
function panel({ pluginClass } = {}, children = []) {
	const cls = ['tps-panel', pluginClass].filter(Boolean).join(' ');
	return h('div', { class: cls }, ...children);
}

/**
 * @param {{title: string, lede?: string, icon?: string, version?: string}} args
 * @returns {any}
 */
function pluginHeader({ title: heading, lede: ledeText, icon = '', version = '1.0' }) {
	const iconClass = icon ? (icon.startsWith('ti-') ? icon : `ti-${icon}`) : '';
	return h('div', { class: 'tps-plugin-header' },
		iconClass ? h('div', { class: 'tps-plugin-header-logo', 'aria-hidden': 'true' },
			h('i', { class: `ti ${iconClass} tps-plugin-header-logo-icon`, 'aria-hidden': 'true' }),
		) : null,
		h('h1', { class: 'tps-plugin-header-title' }, heading),
		ledeText ? h('p', { class: 'tps-plugin-header-lede' }, ledeText) : null,
		h('p', { class: 'tps-plugin-header-attr' },
				h('span', { class: 'tps-plugin-header-link-group' },
					h('i', { class: 'ti ti-link tps-plugin-header-icon', 'aria-hidden': 'true' }),
				h('a', { class: 'tps-plugin-header-link tps-plugin-header-link--blue', href: 'https://akaready.com', target: '_blank', rel: 'noopener noreferrer' }, '@akaready'),
			),
				h('span', { class: 'tps-plugin-header-link-group' },
					h('i', { class: 'ti ti-coffee tps-plugin-header-icon', 'aria-hidden': 'true' }),
				h('a', { class: 'tps-plugin-header-link tps-plugin-header-link--pink', href: 'https://buymeacoffee.com/akaready', target: '_blank', rel: 'noopener noreferrer' }, 'buy me a coffee'),
			),
				version ? h('span', { class: 'tps-plugin-header-link-group' },
					h('span', { class: 'tps-plugin-header-icon tps-plugin-header-iconify tps-plugin-header-iconify-github', 'aria-hidden': 'true' }),
				h('a', { class: 'tps-plugin-header-link tps-plugin-header-link--muted tps-plugin-header-version', href: 'https://github.com/akaready', target: '_blank', rel: 'noopener noreferrer' }, `v${version}`),
			) : null,
		),
	);
}

/**
 * @param {{
 *   label: string,
 *   hint?: string,
 *   collapsible?: boolean,
 *   defaultOpen?: boolean,
 *   open?: boolean,
 *   onToggle?: (open: boolean) => void,
 *   summary?: any,
 *   body?: any
 * }} args
 * @returns {any}
 */
function section({ label, hint, collapsible, defaultOpen = true, open, onToggle, summary, body = [] }) {
	const bodyChildren = Array.isArray(body) ? body : [body];
	const bodyEl = h('div', { class: 'tps-section-body' }, ...bodyChildren);
	if (!collapsible) {
		return h('section', { class: 'tps-section' },
			h('div', { class: 'tps-section-label' }, label),
			hint ? h('p', { class: 'tps-section-hint' }, hint) : null,
			bodyEl,
		);
	}
	const initialOpen = open == null ? !!defaultOpen : !!open;
	const sectionEl = h('section', { class: 'tps-section tps-section--collapsible', dataset: { open: String(initialOpen) } });
	const chev = h('span', { class: 'tps-section-chev', 'aria-hidden': 'true' }, '▸');
	const labelEl = h('span', { class: 'tps-section-label' }, label);
	const summaryEl = summary ? h('span', { class: 'tps-section-summary' }, summary) : null;
	const header = h('button', {
		type: 'button',
		class: 'tps-section-header',
		'aria-expanded': String(initialOpen),
		onClick: () => {
			const nextOpen = sectionEl.dataset.open !== 'true';
			sectionEl.dataset.open = String(nextOpen);
			header.setAttribute('aria-expanded', String(nextOpen));
			if (onToggle) onToggle(nextOpen);
		},
	}, chev, labelEl, summaryEl);
	sectionEl.appendChild(header);
	if (hint) sectionEl.appendChild(h('p', { class: 'tps-section-hint' }, hint));
	sectionEl.appendChild(bodyEl);
	return sectionEl;
}

/**
 * @param {{
 *   type?: string,
 *   name?: string,
 *   value?: string,
 *   label: string,
 *   desc?: string,
 *   checked?: boolean,
 *   onChange?: (e: Event) => void
 * }} args
 * @returns {any}
 */
function optionRow({ type = 'checkbox', name, value, label, desc, checked, onChange }) {
	const id = `tps-opt-${Math.random().toString(36).slice(2, 9)}`;
	const input = h('input', { type, name, value, id, checked: !!checked, onChange: onChange ? (/** @type {Event} */ e) => onChange(e) : null });
	return h('div', { class: 'tps-opt' }, input, h('label', { class: 'tps-opt-label', for: id }, label), desc ? h('label', { class: 'tps-opt-desc', for: id }, desc) : null);
}

/**
 * @param {{
 *   label: string,
 *   value: number,
 *   min?: number,
 *   max?: number,
 *   step?: number,
 *   format?: (v: number) => string,
 *   defaultValue?: number,
 *   onChange?: (v: number, e?: Event) => void,
 *   onReset?: () => void
 * }} args
 * @returns {any}
 */
function sliderRow({ label, value, min = 0, max = 100, step = 1, format, defaultValue, onChange, onReset }) {
	const fmt = format || ((/** @type {number} */ v) => String(v));
	const input = h('input', {
		type: 'range', class: 'tps-slider-input', value, min, max, step,
		onInput: (/** @type {Event} */ e) => {
			const v = Number((/** @type {HTMLInputElement} */ (e.target)).value);
			readout.textContent = fmt(v);
			if (onChange) onChange(v, e);
		},
	});
	const readout = h('span', { class: 'tps-slider-value' }, fmt(value));
	const reset = defaultValue != null ? h('button', { type: 'button', class: 'tps-num-reset', onClick: () => { input.value = String(defaultValue); readout.textContent = fmt(defaultValue); if (onChange) onChange(defaultValue); if (onReset) onReset(); } }, 'Reset') : null;
	return h('div', { class: 'tps-slider' }, h('span', { class: 'tps-slider-label' }, label), input, readout, reset);
}

/**
 * @param {{icon?: any, name: any, controls?: any}} args
 * @returns {any}
 */
function listRow({ icon, name, controls }) {
	const ctrlChildren = controls == null ? [] : (Array.isArray(controls) ? controls : [controls]);
	return h('div', { class: 'tps-list-row' }, h('div', null, icon || null), h('div', { class: 'tps-list-name' }, name), h('div', null, ...ctrlChildren));
}

/**
 * @param {{options: {value:string,label:string}[], value: any, onChange?: (v:any) => void, multiSelect?: boolean}} args
 * @returns {any}
 */
function tabs({ options, value, onChange, multiSelect = false }) {
	const isActive = (/** @type {string} */ v) => multiSelect ? (Array.isArray(value) && value.includes(v)) : value === v;
	return h('div', { class: 'tps-tabs', role: 'tablist' }, ...options.map((opt) => h('button', {
		type: 'button', class: 'tps-tab', role: 'tab', 'aria-pressed': String(isActive(opt.value)),
		onClick: () => {
			if (!onChange) return;
			if (multiSelect) { const cur = Array.isArray(value) ? value.slice() : []; const i = cur.indexOf(opt.value); if (i >= 0) cur.splice(i, 1); else cur.push(opt.value); onChange(cur); }
			else onChange(opt.value);
		},
	}, opt.label)));
}

/** @typedef {'show'|'hide'|'hover'|'bartender'} ItemMode */
/**
 * @typedef {{
 *   spacing: number,
 *   iconOnlyPlugins: boolean,
 *   iconOnlyShortcuts: boolean,
 *   uniformHover: boolean,
 *   splitHoverZones: boolean,
 *   overrideTooltips: boolean,
 *   triggerIcon: string,
 *   triggerYOffset: number,
 *   modes: Record<string, ItemMode>,
 *   order: Record<string, number>,
 *   tooltipOverrides: Record<string, string>,
 * }} SbmState
 */
/** @typedef {{ key: string, label: string, iconClass: string|null, el: HTMLElement }} PluginItem */

const ROOT_CLASS    = 'plg-status-bar-manager';
const PANEL_CLASS   = `${ROOT_CLASS}-panel`;
const TRIGGER_CLASS = 'plg-sbm-trigger';
const PANEL_TYPE    = 'sbm-settings';
const TRIGGER_KEY   = '__trigger__';

const BAR_SELECTOR   = '.statusbar--status-bar';
const LEFT_SELECTOR  = '.statusbar--left';
const RIGHT_SELECTOR = '.statusbar--right';

const BODY_BARTENDER_OPEN      = 'plg-sbm-bartender-open';
const BODY_BARTENDER_CLOSING   = 'plg-sbm-bartender-closing';
const BODY_ICON_ONLY_PLUGINS   = 'plg-sbm-icon-only-plugins';
const BODY_ICON_ONLY_SHORTCUTS = 'plg-sbm-icon-only-shortcuts';
const BODY_CUSTOM_SPACING      = 'plg-sbm-custom-spacing';
const BODY_UNIFORM_HOVER       = 'plg-sbm-uniform-hover';
const BODY_SPLIT_HOVER_ZONES   = 'plg-sbm-split-hover-zones';
const HOVER_TAG_CLASS          = 'plg-sbm-hover-tagged';
const HOVER_OVERLAY_CLASS      = 'plg-sbm-hover-overlay';
const HOVER_ANIM_MS            = 220;
const REVEAL_STAGGER_MS        = 12;

const MODES = Object.freeze({
	SHOW:      'show',
	HIDE:      'hide',
	HOVER:     'hover',
	BARTENDER: 'bartender',
});

const BUILTIN = Object.freeze({
	shortcuts:      { key: 'shortcuts',      label: 'Keyboard shortcuts', icon: 'ti-keyboard',       selector: LEFT_SELECTOR,                                                                                            reorderable: false, tooltip: 'Keyboard shortcuts' },
	markdownMirror: { key: 'markdownMirror', label: 'Markdown mirror',    icon: 'ti-folder-bolt',    selector: `${RIGHT_SELECTOR} .statusbar--markdown-mirror`,                                                          reorderable: true,  tooltip: 'Markdown mirror' },
	mcpBridge:      { key: 'mcpBridge',      label: 'MCP bridge',         icon: 'ti-plug',           selector: `${RIGHT_SELECTOR} .statusbar--mcp-bridge`,                                                               reorderable: true,  tooltip: 'MCP bridge' },
	hotReload:      { key: 'hotReload',      label: 'Hot reload',         icon: 'ti-progress-bolt',  selector: `${RIGHT_SELECTOR} .statusbar--hotreload`,                                                                reorderable: true,  tooltip: 'Plugin hot reload' },
	thymer:         { key: 'thymer',         label: 'Thymer logo',        icon: 'ti-sparkles',       selector: `${RIGHT_SELECTOR} .statusbar-item[event="onLogo"]`,                                                      reorderable: true,  tooltip: 'Thymer' },
	user:           { key: 'user',           label: 'User & invite',      icon: 'ti-users',          selector: `${RIGHT_SELECTOR} .statusbar--users, ${RIGHT_SELECTOR} .statusbar-item:has(.id--users-button)`,          reorderable: true,  tooltip: 'User & invite' },
	statusMsg:      { key: 'statusMsg',      label: 'Status message',     icon: 'ti-message-circle', selector: `${RIGHT_SELECTOR} .id--statusbar-msg`,                                                                   reorderable: true,  tooltip: 'Status message' },
	sync:           { key: 'sync',           label: 'Sync indicator',     icon: 'ti-refresh',        selector: `${RIGHT_SELECTOR} .id--sync`,                                                                            reorderable: true,  tooltip: 'Sync indicator' },
});

/** @type {SbmState} */
const DEFAULT_STATE = {
	spacing:           0,
	iconOnlyPlugins:   false,
	iconOnlyShortcuts: false,
	uniformHover:      true,
	splitHoverZones:   false,
	overrideTooltips:  false,
	triggerIcon:       'adjustments',
	triggerYOffset:    0,
	tooltipOverrides:  {},
	modes: {
		shortcuts:      /** @type {ItemMode} */ (MODES.SHOW),
		markdownMirror: /** @type {ItemMode} */ (MODES.SHOW),
		mcpBridge:      /** @type {ItemMode} */ (MODES.SHOW),
		hotReload:      /** @type {ItemMode} */ (MODES.SHOW),
		thymer:         /** @type {ItemMode} */ (MODES.SHOW),
		user:           /** @type {ItemMode} */ (MODES.SHOW),
		statusMsg:      /** @type {ItemMode} */ (MODES.SHOW),
		sync:           /** @type {ItemMode} */ (MODES.SHOW),
		[TRIGGER_KEY]:  /** @type {ItemMode} */ (MODES.SHOW),
	},
	order: {},
};

const TRIGGER_ICON_OPTIONS = [
	'adjustments', 'settings', 'tools', 'eye',
	'sparkles', 'gauge', 'target', 'bolt',
	'layout-grid', 'layout-list', 'layout-dashboard', 'puzzle',
];

const SPACING_MIN = -16;
const SPACING_MAX = 16;

const ITEM_MODE_OPTIONS = [
	{ value: MODES.SHOW,      label: 'Show' },
	{ value: MODES.HIDE,      label: 'Hide' },
	{ value: MODES.HOVER,     label: 'Hover' },
	{ value: MODES.BARTENDER, label: 'Drawer' },
];

class Plugin extends AppPlugin {

	onLoad() {
		/** @type {string[]} */
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
		this._configSaveTimer = null;
		this._configSaveInFlight = false;
		this._configSaveQueued = false;
		this._renderRaf = 0;
		this._panelOpenPromise = null;

		this._state = this._loadState();
		if (this._hasLocalObject(this._storageKey())) this._scheduleConfigSave();

		this.ui.injectCSS(PANEL_CSS);
		this._injectStaticCSS();

		this._statusItem = this.ui.addStatusBarItem({
			icon: this._state.triggerIcon || DEFAULT_STATE.triggerIcon,
			tooltip: 'Status Bar Manager',
			onClick: () => { /* handled by our custom click listener below */ },
		});
		const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
		if (triggerEl) {
			triggerEl.classList.add(TRIGGER_CLASS);
			triggerEl.setAttribute('data-tooltip', 'Status Bar Manager');
			triggerEl.setAttribute('data-tooltip-dir', 'top');
			// Trigger click opens settings immediately. Drawer reveal is handled by
			// clicking the status bar surface when Drawer items exist.
			triggerEl.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this._openPanel();
			}, true);
		}

		this._commandItem = this.ui.addCommandPaletteCommand({
			label: 'Plugin: Status Bar Manager',
			icon: 'adjustments',
			onSelected: () => this._openPanel(),
		});

		this.ui.registerCustomPanelType(PANEL_TYPE, (pluginPanel) => {
			try { pluginPanel.setTitle('Configure Status Bar Manager'); } catch {}
			const el = pluginPanel.getElement();
			if (!el) return;
			this._panelEl = el;
			this._renderPanel();
		});

		this._applySpacing();
		this._applyIconOnly();
		this._applyUniformHover();
		this._applySplitHoverZones();
		this._applyTriggerOffset();
		this._scheduleApplyItems();
		this._observeBar();
	}

	onUnload() {
		for (const id of (this._handlerIds || [])) this.events.off(id);
		this._handlerIds = [];

		if (this._barObserver) { this._barObserver.disconnect(); this._barObserver = null; }
		if (this._resizeHandler) { window.removeEventListener('resize', this._resizeHandler); this._resizeHandler = null; }
		const bar = document.querySelector(BAR_SELECTOR);
		if (bar instanceof HTMLElement && this._hoverMouseOverHandler) {
			bar.removeEventListener('mouseover', this._hoverMouseOverHandler, true);
		}
		if (bar instanceof HTMLElement && this._hoverMouseOutHandler) {
			bar.removeEventListener('mouseout', this._hoverMouseOutHandler, true);
		}
		if (bar instanceof HTMLElement && this._hoverMouseMoveHandler) {
			bar.removeEventListener('mousemove', this._hoverMouseMoveHandler, true);
		}
		if (this._documentPointerDownHandler) {
			document.removeEventListener('pointerdown', this._documentPointerDownHandler, true);
		}
		this._hoverMouseOverHandler = null;
		this._hoverMouseOutHandler = null;
		this._hoverMouseMoveHandler = null;
		this._documentPointerDownHandler = null;
		if (this._hoverCloseTimer) { clearTimeout(this._hoverCloseTimer); this._hoverCloseTimer = null; }
		if (this._bartenderCloseTimer) { clearTimeout(this._bartenderCloseTimer); this._bartenderCloseTimer = null; }
		if (this._configSaveTimer) { clearTimeout(this._configSaveTimer); this._configSaveTimer = null; }
		if (this._hoverOverlayEl) {
			this._hoverOverlayEl.remove();
			this._hoverOverlayEl = null;
		}
		if (this._renderRaf) { cancelAnimationFrame(this._renderRaf); this._renderRaf = 0; }
		document.body.classList.remove(
			BODY_BARTENDER_OPEN,
			BODY_BARTENDER_CLOSING,
			BODY_ICON_ONLY_PLUGINS, BODY_ICON_ONLY_SHORTCUTS,
			BODY_CUSTOM_SPACING, BODY_UNIFORM_HOVER, BODY_SPLIT_HOVER_ZONES,
		);
		document.body.style.removeProperty('--plg-sbm-trigger-y');
		document.body.style.removeProperty('--plg-sbm-icon-gap');
		document.body.style.removeProperty('--plg-sbm-bar-h');
		this._clearHoverMetrics();
		this._clearHoverSide(false);
		for (const el of document.querySelectorAll(`[data-sbm-mode]`)) el.removeAttribute('data-sbm-mode');
		for (const el of document.querySelectorAll(`[data-sbm-force-show]`)) el.removeAttribute('data-sbm-force-show');
		// Restore overridden tooltips and drop our cache attribute.
		for (const el of document.querySelectorAll('[data-sbm-original-tooltip]')) {
			if (!(el instanceof HTMLElement)) continue;
			const orig = el.getAttribute('data-sbm-original-tooltip');
			if (orig) el.setAttribute('data-tooltip', orig);
			el.removeAttribute('data-sbm-original-tooltip');
		}
		for (const el of document.querySelectorAll('[data-sbm-key]')) {
			if (el instanceof HTMLElement) {
				el.style.order = '';
				el.style.removeProperty('--plg-sbm-reveal-delay');
			}
			el.removeAttribute('data-sbm-key');
		}
		for (const el of document.querySelectorAll(`${LEFT_SELECTOR} > .statusbar-item`)) {
			if (el instanceof HTMLElement) el.style.removeProperty('--plg-sbm-reveal-delay');
		}
		for (const el of document.querySelectorAll('[data-sbm-added-tooltip-class="true"]')) {
			el.classList.remove('tooltip');
			el.removeAttribute('data-sbm-added-tooltip-class');
		}

		if (this._statusItem) { this._statusItem.remove(); this._statusItem = null; }
		if (this._commandItem) { this._commandItem.remove(); this._commandItem = null; }
		this._panelEl = null;
		this._panelOpenPromise = null;
	}

	_toggleBartenderDrawer() {
		if (document.body.classList.contains(BODY_BARTENDER_OPEN)) this._closeBartenderDrawer(true);
		else this._openBartenderDrawer();
	}

	_openBartenderDrawer() {
		if (this._bartenderCloseTimer) { clearTimeout(this._bartenderCloseTimer); this._bartenderCloseTimer = null; }
		document.body.classList.remove(BODY_BARTENDER_CLOSING);
		document.body.classList.add(BODY_BARTENDER_OPEN);
	}

	/** @param {boolean} animate */
	_closeBartenderDrawer(animate) {
		if (this._bartenderCloseTimer) { clearTimeout(this._bartenderCloseTimer); this._bartenderCloseTimer = null; }
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
		// Only ever allow one settings panel for this plugin to be open at a
		// time. If our last-rendered panel element is still in the DOM, the
		// panel is already open — bail out. (Thymer doesn't fire a "panel
		// closed" event, but the DOM check is a reliable proxy.) Also guard the
		// async open itself so rapid repeated clicks cannot race two panels open.
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
				/* ── Trigger appearance ───────────────────────────────────────
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
			/* User-configurable vertical offset for the trigger icon glyph. */
			.${TRIGGER_CLASS} .statusbar-item--icon {
				transform: translateY(var(--plg-sbm-trigger-y, 0px)) !important;
				display: inline-block;
			}

			/* Anchor the right column to the right edge of the bar so collapsing
			   the keyboard-shortcut column doesn't drag the icons leftward. */
			${BAR_SELECTOR} ${RIGHT_SELECTOR} {
				margin-left: auto !important;
			}

			/* ── Per-item mode rules ───────────────────────────────────────── */
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

			/* Bartender drawer-open state: trigger inherits theme accent — we use
			   currentColor with a brightness boost rather than --logo-color so it
			   tracks the active theme/vibe instead of the default mint. */
			body.${BODY_BARTENDER_OPEN} .${TRIGGER_CLASS} {
				filter: brightness(1.4);
			}

			/* ── Icon-only modes ─────────────────────────────────────────── */
			body.${BODY_ICON_ONLY_PLUGINS} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item .statusbar-item--label {
				display: none !important;
			}
			body.${BODY_ICON_ONLY_SHORTCUTS} ${BAR_SELECTOR} ${LEFT_SELECTOR} .statusbar--kbd-label {
				display: none !important;
			}

			/* ── Custom spacing (supports negative for overlap) ──────────── */
			body.${BODY_CUSTOM_SPACING} ${BAR_SELECTOR} ${RIGHT_SELECTOR} > .statusbar-item + .statusbar-item,
			body.${BODY_CUSTOM_SPACING} ${BAR_SELECTOR} ${LEFT_SELECTOR}  > .statusbar-item + .statusbar-item {
				margin-left: var(--plg-sbm-icon-gap, 4px) !important;
			}

				/* ── Uniform hover (visual only, no layout reflow) ──────────────
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
					background: var(--bg-hover, var(--buttonize-hover-bg, color-mix(in srgb, var(--text-default, currentColor) 10%, transparent))) !important;
					border-radius: 0 !important;
					pointer-events: none;
					opacity: 0;
					z-index: 0;
					transition: opacity 80ms cubic-bezier(0.2, 0.6, 0.2, 1);
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

				/* ── Settings panel ──────────────────────────────────────────── */
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
			/* Keep the buttons interactive even when the row is faded — opacity
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
				border: 1px solid var(--border-subtle, rgba(255,255,255,0.08));
				color: var(--text-muted, currentColor);
				font-size: 18px;
				cursor: pointer;
				padding: 0;
			}
			.${PANEL_CLASS} .${PANEL_CLASS}__icon-btn:hover {
				background: var(--bg-hover, rgba(127,127,127,0.06));
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

			/* ── Drag handle (6 dots) on the far right of each reorderable row */
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
			/* SVG-free 6-dot grip drawn with a tight 2×3 grid of pseudo-circles. */
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
					background: var(--bg-default, rgba(255,255,255,0.03));
					border: 1px solid var(--border-subtle, rgba(255,255,255,0.10));
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

	_applySpacing() {
		const px = Math.max(SPACING_MIN, Math.min(SPACING_MAX, Number(this._state.spacing) || 0));
		if (px !== 0) {
			document.body.classList.add(BODY_CUSTOM_SPACING);
			document.body.style.setProperty('--plg-sbm-icon-gap', `${px}px`);
		} else {
			document.body.classList.remove(BODY_CUSTOM_SPACING);
			document.body.style.removeProperty('--plg-sbm-icon-gap');
		}
	}

	_applyIconOnly() {
		document.body.classList.toggle(BODY_ICON_ONLY_PLUGINS,   !!this._state.iconOnlyPlugins);
		document.body.classList.toggle(BODY_ICON_ONLY_SHORTCUTS, !!this._state.iconOnlyShortcuts);
	}

	_applyUniformHover() {
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
		/** @type {HTMLElement[]} */
		const targets = [];
		const seen = new Set();
		/** @param {string} selector */
		const collect = (selector) => {
			for (const el of bar.querySelectorAll(selector)) {
				if (!(el instanceof HTMLElement)) continue;
				if (seen.has(el)) continue;
				seen.add(el);
				targets.push(el);
			}
		};
		collect(`${RIGHT_SELECTOR} > .statusbar-item`);
		collect(`${RIGHT_SELECTOR} > .statusbar--users`);
		collect(`${LEFT_SELECTOR} > .statusbar-item`);
		return targets;
	}

	/** @param {HTMLElement[]=} targets */
	_clearHoverMetrics(targets = this._statusbarHoverTargets()) {
		document.body.style.removeProperty('--plg-sbm-bar-h');
		for (const el of targets) {
			el.classList.remove(HOVER_TAG_CLASS);
		}
	}

	/** @param {HTMLElement[]=} targets */
	_syncHoverMetrics(targets = this._statusbarHoverTargets()) {
		const bar = document.querySelector(BAR_SELECTOR);
		if (!(bar instanceof HTMLElement)) return;
		const barRect = bar.getBoundingClientRect();
		if (!barRect.height) return;
		document.body.style.setProperty('--plg-sbm-bar-h', `${barRect.height}px`);
		for (const el of targets) {
			const rect = el.getBoundingClientRect();
			if (!rect.width && !rect.height) continue;
			el.classList.add(HOVER_TAG_CLASS);
		}
	}

	/** @returns {HTMLElement|null} */
	_ensureHoverOverlay() {
		const bar = document.querySelector(BAR_SELECTOR);
		if (!(bar instanceof HTMLElement)) return null;
		if (this._hoverOverlayEl && this._hoverOverlayEl.isConnected) return this._hoverOverlayEl;
		const overlay = document.createElement('div');
		overlay.className = HOVER_OVERLAY_CLASS;
		overlay.setAttribute('aria-hidden', 'true');
		bar.prepend(overlay);
		this._hoverOverlayEl = overlay;
		return overlay;
	}

	_hideHoverOverlay() {
		if (this._hoverOverlayEl) this._hoverOverlayEl.classList.remove('is-visible');
	}

	/** @param {MouseEvent} evt */
	_setHoverSideFromPointer(evt) {
		const bar = document.querySelector(BAR_SELECTOR);
		if (!(bar instanceof HTMLElement)) return;
		const rect = bar.getBoundingClientRect();
		if (!rect.width) return;
		const side = this._state.splitHoverZones
			? (evt.clientX - rect.left < rect.width / 2 ? 'left' : 'right')
			: 'all';
		const prev = bar.getAttribute('data-sbm-hover-side');
		if (prev === side) return;
		if (prev) this._setHoverClosingSide(prev);
		bar.setAttribute('data-sbm-hover-side', side);
	}

	/**
	 * @param {boolean} animate
	 */
	_clearHoverSide(animate = true) {
		const bar = document.querySelector(BAR_SELECTOR);
		if (!(bar instanceof HTMLElement)) return;
		const prev = bar.getAttribute('data-sbm-hover-side');
		bar.removeAttribute('data-sbm-hover-side');
		if (animate && prev) this._setHoverClosingSide(prev);
		else bar.removeAttribute('data-sbm-hover-closing-side');
	}

	/** @param {string} side */
	_setHoverClosingSide(side) {
		const bar = document.querySelector(BAR_SELECTOR);
		if (!(bar instanceof HTMLElement)) return;
		if (this._hoverCloseTimer) clearTimeout(this._hoverCloseTimer);
		bar.setAttribute('data-sbm-hover-closing-side', side);
		this._hoverCloseTimer = setTimeout(() => {
			this._hoverCloseTimer = null;
			bar.removeAttribute('data-sbm-hover-closing-side');
		}, HOVER_ANIM_MS);
	}

	/**
	 * @param {EventTarget|null} target
	 * @returns {HTMLElement|null}
	 */
	_hoverTargetFromEvent(target) {
		if (!(target instanceof Element)) return null;
		const el = target.closest(`${RIGHT_SELECTOR} > .statusbar-item, ${RIGHT_SELECTOR} > .statusbar--users, ${LEFT_SELECTOR} > .statusbar-item`);
		return el instanceof HTMLElement ? el : null;
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
		document.body.style.setProperty('--plg-sbm-bar-h', `${barRect.height}px`);
		overlay.style.setProperty('--plg-sbm-hover-left', `${targetRect.left - barRect.left}px`);
		overlay.style.setProperty('--plg-sbm-hover-width', `${targetRect.width}px`);
		overlay.classList.add('is-visible');
	}

	/**
	 * Thymer's tooltip arrow CSS expects the `.tooltip` class and data dir.
	 * Add that class only when missing, and mark it so unload can restore.
	 * @param {HTMLElement} el
	 */
	_normalizeTooltipEl(el) {
		if (!el.getAttribute('data-tooltip')) return;
		el.setAttribute('data-tooltip-dir', 'top');
		if (!el.classList.contains('tooltip')) {
			el.classList.add('tooltip');
			el.setAttribute('data-sbm-added-tooltip-class', 'true');
		}
	}

	_scheduleApplyItems() {
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
		const force = !!this._state.overrideTooltips;
		const overrides = this._state.tooltipOverrides || {};

		// Built-ins
		for (const def of Object.values(BUILTIN)) {
			for (const el of document.querySelectorAll(def.selector)) {
				if (!(el instanceof HTMLElement)) continue;
				const userOverride = def.key === BUILTIN.shortcuts.key ? '' : overrides[def.key];
				const should = (force && (userOverride || def.tooltip))
					|| (!force && !el.getAttribute('data-tooltip') && def.tooltip);
				if (should) {
					el.setAttribute('data-tooltip', userOverride || def.tooltip);
				}
				this._normalizeTooltipEl(el);
			}
		}

		// Plugin items
		for (const item of this._discoverPluginItems()) {
			const userOverride = overrides[item.key];
			if (force) {
				const tip = userOverride
					|| this._shortLabel(item.el.getAttribute('data-tooltip') || '')
					|| item.label;
				if (tip) item.el.setAttribute('data-tooltip', tip);
			} else if (userOverride) {
				item.el.setAttribute('data-tooltip', userOverride);
			}
			this._normalizeTooltipEl(item.el);
		}

		// Trigger
		const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
		if (triggerEl instanceof HTMLElement) {
			const userOverride = overrides[TRIGGER_KEY];
			triggerEl.setAttribute('data-tooltip', userOverride || 'Status Bar Manager');
			this._normalizeTooltipEl(triggerEl);
		}

		// Final pass: every visible status item gets the same top tooltip setup.
		for (const el of document.querySelectorAll(`${BAR_SELECTOR} .statusbar-item, ${BAR_SELECTOR} .statusbar--users, ${BAR_SELECTOR} ${LEFT_SELECTOR}`)) {
			if (!(el instanceof HTMLElement)) continue;
			if (!el.getAttribute('data-tooltip')) {
				const fallback =
					el.getAttribute('title') ||
					el.getAttribute('aria-label') ||
					el.getAttribute('data-cid') ||
					this._shortLabel(el.textContent || '');
				if (fallback) el.setAttribute('data-tooltip', fallback);
			}
			this._normalizeTooltipEl(el);
		}
	}

	/**
	 * Apply the user's vertical offset for the trigger icon, expressed in px.
	 * Renders as a CSS variable on body, consumed by a static rule that targets
	 * the trigger's icon glyph specifically.
	 */
	_applyTriggerOffset() {
		const px = Number(this._state.triggerYOffset) || 0;
		document.body.style.setProperty('--plg-sbm-trigger-y', `${px}px`);
	}

	_applyItems() {
		const bar = document.querySelector(BAR_SELECTOR);
		if (!bar) return;

		for (const el of bar.querySelectorAll('[data-sbm-mode]')) el.removeAttribute('data-sbm-mode');
		for (const el of bar.querySelectorAll('[data-sbm-force-show]')) el.removeAttribute('data-sbm-force-show');
		const modes = this._state.modes || {};

		for (const def of Object.values(BUILTIN)) {
			const mode = modes[def.key] || MODES.SHOW;
			for (const el of bar.querySelectorAll(def.selector)) {
				if (!(el instanceof HTMLElement)) continue;
				if (mode === MODES.SHOW) {
					if (def.key === BUILTIN.markdownMirror.key || def.key === BUILTIN.mcpBridge.key || def.key === BUILTIN.hotReload.key) {
						el.setAttribute('data-sbm-force-show', 'true');
					}
				} else {
					el.setAttribute('data-sbm-mode', mode);
				}
			}
		}

		for (const item of this._discoverPluginItems()) {
			const mode = modes[item.key] || MODES.SHOW;
			if (mode === MODES.SHOW) continue;
			item.el.setAttribute('data-sbm-mode', mode);
		}

		const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
		if (triggerEl instanceof HTMLElement) {
			const mode = modes[TRIGGER_KEY] || MODES.SHOW;
			if (mode !== MODES.SHOW) triggerEl.setAttribute('data-sbm-mode', mode);
		}
	}

	/**
	 * Apply the order map to the live bar. Tags each managed element with
	 * `data-sbm-key` and sets inline `style.order`. Items without an explicit
	 * order get a position derived from their discovery index, so a fresh
	 * install behaves identically to Thymer's default layout.
	 */
	_applyOrder() {
		const right = document.querySelector(RIGHT_SELECTOR);
		if (!right) return;

		const items = this._enumerateRightColumn();
		const order = this._state.order || {};
		/** @type {{ el: HTMLElement, value: number, index: number }[]} */
		const orderedItems = [];

		// Compute final order ints. Stored values win; missing keys fall back to
		// discovery index (0,1,2,...). Trigger defaults to far right (1000).
		for (let i = 0; i < items.length; i++) {
			const it = items[i];
			const stored = order[it.key];
			const value = (typeof stored === 'number' && Number.isFinite(stored))
				? stored
				: (it.key === TRIGGER_KEY ? 1000 : i);
			it.el.setAttribute('data-sbm-key', it.key);
			it.el.style.order = String(value);
			orderedItems.push({ el: it.el, value, index: i });
		}

		orderedItems
			.sort((a, b) => (a.value - b.value) || (a.index - b.index))
			.forEach((it, index) => {
				it.el.style.setProperty('--plg-sbm-reveal-delay', `${index * REVEAL_STAGGER_MS}ms`);
			});

		const leftItems = document.querySelectorAll(`${LEFT_SELECTOR} > .statusbar-item`);
		let leftIndex = 0;
		for (const el of leftItems) {
			if (!(el instanceof HTMLElement)) continue;
			el.style.setProperty('--plg-sbm-reveal-delay', `${leftIndex * REVEAL_STAGGER_MS}ms`);
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

		/** @type {{ key: string, label: string, iconClass: string|null, el: HTMLElement }[]} */
		const out = [];

		for (const def of Object.values(BUILTIN)) {
			if (!def.reorderable) continue;
			const el = right.querySelector(def.selector);
			if (el instanceof HTMLElement) {
				out.push({ key: def.key, label: def.label, iconClass: this._liveIcon(el) || def.icon, el });
			}
		}
		for (const item of this._discoverPluginItems()) {
			out.push(item);
		}
		const triggerEl = right.querySelector(`.${TRIGGER_CLASS}`);
		if (triggerEl instanceof HTMLElement) {
			const triggerIcon = this._liveIcon(triggerEl) || `ti-${this._state.triggerIcon || DEFAULT_STATE.triggerIcon}`;
			out.push({ key: TRIGGER_KEY, label: 'Status Bar Manager (this plugin)', iconClass: triggerIcon, el: triggerEl });
		}
		return out;
	}

	/**
	 * Read the `.statusbar-item--icon` glyph class out of an item element so
	 * the panel can render the exact same icon that's visible in the bar.
	 * @param {HTMLElement} el
	 * @returns {string|null}
	 */
	_liveIcon(el) {
		const iconEl = el.querySelector('.statusbar-item--icon, .ti, [class*="ti-"]');
		if (!iconEl) return null;
		return this._extractTiClass(iconEl.className);
	}

	/** @param {string} selector @returns {string|null} */
	_liveIconBySelector(selector) {
		const el = document.querySelector(selector);
		if (!(el instanceof HTMLElement)) return null;
		return this._liveIcon(el);
	}

	/** @returns {PluginItem[]} */
	_discoverPluginItems() {
		const right = document.querySelector(RIGHT_SELECTOR);
		if (!right) return [];
		/** @type {PluginItem[]} */
		const out = [];
		const candidates = right.querySelectorAll(':scope > .statusbar-item');
		for (const el of candidates) {
			if (!(el instanceof HTMLElement)) continue;
			if (el.classList.contains(TRIGGER_CLASS)) continue;
			if (el.classList.contains('statusbar--users')) continue;
			if (el.classList.contains('id--sync')) continue;
			if (el.classList.contains('statusbar--markdown-mirror')) continue;
			if (el.classList.contains('statusbar--mcp-bridge')) continue;
			if (el.classList.contains('statusbar--hotreload')) continue;
			if (el.classList.contains('id--statusbar-msg')) continue;
			if (el.getAttribute('event') === 'onLogo') continue;
			if (el.querySelector(':scope > .id--users-button')) continue;
			if (!el.classList.contains('tooltip')) continue;

			// Snapshot the original tooltip on first sight — used for both the
			// stable key and the row label, so user-edited tooltips don't
			// rename the row in the panel.
			let original = el.getAttribute('data-sbm-original-tooltip');
			const live = el.getAttribute('data-tooltip') || '';
			if (!original && live) {
				el.setAttribute('data-sbm-original-tooltip', live);
				original = live;
			}
			const cid = el.getAttribute('data-cid') || '';
			const labelSource = original || live;
			const label = this._shortLabel(labelSource) || '(unnamed item)';
			const iconEl = el.querySelector('.statusbar-item--icon');
			const iconClass = iconEl ? this._extractTiClass(iconEl.className) : null;
			out.push({ key: `item:${original || live || cid}`, label, iconClass, el });
		}
		return out;
	}

	/** @param {string} tooltip */
	_shortLabel(tooltip) {
		if (!tooltip) return '';
		const cut = tooltip.split(/\s[–-]\s/)[0].trim();
		return cut.length > 48 ? cut.slice(0, 47) + '…' : cut;
	}

	/** @param {string} className @returns {string|null} */
	_extractTiClass(className) {
		const m = String(className || '').match(/\bti-[a-z0-9-]+/);
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
			window.addEventListener('resize', this._resizeHandler);
		}

		if (!this._hoverMouseOverHandler) {
			this._hoverMouseOverHandler = /** @type {EventListener} */ ((e) => {
				const evt = /** @type {MouseEvent} */ (e);
				this._setHoverSideFromPointer(evt);
				const target = this._hoverTargetFromEvent(evt.target);
				if (target) this._showHoverOverlayFor(target);
			});
			this._hoverMouseMoveHandler = /** @type {EventListener} */ ((e) => {
				this._setHoverSideFromPointer(/** @type {MouseEvent} */ (e));
			});
			this._hoverMouseOutHandler = /** @type {EventListener} */ ((e) => {
				const evt = /** @type {MouseEvent} */ (e);
				const next = this._hoverTargetFromEvent(evt.relatedTarget);
				if (!next) this._hideHoverOverlay();
				if (!(evt.relatedTarget instanceof Node) || !bar.contains(evt.relatedTarget)) {
					this._clearHoverSide(true);
				}
			});
			bar.addEventListener('mouseover', this._hoverMouseOverHandler, true);
			bar.addEventListener('mousemove', this._hoverMouseMoveHandler, true);
			bar.addEventListener('mouseout', this._hoverMouseOutHandler, true);
		}

		if (!this._documentPointerDownHandler) {
			this._documentPointerDownHandler = /** @type {EventListener} */ ((e) => {
				if (!document.body.classList.contains(BODY_BARTENDER_OPEN)) return;
				const target = e.target;
				if (!(target instanceof Node)) return;
				const currentBar = document.querySelector(BAR_SELECTOR);
				if (currentBar instanceof HTMLElement && currentBar.contains(target)) return;
				if (this._panelEl && this._panelEl.contains(target)) return;
				this._closeBartenderDrawer(true);
			});
			document.addEventListener('pointerdown', this._documentPointerDownHandler, true);
		}

		if (!this._barClickAttached) {
			bar.addEventListener('click', (e) => {
				if (!this._hasBartenderItems()) return;
				const target = /** @type {HTMLElement} */ (e.target);
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

		// Build a flat ordered list of every reorderable thing in the right
		// column, sorted by their applied `order` so the panel mirrors the bar.
		const enumerated = this._enumerateRightColumn();
		const ordered = enumerated.slice().sort((a, b) => {
			const oa = Number(a.el.style.order) || 0;
			const ob = Number(b.el.style.order) || 0;
			return oa - ob;
		});

		this._panelEl.appendChild(panel({ pluginClass: PANEL_CLASS }, [
			pluginHeader({
				title: 'Status Bar Manager',
				lede: 'Per-item control: Show, Hide, Hover, or Drawer. Reorder items with ↑/↓.',
				icon: `ti-${this._state.triggerIcon || DEFAULT_STATE.triggerIcon}`,
				version: '1.0',
			}),

			section({
				label: 'Layout',
				body: [
					h('div', { class: `${PANEL_CLASS}__align` },
						h('div', { class: 'tps-list-name' }, 'Icon'),
						this._renderTriggerIconPicker(),
					),
					sliderRow({
						label: 'Offset',
						value: this._state.triggerYOffset,
						min: -10,
						max: 10,
						step: 0.5,
						format: (/** @type {number} */ v) => {
							const px = Number(v).toFixed(1).replace(/\.0$/, '');
							return Number(v) === 0 ? 'default' : (Number(v) > 0 ? `+${px}px` : `${px}px`);
						},
						defaultValue: 0,
						onChange: (/** @type {number} */ v) => this._setTriggerYOffset(v),
					}),
					sliderRow({
						label: 'Spacing',
						value: this._state.spacing,
						min: SPACING_MIN,
						max: SPACING_MAX,
						step: 1,
						format: (/** @type {number} */ v) => v === 0 ? 'default' : (v > 0 ? `+${v}px` : `${v}px`),
						defaultValue: 0,
						onChange: (/** @type {number} */ v) => this._setSpacing(v),
					}),
					optionRow({
						type: 'checkbox',
						name: 'sbm-icon-only-plugins',
						label: 'Icon-only plugin items',
						checked: !!this._state.iconOnlyPlugins,
						onChange: (/** @type {Event} */ e) => this._setIconOnlyPlugins(!!(/** @type {HTMLInputElement} */ (e.target).checked)),
					}),
					optionRow({
						type: 'checkbox',
						name: 'sbm-icon-only-shortcuts',
						label: 'Icon-only keyboard shortcuts',
						checked: !!this._state.iconOnlyShortcuts,
						onChange: (/** @type {Event} */ e) => this._setIconOnlyShortcuts(!!(/** @type {HTMLInputElement} */ (e.target).checked)),
					}),
					optionRow({
						type: 'checkbox',
						name: 'sbm-uniform-hover',
						label: 'Unified hover on every icon',
						checked: !!this._state.uniformHover,
						onChange: (/** @type {Event} */ e) => this._setUniformHover(!!(/** @type {HTMLInputElement} */ (e.target).checked)),
					}),
					optionRow({
						type: 'checkbox',
						name: 'sbm-split-hover-zones',
						label: 'Split hover zones left / right',
						desc: 'Left half reveals keyboard shortcuts; right half reveals plugin icons.',
						checked: !!this._state.splitHoverZones,
						onChange: (/** @type {Event} */ e) => this._setSplitHoverZones(!!(/** @type {HTMLInputElement} */ (e.target).checked)),
					}),
					optionRow({
						type: 'checkbox',
						name: 'sbm-override-tooltips',
						label: 'Override every tooltip (enables editable tooltip text per row below)',
						checked: !!this._state.overrideTooltips,
						onChange: (/** @type {Event} */ e) => this._setOverrideTooltips(!!(/** @type {HTMLInputElement} */ (e.target).checked)),
					}),
				],
			}),

			section({
				label: 'Left side',
				body: [
					this._modeRow({
						label: BUILTIN.shortcuts.label,
						iconClass: this._liveIconBySelector(BUILTIN.shortcuts.selector) || BUILTIN.shortcuts.icon,
						value: this._state.modes[BUILTIN.shortcuts.key] || MODES.SHOW,
						options: ITEM_MODE_OPTIONS,
						onChange: (/** @type {string} */ v) => this._setItemMode(BUILTIN.shortcuts.key, /** @type {ItemMode} */ (v)),
					}),
				],
			}),

			section({
				label: `Right side (${ordered.length})`,
				body: ordered.map(it => this._modeRow({
					label: it.label,
					iconClass: it.iconClass,
					value: this._state.modes[it.key] || MODES.SHOW,
					options: ITEM_MODE_OPTIONS,
					onChange: (/** @type {string} */ v) => this._setItemMode(it.key, /** @type {ItemMode} */ (v)),
					draggableKey: it.key,
					tooltipKey: it.key,
				})),
			}),
		]));
	}

	_renderTriggerIconPicker() {
		const current = this._state.triggerIcon || DEFAULT_STATE.triggerIcon;
		return h('div', { class: `${PANEL_CLASS}__icon-picker` },
			...TRIGGER_ICON_OPTIONS.map(name => h('button', {
				type: 'button',
				class: `${PANEL_CLASS}__icon-btn`,
				'aria-pressed': String(name === current),
				'aria-label': name,
				title: name,
				onClick: () => this._setTriggerIcon(name),
			}, h('span', { class: `ti ti-${name}` }))),
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
		const icon = iconClass
			? h('span', { class: `${PANEL_CLASS}__row-icon ti ${iconClass}` })
			: h('span', { class: `${PANEL_CLASS}__row-icon ${PANEL_CLASS}__row-icon--blank` });

		const modeCtrl = modeDisabled
			? h('span', { class: `${PANEL_CLASS}__row-icon ${PANEL_CLASS}__row-icon--blank`, style: { width: 'auto' } }, '—')
			: tabs({ options, value, onChange });

		const dragHandle = draggableKey
			? h('button', {
				type: 'button',
				class: `${PANEL_CLASS}__drag-handle`,
				draggable: 'true',
				'aria-label': 'Drag to reorder',
				title: 'Drag to reorder',
			}, h('span', { class: `${PANEL_CLASS}__drag-grip` },
				h('span'), h('span'),
				h('span'), h('span'),
				h('span'), h('span'),
			))
			: null;

		const controls = h('div', { class: `${PANEL_CLASS}__row-controls` },
			modeCtrl,
			dragHandle,
		);

		// Tooltip-edit input lives in the name slot, beneath the original
		// label. Label is NEVER altered — it stays as the plugin name.
		// Input pre-fills with the current effective tooltip (override if
		// any, otherwise the default), so the user sees and edits real text
		// rather than an empty box with a placeholder.
		let nameSlot = /** @type {Node | string} */ (label);
		if (tooltipKey && this._state.overrideTooltips) {
			const overrides = this._state.tooltipOverrides || {};
			const currentValue = overrides[tooltipKey] !== undefined
				? overrides[tooltipKey]
				: (this._defaultTooltipFor(tooltipKey) || '');
			const input = h('input', {
				type: 'text',
				class: `${PANEL_CLASS}__tooltip-input`,
				value: currentValue,
				onInput: (/** @type {Event} */ e) => {
					const v = /** @type {HTMLInputElement} */ (e.target).value;
					this._setTooltipOverride(tooltipKey, v);
				},
			});
			nameSlot = h('div', { class: `${PANEL_CLASS}__name-stack` },
				h('div', { class: `${PANEL_CLASS}__row-label` }, label),
				input,
			);
		}

		const row = listRow({ icon, name: nameSlot, controls });
		if (row instanceof HTMLElement) {
			row.dataset.sbmRowMode = value;
			if (tooltipKey && this._state.overrideTooltips) row.dataset.sbmHasTooltip = 'true';
			if (draggableKey) {
				row.dataset.sbmRowKey = draggableKey;
				this._wireDragRow(row, dragHandle, draggableKey);
			}
		}
		return row;
	}

	/**
	 * Default tooltip text for a given key — used as the placeholder/fallback
	 * when overrideTooltips is on. Falls back to the discovered short label.
	 * @param {string} key
	 */
	_defaultTooltipFor(key) {
		if (key === TRIGGER_KEY) return 'Status Bar Manager';
		const builtin = BUILTIN[/** @type {keyof typeof BUILTIN} */ (key)];
		if (builtin && builtin.tooltip) return builtin.tooltip;
		// Plugin item — derive from current data-tooltip on the live element.
		for (const item of this._discoverPluginItems()) {
			if (item.key === key) {
				return this._shortLabel(item.el.getAttribute('data-tooltip') || '') || item.label;
			}
		}
		return '';
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

		handle.addEventListener('dragstart', (e) => {
			if (e.dataTransfer) {
				e.dataTransfer.setData('text/plain', key);
				e.dataTransfer.effectAllowed = 'move';
				try { e.dataTransfer.setDragImage(row, 12, 12); } catch { /* unsupported */ }
			}
			row.classList.add('is-drag-source');
			handle.classList.add('is-dragging');
		});
		handle.addEventListener('dragend', () => {
			row.classList.remove('is-drag-source');
			handle.classList.remove('is-dragging');
			// Clear any leftover drop indicators across the panel.
			if (this._panelEl) {
				for (const el of this._panelEl.querySelectorAll('.is-drop-above, .is-drop-below')) {
					el.classList.remove('is-drop-above', 'is-drop-below');
				}
			}
		});

		row.addEventListener('dragover', (e) => {
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
			const rect = row.getBoundingClientRect();
			const above = (e.clientY - rect.top) < (rect.height / 2);
			row.classList.toggle('is-drop-above', above);
			row.classList.toggle('is-drop-below', !above);
		});
		row.addEventListener('dragleave', () => {
			row.classList.remove('is-drop-above', 'is-drop-below');
		});
		row.addEventListener('drop', (e) => {
			e.preventDefault();
			const sourceKey = e.dataTransfer && e.dataTransfer.getData('text/plain');
			row.classList.remove('is-drop-above', 'is-drop-below');
			if (!sourceKey || sourceKey === key) return;
			const rect = row.getBoundingClientRect();
			const dropBefore = (e.clientY - rect.top) < (rect.height / 2);
			this._moveItemTo(sourceKey, key, dropBefore);
		});
	}

	// ── State setters ───────────────────────────────────────────────────────

	/** @param {number} value */
	_setSpacing(value) {
		const v = Math.max(SPACING_MIN, Math.min(SPACING_MAX, Number(value) || 0));
		this._state = { ...this._state, spacing: v };
		this._saveState();
		this._applySpacing();
	}

	/** @param {boolean} value */
	_setIconOnlyPlugins(value) {
		this._state = { ...this._state, iconOnlyPlugins: !!value };
		this._saveState();
		this._applyIconOnly();
		this._renderPanel();
	}

	/** @param {boolean} value */
	_setIconOnlyShortcuts(value) {
		this._state = { ...this._state, iconOnlyShortcuts: !!value };
		this._saveState();
		this._applyIconOnly();
		this._renderPanel();
	}

	/** @param {string} name */
	_setTriggerIcon(name) {
		if (!TRIGGER_ICON_OPTIONS.includes(name)) return;
		this._state = { ...this._state, triggerIcon: name };
		this._saveState();
		if (this._statusItem && this._statusItem.setIcon) {
			try { this._statusItem.setIcon(name); } catch { /* fall through */ }
		}
		const triggerEl = this._statusItem && this._statusItem.getElement && this._statusItem.getElement();
		if (triggerEl) {
			const iconEl = triggerEl.querySelector('.statusbar-item--icon');
			if (iconEl instanceof HTMLElement) {
				const cleaned = iconEl.className.replace(/\bti-[a-z0-9-]+/g, '').replace(/\s+/g, ' ').trim();
				iconEl.className = `${cleaned} ti-${name}`.trim();
				if (!iconEl.classList.contains('ti')) iconEl.classList.add('ti');
			}
		}
		this._renderPanel();
	}

	/** @param {boolean} value */
	_setUniformHover(value) {
		this._state = { ...this._state, uniformHover: !!value };
		this._saveState();
		this._applyUniformHover();
		this._renderPanel();
	}

	/** @param {boolean} value */
	_setSplitHoverZones(value) {
		this._state = { ...this._state, splitHoverZones: !!value };
		this._saveState();
		this._applySplitHoverZones();
		this._clearHoverSide(false);
		this._renderPanel();
	}

	/** @param {boolean} value */
	_setOverrideTooltips(value) {
		this._state = { ...this._state, overrideTooltips: !!value };
		this._saveState();
		this._ensureTooltips();
		this._renderPanel();
	}

	/** @param {string} key @param {string} text */
	_setTooltipOverride(key, text) {
		const next = { ...(this._state.tooltipOverrides || {}), [key]: text };
		this._state = { ...this._state, tooltipOverrides: next };
		this._saveState();
		this._ensureTooltips();
		// No re-render — the input the user is typing into would lose focus.
	}

	/** @param {number} value */
	_setTriggerYOffset(value) {
		const raw = Number(value) || 0;
		const v = Math.max(-10, Math.min(10, Math.round(raw * 2) / 2));
		this._state = { ...this._state, triggerYOffset: v };
		this._saveState();
		this._applyTriggerOffset();
	}

	/** @param {string} key @param {ItemMode} value */
	_setItemMode(key, value) {
		if (!Object.values(MODES).includes(value)) return;
		const modes = { ...(this._state.modes || {}), [key]: value };
		this._state = { ...this._state, modes };
		this._saveState();
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

		const keys = ordered.map(it => it.key);
		const fromIdx = keys.indexOf(sourceKey);
		const targetIdx = keys.indexOf(targetKey);
		if (fromIdx < 0 || targetIdx < 0) return;

		// Remove source first, then compute the insert index relative to the
		// (now possibly shifted) target position.
		keys.splice(fromIdx, 1);
		const adjustedTarget = keys.indexOf(targetKey);
		const insertAt = dropBefore ? adjustedTarget : adjustedTarget + 1;
		keys.splice(insertAt, 0, sourceKey);

		/** @type {Record<string, number>} */
		const next = {};
		for (let i = 0; i < keys.length; i++) next[keys[i]] = i;

		this._state = { ...this._state, order: next };
		this._saveState();
		this._applyOrder();
		this._renderPanel();
	}

	// ── Storage (workspace-keyed) ───────────────────────────────────────────

	_storageKey() {
		return `${ROOT_CLASS}/${this.getWorkspaceGuid()}/state`;
	}

	/** @param {string} key @returns {boolean} */
	_hasLocalObject(key) {
		try {
			const raw = localStorage.getItem(key);
			if (!raw) return false;
			const parsed = JSON.parse(raw);
			return parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0;
		} catch {
			return false;
		}
	}

	/** @param {string} key @returns {Record<string, any>} */
	_loadLocalObject(key) {
		try {
			const parsed = JSON.parse(localStorage.getItem(key) || '{}');
			return parsed && typeof parsed === 'object' ? parsed : {};
		} catch {
			return {};
		}
	}

	/** @returns {Record<string, any>} */
	_customConfig() {
		try {
			const conf = this.getConfiguration && this.getConfiguration();
			const custom = conf && conf.custom;
			return custom && typeof custom === 'object' ? custom : {};
		} catch {
			return {};
		}
	}

	_loadState() {
		return this._normalizeState({
			...(this._customConfig().state || {}),
			...this._loadLocalObject(this._storageKey()),
		});
	}

	/** @param {any} raw @returns {SbmState} */
	_normalizeState(raw) {
		raw = raw && typeof raw === 'object' ? raw : {};
		return {
			...DEFAULT_STATE,
			...raw,
			modes: { ...DEFAULT_STATE.modes, ...(raw.modes || {}) },
			order: { ...(raw.order || {}) },
			tooltipOverrides: { ...(raw.tooltipOverrides || {}) },
		};
	}

	_saveState() {
		try {
			localStorage.setItem(this._storageKey(), JSON.stringify(this._state));
		} catch { /* quota or private mode — ignore */ }
		this._scheduleConfigSave();
	}

	_scheduleConfigSave() {
		if (this._configSaveTimer) clearTimeout(this._configSaveTimer);
		this._configSaveTimer = setTimeout(() => {
			this._configSaveTimer = null;
			void this._saveCustomConfigNow();
		}, 900);
	}

	async _saveCustomConfigNow() {
		if (this._configSaveInFlight) {
			this._configSaveQueued = true;
			return;
		}
		this._configSaveInFlight = true;
		try {
			const plugin = await this._ownGlobalPlugin();
			if (!plugin || !plugin.saveConfiguration) return;
			const conf = plugin.getConfiguration ? plugin.getConfiguration() : this.getConfiguration();
			const custom = conf && conf.custom && typeof conf.custom === 'object' ? conf.custom : {};
			const state = this._normalizeState(this._state);
			if (JSON.stringify(custom.state || {}) === JSON.stringify(state)) return;
			await plugin.saveConfiguration({
				...conf,
				custom: {
					...custom,
					schemaVersion: 1,
					state,
				},
			});
		} catch {
			// Config sync is best-effort; local state is already persisted.
		} finally {
			this._configSaveInFlight = false;
			if (this._configSaveQueued) {
				this._configSaveQueued = false;
				this._scheduleConfigSave();
			}
		}
	}

	async _ownGlobalPlugin() {
		try {
			const ownGuid = this.getGuid && this.getGuid();
			const plugins = await this.data.getAllGlobalPlugins();
			return plugins.find(p => p && p.getGuid && p.getGuid() === ownGuid)
				|| plugins.find(p => p && p.getName && p.getName() === 'Status Bar Manager')
				|| null;
		} catch {
			return null;
		}
	}
}
