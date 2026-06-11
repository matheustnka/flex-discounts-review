# Flex Full Flow Review — PM handoff

**Prototype ID:** `flex-discounts-review`  
**Variant:** A  
**Last updated:** 3 June 2026  
**Audience:** Product / design review (not a PRD)

---

## 1. What this prototype tests

**Hypothesis:** Bringing the full flex-pricing flow into BEES Link (no BEES One detour) increases sales-rep adoption of flex pricing and reduces time-to-approved-quote, without losing pricing precision.

**What reps do today (problem):** Cart in Link → leave for BEES One → spreadsheet upload → edit → approval → return to Link → truck → checkout.

**What this prototype shows:** Cart → **Save as draft** → payment method → edit flex on products → **Save changes** (summary) → **Send for approval** → auto-approve (demo) → **Place order**.

---

## 2. How to open it

### Local (recommended for review)

From repo root:

```bash
cd link-ux-product/prototype-kit
python3 serve.py
```

| Asset | URL |
|--------|-----|
| **Prototype** | http://127.0.0.1:8765/prototypes/flex-discounts-review/ |
| **Metrics dashboard** | http://127.0.0.1:8765/prototypes/_shared/dashboard.html?id=flex-discounts-review |

### Role

Use the **Demo role** toggle (bottom-right): **Sales rep** vs **Retailer**.

- **Save as draft**, flex balance, Order drafts, and Flex wallet are **sales-rep only**.
- Retailer view hides those affordances.

### Deep links (hash routes)

| Screen | Hash |
|--------|------|
| Home | `#home` |
| PO upload (flow start) | `#po-upload` |
| Truck / cart | `#cart` |
| Order draft editor | `#order-draft` |
| Order drafts hub | `#drafts` |
| Flex wallet (tab on hub) | `#drafts` → **Flex wallet** tab, or `#wallet` (redirects to hub + wallet tab) |

---

## 3. Recommended walkthroughs

### A. New order from truck (empty flex — primary test path)

1. **Order → Order by PO file** → upload area → **Continue** → `#cart`
2. On cart: **Save as draft** → name the draft (required) → `#order-draft`
3. **Payment method** step → pick a method → **Save changes**
4. **Products table**
   - Quantities are filled
   - **Flex %** and **New price** are **empty** (rep must enter pricing)
   - Bulk **Apply flex price %** field is **empty** on entry
5. Select row(s) → enter flex (e.g. `-10` or `10`) → **Apply** → table updates
6. Or edit **Flex %** / **New price** / **Qty** directly on a product row (applies to all stores for that product)
7. Expand a product (chevron) to edit **per store**
8. **Save changes** (toolbar) → right **summary** shows discounts / increases / final price
9. **Send for approval** → ~3s “Sending…” → status **Approved**
10. **Place order** → confirmation

### B. Existing draft from hub (prefilled flex)

1. **Order → Order drafts** → open a **Draft** row (Edit)
2. Payment method already set → products visible
3. **Flex %** and **New price** are **prefilled** from mock catalogue (e.g. −10%)
4. Bulk flex field still starts **empty** each visit
5. **Summary** may already reflect saved pricing (`summaryApplied`)

### C. Approved draft on truck

1. Complete flow through approval, or open an approved draft from hub
2. Return to cart with flex tags visible (mock: `cartSource = draft`)
3. Illustrates “flex already applied” on truck before place order

---

## 4. Order draft — product table (current behaviour)

### Columns

Checkbox · Expand · Product · Quantity · Current price · Flex price (%) · New price · Total · Actions (delete)

### Flex pricing rules

| Input | Meaning | Example (current price $20.66) |
|--------|---------|--------------------------------|
| **Negative** or leading **`-`** | Discount | `-10` → −10% → **$18.59** |
| **Positive** (no `-`) | Price increase | `10` → +10% → **$22.73** |

Helper under flex: **Min -10% max 12%** (discount range only; increases are not capped in the prototype).

### Where to edit

| Level | Behaviour |
|--------|-----------|
| **Product row** | Editable qty, flex %, new price; changes apply to **all stores** under that product |
| **Store row** (expanded) | Editable per store; can diverge (parent shows range, e.g. `10% to 20%`) |
| **Bulk bar** | Select product and/or store rows → enter flex % → **Apply** (secondary button) |
| **Delete** | Bulk trash (tertiary, same style as row delete) removes selected products or store lines |

### Apply vs Save changes

| Action | What updates |
|--------|----------------|
| **Apply** (bulk) or inline row edit | **Table only** (live); marks draft dirty |
| **Save changes** (toolbar) | **Right-hand summary** (original, discounts, price increases, adjustments, final price) |

Instructions on page:

> To edit product prices, enter a flex % and click Apply (or edit a row). Use - before the number for discount. Click Save changes to update the summary.

### Entry source (data prefills)

| How the rep arrived | Flex % / new price on load | Bulk flex field |
|---------------------|----------------------------|-----------------|
| **Truck** → Save as draft → payment method | **Empty** (qty filled) | **Empty** |
| **Order drafts hub** or **Wallet** → open draft | **Prefilled** from mock data | **Empty** |

### Payment method

- First visit from truck: **payment picker** before products; header **Save changes** only on that step.
- After commit: products + toolbar **Save changes**; header save hidden on products view.

### Other draft UI

- **Apply discounts via spreadsheet** — modal (download template + upload); **stub** (no file parsing)
- **All stores** filter — UI only
- Search — UI only
- Zebra rows, selected row highlight (blue), expandable store children

---

## 5. Summary panel (right column)

Shown after **Save changes**:

- Original price  
- **Discounts** (green) — % is relative to **discounted lines only** (avoids “+0%” when increase is small vs whole order)  
- **Price increases** (orange) — % relative to **increased lines only**  
- **Price adjustments** (net)  
- **Final price**  
- **Available flex balance** card → link to wallet  
- CTA: **Send for approval** → **Place order** (when approved)

Until first **Save changes** on a dirty draft: note that summary will update after save.

---

## 6. Screen inventory

| # | Screen | Purpose |
|---|--------|---------|
| 1 | Home | Entry + flex balance teaser |
| 2 | PO upload | Start flow (skips wizard middle steps) |
| 3 | Cart (truck) | Seller expanded, collapsed stores, **Save as draft** |
| 4 | Order draft | Payment step + products + summary + approval |
| 5 | Order drafts hub | Overview cards, **Order drafts** + **Flex wallet** tabs, list + ledger |
| 6 | Confirmation | After place order |

**Draft status machine (demo):** Draft → Pending (~3s) → Approved (synthetic auto-approval + banner)

### Order drafts hub (latest)

- **Overview cards** at top: available flex balance, draft-order discount/increase totals (tooltip on draft orders: *Sum of all orders, including those under approval*).
- **Two tabs:** **Order drafts** (table) and **Flex wallet** (ledger). No separate Flex wallet nav item — home **Go to flex wallet** opens the wallet tab on this screen.
- **Order drafts table columns:** Order draft name · Created on · Stores · Price adjustments (green discount / orange increase) · Final price · Status · Actions.
- **Statuses shown:** Draft, Awaiting approval, Approved, Rejected, Completed, Expired.
- **Row actions:** Draft rows → Edit / Download / Delete; all others → View / Download / Delete.
- **Flex wallet tab:** Order name · Order date · Amount · Status (Committed / Released); filters All / Committed / Released. Committed rows use secondary text colour.

---

## 7. Success metrics (for research)

| Metric | Target | Tracker hint |
|--------|--------|----------------|
| Save-as-draft adoption | > 40% | `cta-cart-save-draft` / cart views |
| Time to send for approval | median < 5 min | first `#po-upload` → `cta-draft-send-approval` |
| Bulk apply usage | > 30% | `cta-flex-bulk-apply` / `#order-draft` sessions |
| Place order after approval | > 80% | `cta-draft-place-order` / send approval |
| Validation errors at submit | < 5% | `validation_errors_at_submit` on send |

Full event list: see `HYPOTHESIS.md` in this folder.

**Participant data:** Events stay in browser `localStorage` unless a remote endpoint is configured. Dashboard supports **Download JSON** / **Import JSON** for moderated sessions.

---

## 8. In scope vs out of scope

### Built for this review

- End-to-end rep path: PO → cart → draft → flex edit → approval → place order  
- Per-product and per-store editing, bulk apply/delete  
- Signed flex (% discount vs increase)  
- Truck vs hub prefills  
- Payment-before-products for new drafts  
- Spreadsheet modal UI (not functional import)  
- Drafts hub + wallet (mock data)  
- Hexa-styled UI + usage tracking  

### Not built (call out in feedback)

- Real API / persistence (in-memory + `localStorage` only)  
- Real auth / roles (dev toggle only)  
- Wizard steps between PO and cart  
- Real manager approval UI  
- Working spreadsheet import/export  
- Multi-approver / multi-vendor  
- Real CNPJ, SKU, or market pricing  

---

## 9. Mock data notes

- Generic chains: Chain Alpha, Beta, Gamma, etc.  
- ~20 products, 3–5 stores per product (some with varied flex for range display)  
- USD, illustrative totals  
- No real customer or distributor identifiers  

---

## 10. Files in this prototype

| File | Role |
|------|------|
| `index.html` | All screens + behaviour |
| `data.js` | Mock catalogue, drafts list, wallet |
| `styles.css` | Layout, table, bulk bar, summary |
| `HYPOTHESIS.md` | Research protocol + tracker inventory |
| `PM-EXPORT.md` | This document |

---

## 11. Suggested PM review questions

1. Is **payment method before products** the right gate for new truck drafts?  
2. Should **truck drafts** stay flex-empty, or prefill from cart-negotiated prices when we have them?  
3. Is **Apply → table** then **Save changes → summary** the right two-step mental model?  
4. Do we need **spreadsheet** in v1 or is inline + bulk enough for the hypothesis test?  
5. Are **per-store** rows required on day one, or is product-level editing enough for v1?  
6. Discount **min/max** on increases — any business rules missing?  

---

## 12. Sharing this doc

- **Markdown:** send `PM-EXPORT.md` or paste into Confluence / Notion / Google Docs.  
- **Live demo:** share local URL or published prototype URL when Azure publish is configured (`prototype-kit/PUBLISH.md`).  
- **Metrics:** share dashboard link + ask participants to export JSON after sessions.

For engineering / UX detail on the hypothesis test setup, see **`HYPOTHESIS.md`** in the same folder.
