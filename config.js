import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jyhxqgitpvgqfgyvvkwy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY // importante que sea pública en Next.js

export const supabase = createClient(supabaseUrl, supabaseKey)
