const { createClient } = require('@supabase/supabase-js');

function getClient() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
}

const DEFAULT_UNLOCKED = ['po-1042', 'po-1043', 'po-1044', 'policy', 'vendor'];

async function loadProgress(studentId) {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('audit_lab_progress')
    .select('*')
    .eq('student_id', studentId)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    return { unlocked: DEFAULT_UNLOCKED, messages: { ahmad: [], fatima: [] }, findings: [], verdict: null };
  }
  return { unlocked: data.unlocked, messages: data.messages, findings: data.findings, verdict: data.verdict };
}

async function saveProgress(studentId, patch) {
  const supabase = getClient();
  const current = await loadProgress(studentId);
  const merged = { ...current, ...patch };
  const { error } = await supabase.from('audit_lab_progress').upsert({
    student_id: studentId,
    unlocked: merged.unlocked,
    messages: merged.messages,
    findings: merged.findings,
    verdict: merged.verdict,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return merged;
}

module.exports = { loadProgress, saveProgress, DEFAULT_UNLOCKED };
