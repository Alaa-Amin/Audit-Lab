const { loadProgress, saveProgress } = require('../lib/db');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const studentId = (req.query.studentId || '').trim();
      if (!studentId) return res.status(400).json({ error: 'studentId is required' });
      const progress = await loadProgress(studentId);
      return res.status(200).json(progress);
    }

    if (req.method === 'POST') {
      const { studentId, patch } = req.body || {};
      if (!studentId) return res.status(400).json({ error: 'studentId is required' });
      const merged = await saveProgress(studentId, patch || {});
      return res.status(200).json(merged);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong loading or saving your progress.' });
  }
};
