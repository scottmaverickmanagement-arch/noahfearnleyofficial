
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://jpolzhazmiwbbvqwkbxw.supabase.co'
const supabaseKey = 'sb_publishable_JyBewG2A82XL_vKZYZxgHg_AT1rS1kX'

export const supabase = createClient(supabaseUrl, supabaseKey)
