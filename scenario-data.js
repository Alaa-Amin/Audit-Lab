window.FINDING_FIELDS = [
  { key: 'title', label: 'Title', kind: 'input' },
  { key: 'criteria', label: 'Criteria', kind: 'textarea' },
  { key: 'condition', label: 'Condition', kind: 'textarea' },
  { key: 'cause', label: 'Cause', kind: 'textarea' },
  { key: 'effect', label: 'Risk / Effect', kind: 'textarea' },
  { key: 'recommendation', label: 'Recommendation', kind: 'textarea' },
];

window.CASES = {
  'procurement-po-split': {
    caseNumber: 'AR-2031',
    company: 'Al Rawda Trading Co.',
    title: 'Procure-to-Pay Walkthrough',
    department: 'Procurement',
    listBlurb: "Three purchase orders. One vendor. One day. Something doesn't add up.",
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
      ahmad: { name: 'Ahmad Salem', role: 'Procurement Officer' },
      fatima: { name: 'Fatima Al-Otaibi', role: 'Procurement Supervisor' },
    },
  },

  'payroll-ghost-employee': {
    caseNumber: 'AR-4417',
    company: 'Al Rawda Trading Co.',
    title: 'Payroll Continuity Review',
    department: 'HR & Payroll',
    listBlurb: "An employee left three months ago. The payslips didn't get the message.",
    brief:
      "You are the internal auditor reviewing payroll continuity controls at Al Rawda Trading Co. A warehouse employee's termination was processed in May, but payroll records show salary payments continuing for three more months afterward. Review the evidence, interview HR and Payroll, and build a finding.",
    documents: [
      { id: 'termination-letter', tag: 'HR Record', title: 'Termination Letter - K. Al-Haidari', icon: 'doc',
        rows: [['Employee', 'Khaled Al-Haidari, Warehouse Assistant'], ['Termination date', '18 May 2026'], ['Processed by', 'Noor Al-Fahad, HR Coordinator'], ['Reason', 'Resignation - notice period waived'], ['Status', 'Filed and signed by department manager']] },
      { id: 'payroll-register', tag: 'Payroll Register', title: 'Payroll Register - Jun to Aug 2026', icon: 'doc',
        rows: [['Employee', 'Khaled Al-Haidari (ID 3391)'], ['June 2026', 'KD 420.000 paid'], ['July 2026', 'KD 420.000 paid'], ['August 2026', 'KD 420.000 paid'], ['Status field', 'Active (unchanged since March 2026)']] },
      { id: 'hr-policy', tag: 'Policy Excerpt', title: 'HR Policy Section 7.3 - Termination Processing', icon: 'scale',
        rows: [['Step 1', 'Department manager submits termination request to HR'], ['Step 2', 'HR Coordinator updates employee status and notifies Payroll within 3 working days'], ['Step 3', 'Payroll removes employee from the next pay run'], ['Note', 'The HR Coordinator role has system access to both HR records and payroll status flags.']] },
      { id: 'attendance', tag: 'Attendance Record', title: 'Biometric Attendance Log - K. Al-Haidari', icon: 'building',
        rows: [['Last recorded entry', '17 May 2026'], ['June - August 2026', 'No entries recorded'], ['System notes', 'No leave or remote-work exception on file for this period.']] },
      { id: 'bank-record', tag: 'Bank Deposit Record', title: 'Payroll Bank Transfer Detail', icon: 'mail', locked: true,
        rows: [['Payee name on file', 'Khaled Al-Haidari'], ['Account number', 'Changed on 20 May 2026, two days after termination'], ['New account holder', "Matches an account belonging to Noor Al-Fahad, HR Coordinator"], ['Change requested via', "Employee self-service portal, logged in as Khaled Al-Haidari"]] },
    ],
    personas: {
      noor: { name: 'Noor Al-Fahad', role: 'HR Coordinator' },
      hamad: { name: 'Hamad Al-Sabah', role: 'Payroll Manager' },
    },
  },
};

window.CASE_LIST = Object.keys(window.CASES).map((id) => {
  const c = window.CASES[id];
  return { id: id, caseNumber: c.caseNumber, title: c.title, department: c.department, listBlurb: c.listBlurb };
});
