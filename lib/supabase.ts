
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

//supabase connection client: 1 general use
export const supabasePublicClient = createClient(supabaseUrl, supabaseAnonKey);

export function createClerkSupabaseClient(getToken: () => Promise<string | null>) {
    
    //supabase connection client: 2 authorized use only 
    //takes 3 parameters 
    return createClient(supabaseUrl, supabaseAnonKey,{
        async accessToken() {
            const token = await getToken();
            return token;
        }
    });
}

