import { userStore } from "@/store/userStore";
import { useUser } from "@clerk/expo";
import { useSupabase } from "./useSupabase";
import { useEffect } from "react";

export function useUserSync() {

    //get current logged in user
    const { user } = useUser();
    const setAdmin = userStore((state) => state.setIsAdmin);

    const authSupabase = useSupabase();

    useEffect(() => {
        if (!user) {
            return;
        }
        
        syncUser();
    }, [user])

    const syncUser = async () => {
        const { data } = await authSupabase
            .from('users')
            .select('clerk_id, is_admin')
            .eq('clerk_id', user!.id)
            .single();

        if(data){
            setAdmin(data?.is_admin ?? false)
            return;
        }
        
        const {data: newUser} = await authSupabase
            .from('users')
            .insert({
                clerk_id: user!.id,
                email: user!.emailAddresses[0].emailAddress,
                first_name: user!.firstName,
                last_name: user!.lastName,
                avatar_url: user!.imageUrl,
            })
            .select("is_admin")
            .single();


        setAdmin(newUser?.is_admin ?? false)
    }

}