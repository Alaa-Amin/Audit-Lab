const { callGemini } = require('../lib/gemini');
const { saveProgress } = require('../lib/db');
const { GRADING_SYSTEM } = require('../lib/scenario-secrets');

const DOC_TITLES = {
  'po-1042': 'PO-1042', 'po-1043': 'PO-1043', 'po-1044': 'PO-1044',
  policy: 'Procurement Policy Section 4.2', vendor: 'Vendor Master - Gulf Office Supplies',
  'email-042': 'Email Thread - Procurement & Vendor',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { studentId, findings } = req.body || {};
    if (!studentId || !Array.isArray(findings) || findings.length === 0) {
      return res.status(400).json({ error: 'studentId and at least one finding are required' });
    }

    const submissionText = findings
      .map((f, i) => {
        const ev = (f.evidence || []).map((id) => DOC_TITLES[id] || id).join(', ') || 'none referenced';
        return `Finding ${i + 1}:\nTitle: ${f.title}\nCriteria: ${f.criteria}\nCondition: ${f.condition}\nCause: ${f.cause}\nRisk/Effect: ${f.effect}\nRecommendation: ${f.recommendation}\nEvidence referenced: ${ev}`;
      })
      .join('\n\n');

    const raw = await callGemini(GRADING_SYSTEM, [{ role: 'user', parts: [{ text: submissionText }] }], 800);
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let verdict;
    try {
      verdict = JSON.parse(cleaned);
    } catch (parseErr) {
      verdict = {
        overall_score: 0,
        verdict: 'NEEDS WORK',
        root_cause_identified: false,
        component_feedback: { criteria: '-', condition: '-', cause: '-', effect: '-', recommendation: '-' },
        summary: 'Grading could not be completed cleanly - please try submitting again.',
      };
    }

    await saveProgress(studentId, { findings, verdict });
    return res.status(200).json(verdict);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Grading could not be completed. Please try again.' });
  }
};
