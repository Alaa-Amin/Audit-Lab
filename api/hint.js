const { SCENARIOS } = require('../lib/scenario-secrets');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { caseId, persona, lang } = req.body || {};
    const scenario = SCENARIOS[caseId];
    if (!scenario) return res.status(400).json({ error: 'Unknown case' });
    const personaDef = scenario.personas[persona];
    if (!personaDef || !personaDef.hint) return res.status(400).json({ error: 'No hint available' });
    const text = personaDef.hint[lang] || personaDef.hint.en;
    return res.status(200).json({ hint: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not load a hint right now.' });
  }
};
