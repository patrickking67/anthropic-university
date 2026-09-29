# Claude Desktop Deployment: lesson guide

This guide follows the eight modules of the Claude Desktop Deployment lane. It is for endpoint engineers and MDM administrators who package Claude Desktop, push its policy, and support it once it's on people's machines. It assumes the organization side (plans, SSO, provisioning) is already in place; the Enterprise Administration lane covers that.

Facts here were checked in September 2026 against the Claude Help Center articles on enterprise configuration and on deploying to macOS and Windows, the Claude Desktop configuration reference and MDM pages on claude.com, and the Claude Code managed settings docs. The lane also draws on the Claude ADMX/ADML templates and the plist profile manifest. Those files don't always agree with the docs. A section near the end lists every difference found, and **where they disagree, follow the docs**.

One distinction runs through the whole lane. Standard Claude Desktop signs users in to a Claude Team or Enterprise organization. **Claude Desktop on third-party inference** (often shortened to 3P) runs the same app against your own gateway, Amazon Bedrock, Google Vertex AI, or Microsoft Foundry, and has a much larger configuration surface. Both read policy from the same places, but some keys exist in only one mode. The ADMX and profile manifest you may have been handed describe the 3P schema.

## Module 1: Installers and platform requirements

**macOS.** Anthropic ships a Universal `.pkg`, which runs on Intel and Apple silicon, and a drag-and-drop `.dmg`. Use the `.pkg` for enterprise deployment; every Mac MDM can push it silently. The app installs to `/Applications`. Updating an app there needs admin rights, so on shared or locked-down Macs plan to control updates centrally (Module 2).

**Windows.** The supported packages are MSIX builds for x64 and arm64. MSIX is packaged per user, which creates the most common deployment mistake:

- `Add-AppxPackage` registers the app for the **current user only**.
- `Add-AppxProvisionedPackage -Online -PackagePath "Claude.msix" -SkipLicense -Regions "all"` **provisions** it for every user who signs in to the device.

Use provisioning for fleets. If you upload the MSIX to Intune as a line-of-business app, Intune installs it in user context and the install fails for standard users. Wrap the provisioning command in a Win32 app or a PowerShell script instead, or pre-stage the package in your image. The third-party deployment docs also note that devices set up with the legacy `.exe` installer get Claude Desktop without Cowork, and moving them to the MSIX turns Cowork on.

Cowork on Windows runs in a lightweight virtual machine, so it needs the **Virtual Machine Platform** optional feature:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart
```

`-NoRestart` keeps the deployment silent, but the feature only takes effect after a restart, so schedule one.

**Linux (beta).** Install from Anthropic's apt repository on Ubuntu 22.04 or later, or Debian 12 or later. Updates then arrive through normal package updates, not from inside the app. Computer use and dictation aren't available on Linux yet.

**Network.** Whatever the platform, allow `downloads.claude.ai`. The 3P docs explain that it serves the Cowork VM bundle and the Claude Code binary that sessions fetch at start. Offline installer variants that bundle both exist for restricted networks.

## Module 2: Silent deployment and update ownership

By default the app checks for updates about every four hours and installs them on its own, whatever version your MDM assigned. Two owners fighting over the version cause most update problems, so choose one.

**Option 1: the MDM owns versions.** Set `disableAutoUpdates` to true (`1` in the registry) and push new builds on your schedule. This suits regulated environments and shared Macs where users aren't admins.

**Option 2: the app owns versions.** Leave `disableAutoUpdates` unset, provision once, and let the app update itself. On Windows, change the Intune detection rule so it doesn't flag self-updated devices as failed: a script that finds `Get-AppxPackage -Name Claude` at or above the version you deployed. A plain "exact version" rule reports failures after the first update.

`autoUpdaterEnforcementHours` sets how long a downloaded update can wait before the app restarts to apply it, from 1 to 72 hours, with 72 as the default. It does nothing when auto-updates are disabled. If you see "The parameter is incorrect" after deployment, the usual cause is that both the MDM and the updater registered the package; clean up the duplicate and commit to one owner.

For 3P deployments that block `api.anthropic.com`, `updateViaUpdatesHost` points the updater at `releases.claude.com` instead.

## Module 3: macOS configuration profiles

Claude Desktop reads managed preferences from the domain **`com.anthropic.claudefordesktop`**. Any Apple MDM can deliver them, including Jamf Pro, Kandji, and Intune, and ProfileCreator or iMazing Profile Editor can build the profile by hand. Import the profile manifest (`claudefordesktop.plist`) into your editor if it supports manifests: you'll get every key with its type and allowed values instead of hand-writing XML.

Here is a minimal, standalone profile that restricts sign-in to one organization, turns off in-app updates, and blocks user-added local MCP servers. Replace the three placeholders: generate two UUIDs with `uuidgen`, and use your organization's UUID.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadIdentifier</key>
  <string>com.example.claude</string>
  <key>PayloadUUID</key>
  <string>PROFILE-UUID</string>
  <key>PayloadDisplayName</key>
  <string>Claude Desktop policy</string>
  <key>PayloadScope</key>
  <string>System</string>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.anthropic.claudefordesktop</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.example.claude.settings</string>
      <key>PayloadUUID</key>
      <string>PAYLOAD-UUID</string>
      <key>forceLoginOrgUUID</key>
      <string>YOUR-ORG-UUID</string>
      <key>disableAutoUpdates</key>
      <true/>
      <key>isLocalDevMcpEnabled</key>
      <false/>
    </dict>
  </array>
</dict>
</plist>
```

If you use Jamf or Kandji, you usually paste only the inner key/value pairs into a custom settings payload for the `com.anthropic.claudefordesktop` domain, and the MDM builds the wrapper.

**Value types.** The support article and profile manifest type booleans as booleans and hour counts as integers, as in the sample. The 3P configuration reference says it also accepts every value as a string (`"true"`, `"72"`), which some MDM editors produce. Either way, check what the app actually read (Module 8) rather than assuming.

**JSON-typed keys.** Keys such as `allowedWorkspaceFolders` (an array of paths) or the 3P key `managedMcpServers` take a whole JSON document as one value. The portable encoding is a single string containing the JSON. Don't split an array into numbered keys; the app won't read them.

**Precedence.** An MDM profile lands in `/Library/Managed Preferences/`. The app reads both the per-user file (`/Library/Managed Preferences/<user>/`) and the machine file, and where a key appears in both, the **per-user value wins**. Settings are read at launch, so users need to fully quit and reopen Claude after a profile changes. Newer builds also re-check about every 10 minutes and prompt for a restart.

## Module 4: Windows Group Policy and Intune

On Windows, policy lives in the registry:

- `HKLM\SOFTWARE\Policies\Claude` for the machine (recommended), and
- `HKCU\SOFTWARE\Policies\Claude` for the user.

Three rules matter more than anything else in this module:

1. **Don't split policy across hives.** Current builds don't merge them. If any readable value sits directly under the HKLM key, the app ignores HKCU entirely. Older builds merged key by key, which is why split configurations sometimes worked before and broke after an update.
2. **Put values directly under the `Claude` key.** Subkeys are never read.
3. **Use REG_SZ, or REG_DWORD for booleans and integers.** REG_QWORD, REG_MULTI_SZ, and REG_BINARY values are invisible to the app. REG_EXPAND_SZ is worse: it counts as machine policy being present, so HKCU is ignored, but the value itself can't be read.

### Group Policy walkthrough

1. Copy `Claude.admx` to the Central Store at `\\<domain>\SYSVOL\<domain>\Policies\PolicyDefinitions\`, and `Claude.adml` to its `en-US` subfolder.
2. Create or edit a GPO linked to the OU that holds your target computers.
3. Open **Computer Configuration > Policies > Administrative Templates > Claude Desktop**. The template defines every policy as class `Both`, so the same list also appears under User Configuration. Use Computer Configuration so values land in HKLM.
4. Set the policies you need, for example **Block auto-updates** (`disableAutoUpdates`) or **Allow user-added MCP servers** (`isLocalDevMcpEnabled`). Enabled writes `1`, and Disabled writes `0`.
5. For JSON-valued policies, paste the whole JSON document into the text box.
6. On a test machine, run `gpupdate /force`, then `reg query HKLM\SOFTWARE\Policies\Claude` and confirm that every value is at the top level with the type you expect.

Some documented keys, including `forceLoginOrgUUID`, aren't in the supplied ADMX (see the differences section). Deliver those with a Group Policy Preferences registry item writing REG_SZ under the same HKLM key, or with a script:

```powershell
New-Item -Path "HKLM:\SOFTWARE\Policies\Claude" -Force | Out-Null
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "forceLoginOrgUUID" -Value "YOUR-ORG-UUID" -Type String
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Claude" -Name "disableAutoUpdates" -Value 1 -Type DWord
```

### Intune walkthrough

Intune offers two routes.

**Imported ADMX.** In the Intune admin center, go to **Devices > Manage devices > Configuration > Import ADMX**, and upload `Claude.admx` with its `en-US` `Claude.adml`. When the import shows as available, create a profile for **Windows 10 and later** using **Templates > Imported Administrative templates**, configure the Claude Desktop settings under the computer scope, and assign it to a device group. Imported templates have limits, including en-US only. To replace a template with a newer version, you must first remove the profiles that use it.

**Script or remediation.** A PowerShell script or Remediation that writes the HKLM values gives you full control, and it's the simplest way to add keys the ADMX doesn't define. Run it in system context, not user context, so it can write HKLM.

In either case, watch assignment context. A profile assigned in user context lands in HKCU, and it's ignored whenever anything exists under HKLM. If you really need different policy for different user groups, deliver all of it through user policy and keep the HKLM key empty.

## Module 5: Sign-in, feature, telemetry, and network policies

**Sign-in restriction.** `forceLoginOrgUUID` is the standard way to stop people signing in to personal accounts on managed devices. A single UUID string restricts sign-in to that organization and pre-selects it at login. A JSON array of UUIDs accepts any of the listed organizations, without pre-selection. Sign-in fails for any account outside the list. The key has no effect in 3P mode, where there's no Claude sign-in at all; there, `disableDeploymentModeChooser` hides the Claude.ai sign-in option instead.

**Feature toggles.** The support article documents `isClaudeCodeForDesktopEnabled` for Code and `secureVmFeaturesEnabled` for Cowork, both defaulting to true. `allowedWorkspaceFolders` limits which folders users can mount into Cowork; unset means unrestricted. `effortLevel` sets the default effort for Code sessions (`low` through `max`), is reapplied at every session start, needs version 1.25927.0 or later, and doesn't affect Cowork.

**Telemetry.** The configuration reference defines three switches, all off by default:

- `disableEssentialTelemetry` blocks crash and performance reports. Anthropic discourages it, because bugs specific to your environment become invisible.
- `disableNonessentialTelemetry` blocks product-usage analytics and the Send option for diagnostic reports.
- `disableNonessentialServices` blocks connector icons, the artifact-preview origin, and the MCP Apps widget origin. **Artifacts stop rendering**, so it's rarely what a security team actually wants.

**Network and proxy.** By default the app follows the operating system's proxy settings. `egressProxyUrl` pins app and agent traffic to one HTTP proxy instead, and `egressProxyPacUrl` uses a PAC file. If both are set, the PAC file wins. These are MDM-only keys, documented in the configuration reference.

## Module 6: Extensions and MCP controls

Desktop extensions (`.mcpb` bundles) and local MCP servers are the main way users widen what Claude can reach on their machine, so they're a frequent policy target.

- `isDesktopExtensionEnabled` turns extensions on or off.
- `isDesktopExtensionDirectoryEnabled` controls access to the extension directory.
- `isLocalDevMcpEnabled` controls local MCP servers that users add by hand in Developer settings. Set it to false to allow only servers your organization provides.

The support article lists all three as defaulting to true.

Owners also have an **in-app extension allowlist** under Organization settings > Connectors > Desktop. It's off by default. Turning it on deletes existing extension installs and limits users to the approved list, with no drag-and-drop `.mcpb` installs. It needs Claude Desktop 0.13.91 or later. Custom extensions you upload there must have unique manifest names, and an update keeps the name and increments the version.

The interaction between the two layers is the trap: **machine-level policy overrides the allowlist.** If a GPO sets either extension key to false, the allowlist has nothing to populate and users see no extensions at all. To use the allowlist, leave both keys unset or set to true.

The 3P schema adds more controls, such as `isDesktopExtensionSignatureRequired` to reject unsigned extensions and `managedMcpServers` to push servers as one JSON value. Use those only on 3P deployments, where the configuration reference documents them.

## Module 7: Claude Code managed settings on endpoints

Claude Code, the CLI and the engine behind Code sessions, has its own managed settings, separate from Claude Desktop's keys. The file is `managed-settings.json` at:

| OS | Path |
|---|---|
| macOS | `/Library/Application Support/ClaudeCode/managed-settings.json` |
| Linux and WSL | `/etc/claude-code/managed-settings.json` |
| Windows | `C:\Program Files\ClaudeCode\managed-settings.json` |

The legacy `C:\ProgramData` location is no longer read. A `managed-settings.d/` folder next to the file accepts drop-in fragments, which helps when several teams own different parts of the policy.

You can deliver the same JSON as an OS policy instead. On macOS, use a profile for the **`com.anthropic.claudecode`** domain. On Windows, write a REG_SZ value named `Settings` holding the JSON under `HKLM\SOFTWARE\Policies\ClaudeCode`.

When more than one managed source exists, Claude Code ranks them: server-managed settings from the Claude admin console first, then MDM or HKLM, then the file and its drop-ins, and last the user-writable HKCU value. By default the first source that delivers policy wins and the rest are skipped. Setting `managedSourcesBehavior` to `merge` combines admin sources instead. Managed settings as a whole sit above command-line flags and every project and user settings file.

Validate JSON before you ship it. A managed file, plist, or HKLM value that isn't a valid JSON object stops Claude Code from starting. Run `/status` in a session and check the Setting sources line; it names the source in effect, such as `(file)` or `(HKLM)`. `claude doctor` reports entries that were dropped.

## Module 8: Verifying policy and troubleshooting

**Check what landed.** Start at the OS level. On a Mac, run `defaults read "/Library/Managed Preferences/com.anthropic.claudefordesktop"`. On Windows, run `reg query HKLM\SOFTWARE\Policies\Claude`. Then test behavior: sign in with a personal account to confirm the organization restriction works, or look for the Cowork tab you turned off.

On 3P deployments the app offers more. **Help > Troubleshooting > Generate Diagnostic Report** exports a `.zip`. Inside, `managed-config.txt` shows where configuration came from, every key applied (with secrets redacted), and any parse errors. The app silently ignores misspelled keys. On a Mac, a configuration window that's still editable means no recognized key arrived, even if the MDM shows the profile as delivered. On Windows, any value under HKLM locks the window, so always read `managed-config.txt`.

**Common failures.**

- *Cowork won't start after an `Add-AppxPackage` install.* Redeploy with `Add-AppxProvisionedPackage` so the Cowork service registers for the whole machine.
- *"Missing HCS services: HNS, vmcompute, vfpext".* The virtualization stack isn't registered. Check with `Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform` and `Get-Service vmcompute, hns`, re-enable the feature, and use **Restart**, not Shut down. Fast Startup can leave services uninitialized after a shutdown.
- *Other hypervisors installed.* Devices with VMware or VirtualBox may need `bcdedit /set hypervisorlaunchtype auto`.
- *VDI.* Cowork needs nested virtualization, which many VDI platforms don't offer. **Help > Troubleshooting > Show Logs** opens a folder with `supported-features-info.json`, which shows what the device supports.
- *AppLocker.* Allow packaged apps, or add Claude to your allowed list.
- *Sessions fail after an EDR rollout.* Chat, Cowork, and Code sessions run through a signed helper process. Allowlist it by signer, not by path, because paths include version numbers: on macOS, Team ID `Q6L2SF6YDW`; on Windows, publisher `Anthropic, PBC`.

## Where the policy files and the docs differ

The supplied `Claude.admx`/`Claude.adml` and the `claudefordesktop.plist` manifest match each other: one category, 135 policies, and the same key names. They describe the 3P configuration schema. Compared with the Help Center enterprise configuration article and the current 3P reference, these differences stand out. **In every case, follow the docs.**

| Topic | Policy files | Docs | What to do |
|---|---|---|---|
| Sign-in restriction | No `forceLoginOrgUUID` | Documented for standard deployments; no effect in 3P | Add it with GPP, a script, or a custom profile key |
| Extension directory | No `isDesktopExtensionDirectoryEnabled` | Documented, default true | Add it outside the ADMX if you need it |
| Cowork toggle | `coworkTabEnabled` | Support article uses `secureVmFeaturesEnabled`; 3P reference uses `coworkTabEnabled` | Standard deployments: `secureVmFeaturesEnabled` |
| Default effort | `defaultModelEffort` | Support article uses `effortLevel` (Code sessions only) | Standard deployments: `effortLevel` |
| `isDesktopExtensionEnabled` default | false | Support article says true; the 3P reference explains standard builds default to enabled unless the key is set | Treat unset as enabled on standard builds |
| `autoUpdaterEnforcementHours` default | None stated | 72 (range 1–72) | Assume 72 when unset |
| Newer 3P keys | Missing, for example `disableLocalConfigCache` | In the current 3P reference | Update the templates before you rely on newer keys |
| Hive behavior | Class `Both` suggests either hive works | Hives aren't merged; any HKLM value hides HKCU | Configure under Computer Configuration only |
| Value types | Booleans and integers | 3P reference also accepts strings | Either works; confirm with the diagnostic report |

Because the templates lag the docs, regenerate them from a current build when you can. The 3P configuration window (**Help > Troubleshooting > Enable Developer Mode**, then **Developer > Configure Third-Party Inference**) exports a `.mobileconfig`, a `.reg` file, an ADMX bundle, and a plist manifest that match the app version you're running.

## Rollout checklist

1. Pick the package per platform, and provision the MSIX machine-wide (Module 1).
2. Choose an update owner and set the detection logic to match (Module 2).
3. Build the macOS profile and confirm it with `defaults read` (Module 3).
4. Import the ADMX, configure Computer Configuration, and fill gaps with registry items (Module 4).
5. Set sign-in, feature, telemetry, and proxy keys deliberately rather than by default (Module 5).
6. Decide between policy and the allowlist for extensions, and don't let the two conflict (Module 6).
7. Ship valid Claude Code managed settings and check `/status` (Module 7).
8. Verify on a pilot group and hand the troubleshooting list to the service desk (Module 8).
