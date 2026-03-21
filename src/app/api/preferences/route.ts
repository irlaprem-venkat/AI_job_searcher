import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, desired_salary, locations, job_types, experience_level, auto_apply_enabled } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('job_preferences')
      .upsert({
        user_id: userId,
        desired_salary,
        locations,
        job_types,
        experience_level,
        auto_apply_enabled,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('job_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    // If no preferences found, just return empty state instead of 404 error
    if (error && error.code !== 'PGRST116') throw error;
    
    return NextResponse.json(data || {});
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
