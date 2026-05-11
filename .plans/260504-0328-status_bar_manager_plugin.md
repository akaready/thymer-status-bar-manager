# Plan: `plugin-status-bar-manager` — global Status Bar Manager

## Context

Thymer's bottom status bar packs in several elements:

- The bar itself (container)
- Keyboard shortcut hints
- Plugin-contributed icons (added via `this.ui.addStatusBarItem`)
- The Thymer logo / brand icon
- The user avatar / account icon
- The sync/connection status icon

The user wants a single global plugin that lets them hide/show each of those pieces independently from a settings panel — for distraction-free / minimal-chrome use.

This is a polish plugin in the same family as the existing [plugin-sidebar-trash-hide](../../plugin-sidebar-trash-hide/), which already proves the pattern: a global `AppPlugin` that owns one `injectCSS` block and toggles a set of body classes to hide DOM the SDK doesn't formally expose. Same playbook fits here, scaled from one toggle to six.

## Approach

**Type:** `AppPlugin` (global). Slug `status-bar-manager`. Display name **"Status Bar Manager"**. Icon `ti-layout-bottombar` (fallback `ti-eye-off` if that name doesn't resolve — verify against [.sdk/types.d.ts:945-1182](../../.sdk/types.d.ts#L945-L1182) at scaffold time).

**Build mode:** build-pipeline (default — full repo with `package.json`, `jsconfig.json`, hot reload).

**Hide mechanism — CSS body-class toggles.** Inject one `<style>` block on `onLoad()`. Each toggle flips a class on `<body>`. CSS hides the matching selector when the class is present:

```css
body.plg-sbm-hide-bar         #app-status-bar                                                   { display: none !important; }
body.plg-sbm-hide-shortcuts   #app-status-bar .keyboard-shortcuts                                { display: none !important; }
body.plg-sbm-hide-plugins     #app-status-bar .plugin-status-item:not(.plg-sbm-trigger)          { display: none !important; }
body.plg-sbm-hide-thymer      #app-status-bar .thymer-logo                                       { display: none !important; }
body.plg-sbm-hide-user        #app-status-bar .user-avatar                                       { display: none !important; }
body.plg-sbm-hide-status      #app-status-bar .sync-status                                       { display: none !important; }
```

**Selectors above are placeholders** — they MUST be verified against live Thymer DOM as the very first implementation step. The plugin includes a clearly-marked DANGER block at the top of `plugin.js` listing each placeholder + the date verified, mirroring [plugin-sidebar-trash-hide/plugin.js:8-13](../../plugin-sidebar-trash-hide/plugin.js#L8-L13). Any ambiguity → user opens Thymer with Chrome devtools, inspects the bottom bar, and substitutes the real selectors before first run.

**Persistence — workspace-GUID-keyed localStorage**, NOT `saveConfiguration()`. `saveConfiguration` reloads the plugin (per `CLAUDE.md` pitfall list), which would re-flash the chrome on every toggle. Settings are per-workspace because users may want different chrome density per workspace. Key shape: `plg-status-bar-manager:<workspaceGuid>`. Value: `{ hideBar, hideShortcuts, hidePlugins, hideThymer, hideUser, hideStatus }`.

**Settings panel** — registered via `this.ui.registerCustomPanelType('settings', { ... })` using `_panel-system` primitives. Six `optionRow({ type: 'checkbox' })` rows inside one `section({ label: 'Show / hide elements' })`, plus standard `panel`/`title`/`lede`/`credits`. Toggles call `_set(key, value)` which: updates state object → writes localStorage → toggles the body class → no plugin reload.

**Triggers / discoverability:**

1. **Status bar item** — `this.ui.addStatusBarItem({ icon: 'ti-layout-bottombar', tooltip: 'Status Bar Manager', onClick: () => this._openPanel() })`. Tagged with class `plg-sbm-trigger` via `getElement().classList.add(...)` so the "hide plugin icons" rule excludes it (escape hatch — the user can always re-open settings).
2. **Command palette command** — `'Status Bar Manager: Settings'` calls the same `_openPanel()`. Belt-and-braces: if the user does manage to hide every visible trigger, command palette still works.

**Apply settings on load.** In `onLoad()`, after CSS injection: read localStorage, then for each toggle add the body class if the saved value is `true`. No diff-checking needed — just set the desired final state.

**Cleanup (`onUnload`).** Remove all six body classes. Status bar item and command palette entry are released by their `.remove()` methods. No event subscriptions, no timers — there's nothing else to clean up.

## Files to create

```
plugin-status-bar-manager/
├── plugin.js              # main implementation
├── plugin.json            # manifest
├── package.json           # "dev": "node ../.sdk/dev.js"
├── jsconfig.json          # extends ../jsconfig.json
├── README.md              # usage + selector-verification note
├── .plans/.gitkeep
├── .research/.gitkeep
└── dist/.gitkeep          # gitignored output dir
```

`thymer-new-plugin` skill scaffolds 1–6 from `templates/app-plugin/`. Then **overwrite** `plugin.js` with the real implementation (status-bar-manager logic, not the placeholder hello-world from the template) and `README.md` with the usage doc.

## Critical references to reuse

- [plugin-sidebar-trash-hide/plugin.js](../../plugin-sidebar-trash-hide/plugin.js) — copy the constants block (`ROOT_CLASS`, `BODY_TOGGLE_CLASS`), the DANGER comment style, the `injectCSS` pattern, the `_handlerIds = []` cleanup array, and the status-bar-item-as-toggle-trigger pattern.
- [_panel-system/helpers.js](../../_panel-system/helpers.js) — import `PANEL_CSS, panel, title, lede, credits, section, optionRow`. `optionRow({ type: 'checkbox', name, label, desc, checked, onChange })` is the only row primitive needed.
- [_panel-system/DESIGN.md](../../_panel-system/DESIGN.md) — anti-patterns: no card chrome, no hardcoded hex, no 4px spacing, no `--plg-accent` override (accent inherits automatically via the cascade).
- [.sdk/types.d.ts:3529-4115](../../.sdk/types.d.ts#L3529-L4115) — `addStatusBarItem` + `PluginStatusBarItem` interface; confirms `getElement()` returns the live `HTMLElement` we need for tagging.
- [.research/community-pattern-cookbook.md](../../.research/community-pattern-cookbook.md) — workspace-GUID-keyed localStorage helper, FIELDS-style frozen constants object pattern.

## Verification (end-to-end test)

1. **Scaffold + selector pass.** Run `thymer-new-plugin` → folder appears. Open Thymer in Chrome with `--remote-debugging-port=9222`. Inspect the bottom status bar in devtools. Capture each of the six target selectors. Update placeholders in [plugin-status-bar-manager/plugin.js](../../plugin-status-bar-manager/plugin.js) DANGER block and stamp today's date.
2. **Hot reload.** `cd plugin-status-bar-manager && npm install && npm run dev`. Enable hot reload toggle in Thymer's plugin editor for this plugin. Confirm the wrench/manager icon shows up in the status bar.
3. **Functional test — each toggle.** Open the settings panel via the new icon. Tick **Hide entire bar** → bar disappears, command palette still opens settings (verify), untick → bar returns. Repeat for each of the other five toggles; for each, confirm only the targeted element disappears and the rest remain interactive.
4. **Persistence.** Tick three toggles → fully reload Thymer (Cmd-R). State should match. Switch to a different workspace → state is independent (workspace-GUID-keyed). Switch back → original workspace's state is restored.
5. **Self-recovery.** Tick **Hide plugin icons** while the SBM trigger is the only plugin icon → confirm the SBM trigger remains visible (it's tagged with `plg-sbm-trigger` and excluded from the rule).
6. **Cleanup.** Disable the plugin in Thymer's plugin manager → confirm all body classes drop and every status-bar element returns to default visibility (no stale CSS, no orphan classes left on `<body>`).
7. **Edge — saveConfiguration.** `grep saveConfiguration plugin-status-bar-manager/plugin.js` should produce zero hits. We use localStorage exclusively to avoid the reload-on-toggle pitfall.

## Open follow-ups (NOT in v1)

- Per-plugin granular hide of plugin-contributed icons (currently treated as one group) — would need an enumeration UI listing each `addStatusBarItem` element by tooltip.
- Sync settings across devices via `saveConfiguration` once the SDK supports a "no-reload" save variant.
- Theme-aware icon variant for the trigger (light vs dark).
