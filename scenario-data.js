window.SCENARIO = {
  caseNumber: 'AR-2031',
  company: 'Al Rawda Trading Co.',
  brief:
    "You are the internal auditor assigned to a procure-to-pay walkthrough at Al Rawda Trading Co. Three purchase orders to the same office-supplies vendor were raised on the same day by the same requester, each just under the KD 1,000 supervisor approval limit. Review the evidence, interview the process owners, and build a finding.",
  documents: [
    { id: 'po-1042', tag: 'Purchase Order', title: 'PO-1042', icon: 'doc',
      rows: [['Vendor', 'Gulf Office Supplies W.L.L.'], ['Requester', 'Ahmad Salem, Procurement Officer'], ['Amount', 'KD 950.000'], ['Date raised', '12 Aug 2026'], ['Approved by', 'Fatima Al-Otaibi, Supervisor'], ['Items', 'Office furniture - desks, partitions']] },
    { id: 'po-1043', tag: 'Purchase Order', title: 'PO-1043', icon: 'doc',
      rows: [['Vendor', 'Gulf Office Supplies W.L.L.'], ['Requester', 'Ahmad Salem, Procurement Officer'], ['Amount', 'KD 900.000'], ['Date raised', '12 Aug 2026'], ['Approved by', 'Fatima Al-Otaibi, Supervisor'], ['Items', 'Office furniture - chairs, cabinets']] },
    { id: 'po-1044', tag: 'Purchase Order', title: 'PO-1044', icon: 'doc',
      rows: [['Vendor', 'Gulf Office Supplies W.L.L.'], ['Requester', 'Ahmad Salem, Procurement Officer'], ['Amount', 'KD 980.000'], ['Date raised', '12 Aug 2026'], ['Approved by', 'Fatima Al-Otaibi, Supervisor'], ['Items', 'Office furniture - shelving, fittings']] },
    { id: 'policy', tag: 'Policy Excerpt', title: 'Procurement Policy Section 4.2', icon: 'scale',
      rows: [['Level 1 - Supervisor', 'Up to KD 1,000 per purchase order'], ['Level 2 - Manager', 'KD 1,000.01 - KD 5,000'], ['Level 3 - Director', 'Above KD 5,000'], ['Note', 'Approval level is determined by the value of the purchase order.']] },
    { id: 'vendor', tag: 'Vendor Record', title: 'Vendor Master - Gulf Office Supplies', icon: 'building',
      rows: [['Vendor since', '2021'], ['Bank account', 'Single account on file'], ['Related POs (last 90 days)', '7'], ['Notes', 'No prior audit exceptions on file.']] },
    { id: 'email-042', tag: 'Correspondence', title: 'Email Thread - Procurement & Vendor', icon: 'mail', locked: true,
      rows: [['From', 'Ahmad Salem'], ['To', 'Gulf Office Supplies (Sales)'], ['Subject', 'Re: Office fit-out order'], ['Body', "\"Let's raise this as three separate POs instead of one so it doesn't need to go to my manager - same total, just split it the way I send them.\""]] },
  ],
  personas: {
    ahmad: { name: 'Ahmad Salem', role: 'Procurement Officer', initials: 'AS', color: '#9C3B2E' },
    fatima: { name: 'Fatima Al-Otaibi', role: 'Procurement Supervisor', initials: 'FA', color: '#33463A' },
  },
  findingFields: [
    { key: 'title', label: 'Title', kind: 'input' },
    { key: 'criteria', label: 'Criteria', kind: 'textarea' },
    { key: 'condition', label: 'Condition', kind: 'textarea' },
    { key: 'cause', label: 'Cause', kind: 'textarea' },
    { key: 'effect', label: 'Risk / Effect', kind: 'textarea' },
    { key: 'recommendation', label: 'Recommendation', kind: 'textarea' },
  ],
};
