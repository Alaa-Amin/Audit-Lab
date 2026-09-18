const { callGemini } = require('../lib/gemini');
const { saveProgress } = require('../lib/db');
const { SCENARIOS } = require('../lib/scenario-secrets');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { studentId, caseId, findings, lang } = req.body || {};
    if (!studentId || !caseId || !Array.isArray(findings) || findings.length === 0) {
      return res.status(400).json({ error: 'studentId, caseId and at least one finding are required' });
    }
    const scenario = SCENARIOS[caseId];
    if (!scenario) return res.status(400).json({ error: 'Unknown case' });

    const langInstruction = lang === 'ar'
      ? "\n\nIMPORTANT: Write the \"component_feedback\" values and the \"summary\" value in Modern Standard Arabic suitable for a professional Kuwaiti workplace. Keep the JSON keys, the \"verdict\" value (exactly \"PASS\" or \"NEEDS WORK\", in English), and \"root_cause_identified\" (true/false) exactly as specified - only the human-readable feedback text should be in Arabic."
      : '';
    const gradingSystem = scenario.gradingSystem + langInstruction;

    const submissionText = findings
      .map((f, i) => {
        const ev = (f.evidenceTitles || f.evidence || []).join(', ') || 'none referenced';
        return `Finding ${i + 1}:\nTitle: ${f.title}\nCriteria: ${f.criteria}\nCondition: ${f.condition}\nCause: ${f.cause}\nRisk/Effect: ${f.effect}\nRecommendation: ${f.recommendation}\nEvidence referenced: ${ev}`;
      })
      .join('\n\n');

    const raw = await callGemini(gradingSystem, [{ role: 'user', parts: [{ text: submissionText }] }], 800);
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

    await saveProgress(studentId, caseId, { findings, verdict });
    return res.status(200).json(verdict);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Grading could not be completed. Please try again.' });
  }
};
