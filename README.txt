Flex Full Flow Review — share package
=====================================

This folder is self-contained. No install or server required.

HOW TO OPEN THE PROTOTYPE
  1. Unzip if you received a .zip file.
  2. Keep this folder structure intact:
       share-for-pm/
         README.txt          (this file)
         PM-EXPORT.md        (product handoff — start here)
         flex-discounts-review/
           index.html        ← double-click to open in browser
         _shared/            (assets — do not move)
  3. Open flex-discounts-review/index.html in Chrome or Edge.
  4. Use the Demo role toggle (bottom-right): Sales rep vs Retailer.

PM HANDOFF
  Read PM-EXPORT.md in this folder for hypothesis, walkthroughs, flex rules,
  and review questions.

KEY FLOW (sales rep)
  PO upload → Cart → Save as draft → Payment method → Edit flex on products
  → Save changes (summary) → Send for approval → Place order

NOTES
  - All data is mocked (no real CNPJs, prices, or customers).
  - Events stay in the browser only (localStorage); nothing is sent to a server.
  - Repo: Azure DevOps bees-link-ai-scripts → link-ux-product/prototype-kit/prototypes/flex-discounts-review (master)

Prepared by Beatriz Garcia · Link Ops (Midna)
