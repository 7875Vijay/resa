
import SignIn from "@/app/(auth)/sign-in";
import { supabasePublicClient } from "@/lib/supabase";
import { useAuth, useUser } from "@clerk/expo";
import { useEffect, useState } from "react";

export default function useSaveProperty( propertyId: string ) {
    const [isSaving, setIsSaving] = useState(false);
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    const [isSaved, setIsSaved] = useState(false);

    useEffect(()=>{
        checkSaved();
    },[propertyId])

    async function checkSaved() {
        if (!isSignedIn || !user?.id) return;
        try{
            setIsSaving(true);
            var { data, error } = await supabasePublicClient.from("saved_properties")
                    .select('*')
                    .eq('user_clerk_id', user?.id)
                    .eq('property_id', propertyId)
                    .maybeSingle();

            if(!error && data){
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsSaving(false);
        }
    }

    const toggleSave = async () => {
        if (!isSignedIn || !user?.id) return;
        try {
                setIsSaving(true);
                var { data, error } = await supabasePublicClient.from("saved_properties")
                    .select('*')
                    .eq('user_clerk_id', user?.id)
                    .eq('property_id', propertyId)
                    .maybeSingle();

                if (!data) {
                    //saved property not found need to insert in saved properties
                    const { data: savePropertyData, error: savePropertyError } = await supabasePublicClient.from("saved_properties")
                        .insert({
                            user_clerk_id: user?.id,
                            property_id: propertyId,
                        })
                    if (!savePropertyError) {
                        setIsSaved(true);
                    }
                }
                else {
                    const { data: removeSavedProperty, error: removeSavedPropertyError } = await supabasePublicClient.from('saved_properties')
                        .delete()
                        .eq('property_id', propertyId)
                        .eq('user_clerk_id', user?.id)

                    if (!removeSavedPropertyError) {
                        setIsSaved(false);
                    }
                }
        }
        catch (err) {
            console.log(err);
        }
        finally{
            setIsSaving(false);
        }
    }

    return [isSaved, isSaving, toggleSave] as const;
}