import { createSupabaseServerClient } from '../../../../lib/supabaseServer';

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const supabase = createSupabaseServerClient();
    let userId = null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;
    } catch {}

    // Allow client to provide user_id (from local student session) when Supabase auth isn't used
    if (!userId && body?.user_id) {
      userId = body.user_id;
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthenticated' }), { status: 401 });
    }

    const wordId = body.word_id;
    const correct = Boolean(body.correct);

    // Fetch existing record
    const { data: existing } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .maybeSingle();

    let correctCount = existing?.correct_count || 0;
    let nextReviewDate = new Date();

    if (correct) {
      correctCount = (correctCount || 0) + 1;
      // spacing schedule in days
      const schedule = [1, 3, 7, 14, 30, 60];
      const days = schedule[Math.min(correctCount - 1, schedule.length - 1)];
      nextReviewDate = addDays(new Date(), days);
    } else {
      correctCount = Math.max(0, (correctCount || 0) - 1);
      // resurface tomorrow
      nextReviewDate = addDays(new Date(), 1);
    }

    const payload = {
      user_id: userId,
      word_id: wordId,
      correct_count: correctCount,
      next_review_date: nextReviewDate,
    };

    const { data: upserted, error: upsertErr } = await supabase
      .from('vocabulary_progress')
      .upsert(payload, { onConflict: ['user_id', 'word_id'] })
      .select()
      .maybeSingle();

    if (upsertErr) {
      console.error('vocab upsert error', upsertErr);
      return new Response(JSON.stringify({ error: upsertErr.message || String(upsertErr) }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, record: upserted }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const supabase = createSupabaseServerClient();
    let userId = null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;
    } catch {}

    // Allow client to pass ?user_id=... as fallback
    try {
      const url = new URL(req.url);
      const q = url.searchParams.get('user_id');
      if (!userId && q) userId = q;
    } catch {}

    if (!userId) return new Response(JSON.stringify([]), { status: 200 });

    const today = new Date().toISOString();
    const { data, error } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .lte('next_review_date', today)
      .order('next_review_date', { ascending: true })
      .limit(50);

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message || String(error) }), { status: 500 });
    }

    return new Response(JSON.stringify(data || []), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
}
