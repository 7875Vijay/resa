import { useUserSync } from '@/hooks/useUserSync'
import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

export default function RoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  useUserSync();
  //sync user to the supabase latter tbd
  if (!isLoaded) {
    return null
  }
  if (!isSignedIn) {
    return <Redirect href={'/sign-in'} />
  }

  return <Stack screenOptions={{headerShown: false}}/>
}