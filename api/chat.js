const { callGemini } = require('../lib/gemini');
const { loadProgress, saveProgress } = require('../lib/db');
const { SCENARIOS } = require('../lib/scenario-secrets');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { studentId, caseId, persona, text, lang } = req.body || {};
    if (!studentId || !caseId || !persona || !text) {
      return res.status(400).json({ error: 'studentId, caseId, persona and text are all required' });
    }
    const scenario = SCENARIOS[caseId];
    if (!scenario) return res.status(400).json({ error: 'Unknown case' });
    const personaDef = scenario.personas[persona];
    if (!personaDef) return res.status(400).json({ error: 'Unknown persona' });

    const langInstruction = lang === 'ar'
      ? "\n\nIMPORTANT: Respond entirely in Modern Standard Arabic suitable for a professional Kuwaiti workplace, while staying fully in character. Do not respond in English, and do not mix languages."
      : '';
    const systemPrompt = personaDef.system + langInstruction;

    const progress = await loadProgress(studentId, caseId);
    const history = progress.messages[persona] || [];

    const contents = history
      .filter((m) => !m.unlock)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
    contents.push({ role: 'user', parts: [{ text }] });

    let reply = await callGemini(systemPrompt, contents, 500);

    let unlockedId = null;
    const unlockMatch = reply.match(/^\[\[UNLOCK:([a-z0-9-]+)\]\]\s*/i);
    if (unlockMatch) {
      unlockedId = unlockMatch[1];
      reply = reply.replace(unlockMatch[0], '').trim();
    }

    const newHistory = [...history, { role: 'user', text }, { role: 'model', text: reply }];
    if (unlockedId) newHistory.push({ role: 'model', text: '', unlock: unlockedId });

    const newMessages = { ...progress.messages, [persona]: newHistory };
    const newUnlocked = unlockedId && !progress.unlocked.includes(unlockedId)
      ? [...progress.unlocked, unlockedId]
      : progress.unlocked;

    await saveProgress(studentId, caseId, { messages: newMessages, unlocked: newUnlocked });

    return res.status(200).json({ reply, unlocked: unlockedId, unlockedList: newUnlocked });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'The interview could not be reached. Please try again.' });
  }
};
