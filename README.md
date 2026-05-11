# Status Bar Manager

Global Thymer plugin for controlling the bottom status bar.

## What It Does

- Adds a settings panel: **Plugin: Status Bar Manager**.
- Lets every status bar item use one of four modes:
  - **Show**: normal visibility.
  - **Hide**: fully hidden.
  - **Hover**: revealed while hovering the bar.
  - **Drawer**: revealed when the status bar surface is clicked.
- Supports keyboard shortcut hints, plugin icons, Thymer logo, sync indicator,
  user/avatar area, and the plugin's own trigger.
- Supports icon-only labels, spacing/alignment controls, ordering, unified hover
  styling, split left/right hover zones, and reveal animation staggering.
- Single-clicking the Status Bar Manager trigger opens settings. The trigger no
  longer needs a double-click because Drawer reveal lives on the bar surface.

## How It Works

This is an `AppPlugin` rendered with `_panel-system`. On load it:

- injects shared panel CSS plus status-bar-specific CSS;
- creates a persistent status bar trigger;
- registers a command palette settings entry;
- registers a custom settings panel;
- classifies current status bar children into left/right groups;
- applies body classes, item attributes, CSS variables, and ordering metadata;
- attaches status bar hover listeners for the Hover and Drawer reveal behavior.

The Hover mode reuses the same reveal/close animation model as Drawer mode.
When split hover zones are enabled, the left half reveals keyboard shortcuts and
the right half reveals plugin/right-side icons.

Synced state lives in `plugin.json` under `custom.state`. Local storage is kept
as a workspace-scoped fast override/cache:

- `plg-status-bar-manager/<workspaceGuid>/state`

## Important Implementation Notes

- The plugin pins to Thymer's current status bar DOM:
  - `.statusbar--status-bar`
  - `.statusbar--left`
  - `.statusbar--right`
- The plugin trigger can be hidden or shown, but settings remain reachable from
  the command palette.
- `saveConfiguration()` is debounced and equality-checked so settings sync
  across clients without per-hover/per-toggle reload storms.
- Hover background is painted by one overlay layer to avoid nested hover chips
  and flicker.
- Event listeners, timers, observer references, overlay nodes, and body classes
  are cleaned up in `onUnload()`.

## Build

```bash
npm run build
# writes dist/plugin.js
```

`dist/plugin.js` is paste-ready distro code. `npm run build:bundle` keeps the
SDK/esbuild bundle path available for debugging only.

## Distribution

Ship:

- `dist/plugin.js`
- `plugin.json`

Users paste `dist/plugin.js` into Thymer's Custom Code field and `plugin.json`
into the manifest/configuration field.
