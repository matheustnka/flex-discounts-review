/* =====================================================================
   Mock data for Flex Full Flow Review.
   All identifiers are intentionally generic: no real CNPJs, no real
   client / chain / SKU names, no real BDR ids. This prototype is
   shared with external distributor sales reps as a public-link test.
   ===================================================================== */

window.FLEX_DATA = (function () {
  // Distributors / sellers ------------------------------------------------
  const DISTRIBUTORS = [
    { code: 'DA', name: 'Distributor Alpha' },
    { code: 'DB', name: 'Distributor Beta' },
    { code: 'DG', name: 'Distributor Gamma' },
  ];

  // Generic CNPJ pattern: 00.000.000/0001-XX
  const cnpj = (n) => '00.000.000/0001-' + String(n).padStart(2, '0');

  // Chains used on the drafts list ---------------------------------------
  const CHAINS = [
    { name: 'Chain Alpha',  cnpj: cnpj(11) },
    { name: 'Chain Beta',   cnpj: cnpj(12) },
    { name: 'Chain Gamma',  cnpj: cnpj(13) },
    { name: 'Chain Delta',  cnpj: cnpj(14) },
    { name: 'Chain Epsilon',cnpj: cnpj(15) },
  ];

  // ----------------------------------------------------------------------
  // SCREEN 2 — Cart structure
  //   Expanded seller (4 products) + 5 collapsed store cards.
  // ----------------------------------------------------------------------
  const cartImg = (initials, hue) => ({ initials, hue });

  const CART = {
    expandedSeller: {
      name: 'Distributor Alpha',
      cnpj: cnpj(11),
      storeName: 'Chain Alpha — Mini Market 02',
      products: [
        {
          id: 'p-001',
          name: 'Lager 6-pack Bottles',
          uom: '6 × 355ml Bottle',
          qty: 100,
          unitPrice: 15.00,
          listPrice: 20.00,
          flexDiscount: true,
          discountApplied: 'Discount applied',
          lineTotal: 1500.00,
          negotiatedTotal: 150.00,
          img: cartImg('LB', 'amber'),
        },
        {
          id: 'p-002',
          name: 'Premium Lager Long-neck',
          uom: '4 × 355ml Bottle',
          qty: 100,
          unitPrice: 15.00,
          listPrice: 20.00,
          flexDiscount: true,
          discountApplied: 'Discount applied',
          lineTotal: 1500.00,
          negotiatedTotal: 150.00,
          img: cartImg('PL', 'amber'),
        },
        {
          id: 'p-003',
          name: 'Pale Ale 12-pack Cans',
          uom: '12 × 330ml Can',
          qty: 40,
          unitPrice: 22.50,
          listPrice: 25.00,
          flexDiscount: false,
          lineTotal: 900.00,
          img: cartImg('PA', 'red'),
        },
        {
          id: 'p-004',
          name: 'Sparkling Water 24-pack',
          uom: '24 × 500ml Bottle',
          qty: 30,
          unitPrice: 9.80,
          listPrice: 10.50,
          flexDiscount: false,
          lineTotal: 294.00,
          img: cartImg('SW', 'info'),
        },
      ],
      summary: {
        products: 4,
        pallets: '1.2 pallets',
        storeTotal: 37371.80,
        negotiatedTotal: 150.00,
        flexAppliedTotal: 150.00,
      },
    },
    collapsedStores: [
      {
        id: 'c-101',
        storeName: 'Chain Alpha — Headquarters',
        cnpj: cnpj(7),
        chip: { type: 'error', label: 'Unable to place order' },
        storeTotal: 37371.80,
      },
      {
        id: 'c-102',
        storeName: 'Chain Alpha — Sumare',
        cnpj: cnpj(8),
        productsCount: 5,
        pallets: '1.2 pallets',
        storeTotal: 37371.80,
      },
      {
        id: 'c-103',
        storeName: 'Chain Alpha — Megastore',
        cnpj: cnpj(9),
        productsCount: 7,
        pallets: '1.0 pallets',
        storeTotal: 37371.80,
        minimumNotice: { amount: 250.00, progress: 38 },
      },
      {
        id: 'c-104',
        storeName: 'Chain Alpha — Superstore',
        cnpj: cnpj(10),
        productsCount: 9,
        pallets: '4.1 pallets',
        storeTotal: 37371.80,
      },
      {
        id: 'c-105',
        storeName: 'Chain Alpha — Neighborhood Outlet',
        cnpj: cnpj(11),
        productsCount: 5,
        pallets: '0.5 pallets',
        storeTotal: 37371.80,
        minimumNotice: { amount: 250.00, progress: 24 },
      },
    ],
    orderSummary: {
      sellerLabel: 'Distributor Alpha',
      subtotalLabel: 'Order is for 11 stores',
      pallets: '19.94 pallets',
      subtotal: 176.00,
      fees: 5.00,
      taxes: 10.00,
      deliveryFee: 0,
      estimatedTotal: 57573.93,
      youAreSaving: 2530.00,
    },
    flexBalance: 15400.00,
  };

  // ----------------------------------------------------------------------
  // SCREEN 3 / 4 — Draft order line items
  //   28 mock products for the open chain draft, paginated to 10/page.
  //   Two products are intentionally out-of-stock to demonstrate the
  //   disabled row state.
  // ----------------------------------------------------------------------
  const SOLD_BY_OPTIONS = ['Distributor Alpha', 'Distributor Beta', 'Distributor Gamma'];

  const productSeed = [
    'Bottled Lager — 12pk',
    'Premium Pilsner — 6pk',
    'Hoppy IPA — 4pk',
    'Belgian Wheat — 6pk',
    'Dark Stout — 4pk',
    'Sparkling Water 24pk',
    'Sports Drink Citrus 12pk',
    'Energy Drink Original 12pk',
    'Cola Classic 24pk',
    'Lime Soda 12pk',
    'Pale Ale Cans — 12pk',
    'Amber Ale Bottles — 6pk',
    'Light Lager — 24pk',
    'Non-alcoholic Lager — 6pk',
    'Mineral Water Still 12pk',
    'Mineral Water Sparkling 12pk',
    'Iced Tea Lemon 12pk',
    'Iced Tea Peach 12pk',
    'Cold Brew Coffee 6pk',
    'Bottled Lager — 24pk',
    'Premium Pilsner — 12pk',
    'Hoppy IPA — 6pk',
    'Belgian Wheat — 12pk',
    'Dark Stout — 6pk',
    'Sparkling Water 12pk',
    'Sports Drink Berry 12pk',
    'Energy Drink Sugar-Free 12pk',
    'Cola Zero 24pk',
  ];

  // Map products to a representative emoji so the table can show a
  // visual placeholder where a product photo would go in production.
  const PRODUCT_EMOJI = {
    'Bottled Lager — 12pk': '🍺',
    'Premium Pilsner — 6pk': '🍻',
    'Hoppy IPA — 4pk': '🍺',
    'Belgian Wheat — 6pk': '🍺',
    'Dark Stout — 4pk': '🍺',
    'Sparkling Water 24pk': '💧',
    'Sports Drink Citrus 12pk': '🥤',
    'Energy Drink Original 12pk': '⚡',
    'Cola Classic 24pk': '🥤',
    'Lime Soda 12pk': '🥤',
    'Pale Ale Cans — 12pk': '🍺',
    'Amber Ale Bottles — 6pk': '🍺',
    'Light Lager — 24pk': '🍺',
    'Non-alcoholic Lager — 6pk': '🍺',
    'Mineral Water Still 12pk': '💧',
    'Mineral Water Sparkling 12pk': '💧',
    'Iced Tea Lemon 12pk': '🍋',
    'Iced Tea Peach 12pk': '🍑',
    'Cold Brew Coffee 6pk': '☕',
    'Bottled Lager — 24pk': '🍺',
    'Premium Pilsner — 12pk': '🍻',
    'Hoppy IPA — 6pk': '🍺',
    'Belgian Wheat — 12pk': '🍺',
    'Dark Stout — 6pk': '🍺',
    'Sparkling Water 12pk': '💧',
    'Sports Drink Berry 12pk': '🥤',
    'Energy Drink Sugar-Free 12pk': '⚡',
    'Cola Zero 24pk': '🥤',
  };

  // Pool of store names used to seed each product's per-store breakdown.
  // The 20-store chain in DRAFT_CONTEXT samples 3–5 of these per product
  // so the rep can edit each store's qty / flex / new price independently.
  const STORE_POOL = [
    'Ultra popular - Store 01',
    'Ultra popular - Centro',
    'Ultra popular - Zona Sul',
    'Ultra popular - Zona Norte',
    'Ultra popular - Anália Franco',
    'Ultra popular - Vila Olímpia',
  ];

  const DRAFT_PRODUCTS = productSeed.map((name, i) => {
    const ean = '7890026421' + String(34 + i).padStart(2, '0');
    const currentPrice = 20.66;
    const baseFlexPct = 10;
    const minPct = 10;
    const maxPct = 12;
    const outOfStock = i === 9 || i === 17;

    // Generate 3–5 stores per product. First few products keep their
    // store-level values aligned (so the parent row shows a single value);
    // products from index 3 onwards get small variations to demonstrate
    // the range display ("5% to 10%", "R$ 40,00 to R$ 74,40").
    const storeCount = 3 + (i % 3);
    const varied = i >= 3;
    const stores = Array.from({ length: storeCount }, (_, sIdx) => {
      const flexPct = varied
        ? baseFlexPct + (sIdx % 3) * 2.5  // 10, 12.5, 15, 10, ...
        : baseFlexPct;
      const flexValue = +(currentPrice * (flexPct / 100)).toFixed(2);
      const newPrice = +(currentPrice - flexValue).toFixed(2);
      const qty = varied ? 3 + sIdx : 4;
      return {
        id: `r-${i + 1}-s-${sIdx + 1}`,
        storeName: STORE_POOL[sIdx % STORE_POOL.length],
        cnpj: cnpj(20 + i * 6 + sIdx),
        qty,
        flexPct,                    // magnitude, positive — represents a discount
        flexValue,
        newPrice,
      };
    });

    // Aggregates the parent product row uses to summarise its stores.
    const totalQty = stores.reduce((s, st) => s + st.qty, 0);
    const flexPcts = stores.map(s => s.flexPct);
    const newPrices = stores.map(s => s.newPrice);
    const minFlex = Math.min(...flexPcts);
    const maxFlex = Math.max(...flexPcts);
    const minNew = Math.min(...newPrices);
    const maxNew = Math.max(...newPrices);
    const total = stores.reduce((s, st) => s + st.qty * st.newPrice, 0);

    return {
      id: 'r-' + (i + 1),
      name,
      emoji: PRODUCT_EMOJI[name] || '📦',
      ean,
      soldBy: SOLD_BY_OPTIONS[i % SOLD_BY_OPTIONS.length],
      flexDiscount: i === 0,
      currentPrice,
      flexPct: baseFlexPct,
      flexValue: +(currentPrice * (baseFlexPct / 100)).toFixed(2),
      minPct,
      maxPct,
      minValue: 2.06,
      maxValue: 2.47,
      finalPrice: +(currentPrice - currentPrice * (baseFlexPct / 100)).toFixed(2),
      qty: totalQty,
      total,
      outOfStock,
      stores,
      flexRange: { min: minFlex, max: maxFlex },
      newPriceRange: { min: minNew, max: maxNew },
      hasVariation: minFlex !== maxFlex,
    };
  });

  const DRAFT_CONTEXT = {
    chainName: 'Chain Alpha',
    storesCount: 20,
    deliveryDate: 'Fri, Aug 1, 2026 and 2 others',
    deliveryInstructions: 'Deliver to back-of-store dock. Driver to call store manager on arrival.',
    paymentMethod: 'PIX',
    flexBalance: 15400.00,
    flexInOrder: 5463.99,
    estimatedAfterDelivery: 9542.03,
    perSeller: [
      {
        name: 'Distributor Alpha',
        stores: 3,
        subtotal: 53573.93,
        deliveryFree: true,
        flexPricing: 1463.99,
        total: 51573.83,
      },
    ],
    approver: {
      name: 'Alex Silva',
      email: 'alex.silva@example.com',
    },
  };

  // ----------------------------------------------------------------------
  // SCREEN 5 — Drafts list (Order drafts hub)
  // ----------------------------------------------------------------------
  const STATUS_DEF = {
    DRAFT:               { label: 'Draft',              tone: 'neutral' },
    AWAITING_APPROVAL:   { label: 'Awaiting approval',  tone: 'warning' },
    APPROVED:            { label: 'Approved',           tone: 'success' },
    REJECTED:            { label: 'Rejected',           tone: 'error' },
    COMPLETED:           { label: 'Completed',          tone: 'neutral' },
    EXPIRED:             { label: 'Expired',            tone: 'neutral' },
    PENDING:             { label: 'Pending review',     tone: 'warning' },
  };

  const WALLET_LEDGER_DEF = {
    committed: {
      label: 'Committed',
      tone: 'warning',
      tooltip: 'Order is still in the delivery process',
    },
    released: {
      label: 'Released',
      tone: 'success',
      tooltip: 'Debited or credited from the balance',
    },
  };

  const DRAFTS_LIST = [
    {
      number: '63765',
      createdOn: 'Jan 6, 2026',
      updatedOn: 'Jan 6, 2026',
      lastUpdated: 'Jan 6, 2026',
      chain: 'Ultra popular Market chain',
      stores: 1,
      finalPrice: null,
      totalDiscount: null,
      products: null,
      discountPct: null,
      adjustmentType: null,
      status: 'DRAFT',
    },
    {
      number: '34573',
      createdOn: 'Jan 5, 2026',
      updatedOn: 'Jan 5, 2026',
      lastUpdated: 'Jan 6, 2026',
      chain: 'Ultra popular Market chain',
      stores: 5,
      finalPrice: null,
      totalDiscount: null,
      products: null,
      discountPct: null,
      adjustmentType: null,
      status: 'DRAFT',
      isOpen: true,                  // The draft the user is currently editing
    },
    {
      number: '65377',
      createdOn: 'Jan 3, 2026',
      updatedOn: 'Jan 3, 2026',
      lastUpdated: 'Jan 3, 2026',
      chain: 'Beesmart Stores',
      stores: 6,
      finalPrice: 5425.52,
      totalDiscount: 271.27,
      products: 40,
      discountPct: 5,
      adjustmentType: 'discount',
      status: 'AWAITING_APPROVAL',
    },
    {
      number: '63764',
      createdOn: 'Jan 3, 2026',
      updatedOn: 'Jan 3, 2026',
      lastUpdated: 'Jan 3, 2026',
      chain: 'Beauty Bee Stores',
      stores: 5,
      finalPrice: 4453.60,
      totalDiscount: 445.36,
      products: 100,
      discountPct: 10,
      adjustmentType: 'increase',
      status: 'AWAITING_APPROVAL',
    },
    {
      number: '63765',
      createdOn: 'Jan 2, 2026',
      updatedOn: 'Jan 2, 2026',
      lastUpdated: 'Feb 27, 2025',
      chain: 'ShopNow Pharma',
      stores: 5,
      finalPrice: 2642.92,
      totalDiscount: 528.40,
      products: 28,
      discountPct: 20,
      adjustmentType: 'discount',
      status: 'REJECTED',
    },
    {
      number: '51235',
      createdOn: 'Dec 30, 2025',
      updatedOn: 'Dec 30, 2025',
      lastUpdated: 'Jan 15, 2015',
      chain: 'Beauty Bee Stores',
      stores: 5,
      finalPrice: null,
      totalDiscount: null,
      products: null,
      discountPct: null,
      adjustmentType: null,
      status: 'REJECTED',
    },
    {
      number: '51235',
      createdOn: 'Dec 29, 2025',
      updatedOn: 'Dec 29, 2025',
      lastUpdated: 'Jan 6, 2025',
      chain: 'Beesmart Stores',
      stores: 2,
      finalPrice: 4900.00,
      totalDiscount: 240.00,
      products: 155,
      discountPct: 3,
      adjustmentType: 'increase',
      status: 'APPROVED',
    },
    {
      number: '63765',
      createdOn: 'Dec 29, 2025',
      updatedOn: 'Dec 29, 2025',
      lastUpdated: 'Dec 30, 2025',
      chain: 'ShopNow Pharma',
      stores: 1,
      finalPrice: 3000.00,
      totalDiscount: 240.00,
      products: 30,
      discountPct: 3,
      adjustmentType: 'discount',
      status: 'COMPLETED',
    },
    {
      number: '51235',
      createdOn: 'Dec 28, 2025',
      updatedOn: 'Dec 28, 2025',
      lastUpdated: 'Dec 30, 2025',
      chain: 'Bees Beauty Store',
      stores: 2,
      finalPrice: 1900.00,
      totalDiscount: 190.00,
      products: 15,
      discountPct: 10,
      adjustmentType: 'discount',
      status: 'EXPIRED',
    },
    {
      number: '47812',
      createdOn: 'Dec 27, 2025',
      updatedOn: 'Dec 27, 2025',
      lastUpdated: 'Dec 28, 2025',
      chain: 'Ultra popular Market chain',
      stores: 8,
      finalPrice: 7250.10,
      totalDiscount: 410.20,
      products: 60,
      discountPct: 6,
      adjustmentType: 'discount',
      status: 'APPROVED',
    },
  ];

  const HUB_FLEX = {
    available: 15400.00,
    forDrafts: 5483.99,
    balanceAfter: 9542.03,
    // overview cards
    discountsTotal:       1218.47,
    discountsActive:      854.93,
    discountsDraft:       363.54,
    increasesTotal:        490.00,
    increasesActive:       340.00,
    increasesDraft:        150.00,
    afterActiveQuotes:   15400.00,   // available after active-quote adjustments
    afterDraftQuotes:     9542.03,   // available after all draft adjustments
  };

  // ----------------------------------------------------------------------
  // FLEX WALLET — ledger rows derived from DRAFTS_LIST.
  // Ledger status is either Committed (flex still tied to in-flight order)
  // or Released (debited or credited back to the balance).
  // ----------------------------------------------------------------------
  const STATUS_TO_LEDGER = {
    DRAFT:             'committed',
    PENDING:           'committed',
    AWAITING_APPROVAL: 'committed',
    APPROVED:          'committed',
    COMPLETED:         'released',
    REJECTED:          'released',
    EXPIRED:           'released',
  };

  const WALLET_ENTRIES = DRAFTS_LIST
    .map((d, idx) => {
      const ledgerStatus = STATUS_TO_LEDGER[d.status];
      if (!ledgerStatus) return null;
      const amount = d.isOpen
        ? DRAFT_CONTEXT.flexInOrder
        : (d.totalDiscount != null ? d.totalDiscount : 0);
      if (amount === 0) return null;
      const direction = ledgerStatus === 'released' && (d.status === 'REJECTED' || d.status === 'EXPIRED')
        ? 'in'
        : 'out';
      return {
        id: `w-${idx}`,
        draftIdx: idx,
        orderName: d.chain,
        orderDate: d.createdOn,
        ledgerStatus,
        direction,
        amount,
      };
    })
    .filter(Boolean);

  const WALLET_TOTALS = WALLET_ENTRIES.reduce((acc, e) => {
    acc[e.ledgerStatus] = (acc[e.ledgerStatus] || 0) + e.amount;
    return acc;
  }, { committed: 0, released: 0 });

  const WALLET = {
    available: HUB_FLEX.available,
    openingBalanceLabel: 'Period budget',
    totals: WALLET_TOTALS,
    entries: WALLET_ENTRIES,
  };

  // ----------------------------------------------------------------------
  // Payment methods — picked by the sales rep before products are shown
  // on the order-draft. Each option *can* shift product prices; the first
  // bank-slip rule of thumb is "longer term ⇒ slightly higher prices".
  // The prototype doesn't recompute lines on selection; the option list
  // and the "may change prices" disclaimer convey the trade-off.
  // ----------------------------------------------------------------------
  const PAYMENT_METHODS = [
    { id: 'pix',      label: 'Pix' },
    { id: 'slip-1',   label: 'Bank slip in 1 day' },
    { id: 'slip-3',   label: 'Bank slip in 3 days' },
    { id: 'slip-5',   label: 'Bank slip in 5 days' },
    { id: 'slip-7',   label: 'Bank slip in 7 days' },
    { id: 'slip-10',  label: 'Bank slip in 10 days' },
    { id: 'slip-15',  label: 'Bank slip in 15 days' },
  ];

  return {
    DISTRIBUTORS,
    CHAINS,
    CART,
    DRAFT_PRODUCTS,
    DRAFT_CONTEXT,
    DRAFTS_LIST,
    STATUS_DEF,
    WALLET_LEDGER_DEF,
    HUB_FLEX,
    WALLET,
    PAYMENT_METHODS,
  };
})();
