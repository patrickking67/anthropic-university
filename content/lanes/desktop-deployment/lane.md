# Claude Desktop Deployment

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Package, configure, and verify Claude Desktop and Claude Code across macOS and Windows fleets with MDM, Group Policy, and Intune.**

Group: administer · Level: intermediate · ~5 h · For: Endpoint, MDM, and desktop engineering administrators who deploy Claude Desktop and Claude Code to managed Macs and Windows PCs.

## Take alongside

- [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration) — Claude Help Center
- [Claude Desktop collection](https://support.claude.com/en/collections/16163169-claude-desktop) — Claude Help Center
- [Claude Desktop configuration reference](https://claude.com/docs/cowork/3p/configuration) — Claude Docs
- [Deploy managed settings for Claude Code](https://code.claude.com/docs/en/managed-settings) — Claude Code Docs

## Installers and platform requirements

Pick the right package for each platform and install it so every feature, including Cowork, works for standard users.

**You will be able to:**

- Choose between the macOS .pkg and .dmg and the Windows MSIX packages
- Provision the Windows MSIX machine-wide for standard users
- Prepare Windows devices for Cowork with the Virtual Machine Platform
- Install Claude Desktop on Linux from the apt repository

**Key points**

- macOS ships as a Universal .pkg (recommended for enterprise) and a drag-and-drop .dmg; the app installs to /Applications and self-updates unless policy disables it.
- Windows ships as MSIX packages for x64 and arm64. The MSIX is packaged per user: Add-AppxPackage registers it for the current user only, and Add-AppxProvisionedPackage stages it for every user on the device.
- An Intune line-of-business upload of the MSIX installs in user context and fails for standard users. Wrap Add-AppxProvisionedPackage in a Win32 app or PowerShell script, or pre-stage it, for machine-wide installs.
- Cowork on Windows needs the Virtual Machine Platform optional feature and a restart; enable it with Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart and schedule the reboot.
- The third-party deployment docs note that fleets on the legacy .exe installer get Claude Desktop without Cowork; moving them to the MSIX enables it.
- On Linux (beta), install from Anthropic's apt repository so updates arrive with normal package updates; the app does not update itself there.

**Practice:** On a test Windows VM, provision the MSIX with Add-AppxProvisionedPackage, enable the Virtual Machine Platform, restart, and sign in as a standard user. Confirm Cowork starts. Repeat with Add-AppxPackage and note what breaks.

**Read:** [Deploy Claude Desktop for Windows](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows) · [Deploy Claude Desktop for macOS](https://support.claude.com/en/articles/12611117-deploy-claude-desktop-for-macos) · [Install Claude Desktop](https://support.claude.com/en/articles/10065433-install-claude-desktop)

<details><summary>Flashcards</summary>

**Q:** Add-AppxPackage vs. Add-AppxProvisionedPackage for Claude MSIX?  
**A:** Add-AppxPackage registers for the current user only. Add-AppxProvisionedPackage stages it machine-wide for every user, including standard users.

**Q:** What Windows feature does Cowork require?  
**A:** The Virtual Machine Platform optional feature, followed by a restart.

**Q:** Why does an Intune LOB upload of the Claude MSIX fail for standard users?  
**A:** LOB installs the per-user MSIX in user context. Use a Win32 or script wrapper that runs Add-AppxProvisionedPackage instead.

</details>

### Check your understanding

*Study area: Windows installation · medium*

Standard users on shared Windows laptops need Claude Desktop with Cowork. The package is deployed through Intune. Which method works?

- **A.** Upload the MSIX as an Intune line-of-business app
- **B.** Run Add-AppxPackage from a logon script for each user
- **C.** Wrap Add-AppxProvisionedPackage in a Win32 app or script
- **D.** Publish the MSIX in the Microsoft Store for Business

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The MSIX is per-user; provisioning it machine-wide with Add-AppxProvisionedPackage makes it available to standard users and registers the Cowork service.

_Why a tempting wrong answer misses:_ An LOB upload installs in user context and fails for standard users; per-user Add-AppxPackage can leave Cowork unregistered.

Reference: https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows

</details>

---

*Study area: Windows installation · easy*

A pilot device shows Claude installed, but Cowork reports it cannot start. The Virtual Machine Platform was enabled with -NoRestart yesterday. What is the most likely fix?

- **A.** Reinstall Claude with the .exe installer
- **B.** Restart the device so the feature takes effect
- **C.** Set coworkTabEnabled to true under HKCU
- **D.** Sign in with a different organization account

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The Virtual Machine Platform feature takes effect only after a restart; -NoRestart defers it for silent deployment.

_Why a tempting wrong answer misses:_ The legacy .exe path doesn't provide Cowork, and Cowork is on by default, so a policy key isn't the blocker.

Reference: https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows

</details>

---

*Study area: Platform packages · medium*

Which TWO statements about Claude Desktop packages are accurate? (Select 2.)

- **A.** The macOS Universal .pkg supports Intel and Apple silicon Macs
- **B.** The Windows MSIX ships only for x64 machines
- **C.** On Linux the app updates through the apt repository, not in-app
- **D.** The macOS .dmg is the recommended format for MDM deployment
- **E.** Linux Claude Desktop supports computer use and dictation

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

The Universal .pkg covers both Mac architectures, and on Linux updates arrive with normal apt package updates.

_Why a tempting wrong answer misses:_ MSIX ships for x64 and arm64, the .pkg (not the .dmg) is recommended for enterprise, and computer use and dictation aren't available on Linux.

Reference: https://support.claude.com/en/articles/10065433-install-claude-desktop

</details>

---

## Silent deployment and update ownership

Decide whether your MDM or the app owns versions, and set the update keys so the two never fight.

**You will be able to:**

- Choose a single update owner for the fleet
- Configure disableAutoUpdates and autoUpdaterEnforcementHours
- Write an Intune detection rule that tolerates self-updates
- Keep updates working when api.anthropic.com is blocked

**Key points**

- By default the app checks for updates about every four hours and applies them regardless of the version your MDM assigned.
- Option 1: the MDM owns versions. Set disableAutoUpdates to true (1) and push new builds on your schedule.
- Option 2: the app owns versions. Leave disableAutoUpdates unset, provision once, and use a detection script that checks Get-AppxPackage -Name Claude for a version at or above the one you deployed.
- autoUpdaterEnforcementHours is the number of hours before a downloaded update forces a restart, from 1 to 72, defaulting to 72. It has no effect while disableAutoUpdates is in place.
- A "parameter is incorrect" error after MDM deployment usually means both the updater and the MDM registered the package; pick one owner.
- updateViaUpdatesHost reads the update feed from releases.claude.com so api.anthropic.com can stay blocked (documented for third-party deployments).

**Practice:** Write the two update policies side by side for your fleet: the registry values or profile keys for each option, the detection logic, and who approves new versions. Choose one and document why.

**Read:** [Deploy Claude Desktop for Windows (auto-updates)](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows) · [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration)

<details><summary>Flashcards</summary>

**Q:** What are the two update-ownership options?  
**A:** MDM owns versions (disableAutoUpdates = 1) or the app owns versions (leave it unset and detect version >= deployed).

**Q:** What does autoUpdaterEnforcementHours control?  
**A:** Hours (1–72, default 72) before a downloaded update forces a restart. Ignored when auto-updates are disabled.

**Q:** What usually causes "The parameter is incorrect" after MDM deployment?  
**A:** Both the in-app updater and the MDM registered the package, leaving duplicate entries. Pick one update owner.

</details>

### Check your understanding

*Study area: Update control · medium*

Your MDM pins Claude Desktop versions and pushes new builds monthly. Devices keep jumping ahead of the approved version. What should you set?

- **A.** autoUpdaterEnforcementHours to 1
- **B.** disableAutoUpdates to 1
- **C.** relaunchEnforcementHours to 0
- **D.** updateViaUpdatesHost to 1

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

When the MDM owns versions, disableAutoUpdates stops the in-app updater so only MDM-pushed builds land.

_Why a tempting wrong answer misses:_ autoUpdaterEnforcementHours only shortens the restart window for updates the app has already downloaded.

Reference: https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows

</details>

---

*Study area: Update control · hard*

You leave auto-updates on and deploy the MSIX once through Intune. After a week, Intune reports the app as not installed on many devices. What fixes the reporting without disabling updates?

- **A.** Redeploy the MSIX nightly to reset the installed version
- **B.** Switch to an Intune line-of-business app assignment
- **C.** Detect Get-AppxPackage -Name Claude at or above the deployed version
- **D.** Set autoUpdaterEnforcementHours to 72 to slow updates

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

When the app owns versions, a custom detection script that accepts any version at or above the provisioned one keeps Intune reporting Installed after self-updates.

_Why a tempting wrong answer misses:_ Redeploying fights the updater and can leave duplicate package registrations.

Reference: https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows

</details>

---

## macOS configuration profiles

Deliver managed preferences for com.anthropic.claudefordesktop with any Apple MDM and know how the app reads them.

**You will be able to:**

- Build a .mobileconfig payload for the com.anthropic.claudefordesktop domain
- Encode booleans, integers, and JSON-typed keys correctly
- Explain per-user versus machine managed preferences
- Use a profile manifest in Jamf, Kandji, or ProfileCreator

**Key points**

- Claude Desktop reads managed preferences from the domain com.anthropic.claudefordesktop, delivered as a configuration profile by Jamf Pro, Kandji, Intune, or any Apple MDM.
- An MDM profile lands in /Library/Managed Preferences. Both the per-user and machine files are read, and the per-user value wins where a key appears in both.
- Array- and object-typed keys such as managedMcpServers or allowedWorkspaceFolders are single keys whose value is a whole JSON document; the portable encoding is a JSON string.
- The third-party configuration reference says to write every value as a string ("true", "3600"), while the profile manifest declares native boolean and integer types. Confirm either choice with the diagnostic report.
- The profile manifest (claudefordesktop.plist) lets profile editors show every key with its type, default, and allowed values instead of hand-writing XML.
- Configuration is read at launch, so users must fully quit and reopen the app after a profile changes; newer builds also re-check about every 10 minutes and prompt a restart.

**Practice:** Build a minimal profile that sets forceLoginOrgUUID and disableAutoUpdates, install it on a test Mac, fully quit and reopen Claude, and generate a diagnostic report to confirm both keys were read.

**Read:** [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration) · [Deploy with MDM (profile precedence)](https://claude.com/docs/third-party/claude-desktop/mdm) · [Configuration reference: value types](https://claude.com/docs/cowork/3p/configuration)

<details><summary>Flashcards</summary>

**Q:** Which preference domain does Claude Desktop read on macOS?  
**A:** com.anthropic.claudefordesktop

**Q:** Per-user vs. machine managed preferences on macOS: which wins?  
**A:** Both are read; for a key in both, the per-user value in /Library/Managed Preferences/<user>/ wins.

**Q:** How do you encode an array key like allowedWorkspaceFolders in a profile?  
**A:** As one key whose value is the whole JSON document, most portably as a JSON string.

</details>

### Check your understanding

*Study area: macOS profiles · medium*

A Mac receives a machine-level profile setting disableAutoUpdates to false and a per-user profile setting it to true for the same user. Which value applies, per the deployment docs?

- **A.** The per-user value, true
- **B.** The machine value, false
- **C.** Neither, because conflicting keys are rejected
- **D.** Whichever profile was installed most recently

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Both Managed Preferences files are read, and the per-user value wins where a key appears in both.

_Why a tempting wrong answer misses:_ Conflicts aren't rejected or resolved by install order.

Reference: https://claude.com/docs/third-party/claude-desktop/mdm

</details>

---

*Study area: macOS profiles · medium*

An admin needs to push allowedWorkspaceFolders, which the docs type as a JSON array, in a .mobileconfig. What is the portable way to encode it?

- **A.** One dotted key per entry, such as allowedWorkspaceFolders.0
- **B.** A separate plist file referenced by path in the profile
- **C.** One key whose value is the whole JSON document as a string
- **D.** A comma-separated string of folder paths without brackets

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Array- and object-typed keys are single keys holding the entire JSON document; a JSON string is the portable encoding.

_Why a tempting wrong answer misses:_ Dotted key names are never read.

Reference: https://claude.com/docs/cowork/3p/configuration

</details>

---

## Windows Group Policy and Intune

Write Claude policy to the registry through GPO, ADMX, or Intune without falling into the hive and value-type traps.

**You will be able to:**

- Import the Claude ADMX and ADML into the Central Store or Intune
- Choose HKLM or HKCU and keep the whole configuration in one hive
- Use supported registry value types directly under the policy key
- Deliver keys the ADMX does not define

**Key points**

- Policy lives under HKLM\SOFTWARE\Policies\Claude (machine) or HKCU\SOFTWARE\Policies\Claude (user). Machine-level settings take priority, and HKLM is the recommended location.
- The hives are not merged in current builds: when any readable machine value is present under HKLM, the app ignores HKCU entirely, so deploy the full configuration to one hive.
- Values must sit directly under the Claude key as REG_SZ or REG_DWORD. The app never reads subkeys, cannot see REG_QWORD, REG_MULTI_SZ, or REG_BINARY, and treats REG_EXPAND_SZ as present but unreadable.
- The supplied Claude.admx defines one category, Claude Desktop, with every policy set to class Both, so each appears under both Computer and User Configuration. Use Computer Configuration to land in HKLM.
- Intune can import the ADMX and its en-US ADML under Devices > Configuration > Import ADMX, then build a profile from Imported Administrative templates.
- Keys documented in the support article but absent from the supplied ADMX, such as forceLoginOrgUUID, need a Group Policy Preferences registry item, a PowerShell script, or an Intune remediation.

**Practice:** Import the ADMX into a test OU's Central Store, set three policies under Computer Configuration, run gpupdate /force, and inspect HKLM\SOFTWARE\Policies\Claude with reg query. Confirm nothing landed in a subkey.

**Read:** [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration) · [Deploy with MDM (Windows hives)](https://claude.com/docs/third-party/claude-desktop/mdm) · [Import custom ADMX into Intune](https://learn.microsoft.com/intune/device-configuration/settings-catalog/import-custom-admx-templates)

<details><summary>Flashcards</summary>

**Q:** Which registry paths hold Claude Desktop policy?  
**A:** HKLM\SOFTWARE\Policies\Claude (machine, recommended) and HKCU\SOFTWARE\Policies\Claude (user).

**Q:** Are HKLM and HKCU Claude policies merged?  
**A:** No. If readable machine policy exists under HKLM, the app ignores HKCU entirely.

**Q:** Which registry value types can Claude Desktop read?  
**A:** REG_SZ, and REG_DWORD for boolean and integer keys. Not subkeys, REG_QWORD, REG_MULTI_SZ, or REG_BINARY.

</details>

### Check your understanding

*Study area: Registry policy · hard*

Help desk reports that user-scoped Claude settings pushed to HKCU\SOFTWARE\Policies\Claude are ignored on some PCs. Those PCs also have one value, disableAutoUpdates, under HKLM\SOFTWARE\Policies\Claude. Why?

- **A.** HKCU values must be REG_EXPAND_SZ to be read
- **B.** User policy applies only after a gpupdate /force
- **C.** HKCU is read only when the user is a local admin
- **D.** Any machine value under HKLM makes the app ignore HKCU

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

The hives aren't merged: when readable machine policy exists, the app ignores user policy entirely, so deploy the full configuration to one hive.

_Why a tempting wrong answer misses:_ REG_EXPAND_SZ is worse, not better: it counts as machine policy present but can't be read.

Reference: https://claude.com/docs/third-party/claude-desktop/mdm

</details>

---

*Study area: Group Policy and Intune · medium*

An admin imports the Claude ADMX and wants policies to land in HKLM. Where in the Group Policy editor should they configure them?

- **A.** User Configuration > Preferences > Control Panel Settings
- **B.** Computer Configuration > Administrative Templates > Claude Desktop
- **C.** User Configuration > Administrative Templates > Claude Desktop
- **D.** Computer Configuration > Windows Settings > Security Settings

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The ADMX marks every policy class Both; configuring under Computer Configuration writes to HKLM, the recommended hive.

_Why a tempting wrong answer misses:_ The same policies under User Configuration write to HKCU, which is ignored when machine policy exists.

Reference: https://support.claude.com/en/articles/12622667-enterprise-configuration

</details>

---

*Study area: Registry policy · medium*

Which TWO registry practices does Claude Desktop require for policy to be read? (Select 2.)

- **A.** Values sit directly under the Claude policy key, not in subkeys
- **B.** Boolean keys are written as REG_MULTI_SZ values
- **C.** Values are REG_SZ, or REG_DWORD for boolean and integer keys
- **D.** JSON-typed keys are split across numbered subkeys
- **E.** Values are written as REG_QWORD for 64-bit systems

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

The app reads only values directly under the key, as REG_SZ or REG_DWORD.

_Why a tempting wrong answer misses:_ It never reads subkeys and can't see REG_MULTI_SZ or REG_QWORD values at all.

Reference: https://claude.com/docs/third-party/claude-desktop/mdm

</details>

---

## Sign-in, feature, telemetry, and network policies

Lock sign-in to your organization, switch surfaces on or off, control what the app sends to Anthropic, and route traffic through your proxy.

**You will be able to:**

- Restrict sign-in to one or more organizations with forceLoginOrgUUID
- Toggle Cowork, Code, and Chat with the documented keys
- Choose the right telemetry keys
- Route app and agent traffic through a proxy or PAC file

**Key points**

- forceLoginOrgUUID accepts one UUID (which also pre-selects that organization) or an array of UUIDs (any listed organization accepted); login fails for accounts outside the list. It has no effect in third-party deployments.
- The support article documents isClaudeCodeForDesktopEnabled for Code and secureVmFeaturesEnabled for Cowork, both defaulting to true. The ADMX and third-party reference use coworkTabEnabled for Cowork and add chatTabEnabled.
- effortLevel sets the default effort for Claude Code sessions in Claude Desktop, reapplied at every session start, and needs version 1.25927.0 or later; the ADMX's equivalent key is defaultModelEffort.
- Telemetry keys: disableEssentialTelemetry blocks crash and performance reports, disableNonessentialTelemetry blocks product analytics, and disableNonessentialServices blocks connector favicons and artifact-preview origins, so artifacts stop rendering.
- egressProxyUrl sends app and agent traffic through an HTTP proxy instead of OS proxy settings, and egressProxyPacUrl wins when both are set. Both are MDM-only keys.
- allowedWorkspaceFolders limits the folders users can mount into Cowork; leaving it unset means unrestricted.

**Practice:** Find your organization UUID, write a profile that restricts sign-in to it, and test signing in with a personal account. Then decide which of the three telemetry keys, if any, your security policy actually requires.

**Read:** [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration) · [Configuration reference](https://claude.com/docs/cowork/3p/configuration)

<details><summary>Flashcards</summary>

**Q:** What does forceLoginOrgUUID do with a single UUID vs. an array?  
**A:** A single UUID restricts login and pre-selects that org; an array accepts any listed org without pre-selection.

**Q:** Which key does the support article use to toggle Cowork?  
**A:** secureVmFeaturesEnabled (default true). The ADMX and 3P reference use coworkTabEnabled.

**Q:** What breaks when disableNonessentialServices is true?  
**A:** Connector favicons and the artifact-preview and MCP Apps origins, so artifacts don't render.

</details>

### Check your understanding

*Study area: Sign-in restriction · medium*

A company runs two Claude Enterprise organizations and wants employees to sign in to either one, but never to personal accounts. How should forceLoginOrgUUID be set?

- **A.** As an array containing both organization UUIDs
- **B.** As the parent organization's UUID only
- **C.** As a single UUID for the larger organization
- **D.** As a comma-separated list inside one string

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

An array accepts any listed organization, and login fails for accounts outside the list.

_Why a tempting wrong answer misses:_ A single UUID accepts only that one organization (and pre-selects it).

Reference: https://support.claude.com/en/articles/12622667-enterprise-configuration

</details>

---

*Study area: Feature toggles · medium*

Using the keys documented in the enterprise configuration support article, how would you disable Cowork but keep Code on standard Claude Desktop?

- **A.** Set chatTabEnabled to false and leave the rest unset
- **B.** Set isClaudeCodeForDesktopEnabled to false
- **C.** Set secureVmFeaturesEnabled to false and leave the Code key unset
- **D.** Set allowedWorkspaceFolders to an empty array

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

The support article documents secureVmFeaturesEnabled for Cowork access; isClaudeCodeForDesktopEnabled defaults to true, so Code stays on.

_Why a tempting wrong answer misses:_ isClaudeCodeForDesktopEnabled controls Code, not Cowork.

Reference: https://support.claude.com/en/articles/12622667-enterprise-configuration

</details>

---

*Study area: Telemetry and network · hard*

Security asks you to stop product-usage analytics from Claude Desktop without breaking artifact previews. Which key should you set?

- **A.** disableNonessentialServices to true
- **B.** disableEssentialTelemetry to true
- **C.** disableFeatureDiscovery to true
- **D.** disableNonessentialTelemetry to true

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

disableNonessentialTelemetry blocks product-usage analytics and diagnostic uploads without affecting rendering.

_Why a tempting wrong answer misses:_ disableNonessentialServices also blocks artifact-preview origins, so artifacts stop rendering.

Reference: https://claude.com/docs/cowork/3p/configuration

</details>

---

## Extensions and MCP controls

Control desktop extensions and local MCP servers with policy, and know how policy interacts with the in-app allowlist.

**You will be able to:**

- Set isDesktopExtensionEnabled and isDesktopExtensionDirectoryEnabled
- Explain how policy overrides the in-app extension allowlist
- Block or allow user-added local MCP servers
- Push organization MCP servers with managedMcpServers

**Key points**

- isDesktopExtensionEnabled turns desktop extensions on or off, and isDesktopExtensionDirectoryEnabled controls access to the extension directory; the support article lists both as defaulting to true.
- Machine-level policy overrides the in-app allowlist. To use the allowlist, leave both extension keys unset or true so the allowlist can populate the registry.
- The in-app allowlist is off by default. Turning it on force-deletes existing extension installs and limits users to the sanctioned registry, with no drag-to-install of .mcpb files.
- isLocalDevMcpEnabled (default true) controls local MCP servers users add through Developer settings; set it to false to allow only organization-provided servers.
- The ADMX adds isDesktopExtensionSignatureRequired to reject unsigned extensions and managedMcpServers to push remote or local servers as one JSON value.
- Custom extensions uploaded in Organization settings > Connectors > Desktop are scoped to your organization; a new version must keep the manifest name and increment the version.

**Practice:** Turn on the desktop extension allowlist in a test organization, add one approved extension, set isLocalDevMcpEnabled to false by policy, and confirm on a device that only the approved extension installs.

**Read:** [Enabling and using the desktop extension allowlist](https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist) · [Deploying enterprise-grade MCP servers with desktop extensions](https://support.claude.com/en/articles/12702546-deploying-enterprise-grade-mcp-servers-with-desktop-extensions) · [Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration)

<details><summary>Flashcards</summary>

**Q:** How do extension policy keys interact with the in-app allowlist?  
**A:** Machine policy overrides it. Leave isDesktopExtensionEnabled and isDesktopExtensionDirectoryEnabled unset or true so the allowlist can populate.

**Q:** What happens to installed extensions when the allowlist is turned on?  
**A:** Existing installs are force-deleted and users can install only allowlisted extensions from the in-app registry.

**Q:** What does isLocalDevMcpEnabled = false block?  
**A:** Local MCP servers users add through Developer settings. Organization-provided servers still load.

</details>

### Check your understanding

*Study area: Extension policy · hard*

An Owner turned on the desktop extension allowlist, but users still see no extensions at all. A GPO sets isDesktopExtensionDirectoryEnabled to 0. What is the cause?

- **A.** The allowlist takes 24 hours to reach clients
- **B.** Machine policy disabling the directory overrides the allowlist
- **C.** The allowlist requires isLocalDevMcpEnabled set to false
- **D.** Custom extensions must be signed before they appear

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Policy at the machine level overrides the in-app allowlist; leave both extension keys unset or true so the allowlist can populate.

_Why a tempting wrong answer misses:_ isLocalDevMcpEnabled governs user-added local MCP servers, not the extension allowlist.

Reference: https://support.claude.com/en/articles/12592343-enabling-and-using-the-desktop-extension-allowlist

</details>

---

*Study area: MCP policy · medium*

You want users to run only organization-approved MCP servers in Claude Desktop, not servers they add in Developer settings. Which key should you set?

- **A.** isDesktopExtensionEnabled to false
- **B.** isDesktopExtensionSignatureRequired to true
- **C.** disableDeepLinkRegistration to true
- **D.** isLocalDevMcpEnabled to false

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

isLocalDevMcpEnabled controls local servers users add through Developer settings; organization-provided servers still load.

_Why a tempting wrong answer misses:_ Disabling extensions blocks .mcpb installs but not servers added by hand in Developer settings.

Reference: https://support.claude.com/en/articles/12622667-enterprise-configuration

</details>

---

## Claude Code managed settings on endpoints

Place Claude Code policy where the CLI reads it, and understand how multiple managed sources combine.

**You will be able to:**

- Place managed-settings.json in the correct system directory per OS
- Deliver the same policy through a macOS profile or the HKLM registry
- Explain the managed-source order and first-wins behavior
- Confirm the active source with /status

**Key points**

- managed-settings.json lives in /Library/Application Support/ClaudeCode/ on macOS, /etc/claude-code/ on Linux and WSL, and C:\Program Files\ClaudeCode\ on Windows. The legacy C:\ProgramData path is no longer read.
- As an MDM policy, use the com.anthropic.claudecode preferences domain on macOS, or a REG_SZ value named Settings holding the JSON under HKLM\SOFTWARE\Policies\ClaudeCode on Windows.
- Managed sources rank: server-managed (remote), then MDM or HKLM, then managed-settings.json with managed-settings.d/ drop-ins, then the user-writable HKCU value as a last resort.
- By default the first source that delivers a policy key wins and the rest are skipped; managedSourcesBehavior set to merge combines admin sources.
- A managed file, plist, or HKLM value that is not a valid JSON object stops Claude Code from starting, while a malformed HKCU value only produces a notice.
- Managed settings sit above command-line flags, local project, shared project, and user settings.

**Practice:** Deploy a managed-settings.json that sets permissions.disableBypassPermissionsMode on a test machine, run /status, and confirm the Setting sources line reads Enterprise managed settings (file).

**Read:** [Deploy managed settings](https://code.claude.com/docs/en/managed-settings) · [Claude Code settings](https://code.claude.com/docs/en/settings)

<details><summary>Flashcards</summary>

**Q:** Where does managed-settings.json go on Windows?  
**A:** C:\Program Files\ClaudeCode\managed-settings.json (the legacy ProgramData path isn't read).

**Q:** How is Claude Code policy stored in the Windows registry?  
**A:** As a REG_SZ value named Settings holding JSON under HKLM\SOFTWARE\Policies\ClaudeCode.

**Q:** What is the default behavior with several Claude Code managed sources?  
**A:** first-wins: the highest-ranked source with a policy key applies and the rest are skipped.

</details>

### Check your understanding

*Study area: Claude Code managed settings · medium*

Where should an admin place managed-settings.json for Claude Code on a Windows workstation?

- **A.** C:\ProgramData\ClaudeCode\managed-settings.json
- **B.** %APPDATA%\Claude\managed-settings.json
- **C.** C:\Program Files\ClaudeCode\managed-settings.json
- **D.** %USERPROFILE%\.claude\managed-settings.json

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Claude Code reads the Windows managed file from C:\Program Files\ClaudeCode\.

_Why a tempting wrong answer misses:_ The legacy ProgramData path is no longer read, and user-profile paths aren't managed locations.

Reference: https://code.claude.com/docs/en/managed-settings

</details>

---

*Study area: Claude Code managed settings · hard*

A machine has both an HKLM Settings value under SOFTWARE\Policies\ClaudeCode and a managed-settings.json file, each with policy keys. managedSourcesBehavior isn't set. What does Claude Code apply?

- **A.** The HKLM policy, skipping the file
- **B.** The file, because files outrank the registry
- **C.** A key-by-key merge of both sources
- **D.** Neither, because conflicting sources block startup

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Under the default first-wins behavior, the highest-ranked source with a policy key applies; MDM and HKLM rank above managed settings files.

_Why a tempting wrong answer misses:_ Merging happens only when managedSourcesBehavior is set to merge.

Reference: https://code.claude.com/docs/en/managed-settings

</details>

---

## Verifying policy and troubleshooting

Prove a device received the policy you intended and fix the common installation, Cowork, and security-software failures.

**You will be able to:**

- Read managed-config.txt from a diagnostic report
- Recognize the signs of a misspelled or unread key
- Fix Cowork virtualization errors on Windows
- Allowlist the agent helper in EDR and AppLocker by signer

**Key points**

- Help > Troubleshooting > Generate Diagnostic Report exports a .zip whose managed-config.txt shows where configuration was read from, every key applied (secrets redacted), and any parse errors.
- The app silently ignores misspelled keys. On macOS an editable configuration window means no recognized key arrived; on Windows any value under HKLM locks the window, so always check managed-config.txt.
- "Missing HCS services" errors mean the Virtual Machine Platform stack isn't registered: check it with Get-WindowsOptionalFeature and Get-Service vmcompute, hns, re-enable it, and use Restart rather than shutdown when Fast Startup is on.
- If Cowork won't start after an Add-AppxPackage install, redeploy with Add-AppxProvisionedPackage so the Cowork virtualization service registers machine-wide.
- AppLocker can block packaged apps; allow MSIX packages or add Claude Desktop to your allowed list.
- EDR or binary-authorization rules can block the signed agent helper that runs Chat, Cowork, and Code sessions. Allowlist it by signer, for example Team ID Q6L2SF6YDW on macOS or publisher Anthropic, PBC on Windows, not by versioned path.

**Practice:** Deliberately misspell one key in a test profile, deploy it, and use the diagnostic report to find it. Then write a one-page runbook your service desk can follow for the three most common failures.

**Read:** [Installation and setup: verifying the deployment](https://claude.com/docs/third-party/claude-desktop/installation) · [Deploy Claude Desktop for Windows: troubleshooting](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows)

<details><summary>Flashcards</summary>

**Q:** Which file in the diagnostic report shows applied policy?  
**A:** managed-config.txt: the source read, every key applied (secrets redacted), and parse errors.

**Q:** What does "Missing HCS services: HNS, vmcompute, vfpext" mean?  
**A:** The Virtual Machine Platform stack isn't registered. Re-enable the feature and use Restart, not shutdown.

**Q:** How should EDR allowlist the Claude agent helper?  
**A:** By signing identity, such as Team ID Q6L2SF6YDW on macOS or publisher Anthropic, PBC on Windows, so the rule survives updates.

</details>

### Check your understanding

*Study area: Verifying policy · medium*

On a third-party deployment, your MDM shows the Claude profile as delivered to a Mac, but the Configure Third-Party Inference window is still editable. What does that most likely mean?

- **A.** The profile applies only after the next macOS update
- **B.** No recognized key reached the app, likely a misspelled key
- **C.** The per-user profile is overriding the machine profile
- **D.** The profile must be countersigned by Anthropic first

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

The app silently ignores misspelled keys; on macOS an editable window means no recognized key arrived. Check managed-config.txt in the diagnostic report.

_Why a tempting wrong answer misses:_ Precedence between per-user and machine profiles changes values, not whether the window locks.

Reference: https://claude.com/docs/third-party/claude-desktop/installation

</details>

---

*Study area: Troubleshooting · medium*

Cowork fails with "Missing HCS services: HNS, vmcompute, vfpext" on a laptop where Claude installed cleanly. Which TWO steps are recommended? (Select 2.)

- **A.** Re-enable the Virtual Machine Platform feature
- **B.** Reinstall Claude with the legacy .exe installer
- **C.** Restart with Restart rather than shut down and power on
- **D.** Set isClaudeCodeForDesktopEnabled to false
- **E.** Delete the HKLM\SOFTWARE\Policies\Claude key

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

The error means the virtualization stack isn't registered; re-enable the feature and use Restart, because Fast Startup can leave services uninitialized after a shutdown.

_Why a tempting wrong answer misses:_ Policy keys and the .exe installer don't register the Virtual Machine Platform services.

Reference: https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows

</details>

---

*Study area: Troubleshooting · hard*

After an EDR rollout, Claude Desktop opens and reads its managed configuration, but every Chat, Cowork, and Code session fails to start. What is the best fix?

- **A.** Allowlist the agent helper by its signing identity
- **B.** Allowlist the helper's current versioned file path
- **C.** Turn off the managed configuration and retest
- **D.** Reinstall Claude Desktop into ~/Applications

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Sessions run through a signed agent helper that path-based deny rules can block; a signer-based rule (Team ID or publisher) survives version updates.

_Why a tempting wrong answer misses:_ A versioned path changes with each update, so the rule breaks again.

Reference: https://claude.com/docs/third-party/claude-desktop/installation

</details>

---
