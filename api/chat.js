const { callGemini } = require('../lib/gemini');
const { loadProgress, saveProgress } = require('../lib/db');
const { PERSONAS } = require('../lib/scenario-secrets');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { studentId, persona, text } = req.body || {};
    if (!studentId || !persona || !text) {
      return res.status(400).json({ error: 'studentId, persona and text are all required' });
    }
    const personaDef = PERSONAS[persona];
    if (!personaDef) return res.status(400).json({ error: 'Unknown persona' });

    const progress = await loadProgress(studentId);
    const history = progress.messages[persona] || [];

    const contents = history
      .filter((m) => !m.unlock)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
    contents.push({ role: 'user', parts: [{ text }] });

    let reply = await callGemini(personaDef.system, contents, 300);

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

    await saveProgress(studentId, { messages: newMessages, unlocked: newUnlocked });

    return res.status(200).json({ reply, unlocked: unlockedId, unlockedList: newUnlocked });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'The interview could not be reached. Please try again.' });
  }
};
