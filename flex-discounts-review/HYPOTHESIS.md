---
# Visibility metadata read by scripts/build-public.py
public: true
publishedAt: "2026-06-01"
variant: A
---

# Flex Full Flow Review

## Hypothesis
> Bringing the full flex-pricing flow into BEES Link (eliminating the BEES
> One detour) increases sales-rep adoption of flex pricing and reduces
> median time-to-approved-quote, without sacrificing pricing-edit
> precision.

## Variant
**A** — full flex-pricing flow embedded inside BEES Link. A new
sales-rep-only "Save as draft" CTA appears on the cart (next to
"Continue with this seller") and routes into a single end-to-end
flex-edit / send-for-approval / place-order journey. Today's reality
forces the rep to leave BEES Link, log into BEES One, upload a
spreadsheet, edit prices there, send for approval, then come back to
BEES Link to add to truck and check out — this prototype tests whether
collapsing all of that into one platform changes behaviour.

## Target audience
Distributor sales representatives who today shuttle between BEES Link
and BEES One to place flex-discounted orders. The prototype is hosted
on the **public** site (anonymous link) so reps can be invited without
needing a Microsoft sign-in. Target sample: 8–12 reps across 3–4
distributors, run as 30-min moderated sessions over 2 weeks.

## Success metrics
| Metric | Source event | Target |
|---|---|---|
| Save-as-draft adoption | `click` where `track == "cta-cart-save-draft"` / `pageview` on `#cart` | > 40% |
| Time-to-send-for-approval | first `pageview` on `#po-upload` → first `click` on `cta-draft-send-approval` | median < 5 min |
| Bulk-apply-% usage | `click` where `track == "cta-flex-bulk-apply"` / sessions reaching `#order-draft` | > 30% |
| Place-order conversion | `click` where `track == "cta-draft-place-order"` / `click` where `track == "cta-draft-send-approval"` | > 80% |
| Edit-precision (no regression) | rows in error state at submit (`validation_errors_at_submit` in `draft_send_for_approval`) | < 5% of submits |

The `cta-cart-role-toggle` event is a dev-only affordance for switching
between sales-rep and retailer views during the demo. Exclude it from
every primary metric above.

## What "validated" looks like
**Supported** — Save-as-draft adoption ≥ 40%, time-to-send-for-approval
median ≤ 5 min, place-order conversion ≥ 80%, **and** ≥ 5 distinct
reps complete the full flow end-to-end without abandoning. Edit-
precision must not regress (< 5% submits carry validation errors).

**Rejected** — Save-as-draft adoption < 20%, or place-order conversion
< 50%, or > 25% of reps abandon between cart and send-for-approval.

**Inconclusive** — Any partial result in between, or sample < 5 reps.
In that case we extend the test window and/or run one more cohort
before deciding.

## Data
Open [the participant dashboard](../_shared/dashboard.html?id=flex-discounts-review)
to see live metrics for *internal* sessions.

This prototype is shared **publicly** with external distributor sales
reps. Their event data is captured in their own browser's
`localStorage` only (the tracker has no remote sink configured by
default). After each session ask the participant to click **Download
JSON** in the dashboard and email the file back — then load the file
into the dashboard locally with **Import JSON** to collate.

If we move to longer/larger waves, wire `data-endpoint="…"` on the
tracker `<script>` tag to a centralised sink and update this section.

## Visibility & sharing
- **Internal URL** (always, Microsoft sign-in required):
  `https://<internal-host>/prototypes/flex-discounts-review/`
- **Public URL** (anonymous, **expires 30 days from `2026-06-01`** —
  bump `publishedAt` to extend):
  `https://<public-host>/prototypes/flex-discounts-review/`

Hostnames live in
[`prototype-kit/.publish-config.json`](../../.publish-config.json). At
the time of scaffolding both hostnames are `PENDING_PROVISIONING`, so
only the local URL is usable until someone with Contributor on a BEES
sandbox subscription runs
[`prototype-kit/scripts/provision-azure.sh`](../../scripts/provision-azure.sh).
See [`prototype-kit/PUBLISH.md`](../../PUBLISH.md) for the full publish
flow.

Run `python3 ../../serve.py` from `link-ux-product/prototype-kit/` for
local preview:
- Prototype: `http://127.0.0.1:8765/prototypes/flex-discounts-review/`
- Dashboard: `http://127.0.0.1:8765/prototypes/_shared/dashboard.html?id=flex-discounts-review`

## Tracked CTA inventory
All events flow into the shared tracker (`hypothesis-tracker.js`) with
`prototypeId = "flex-discounts-review"` and `variant = "A"`.

| `data-track` id | Where | Why we care |
|---|---|---|
| `cta-po-continue` | Screen 1 — PO Upload | Did the rep start the flow at all? |
| `cta-cart-continue` | Screen 2 — Cart | Existing "Continue with this seller" — baseline. |
| `cta-cart-save-draft` | Screen 2 — Cart | **Key conversion event.** Did the rep choose the new flex flow? |
| `cta-cart-role-toggle` | Dev toggle | Excluded from primary metrics; used to demo role visibility. |
| `cta-draft-payment-edit` | Screen 3 — Draft head | Engagement with editable order metadata. |
| `cta-flex-toggle-pct-value` | Screen 3 — Filter bar | Do reps prefer % or $ units when editing? |
| `cta-flex-toggle-grouping` | Screen 3 — Filter bar | Do reps group by product or by store? |
| `cta-flex-bulk-apply` | Screen 3 — Bulk bar | Are bulk discounts being used vs. row-by-row? |
| `cta-flex-bulk-delete` | Screen 3 — Bulk bar | Bulk delete is destructive — track usage. |
| `cta-flex-row-edit` | Screen 3 — Per row | First inline edit per session also fires `flex_row_first_edit`. |
| `cta-flex-row-delete` | Screen 3 — Per row | Per-row delete usage. |
| `cta-draft-send-approval` | Screen 3 — Sidebar | **Key submission event.** End of the edit phase. |
| `cta-draft-place-order` | Screen 4 — Sidebar | **Key conversion event.** End of the approval phase. |
| `cta-drafts-create-new` | Screen 5 — Hub | Did reps re-enter the flow from the hub? |
| `cta-drafts-edit` | Screen 5 — Row action menu | Re-engagement with an existing draft. |
| `cta-drafts-download` | Screen 5 — Row action menu | Export usage signal. |
| `cta-drafts-delete` | Screen 5 — Row action menu | Cleanup behaviour. |

Custom (`HT.track`) events worth pulling in dashboards:
- `po_continue_shortcut` (waived-middle-steps signal)
- `draft_created_from_cart`
- `draft_send_for_approval` (with `validation_errors_at_submit` payload)
- `draft_auto_approved` (synthetic — fired ~3s after Send for approval)
- `order_placed` (with `total_flex_used`)
- `flex_row_first_edit` (first inline edit per session)
- `flex_bulk_applied` / `flex_bulk_deleted`
- `role_toggled` (dev signal)
- `drafts_row_opened` (with status payload)

## In scope (built in this prototype)
- Screen 1: simplified PO upload entry point (one drop-zone, single
  "Continue" button that skips straight to Cart). Wizard middle steps
  are intentionally stubbed — see Out of scope below.
- Screen 2: cart with expanded seller (Distributor Alpha, 4 products,
  flex discount tags), 5 collapsed store cards including error /
  minimum-required states, order summary, and the **new** "Save as
  draft" CTA + Flex balance, sales-rep-only.
- Screen 3 / 4: single Order Draft screen with state machine (DRAFT →
  PENDING → APPROVED), inline-editable flex prices with min/max
  validation, multi-select + bulk-apply / bulk-delete, % vs $ unit
  toggle, by-product vs by-store grouping toggle, right-hand flex
  balance + per-seller totals + state-aware primary CTA, simulated
  manager auto-approval after a 3-second pause, approver banner.
- Screen 5: Order drafts hub with hero flex balance card, draft list
  across all 7 statuses (Processing, Draft, Approved, Rejected, Error,
  Completed, Expired) plus 1 row using the synthetic "Pending review"
  state, row action menu (Edit / Download / Delete), Create new and
  Download report buttons.
- Screen 6: confirmation stub after Place order.
- Flex wallet: per-draft ledger of ins and outs against the flex
  balance, with a 4-bucket hero (Committed / Active / Consumed /
  Released), filter chips, and a row-click jump back to the source
  draft. Reachable from the Order menu, the cart's flex balance row,
  the Order Draft sidebar balance card, and the Order drafts hub
  hero card. Sales-rep-only.
- BEES topbar with custom "Order" dropdown menu containing
  "Order by PO file" (always), "Order drafts" (sales-rep only), and
  "Flex wallet" (sales-rep only).
- Dev role toggle pinned bottom-right for demoing role visibility.

## Out of scope (captured for follow-up)
- Real backend / persistence — all state lives in `localStorage` and
  this prototype's in-memory `state` object.
- Authentication / role assignment — role is faked via the dev toggle
  and persisted to `localStorage.flex_userRole`.
- Wizard middle steps: file analysis, product review, preferred
  sellers, catalog review. Step 1 jumps directly to the cart. The
  hypothesis is downstream of these, so we waived them deliberately.
- Manager approval persona view — approval is simulated by an
  auto-flip after a 3s timeout, with a fake approver banner.
- Spreadsheet download / upload alternative — deferred to V2.
- Multi-vendor approval flows — the prototype uses a single approver.
- Real CNPJ / SKU / pricing data — every identifier is generic
  (`00.000.000/0001-XX`, "Chain Alpha / Beta / Gamma / Delta",
  generic product names, USD).
- Centralised event sink — events stay in each participant's browser
  unless they click Download JSON. See **Data** above.
- Filter dropdown body on the draft list and the hub list — the
  toggle button is wired so we can measure intent, but the panel
  contents are stubbed.

## Assumptions / waivers
- The team explicitly waived the wizard middle steps (file analysis →
  product review → preferred sellers → catalog review). They are not
  required to test the hypothesis, which is about the cart → flex
  edit → approve → place-order arc.
- No PRD; this prototype is built from a one-page minimum-requirements
  brief co-authored with the requester. Scope is captured under
  **In scope** above; anything not listed there is out.
- Public sharing was explicitly opted-in. All copy and mock data has
  been sanitised (no internal HLR ids, no real CNPJs, no real BeesMart
  store names, no BDR ids, no real prices). If real data sneaks in,
  flag it and either sanitise or downgrade to private.
- The Hexa kit is the design source of truth. Where a pattern was not
  in the kit (BEES topbar with two rows, custom "Order" dropdown,
  store-card collapsed/expanded variants, drafts hub action menu), the
  prototype approximates it with kit primitives and flags the gap so
  it can be promoted to `_shared/` in a follow-up.

## Source requirements
- [ ] PRD: not available — explicitly waived
- [ ] HLR: not available — explicitly waived
- [x] Minimum requirements brief: agreed in chat on 2026-06-01;
      captured under **In scope** / **Out of scope** above
- [ ] Waived (with agreed scope above)
