# Enterprise Administration

> Anthropic University learning lane · created by Patrick King · unofficial and not affiliated with Anthropic.

*Generated from `lane.json` by `scripts/build.mjs`. Do not edit by hand.*

**Run Claude for Team or Enterprise with confidence: identity, provisioning, governance, data controls, audit, and API organization administration.**

Group: administer · Level: intermediate · ~6 h · For: IT administrators, security leads, and organization Owners who run Claude for Team or Enterprise, or who administer a Claude Console organization.

## Take alongside

- [Identity management (SSO, JIT, SCIM)](https://support.claude.com/en/collections/17270717-identity-management-sso-jit-scim) — Claude Help Center
- [Security and compliance](https://support.claude.com/en/collections/10351014-security-and-compliance) — Claude Help Center
- [Admin API](https://platform.claude.com/docs/en/manage-claude/admin-api) — Claude Platform Docs
- [Deploy managed settings for Claude Code](https://code.claude.com/docs/en/managed-settings) — Claude Code Docs

## Plans, seats, and roles

Match the organization to the right plan and seat model, then understand who can do what before you touch a single setting.

**You will be able to:**

- Compare the Team and Enterprise plans on identity, compliance, and billing
- Identify the current Enterprise seat model and the legacy seat types still in the field
- Assign the built-in roles (Primary Owner, Owner, Admin, User) to the right people
- Explain what the Custom role does on Enterprise plans

**Key points**

- Team plans use Standard and Premium seats, need at least two members, and cap at 150 seats; larger organizations move to Enterprise.
- New Enterprise plans use a single Enterprise seat billed annually. The seat covers access to Claude on web, desktop, and mobile plus Claude Code and Cowork; all usage is billed separately at API rates with no per-seat usage cap.
- Chat and Chat + Claude Code seats, and Standard and Premium Enterprise seats, are legacy models that move to the single Enterprise seat at the next renewal. HIPAA-ready Enterprise organizations are an exception and keep separate seat types.
- Self-serve Enterprise requires at least 20 seats; sales-assisted requires 50 and adds invoicing and multi-currency billing.
- An organization has exactly one Primary Owner. That seat consumes a license, and it can be a service account rather than a named person.
- Owners and Primary Owners manage SSO, audit log requests, and data retention on Enterprise; Admins handle day-to-day membership but cannot invite or remove Owners.
- Members set to the Custom role have no default permissions: their access comes entirely from the custom roles attached to their groups.

**Practice:** Draw a one-page access matrix for your organization: list who should be Primary Owner, which two or three people are Owners, who are Admins, and which teams would later move to the Custom role. Note which decisions need an Owner rather than an Admin.

**Read:** [What is the Enterprise plan?](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan) · [What is the Team plan?](https://support.claude.com/en/articles/9266767-what-is-the-team-plan) · [Roles and permissions](https://support.claude.com/en/articles/9267276-roles-and-permissions) · [Purchase and manage seats on Enterprise plans](https://support.claude.com/en/articles/13393991-purchase-and-manage-seats-on-enterprise-plans)

<details><summary>Flashcards</summary>

**Q:** How is usage billed on a new Enterprise plan?  
**A:** The single Enterprise seat covers access only. All usage in Chat, Claude Code, and Cowork is billed separately at API rates, with no per-seat usage limit.

**Q:** What are the seat limits for a Team plan?  
**A:** At least two members and up to 150 seats, with Standard and Premium seat types. Beyond 150, move to Enterprise.

**Q:** What permissions does a member on the Custom role start with?  
**A:** None. Their access comes entirely from the custom roles assigned to their groups.

</details>

### Check your understanding

*Study area: Plans and seats · easy*

A 400-person company wants SCIM provisioning, audit logs, and custom data retention for Claude. Which plan meets all three requirements?

- **A.** The Team plan with every member on a Premium seat
- **B.** The Enterprise plan with the single Enterprise seat
- **C.** The Team plan with SSO and JIT provisioning enabled
- **D.** Individual Max plans purchased for each employee

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

SCIM, audit logs, and custom retention are Enterprise features, and Team plans stop at 150 seats, so Enterprise is the only fit.

_Why a tempting wrong answer misses:_ Premium seats add usage, not compliance features; Team plans support JIT but not SCIM or audit logs.

Reference: https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan

</details>

---

*Study area: Roles and permissions · medium*

An Enterprise organization moves its analysts to the Custom role before any custom roles or groups exist. What access do those analysts have on their next login?

- **A.** The same access as the User role until a custom role is assigned
- **B.** Read-only access to chats and projects they already own
- **C.** No feature access, because Custom members have no default permissions
- **D.** Admin access, because Custom roles inherit the highest built-in role

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Members on the Custom role start with no permissions; everything comes from custom roles attached to their groups.

_Why a tempting wrong answer misses:_ Custom does not fall back to User. Assign groups with custom roles before switching people to Custom.

Reference: https://support.claude.com/en/articles/9267276-roles-and-permissions

</details>

---

## Organization setup, domains, and SSO

Verify domains, connect an identity provider through the parent organization, and decide when to require SSO.

**You will be able to:**

- Verify a company domain with a DNS TXT record
- Explain the parent organization and why it links to one IdP
- Configure SSO and decide when to require it
- Use Restrict organization creation to stop shadow organizations

**Key points**

- SSO settings live in a parent organization. Enterprise plans get one automatically; Team plans get one the first time SSO is enabled; a Console organization needs one requested or must merge into a Team or Enterprise parent.
- Each parent organization connects to a single identity provider, and every domain verified on it must be managed through that same IdP.
- Domain verification uses a TXT record whose value starts with anthropic-domain-verification-. Copy the full value before leaving the screen, because the console does not show it again once the domain is Pending.
- Verifying a domain changes nothing for users by itself. Access changes only when SSO is configured and Require SSO is switched on.
- Once SSO is required, domain users who are not assigned to the Anthropic app in the IdP cannot reach their existing Free, Pro, or Max accounts. The accounts are not deleted, only inaccessible.
- After verification, Owners can turn on Restrict organization creation so nobody can spin up new Claude or Console organizations, including personal accounts, on the verified domains.
- Anthropic uses WorkOS for domain verification and SSO setup, and the flow ends with a Test Single Sign-on step.

**Practice:** Walk the SSO setup path in a sandbox or on paper: list the DNS record you would add, the IdP app assignment group, the test user, and the date you would switch on Require SSO. Write down who is not yet in the IdP and would be locked out.

**Read:** [Important considerations before enabling SSO and JIT/SCIM](https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning) · [Set up single sign-on (SSO)](https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso)

<details><summary>Flashcards</summary>

**Q:** What does a parent organization hold?  
**A:** Identity settings only: verified domains, the SSO connection, and provisioning. Billing and usage stay with each linked organization.

**Q:** Does verifying a domain lock anyone out?  
**A:** No. Access changes only after SSO is set up and Require SSO is switched on.

**Q:** What does Restrict organization creation do?  
**A:** Blocks anyone from creating new Claude or Console organizations, including personal accounts, on your verified domains.

</details>

### Check your understanding

*Study area: Domain verification and SSO · medium*

An Owner added the TXT record for a new domain yesterday, but the domain still shows Pending. The Owner also removed and re-added the domain this morning. What is the most likely cause?

- **A.** DNS changes for verification always take a full 72 hours
- **B.** The domain must first be claimed with domain capture
- **C.** Re-adding the domain generated a new value the DNS record lacks
- **D.** SSO must be required before a domain can be verified

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Each time a domain is removed and re-added, a new anthropic-domain-verification- value is generated, so the published record no longer matches.

_Why a tempting wrong answer misses:_ Domain capture and Require SSO come after verification; neither is a prerequisite for it.

Reference: https://support.claude.com/en/articles/13132885-set-up-single-sign-on-sso

</details>

---

*Study area: Domain verification and SSO · hard*

A company has a Team plan and a separate Console organization, and wants both to share one SSO connection. What must happen?

- **A.** Configure SSO separately in each organization with two IdPs
- **B.** An Owner on the Team plan invites the Console organization to merge
- **C.** The Console organization invites the Team plan to join its parent
- **D.** Contact support to convert the Console organization into a workspace

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

SSO lives in the parent organization, and merges are initiated from claude.ai by a Team or Enterprise organization; the Console side then approves.

_Why a tempting wrong answer misses:_ Console organizations cannot initiate a merge, and a parent organization links to only one IdP.

Reference: https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning

</details>

---

*Study area: Domain verification and SSO · medium*

Which TWO statements about turning on Require SSO for Claude are accurate? (Select 2.)

- **A.** Domain users not assigned to the Anthropic IdP app lose access to their personal accounts
- **B.** Personal accounts on the domain are deleted when SSO is required
- **C.** Users must sign in with the Continue with SSO option
- **D.** Domain verification is skipped when SSO is required
- **E.** Requiring SSO automatically enables SCIM provisioning

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

Required SSO forces the SSO sign-in path, and domain users outside the IdP app can no longer reach their Free, Pro, or Max accounts.

_Why a tempting wrong answer misses:_ Those accounts become inaccessible but are not deleted, and provisioning mode is a separate choice.

Reference: https://support.claude.com/en/articles/10276682-important-considerations-before-enabling-single-sign-on-sso-and-jit-scim-provisioning

</details>

---

## Provisioning: JIT, SCIM, and domain capture

Choose how accounts arrive and leave, map IdP groups to roles and seats, and consolidate personal accounts on your domain.

**You will be able to:**

- Choose between Invite only, JIT, and SCIM directory sync
- Use group mappings to set roles and seat tiers from the IdP
- Avoid the removal traps in a SCIM resync
- Plan a domain claim and its 30-day migration window

**Key points**

- Invite only is the default. JIT adds users at their first SSO login with the User role; SCIM adds and removes users from IdP assignments without waiting for a login.
- JIT is available on Team, Enterprise, and Console organizations. SCIM is available on Enterprise and on Console organizations under an Enterprise or their own parent, not on Team plans.
- JIT never removes members automatically. Unassigning someone in the IdP blocks login, but they keep their seat until an admin removes them in Claude.
- Switching the provisioning mode to SCIM removes any member who is not in the IdP directory, so confirm the directory is complete first.
- With SCIM group mappings, any member not covered by a role mapping is removed on sync. Changing a member's email creates a new member record and removes the old one.
- Domain capture (Migrate accounts using your domain) is Enterprise-only and one-way. It requires restricted organization creation, verified DNS, enforced SSO, and JIT or SCIM before you can turn it on.
- A domain claim gives every affected personal account one shared 30-day deadline. Unmigrated accounts are deactivated at the deadline and paid personal plans are cancelled with a prorated refund.

**Practice:** Export your member list and your IdP group membership, then diff them. Count who would be removed if you switched to SCIM today and who would be locked out of a domain claim. Fix both lists before changing anything.

**Read:** [Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning) · [How SCIM sync works for Enterprise organizations](https://support.claude.com/en/articles/14499648-how-scim-sync-works-for-enterprise-organizations) · [Claim and migrate accounts on your domain](https://support.claude.com/en/articles/14625619-claim-and-migrate-accounts-on-your-domain)

<details><summary>Flashcards</summary>

**Q:** JIT vs. SCIM: which removes users automatically?  
**A:** SCIM. JIT adds users at first login but never removes them; an admin must remove them in Claude.

**Q:** What happens when you switch provisioning mode to SCIM?  
**A:** A full resync runs, and any member not in the IdP directory is removed from the organization.

**Q:** How long is the domain claim migration window?  
**A:** One shared 30-day deadline per claim. Unmigrated personal accounts are deactivated at the deadline.

</details>

### Check your understanding

*Study area: JIT and SCIM provisioning · medium*

An organization uses JIT provisioning. A contractor's assignment is removed from the IdP app. What happens in Claude?

- **A.** The contractor is removed and their seat freed within minutes
- **B.** The contractor is moved to No seat assigned at the next sync
- **C.** The contractor is converted to the Custom role with no permissions
- **D.** The contractor can't sign in but stays a member holding a seat

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

JIT never removes members. Unassigning in the IdP blocks SSO login, but the member and seat remain until an admin removes them in Claude.

_Why a tempting wrong answer misses:_ Automatic removal on unassignment is SCIM behavior, not JIT.

Reference: https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning

</details>

---

*Study area: JIT and SCIM provisioning · hard*

An Enterprise admin is enabling SCIM group mappings. Which TWO actions could remove existing members from the organization? (Select 2.)

- **A.** Saving role mappings before every group is assigned
- **B.** Adding a new seat tier mapping for power users
- **C.** Changing a member's email address in the IdP
- **D.** Turning off the welcome email for new SCIM members
- **E.** Running a group-only sync from the Groups page

<details><summary>Answer &amp; explanation</summary>

**Correct answers: A, C**

Members outside every role mapping are removed on sync, and an email change creates a new member record while removing the old one.

_Why a tempting wrong answer misses:_ Seat tier mappings don't remove members; unmapped members keep their seat type or get none.

Reference: https://support.claude.com/en/articles/14499648-how-scim-sync-works-for-enterprise-organizations

</details>

---

*Study area: Domain capture · hard*

An Enterprise Owner wants to turn on Migrate accounts using your domain next week. Which prerequisite list is complete?

- **A.** Verified domain and SSO configured, with Require SSO still optional
- **B.** Verified domain, SCIM enabled, and a signed data processing addendum
- **C.** Restricted org creation, verified domain, enforced SSO, and JIT or SCIM
- **D.** Verified domain and restricted org creation, with provisioning optional

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Domain claiming requires restricted organization creation, DNS verification, SSO actively enforced, and JIT or SCIM, so everyone has a path to sign in after migration.

_Why a tempting wrong answer misses:_ SSO must be enforced, not just configured, and a provisioning method is mandatory.

Reference: https://support.claude.com/en/articles/14625619-claim-and-migrate-accounts-on-your-domain

</details>

---

## Custom roles, groups, and spend governance

Use groups and custom roles to give each team the features it needs, and put spend limits where the money goes.

**You will be able to:**

- Explain the four-level feature-access precedence chain
- Build groups and attach custom roles to them
- Set organization, group, and user spend limits
- Decide how group settings resolve for members in several groups

**Key points**

- Feature access resolves through four levels, and the most restrictive wins: platform overrides from your contract, the organization toggle, custom role permissions, then the member's own setting.
- The organization toggle is the main switch. If a feature is off for the organization, no custom role can grant it.
- Custom roles only affect members whose role is set to Custom. Owners, Admins, and Users keep the permissions of their built-in role.
- Custom roles can also carry admin permissions, such as billing or identity management, without making someone an Owner.
- Groups can be created by hand or synced from the IdP through SCIM. SCIM-synced groups cannot be renamed or deleted in Claude.
- Enterprise spend limits can be set for the organization, per user, and per group, and usage-based Enterprise plans can also give a group a shared monthly budget (beta).
- When a member belongs to groups with different plugin settings, the most permissive setting applies. That differs from spend limits, which follow the Multi-group spend limit setting.

**Practice:** Design three custom roles (for example Engineering, Legal, and Contractors). For each, list the capabilities it grants, the group it attaches to, and the per-user spend limit. Then check each capability against the organization toggles.

**Read:** [Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans) · [Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)

<details><summary>Flashcards</summary>

**Q:** Which wins in the feature-access chain?  
**A:** The most restrictive level. A feature off at the organization level cannot be granted by any custom role.

**Q:** How do conflicting group plugin settings resolve?  
**A:** The most permissive wins: Required > Installed by default > Available to install > Not available.

**Q:** Can you rename a SCIM-synced group in Claude?  
**A:** No. SCIM groups are renamed, deleted, and populated in the identity provider.

</details>

### Check your understanding

*Study area: Custom roles and groups · medium*

Web search is turned off at the organization level. A custom role assigned to the Research group grants web search. Can Research members use web search?

- **A.** Yes, because custom role permissions override organization toggles
- **B.** No, because the organization toggle is the main switch for features
- **C.** Yes, but only for members who also hold the Admin role
- **D.** No, unless each member enables it in their personal settings

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Feature access follows a most-restrictive chain; if a feature is off for the organization, no custom role can grant it.

_Why a tempting wrong answer misses:_ Personal settings sit below role permissions and can only turn a granted feature off, not on.

Reference: https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans

</details>

---

*Study area: Plugin and group access · medium*

A plugin is set to Not available for the Contractors group and Installed by default for the Engineering group. A member belongs to both groups. What do they get?

- **A.** The plugin is hidden, because the most restrictive setting wins
- **B.** The plugin is Available to install as a compromise setting
- **C.** The organization-wide setting applies and group settings are ignored
- **D.** The plugin is installed by default, because the most permissive wins

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

For plugin access, the most permissive group setting applies. To hard-block a plugin, set it Not available organization-wide and grant only specific groups.

_Why a tempting wrong answer misses:_ Groups for plugin access are meant to enable tools, not act as a security boundary, so the restrictive setting does not win.

Reference: https://support.claude.com/en/articles/13837433-manage-plugins-for-your-organization

</details>

---

## Connectors, skills, and plugin governance

Decide which tools Claude can reach, distribute approved skills and plugins, and control what users can add themselves.

**You will be able to:**

- Enable connectors and set up Enterprise-managed authorization
- Provision organization skills and restrict user-created skills
- Distribute plugins through organization marketplaces with the right default access
- Choose a publishing policy for user-submitted skills and plugins

**Key points**

- Enterprise-managed auth lets an admin authorize a connector once through the IdP. Chosen roles inherit it at first login, and deprovisioning in the IdP removes connector access too.
- Skills need Cloud code execution and file creation plus Skills to be on in Organization settings > Plugins & skills. Provisioned skills reach everyone and also load in Claude Code for users signed in with their Claude account.
- Turning off User-created skills stops users creating or uploading their own, while provisioned and Anthropic built-in skills stay available.
- Plugin marketplaces need Cowork and Skills enabled. Plugins can be uploaded as ZIP files or synced from a private GitHub or GitLab repository.
- Each plugin has an organization-wide install preference: Required, Installed by default, Available to install, or Not available. Required plugins cannot be turned off by members.
- Required and Installed-by-default plugins also install in Claude Code, where their hooks, sub-agents, and MCP servers run on the user's computer, so review hooks before marking a plugin Required.
- Publishing can be set to Requires review, Open, or Off; with review on, every later version of a submission goes through the same approval.

**Practice:** Pick one internal workflow and package it as a skill inside a plugin. Decide its default access, the group that should get it, and whether it belongs in a reviewed publishing flow. Write the rollback step if the plugin misbehaves.

**Read:** [Authorize MCP connectors for your entire organization](https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization) · [Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization) · [Manage plugins for your organization](https://support.claude.com/en/articles/13837433-manage-plugins-for-your-organization)

<details><summary>Flashcards</summary>

**Q:** What does Enterprise-managed auth give you for connectors?  
**A:** Authorize once through the IdP; chosen roles inherit the connector at first login, and IdP deprovisioning removes it.

**Q:** What must be on before you can provision skills?  
**A:** Cloud code execution and file creation, plus Skills, in Organization settings > Plugins & skills > Policy.

**Q:** Why review hooks before marking a plugin Required?  
**A:** Required plugins also install in Claude Code, where hooks, sub-agents, and MCP servers run on the user's machine and cannot be disabled.

</details>

### Check your understanding

*Study area: Skills and plugins · medium*

An Owner marks a plugin that contains hooks and an MCP server as Required. What should the Owner understand about Claude Code users?

- **A.** Required plugins only apply to chat and Cowork, never to Claude Code
- **B.** Claude Code users must approve each Required plugin before it loads
- **C.** It installs for signed-in Claude Code users, runs locally, and can't be disabled
- **D.** Required plugins run their hooks in Anthropic's cloud sandbox only

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Required and Installed-by-default plugins sync to Claude Code for users signed in with their Claude account; hooks, sub-agents, and MCP servers run on the user's computer.

_Why a tempting wrong answer misses:_ Nothing restricts Required plugins to chat, so review hooks before choosing Required.

Reference: https://support.claude.com/en/articles/13837433-manage-plugins-for-your-organization

</details>

---

*Study area: Skills and plugins · easy*

An Owner turns off User-created skills. What still works for members?

- **A.** Provisioned and Anthropic built-in skills stay available
- **B.** Members can still upload skill ZIP files to their personal list
- **C.** All skills, including provisioned ones, are disabled
- **D.** Only skills created before the change keep working

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The setting stops users creating or uploading their own skills; organization-provisioned and built-in skills remain.

_Why a tempting wrong answer misses:_ Turning off the whole Skills capability is what disables every skill, not this setting.

Reference: https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization

</details>

---

*Study area: Connector governance · hard*

A security team wants Slack access in Claude to follow IdP group membership and end automatically when someone is deprovisioned. What should the admin configure?

- **A.** A desktop extension allowlist entry for the Slack connector
- **B.** Enterprise-managed authorization for the connector, scoped to roles
- **C.** A custom role that blocks connectors for every other group
- **D.** A Compliance API rule that revokes Slack tokens nightly

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

Enterprise-managed auth authorizes the connector once through the IdP, assigns it by role, and removes access when the user is deprovisioned in the IdP.

_Why a tempting wrong answer misses:_ Desktop extension allowlists govern local MCP bundles in Claude Desktop, not remote connectors.

Reference: https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization

</details>

---

## Data retention, ZDR, and data usage

Set how long chats and projects live, understand what zero data retention does and does not cover, and explain the training policy correctly.

**You will be able to:**

- Configure custom retention for chats and projects
- Explain how project retention overrides chat retention
- Describe the scope of zero data retention on the Claude API
- State the default training policy for commercial products

**Key points**

- Custom data retention is an Enterprise feature managed by Owners in Organization settings > Data and Privacy. The minimum period is 30 days and each month counts as 30 days.
- Retention counts from last activity: the last message for a chat and the last update for a project. Chats inside a project follow the project's period, and projects are kept indefinitely unless you set one.
- Shortening a period schedules everything outside it for permanent deletion as soon as you save. Deletion runs at midnight UTC and cannot be undone.
- Custom retention does not apply to Claude Design, Claude Tag, Claude Managed Agents, or other features built on Claude Code on the web.
- ZDR is arranged per organization with Anthropic's sales team and covers eligible Messages and Token Counting API features. The Claude Team and Enterprise product interfaces are not ZDR-eligible, except Claude Code used through Enterprise with ZDR enabled.
- Covered Models such as Claude Fable 5.1 require 30-day retention, so a ZDR organization turns retention on per Workspace to use them.
- By default Anthropic does not train on inputs or outputs from commercial products. Feedback submitted with the thumbs buttons is an exception, and Owners can disable it with the Rate chats setting.

**Practice:** Write your organization's retention statement in three sentences: chat period, project period, and what happens to data older than that. Then list which Claude surfaces your policy does not cover and who owns those.

**Read:** [Configure custom data retention controls](https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans) · [API and data retention (ZDR)](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) · [Is my data used for model training? (commercial)](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training) · [Restrict access to Claude with IP allowlisting](https://support.claude.com/en/articles/13200993-restrict-access-to-claude-with-ip-allowlisting)

<details><summary>Flashcards</summary>

**Q:** What is the minimum custom retention period?  
**A:** 30 days, with each month counted as 30 days.

**Q:** Do chats inside a project follow the chat retention period?  
**A:** No. They follow the project's period, and projects are kept indefinitely unless you set one.

**Q:** Are Team and Enterprise chat interfaces covered by ZDR?  
**A:** No. ZDR covers eligible Claude API features; the exception is Claude Code through Enterprise with ZDR enabled.

</details>

### Check your understanding

*Study area: Data retention · medium*

An organization sets chat retention to 90 days and leaves project retention unset. A chat inside a project had its last message 120 days ago. What happens to it?

- **A.** It is kept, because chats in a project follow the project's retention
- **B.** It was deleted at midnight UTC on day 90 after the last message
- **C.** It is moved out of the project and then deleted on day 120
- **D.** It is archived to the audit log instead of being deleted

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Project retention always takes precedence for chats inside a project, and projects are kept indefinitely unless a project period is set.

_Why a tempting wrong answer misses:_ The 90-day chat period only applies to standalone chats.

Reference: https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans

</details>

---

*Study area: Zero data retention · hard*

Which TWO statements about zero data retention (ZDR) are accurate? (Select 2.)

- **A.** ZDR covers the Claude Enterprise chat interface once enabled
- **B.** ZDR is enabled per organization by the account team
- **C.** Covered Models such as Claude Fable 5.1 need 30-day retention
- **D.** ZDR automatically extends to every organization on an account
- **E.** ZDR covers usage in the Claude Console playground

<details><summary>Answer &amp; explanation</summary>

**Correct answers: B, C**

ZDR is arranged per organization, and Covered Models require 30-day retention unless Anthropic expressly authorizes otherwise.

_Why a tempting wrong answer misses:_ Team and Enterprise interfaces and the Console are outside ZDR, and enablement does not carry over to other organizations.

Reference: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention

</details>

---

*Study area: Data usage policy · easy*

A legal reviewer asks whether Anthropic trains models on the organization's Enterprise chats. What is the accurate default answer?

- **A.** Yes, unless the Primary Owner opts out in Data and Privacy
- **B.** Yes, but only on chats older than the retention period
- **C.** No, and nothing a member does can change that for any chat
- **D.** No, except conversations members submit as thumbs feedback

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Commercial inputs and outputs are not used for training by default; explicit feedback is the exception, and Owners can disable feedback with the Rate chats setting.

_Why a tempting wrong answer misses:_ There is no opt-out needed for commercial training because it is off by default.

Reference: https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training

</details>

---

## Audit logs, the Compliance API, and analytics

Prove what happened, feed activity into your security tooling, and measure adoption and spend.

**You will be able to:**

- Export audit logs and read their structure
- Enable the Compliance API and scope its keys
- Use the analytics dashboard and spend export
- Choose between audit logs, the Compliance API, and the Analytics API

**Key points**

- Audit logs are Enterprise-only. Owners export them from Organization settings > Data and Privacy, the export covers the past 180 days, and the emailed link is valid for 24 hours.
- Audit logs record identifiers for chats and projects, not their titles or content. Chat content is exported separately by the Primary Owner through a data export.
- Organizations using customer-managed encryption keys cannot use the Export logs button; audit events are available through the Compliance API instead.
- Only the Primary Owner can turn on the Compliance API, in Organization settings > API. Owners can create keys limited to their own organization; Admins do not see the page.
- The Compliance API covers chat, Cowork, and Claude Code activity, but not cloud sessions in Claude Code or sessions run on Amazon Bedrock or Google Vertex AI.
- Enterprise analytics are open to Owners, Primary Owners, and Admins, though Admins cannot see Spend. The spend report exports per-user, per-model tokens and net and gross spend for up to 90 days, with a one-day delay.

**Practice:** Map three questions your security team asks (for example, who changed SSO settings, what did a departing user upload, and which team drives spend) to the tool that answers each: audit log export, Compliance API, or analytics.

**Read:** [Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) · [Access the Compliance API](https://support.claude.com/en/articles/13015708-access-the-compliance-api) · [View usage analytics for Team and Enterprise plans](https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans)

<details><summary>Flashcards</summary>

**Q:** How far back does an audit log export go?  
**A:** 180 days. The download link is emailed to the requesting Owner and expires after 24 hours.

**Q:** Who can enable the Compliance API?  
**A:** Only the Primary Owner, from Organization settings > API. Owners can create org-scoped keys; Admins don't see the page.

**Q:** Which analytics can an Enterprise Admin not see?  
**A:** Spend. Admins see the rest of the analytics dashboard.

</details>

### Check your understanding

*Study area: Audit logs · medium*

An Enterprise organization uses customer-managed encryption keys. The security team needs audit events. Where should they get them?

- **A.** From the Export logs button in Data and Privacy
- **B.** From the Compliance API, which includes audit events
- **C.** From the usage analytics spend export CSV
- **D.** From a support ticket requesting a manual export

<details><summary>Answer &amp; explanation</summary>

**Correct answer: B**

With CMEK, the Export logs button is unavailable, and audit log events are delivered through the Compliance API.

_Why a tempting wrong answer misses:_ The spend export covers tokens and cost, not audit events.

Reference: https://support.claude.com/en/articles/9970975-access-audit-logs

</details>

---

*Study area: Compliance API · medium*

An Enterprise Owner cannot find the toggle to turn on the Compliance API. Why?

- **A.** Only the Primary Owner can enable the Compliance API
- **B.** The Compliance API must be enabled from the Claude Console
- **C.** Owners must first request audit logs before enabling it
- **D.** The toggle only appears after SCIM provisioning is enabled

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

Only the Primary Owner sees the Compliance API toggle in Organization settings > API; Owners can create keys limited to their organization.

_Why a tempting wrong answer misses:_ The setting lives in claude.ai organization settings, not the Console.

Reference: https://support.claude.com/en/articles/13015708-access-the-compliance-api

</details>

---

## Claude Console and the Admin API

Govern API organizations with workspaces, roles, keys, limits, service accounts, and workload identity federation.

**You will be able to:**

- Organize API usage with workspaces and workspace roles
- Authenticate to the Admin API with the right credential
- Explain what happens to each API key type when a user leaves
- Replace static keys in CI with workload identity federation

**Key points**

- Console organization roles are User, Claude Code User, Limited Developer, Developer, Billing, and Admin. Organization admins get Workspace Admin in every workspace automatically.
- Every organization has a Default Workspace that cannot be renamed or archived, and up to 100 workspaces by default. Each workspace has its own rate limits and monthly spend limits with alerts.
- Archiving a workspace archives every API key created for it and cannot be undone. Archiving the Claude Code workspace disables Claude Code sign-in through Console billing.
- The Admin API accepts an Admin API key (sk-ant-admin...), an org:admin OAuth token, or an unscoped personal or service account key. It can read, rename, and deactivate keys but cannot create them.
- Personal keys stop when their user leaves the organization; service account keys survive the creator's removal and stop only when the service account is archived.
- Workload identity federation exchanges a short-lived OIDC token from your IdP for an Anthropic token bound to a service account, using a federation issuer and a federation rule. Service-account and federation endpoints accept only an org:admin OAuth token.
- Claude Enterprise organizations use a scoped key created in claude.ai for the members and invites endpoints and for Enterprise-only endpoints such as spend limits.

**Practice:** Sketch a workspace layout for one product: a development and a production workspace, their spend limits and alerts, and a service account for CI that federates from GitHub Actions instead of storing an API key.

**Read:** [Admin API](https://platform.claude.com/docs/en/manage-claude/admin-api) · [Workspaces](https://platform.claude.com/docs/en/manage-claude/workspaces) · [Workload Identity Federation](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation) · [Claude Console roles and permissions](https://support.claude.com/en/articles/10186004-claude-console-roles-and-permissions)

<details><summary>Flashcards</summary>

**Q:** Can the Admin API create API keys?  
**A:** No. Keys are created in the Console; the Admin API reads, renames, and deactivates them.

**Q:** What happens to a service account key when its creator leaves?  
**A:** It keeps working. It stops only when the service account is archived.

**Q:** What three resources does workload identity federation use?  
**A:** A federation issuer (the OIDC IdP), a federation rule (match conditions and scope), and a service account (the identity it acts as).

</details>

### Check your understanding

*Study area: Console and Admin API · medium*

A developer who created several API keys leaves the company and is removed from the Console organization. Which keys keep working?

- **A.** Only the developer's personal keys, until they expire
- **B.** None; every key the developer created stops immediately
- **C.** Service account keys the developer created, until archived
- **D.** Keys in the Claude Code workspace, until rotated

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Service account keys act as the service account, so they survive the creator's removal; personal keys and Claude Code workspace keys stop when their user is removed.

_Why a tempting wrong answer misses:_ Personal keys are bound to the user and stop working when the user leaves.

Reference: https://platform.claude.com/docs/en/manage-claude/admin-api

</details>

---

*Study area: Workload identity federation · hard*

A platform team wants GitHub Actions to call the Claude API without storing any long-lived secret. What should they set up?

- **A.** An Admin API key stored as a GitHub encrypted secret
- **B.** A workspace API key with a 24-hour expiration date
- **C.** An org:admin OAuth token exported from an admin's CLI
- **D.** A federation issuer and rule mapping the OIDC token to a service account

<details><summary>Answer &amp; explanation</summary>

**Correct answer: D**

Workload identity federation exchanges the workflow's short-lived OIDC token for an Anthropic token bound to a service account, with no static secret.

_Why a tempting wrong answer misses:_ Expiring keys and exported tokens are still secrets that must be stored and rotated.

Reference: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation

</details>

---

## Claude Code for teams

Connect developers to the organization's plan and enforce Claude Code policy from the admin console or the endpoint.

**You will be able to:**

- Sign developers in to Claude Code with a Team or Enterprise account
- Choose between server-managed and endpoint-managed settings
- Explain where managed settings sit in the settings precedence
- Confirm which managed source a developer's session is using

**Key points**

- Developers sign in by choosing Claude account with subscription at the login prompt and authorizing the organization. Organization skills and plugins then load in Claude Code (v2.1.273 or later).
- Server-managed settings are edited by Owners in Admin Settings > Claude Code > Managed settings and fetched at startup and hourly. They suit organizations without MDM or developers on unmanaged devices.
- Endpoint-managed settings arrive through MDM, the registry, or a managed-settings.json file and can be protected from user edits by the OS, so they are the stronger choice on managed fleets.
- Managed settings sit at the top of the precedence stack, above command-line flags, local project, shared project, and user settings.
- A few security keys honor a stricter value from a lower scope, for example disableClaudeAiConnectors set to true in any scope.
- Running /status shows the Setting sources line, which names the managed source in effect, such as (remote), (plist), (HKLM), or (file).

**Practice:** Draft a starter managed policy that disables bypass permissions mode and restricts permission rules to managed ones. Decide whether to deliver it from the admin console or through MDM, and write the /status output you expect to see.

**Read:** [Use Claude Code with your Team or Enterprise plan](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan) · [Configure server-managed settings](https://code.claude.com/docs/en/server-managed-settings) · [Deploy managed settings](https://code.claude.com/docs/en/managed-settings)

<details><summary>Flashcards</summary>

**Q:** Server-managed vs. endpoint-managed Claude Code settings?  
**A:** Server-managed come from the claude.ai admin console; endpoint-managed come from MDM, registry, or managed-settings.json and resist user edits.

**Q:** How do you confirm which managed source a Claude Code session uses?  
**A:** Run /status and read the Setting sources line, for example Enterprise managed settings (HKLM).

**Q:** Where do managed settings sit in Claude Code's precedence?  
**A:** At the top, above command-line flags, local project, shared project, and user settings.

</details>

### Check your understanding

*Study area: Claude Code managed settings · medium*

An organization without MDM wants to enforce a Claude Code permission deny list on developer laptops. Which delivery method fits best?

- **A.** Commit the deny list to each repository's shared settings file
- **B.** Ask developers to add the rules to their user settings file
- **C.** Server-managed settings in the claude.ai Claude Code admin page
- **D.** Pass the rules with a command-line flag in a shell alias

<details><summary>Answer &amp; explanation</summary>

**Correct answer: C**

Server-managed settings are built for organizations without MDM; Claude Code fetches them at startup and hourly, and managed settings outrank every other scope.

_Why a tempting wrong answer misses:_ Project, user, and command-line settings sit below managed settings and can be changed by the developer.

Reference: https://code.claude.com/docs/en/server-managed-settings

</details>

---

*Study area: Claude Code managed settings · medium*

A developer says a managed policy isn't applying. What should the admin check first on that machine?

- **A.** The Setting sources line in /status
- **B.** The developer's shell history file
- **C.** The organization's audit log export
- **D.** The Claude Code workspace spend limit

<details><summary>Answer &amp; explanation</summary>

**Correct answer: A**

The Setting sources line names the managed source in effect, and Skipped sources shows any source a higher-priority one overrode.

_Why a tempting wrong answer misses:_ Audit logs record organization events, not which settings file a local session loaded.

Reference: https://code.claude.com/docs/en/managed-settings

</details>

---
