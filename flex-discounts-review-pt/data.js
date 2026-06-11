/* =====================================================================
   Mock data for Flex Full Flow Review.
   All identifiers are intentionally generic: no real CNPJs, no real
   client / chain / SKU names, no real BDR ids. This prototype is
   shared with external distributor sales reps as a public-link test.
   ===================================================================== */

window.FLEX_DATA = (function () {
  // Distributors / sellers ------------------------------------------------
  const DISTRIBUTORS = [
    { code: 'DA', name: 'Distribuidor Alpha' },
    { code: 'DB', name: 'Distribuidor Beta' },
    { code: 'DG', name: 'Distribuidor Gamma' },
  ];

  // Generic CNPJ pattern: 00.000.000/0001-XX
  const cnpj = (n) => '00.000.000/0001-' + String(n).padStart(2, '0');

  // Chains used on the drafts list ---------------------------------------
  const CHAINS = [
    { name: 'Rede Alpha',  cnpj: cnpj(11) },
    { name: 'Rede Beta',   cnpj: cnpj(12) },
    { name: 'Rede Gamma',  cnpj: cnpj(13) },
    { name: 'Rede Delta',  cnpj: cnpj(14) },
    { name: 'Rede Epsilon',cnpj: cnpj(15) },
  ];

  // ----------------------------------------------------------------------
  // SCREEN 2 — Cart structure
  //   Expanded seller (4 products) + 5 collapsed store cards.
  // ----------------------------------------------------------------------
  const cartImg = (initials, hue) => ({ initials, hue });

  const CART = {
    expandedSeller: {
      name: 'Distribuidor Alpha',
      cnpj: cnpj(11),
      storeName: 'Rede Alpha — Mini Mercado 02',
      products: [
        {
          id: 'p-001',
          name: 'Esmalte Vermelho Clássico — 12 un.',
          uom: '12 × 8 ml',
          qty: 100,
          unitPrice: 15.00,
          listPrice: 20.00,
          flexDiscount: true,
          discountApplied: 'Desconto aplicado',
          lineTotal: 1500.00,
          negotiatedTotal: 150.00,
          img: cartImg('EV', 'amber'),
        },
        {
          id: 'p-002',
          name: 'Shampoo Hidratante — 6 un.',
          uom: '6 × 400 ml',
          qty: 100,
          unitPrice: 15.00,
          listPrice: 20.00,
          flexDiscount: true,
          discountApplied: 'Desconto aplicado',
          lineTotal: 1500.00,
          negotiatedTotal: 150.00,
          img: cartImg('SH', 'amber'),
        },
        {
          id: 'p-003',
          name: 'Máscara Capilar Nutritiva — 4 un.',
          uom: '4 × 300 g',
          qty: 40,
          unitPrice: 22.50,
          listPrice: 25.00,
          flexDiscount: false,
          lineTotal: 900.00,
          img: cartImg('MC', 'red'),
        },
        {
          id: 'p-004',
          name: 'Loção Corporal — 12 un.',
          uom: '12 × 200 ml',
          qty: 30,
          unitPrice: 9.80,
          listPrice: 10.50,
          flexDiscount: false,
          lineTotal: 294.00,
          img: cartImg('LC', 'info'),
        },
      ],
      summary: {
        products: 4,
        pallets: '1,2 paletes',
        storeTotal: 37371.80,
        negotiatedTotal: 150.00,
        flexAppliedTotal: 150.00,
      },
    },
    collapsedStores: [
      {
        id: 'c-101',
        storeName: 'Rede Alpha — Matriz',
        cnpj: cnpj(7),
        chip: { type: 'error', label: 'Não foi possível fazer o pedido' },
        storeTotal: 37371.80,
      },
      {
        id: 'c-102',
        storeName: 'Rede Alpha — Sumaré',
        cnpj: cnpj(8),
        productsCount: 5,
        pallets: '1,2 paletes',
        storeTotal: 37371.80,
      },
      {
        id: 'c-103',
        storeName: 'Rede Alpha — Megastore',
        cnpj: cnpj(9),
        productsCount: 7,
        pallets: '1,0 paletes',
        storeTotal: 37371.80,
        minimumNotice: { amount: 250.00, progress: 38 },
      },
      {
        id: 'c-104',
        storeName: 'Rede Alpha — Superstore',
        cnpj: cnpj(10),
        productsCount: 9,
        pallets: '4,1 paletes',
        storeTotal: 37371.80,
      },
      {
        id: 'c-105',
        storeName: 'Rede Alpha — Loja de Bairro',
        cnpj: cnpj(11),
        productsCount: 5,
        pallets: '0,5 paletes',
        storeTotal: 37371.80,
        minimumNotice: { amount: 250.00, progress: 24 },
      },
    ],
    orderSummary: {
      sellerLabel: 'Distribuidor Alpha',
      subtotalLabel: 'Pedido para 11 lojas',
      pallets: '19,94 paletes',
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
  //   10 produtos de cosméticos por loja no rascunho aberto.
  //   Um produto fica sem estoque para demonstrar linha desabilitada.
  // ----------------------------------------------------------------------
  const SOLD_BY_OPTIONS = ['Distribuidor Alpha', 'Distribuidor Beta', 'Distribuidor Gamma'];

  const productSeed = [
    'Esmalte Vermelho Clássico — 12 un.',
    'Shampoo Hidratante — 6 un.',
    'Condicionador Reparador — 6 un.',
    'Máscara Capilar Nutritiva — 4 un.',
    'Creme Hidratante Facial — 4 un.',
    'Sabonete Líquido — 12 un.',
    'Desodorante Roll-on — 12 un.',
    'Loção Corporal — 12 un.',
    'Protetor Solar FPS 50 — 6 un.',
    'Batom Matte — 6 un.',
    'Esmalte Nude Brilhante — 12 un.',
    'Shampoo Anticaspa — 6 un.',
    'Condicionador Brilho — 6 un.',
    'Óleo Capilar — 4 un.',
    'Sérum Facial Vitamina C — 4 un.',
    'Sabonete Íntimo — 12 un.',
    'Desodorante Aerosol — 12 un.',
    'Creme para Mãos — 12 un.',
    'Protetor Solar FPS 30 — 6 un.',
    'Batom Hidratante — 6 un.',
    'Base para Unhas — 12 un.',
    'Shampoo Infantil — 6 un.',
    'Condicionador Kids — 6 un.',
    'Máscara de Cílios — 4 un.',
    'Perfume Corporal — 4 un.',
    'Shampoo Seco — 12 un.',
    'Fixador de Cabelo — 12 un.',
    'Gloss Labial — 6 un.',
  ];

  const PRODUCT_EMOJI = {
    'Esmalte Vermelho Clássico — 12 un.': '💅',
    'Shampoo Hidratante — 6 un.': '🧴',
    'Condicionador Reparador — 6 un.': '🧴',
    'Máscara Capilar Nutritiva — 4 un.': '✨',
    'Creme Hidratante Facial — 4 un.': '🧴',
    'Sabonete Líquido — 12 un.': '🧼',
    'Desodorante Roll-on — 12 un.': '🧴',
    'Loção Corporal — 12 un.': '🧴',
    'Protetor Solar FPS 50 — 6 un.': '☀️',
    'Batom Matte — 6 un.': '💄',
    'Esmalte Nude Brilhante — 12 un.': '💅',
    'Shampoo Anticaspa — 6 un.': '🧴',
    'Condicionador Brilho — 6 un.': '🧴',
    'Óleo Capilar — 4 un.': '✨',
    'Sérum Facial Vitamina C — 4 un.': '🧴',
    'Sabonete Íntimo — 12 un.': '🧼',
    'Desodorante Aerosol — 12 un.': '🧴',
    'Creme para Mãos — 12 un.': '🧴',
    'Protetor Solar FPS 30 — 6 un.': '☀️',
    'Batom Hidratante — 6 un.': '💄',
    'Base para Unhas — 12 un.': '💅',
    'Shampoo Infantil — 6 un.': '🧴',
    'Condicionador Kids — 6 un.': '🧴',
    'Máscara de Cílios — 4 un.': '💄',
    'Perfume Corporal — 4 un.': '✨',
    'Shampoo Seco — 12 un.': '🧴',
    'Fixador de Cabelo — 12 un.': '✨',
    'Gloss Labial — 6 un.': '💄',
  };

  // Pool of store names used to seed each product's per-store breakdown.
  // The 20-store chain in DRAFT_CONTEXT samples 3–5 of these per product
  // so the rep can edit each store's qty / flex / new price independently.
  const STORE_POOL = [
    'Rede Alpha — Mini Mercado 02',
    'Rede Alpha — Matriz',
    'Rede Alpha — Sumaré',
    'Rede Alpha — Megastore',
    'Rede Alpha — Superstore',
    'Rede Alpha — Loja de Bairro',
  ];

  const MINI_MERCADO_02 = 'Rede Alpha — Mini Mercado 02';

  /** Signed flex % per product × store. 0 = sem alteração (aparece no caminhão sem tag flex). */
  function demoFlexSigned(productIdx, storeName, storeIdx) {
    if (storeName === MINI_MERCADO_02) {
      if (productIdx === 0) return 20;           // +20% — espelha linha no rascunho
      if (productIdx >= 1 && productIdx <= 3) return -10;
      if (productIdx === 4) return -12;
      return 0;                                  // itens 6–10 sem alteração
    }
    if (storeIdx === 0) return productIdx === 0 ? 20 : -10;
    if (productIdx % 3 === 2) return 0;
    return storeIdx % 2 === 0 ? -10 : 5;
  }

  const DRAFT_PRODUCTS = productSeed.slice(0, 10).map((name, i) => {
    const ean = '7890026421' + String(34 + i).padStart(2, '0');
    const currentPrice = 20.66;
    const minPct = 10;
    const maxPct = 20;
    const outOfStock = i === 9;

    // 10 produtos × cada loja do pool — lista menor e alinhada ao caminhão.
    const stores = STORE_POOL.map((storeName, sIdx) => {
      const flexSigned = demoFlexSigned(i, storeName, sIdx);
      const magnitude = Math.abs(flexSigned);
      const flexValue = flexSigned === 0
        ? 0
        : +(currentPrice * (magnitude / 100)).toFixed(2);
      const newPrice = flexSigned === 0
        ? currentPrice
        : flexSigned < 0
          ? +(currentPrice - flexValue).toFixed(2)
          : +(currentPrice + flexValue).toFixed(2);
      const qty = 4 + (i % 3);
      return {
        id: `r-${i + 1}-s-${sIdx + 1}`,
        storeName,
        cnpj: cnpj(20 + i * 6 + sIdx),
        qty,
        flexSigned,
        flexPct: magnitude,
        flexValue,
        newPrice,
      };
    });

    // Aggregates the parent product row uses to summarise its stores.
    const totalQty = stores.reduce((s, st) => s + st.qty, 0);
    const flexPcts = stores.map(s => s.flexSigned);
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
      flexPct: Math.abs(flexPcts[0] || 0),
      flexValue: stores[0]?.flexValue || 0,
      minPct,
      maxPct,
      minValue: 2.06,
      maxValue: 4.13,
      finalPrice: stores[0]?.newPrice || currentPrice,
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
    chainName: 'Rede Alpha',
    storesCount: 20,
    deliveryDate: 'Sex., 1 ago. 2026 e mais 2',
    deliveryInstructions: 'Entregar no doca dos fundos da loja. Motorista deve ligar para o gerente na chegada.',
    paymentMethod: 'Pix',
    flexBalance: 15400.00,
    flexInOrder: 5463.99,
    estimatedAfterDelivery: 9542.03,
    perSeller: [
      {
        name: 'Distribuidor Alpha',
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
    DRAFT:               { label: 'Rascunho',              tone: 'neutral' },
    AWAITING_APPROVAL:   { label: 'Aguardando aprovação',  tone: 'warning' },
    APPROVED:            { label: 'Aprovado',           tone: 'success' },
    REJECTED:            { label: 'Rejeitado',           tone: 'error' },
    COMPLETED:           { label: 'Concluído',          tone: 'neutral' },
    EXPIRED:             { label: 'Expirado',            tone: 'neutral' },
    PENDING:             { label: 'Em análise',     tone: 'warning' },
  };

  const WALLET_LEDGER_DEF = {
    committed: {
      label: 'Comprometido',
      tone: 'warning',
      tooltip: 'Pedido ainda está em processo de entrega',
    },
    released: {
      label: 'Liberado',
      tone: 'success',
      tooltip: 'Debitado ou creditado do saldo',
    },
  };

  const DRAFTS_LIST = [
    {
      number: '63765',
      createdOn: 'Jan 6, 2026',
      updatedOn: 'Jan 6, 2026',
      lastUpdated: 'Jan 6, 2026',
      chain: 'Rede Ultra Popular',
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
      chain: 'Rede Ultra Popular',
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
      chain: 'Lojas Beesmart',
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
      chain: 'Lojas Beauty Bee',
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
      chain: 'ShopNow Farma',
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
      chain: 'Lojas Beauty Bee',
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
      chain: 'Lojas Beesmart',
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
      chain: 'ShopNow Farma',
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
      chain: 'Loja Bees Beauty',
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
      chain: 'Rede Ultra Popular',
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
    openingBalanceLabel: 'Orçamento do período',
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
    { id: 'slip-1',   label: 'Boleto em 1 dia' },
    { id: 'slip-3',   label: 'Boleto em 3 dias' },
    { id: 'slip-5',   label: 'Boleto em 5 dias' },
    { id: 'slip-7',   label: 'Boleto em 7 dias' },
    { id: 'slip-10',  label: 'Boleto em 10 dias' },
    { id: 'slip-15',  label: 'Boleto em 15 dias' },
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
