# Enterprise Administration: lesson guide

This guide follows the nine modules of the Enterprise Administration lane. It is written for the people who run a Claude Team or Enterprise organization day to day: IT administrators, identity engineers, security and compliance staff, and the Owners who sign off on their work. Each section explains the model behind a group of settings, the order to do things in, and the mistakes that are hard to undo. Plan names, menu paths, and limits were checked against the Claude Help Center and the Claude Developer Platform docs in September 2026. Admin features change often, so treat the linked docs in each module as the final word when a screen looks different.

A useful way to read the lane is as one rollout. You pick a plan, stand up identity, decide how people arrive and leave, shape what each group can do, govern the tools Claude can reach, set how long data lives, prove what happened, manage the developer platform, and finally bring Claude Code under the same policy. The modules are in that order.

## Module 1: Plans, seats, and roles

Start by being precise about which plan you are administering, because several features in this lane exist only on Enterprise.

**Team** is the self-serve business plan. It uses Standard and Premium seats, needs at least two members, and tops out at 150 seats. An organization that outgrows that ceiling, or that needs SCIM, audit logs, custom retention, or domain capture, moves to Enterprise.

**Enterprise** now sells a single Enterprise seat, billed annually. The seat covers Claude on the web, desktop, and mobile, plus Claude Code and Cowork. Usage is billed separately at API rates, so there is no per-seat usage cap to manage; instead you manage spend (Module 4). Self-serve Enterprise starts at 20 seats. Sales-assisted Enterprise starts at 50 and adds invoicing and multi-currency billing. If your organization still has Chat and Chat + Claude Code seats, or Standard and Premium Enterprise seats, those are legacy models that convert to the single seat at the next renewal. HIPAA-ready organizations are the exception and keep separate seat types.

Roles come next. Every organization has exactly one **Primary Owner**. That seat consumes a license, and it does not have to be a person: many organizations assign it to a service account so the most privileged role isn't tied to someone who might leave. **Owners** control the settings with the widest blast radius, such as SSO, retention, and audit log exports. **Admins** handle day-to-day membership but cannot invite or remove Owners. **Users** simply use Claude. On Enterprise there is also a **Custom** role, which starts with no permissions at all; everything a Custom member can do comes from the custom roles attached to their groups.

Practical advice: write down who holds Primary Owner and Owner before you change anything else, keep the Owner list short, and give helpdesk staff Admin rather than Owner.

## Module 2: Organization setup, domains, and SSO

Identity settings live in a **parent organization**, which sits above your Claude and Console organizations. Enterprise plans get one automatically. A Team plan gets one the first time someone enables SSO. A standalone Console organization either requests its own parent or merges into a Team or Enterprise parent. Each parent connects to one identity provider, and every domain verified on that parent is managed through the same IdP. If two business units use different IdPs, plan that split before you verify domains, not after.

Domain verification uses a DNS TXT record whose value begins with `anthropic-domain-verification-`. Copy the whole value while the screen shows it, because once the domain moves to Pending the console won't display it again. Anthropic uses WorkOS behind the scenes for domain verification and SSO configuration, and the setup flow finishes with a Test Single Sign-on step. Run that test with an account you can afford to lock out.

The single most important thing to understand is that **verifying a domain changes nothing for users by itself**. Access only changes when SSO is configured and you switch on **Require SSO**. At that point anyone on your domains who isn't assigned to the Anthropic application in your IdP loses access to their existing Free, Pro, or Max accounts. Those accounts aren't deleted, but they become unreachable until IdP assignment is fixed. So assign the right IdP groups first, communicate the change, and only then require SSO.

Once domains are verified, Owners can also turn on **Restrict organization creation**. That stops anyone on those domains from creating new Claude or Console organizations, including personal accounts. It's a prerequisite for domain capture in Module 3, and it closes the "shadow workspace" gap where teams buy their own plans on a company email.

A good order for this module: verify domains, configure SSO, test with a pilot group, assign production groups in the IdP, require SSO, then restrict organization creation.

## Module 3: Provisioning with JIT, SCIM, and domain capture

Provisioning decides how people arrive in the organization and, just as important, how they leave. There are three modes.

- **Invite only** is the default. An admin invites each person.
- **JIT (just-in-time)** creates a member with the User role the first time someone signs in through SSO. It's available on Team, Enterprise, and Console organizations.
- **SCIM** lets the IdP add and remove members from its assignments without waiting for anyone to sign in. It's available on Enterprise and on Console organizations that sit under an Enterprise or their own parent. It is not available on Team.

The difference that matters most is removal. **JIT never removes anyone.** If you unassign a person in the IdP, they can no longer sign in, but they still hold a seat until an admin removes them in Claude. With SCIM, removal follows the IdP.

SCIM is also less forgiving. Switching the provisioning mode to SCIM removes every member who isn't in the IdP directory, so reconcile the directory with your current member list first. With SCIM group mappings, members not covered by any role mapping are removed on the next sync. And because SCIM identifies people by email, changing someone's email creates a new member and removes the old record, along with its history in that seat. Coordinate email renames with the identity team.

**Domain capture**, shown in the product as migrating accounts on your domain, is Enterprise-only and one-way. Before you can turn it on you need restricted organization creation, verified DNS, required SSO, and JIT or SCIM. When you claim a domain, every affected personal account gets one shared 30-day deadline. Accounts that haven't migrated by then are deactivated, and paid personal plans are cancelled with a prorated refund. Treat this as a change with a communications plan: announce it, tell people how to move their work, and pick a start date that isn't right before a holiday.

## Module 4: Custom roles, groups, and spend governance

Enterprise lets you shape feature access by group rather than giving everyone the same switches. The key is knowing how the layers combine. Access resolves through four levels, and **the most restrictive level wins**:

1. Platform overrides from your contract.
2. The organization-wide toggle.
3. Custom role permissions.
4. The member's own setting.

The organization toggle is the master switch. If a feature is off for the organization, no custom role can turn it back on for a group. Custom roles only affect members whose role is set to Custom; Owners, Admins, and Users keep their built-in permissions. Custom roles can also carry admin permissions, such as billing or identity management, which lets you delegate a narrow slice of administration without creating another Owner.

Groups can be created by hand or synced from the IdP through SCIM. Synced groups are owned by the IdP, so you can't rename or delete them in Claude. If you plan to drive access from IdP groups, name them carefully at the source.

Spend is the other half of this module. Because the Enterprise seat bills usage at API rates, you set spend limits for the organization, per user, and per group. Usage-based Enterprise plans can also give a group a shared monthly budget (in beta at the time of writing). One subtlety trips people up: when a member belongs to several groups, **plugin settings use the most permissive group**, while spend limits follow whatever you choose in the Multi-group spend limit setting. Don't assume both behave the same way.

## Module 5: Connectors, skills, and plugin governance

Claude becomes more useful as it reaches more tools, so this is where most governance time goes.

**Connectors.** With enterprise-managed authentication, an admin authorizes a connector once through the IdP. Chosen roles inherit that authorization when they first sign in, and deprovisioning someone in the IdP also removes their connector access. That's a much cleaner story for auditors than every user holding a personal OAuth grant.

**Skills.** Skills need Cloud code execution and file creation turned on, along with Skills itself, in Organization settings > Plugins & skills. Skills you provision reach everyone and also load in Claude Code for developers signed in with their Claude account. If you turn off User-created skills, people can't create or upload their own, but provisioned skills and Anthropic's built-in skills stay available. Many organizations start there: curated skills only, then open up later.

**Plugins.** Plugin marketplaces need Cowork and Skills enabled. You can upload plugins as ZIP files or sync them from a private GitHub or GitLab repository, which gives you pull-request review for free. Each plugin gets an organization-wide install preference: Required, Installed by default, Available to install, or Not available. Members can't turn off a Required plugin.

Be careful with Required and Installed-by-default plugins. They also install in Claude Code, where their hooks, sub-agents, and MCP servers run on the user's own computer. Review a plugin's hooks the way you would review a login script before marking it Required. Publishing can be set to Requires review, Open, or Off, and with review on, every later version of a submission goes through the same approval, so a plugin can't be swapped for something else after approval.

## Module 6: Data retention, ZDR, and data usage

Retention questions come from legal and security teams early, so it helps to have precise answers.

**Custom retention** is an Enterprise feature managed by Owners under Organization settings > Data and Privacy. The minimum period is 30 days, and months are counted as 30 days each. The clock runs from last activity: the last message in a chat, or the last update to a project. Chats inside a project follow the project's period, and projects are kept indefinitely unless you set one.

Shortening a period is destructive. As soon as you save, everything outside the new window is scheduled for permanent deletion. Deletion runs at midnight UTC and can't be undone. Before you shorten a period, confirm there's no legal hold that needs the older data, and export anything you must keep. Also note the scope: custom retention doesn't apply to Claude Design, Claude Tag, Claude Managed Agents, or other features built on Claude Code on the web, so check those separately.

**Zero data retention (ZDR)** is a different thing. It's arranged per organization with Anthropic's sales team and covers eligible Messages and Token Counting API features. The Claude Team and Enterprise apps aren't ZDR-eligible, with one exception: Claude Code used through Enterprise with ZDR enabled. Some models are designated Covered Models that require 30-day retention; Claude Fable 5.1 is one. A ZDR organization that wants those models turns retention on for a specific Workspace rather than for the whole organization.

On **training**: by default Anthropic doesn't train on inputs or outputs from commercial products. Feedback that users submit with the thumbs buttons is the exception, and Owners can disable it with the Rate chats setting if policy requires.

## Module 7: Audit logs, the Compliance API, and analytics

Three tools answer three different questions: what administrative and user actions happened, what content was created, and how much Claude is being used.

**Audit logs** are Enterprise-only. Owners export them from Organization settings > Data and Privacy. An export covers the past 180 days and arrives as an emailed link that's valid for 24 hours, so download it promptly and store it in your own log platform. Audit logs record identifiers for chats and projects, not their titles or content. Content is exported separately, by the Primary Owner, through a data export. Organizations that use customer-managed encryption keys can't use the Export logs button at all and get audit events through the Compliance API instead.

The **Compliance API** is for continuous, programmatic access. Only the Primary Owner can turn it on, under Organization settings > API. Owners can then create keys limited to their own organization, and Admins don't see the page. It covers chat, Cowork, and Claude Code activity, but not Claude Code cloud sessions or sessions that run on Amazon Bedrock or Google Vertex AI. If your developers use those paths, you'll need the cloud provider's own logging for them.

**Analytics** are for adoption and cost conversations. Owners, Primary Owners, and Admins can open them, but Admins can't see Spend. The spend report exports per-user, per-model tokens with net and gross spend for up to 90 days, with a one-day delay. Pair it with the spend limits from Module 4: analytics tell you where to set limits, and limits stop surprises.

## Module 8: Claude Console and the Admin API

Developer access runs through the Claude Console, which has its own role model. Organization roles are User, Claude Code User, Limited Developer, Developer, Billing, and Admin. Organization admins automatically get Workspace Admin in every workspace.

**Workspaces** are how you separate projects, environments, or cost centers. Every organization has a Default Workspace that can't be renamed or archived, and you can have up to 100 workspaces by default. Each workspace has its own rate limits and monthly spend limits with alerts, which makes workspaces the natural unit for budgeting API use. Archiving is final: it archives every API key created for that workspace and can't be undone. Archiving the Claude Code workspace also disables Claude Code sign-in through Console billing, so check before tidying up.

The **Admin API** automates all of this. It accepts an Admin API key (they begin `sk-ant-admin`), an `org:admin` OAuth token, or an unscoped personal or service account key. It can list, rename, and deactivate API keys but can't create them; key creation stays in the Console. Think about key ownership early. Personal keys stop working when their user leaves the organization. Service account keys survive the creator's departure and stop only when the service account is archived, which makes them the right home for production workloads.

**Workload identity federation** removes long-lived keys from your infrastructure entirely. Your workload presents a short-lived OIDC token from its own identity provider, and a federation issuer plus a federation rule exchange it for an Anthropic token bound to a service account. Note the credential rule: service-account and federation endpoints accept only an `org:admin` OAuth token, not an Admin API key.

Enterprise organizations have one more wrinkle. The members and invites endpoints, and Enterprise-only endpoints such as spend limits, use a scoped key created in claude.ai rather than a Console Admin key.

## Module 9: Claude Code for teams

Claude Code is where governance meets developer laptops, so it deserves its own plan.

Developers join by choosing the Claude account with subscription option at the login prompt and authorizing your organization. From Claude Code v2.1.273, organization skills and plugins load automatically after sign-in, which is how the governance from Module 5 reaches the terminal.

You have two ways to push policy. **Server-managed settings** are edited by Owners in Admin Settings > Claude Code > Managed settings, and Claude Code fetches them at startup and hourly. They need no device management, so they suit organizations without MDM or developers on unmanaged machines. **Endpoint-managed settings** arrive through MDM, the Windows registry, or a `managed-settings.json` file, and the operating system can protect them from user edits. On managed fleets they're the stronger choice. The Desktop Deployment lane covers the file paths and delivery methods in detail.

Either way, managed settings sit at the top of the precedence stack, above command-line flags, local project, shared project, and user settings. A few security keys go further and honor a stricter value from any lower scope; for example, `disableClaudeAiConnectors` set to `true` anywhere wins. A minimal policy that many teams start with blocks the permission-bypass mode:

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable"
  }
}
```

To check what a developer is actually getting, have them run `/status`. The Setting sources line names the managed source in effect, such as `(remote)`, `(plist)`, `(HKLM)`, or `(file)`. If it doesn't show what you expect, the problem is delivery, not the policy itself.

## Putting it together: a rollout checklist

1. Confirm the plan, seat model, Primary Owner, and Owner list (Module 1).
2. Verify domains, configure and test SSO, assign IdP groups, then require SSO (Module 2).
3. Reconcile the directory, choose JIT or SCIM, and plan domain capture with a communications window (Module 3).
4. Set organization toggles, then custom roles, groups, and spend limits (Module 4).
5. Decide connector authentication, curate skills, and review plugins before marking any Required (Module 5).
6. Agree retention periods with legal before saving, and confirm ZDR scope for API work (Module 6).
7. Schedule audit log exports or connect the Compliance API, and review analytics monthly (Module 7).
8. Organize workspaces, move production keys to service accounts, and plan federation (Module 8).
9. Push Claude Code managed settings and verify them with `/status` (Module 9).

Work through each module's practice exercise in a test organization or with a pilot group first. Most of the settings here are easy to turn on and some, like shortened retention and domain capture, can't be reversed.
