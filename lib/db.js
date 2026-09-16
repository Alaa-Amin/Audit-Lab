const { createClient } = require('@supabase/supabase-js');
const { SCENARIOS } = require('./scenario-secrets');

function getClient() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
}

function defaultPersonaMessages(caseId) {
  const personaIds = Object.keys(SCENARIOS[caseId].personas);
  const out = {};
  personaIds.forEach((id) => { out[id] = []; });
  return out;
}

async function loadProgress(studentId, caseId) {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('audit_lab_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('case_id', caseId)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    return {
      unlocked: [...(SCENARIOS[caseId].defaultUnlocked || [])],
      messages: defaultPersonaMessages(caseId),
      findings: [],
      verdict: null,
    };
  }
  return { unlocked: data.unlocked, messages: data.messages, findings: data.findings, verdict: data.verdict };
}

async function saveProgress(studentId, caseId, patch) {
  const supabase = getClient();
  const current = await loadProgress(studentId, caseId);
  const merged = { ...current, ...patch };
  const { error } = await supabase.from('audit_lab_progress').upsert({
    student_id: studentId,
    case_id: caseId,
    unlocked: merged.unlocked,
    messages: merged.messages,
    findings: merged.findings,
    verdict: merged.verdict,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return merged;
}

module.exports = { loadProgress, saveProgress };
