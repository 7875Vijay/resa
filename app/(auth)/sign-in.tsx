import { useAuth, useSignIn } from '@clerk/expo';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, GestureResponderEvent, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignIn = () => {

    const { signIn, errors, fetchStatus } = useSignIn();
    const { isSignedIn, isLoaded } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState("");
    const [verificationError, setVerificationError] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    const isLoading = fetchStatus === "fetching";

    if (!isLoaded) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    const onSignInPressed = async (e: GestureResponderEvent) => {
        e.preventDefault();
        //if (!signIn) return;
        const { error } = await signIn.password({
            emailAddress: email,
            password: password
        });

        if (error) {
            alert(error.message)
            return
        }

        if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: ({session, decorateUrl }) => {
                    if(session?.currentTask){
                        console.log(session?.currentTask);
                        return;
                    }
                    const url = decorateUrl('/');
                    router.replace(url as any)
                }
            });
        }
        else if(signIn.status === "needs_second_factor"){
            setShowVerification(true);  // ← Add this
            signIn.mfa.sendPhoneCode();
        }
        else if(signIn.status === "needs_client_trust"){
            setShowVerification(true);  // ← Add this
            const emailCodeFactor = signIn.supportedSecondFactors.find(
                (factor) => factor.strategy === "email_code"
            );

            if(emailCodeFactor){
                signIn.mfa.sendEmailCode();
            }
        }
        else{
            alert("Sign in not completed");
        }

        // if (!error) await signIn.verifications.sendEmailCode()
    }

    const onVerifyPressed = async (e: GestureResponderEvent) => {
        e.preventDefault();
        setVerificationError('');

        try {
            await signIn?.mfa?.verifyEmailCode({
                code: code
            });

            if (signIn.status === 'complete') {
                await signIn.finalize({
                    navigate: ({session, decorateUrl }) => {
                        if(session?.currentTask){
                            console.log(session?.currentTask);
                            return;
                        }       
                        const url = decorateUrl('/');
                        router.replace(url as any)
                    }
                });
            } else {
                setVerificationError('Verification failed. Please try again.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Verification failed. Please try again.';
            setVerificationError(errorMessage);
        }
    }

    const onResendPressed = async (e: GestureResponderEvent) => {
        e.preventDefault();
        if (!signIn) return;
        await signIn.mfa.sendEmailCode();
    }

    if (showVerification) {
        return (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                    scrollIndicatorInsets={{ right: 1 }}
                >
                    <View className='px-6 py-12'>
                        <Image source={require("../../assets/images/resalogo.png")}
                            className='w-40 h-20 mb-8'
                            resizeMode='contain'
                        />

                        <Text className="text-3xl font-bold text-gray-800 mb-2">Verify account</Text>
                        <Text className="text-gray-500 mb-8">We sent an OTP on {email}</Text>

                        <TextInput
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                            placeholder="Enter verification code here..."
                            placeholderTextColor="#9CA3AF"
                            value={code}
                            onChangeText={setCode}
                            keyboardType='number-pad'
                        />
                        {verificationError && (
                            <Text className="text-red-500 mb-4">
                                {verificationError}
                            </Text>
                        )}
                        {errors.fields.code && (
                            <Text className="text-red-500 mb-4">
                                {errors.fields.code.message}
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={onVerifyPressed}
                            className='w-full bg-blue-600 rounded-xl p-4 items-center mb-4'
                            disabled={isLoading ? true : false}>
                            {
                                isLoading ? <ActivityIndicator color="white" />
                                    :
                                    <Text className='text-white font-bold'>Verify</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onResendPressed}
                            className='w-full items-center mb-4'>
                            <Text className='text-blue-600 font-semibold'>Resend</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
            className='bg-white'
            >
            
                <View className='flex-1 px-6 py-12'>
                    <Image source={require("../../assets/images/resalogo.png")}
                        className='w-40 h-20 mb-8'
                        resizeMode='contain'
                    />

                    <Text className="text-3xl font-bold text-gray-800 mb-2">Sign In</Text>
                    <Text className="text-gray-500 mb-8">Sign in to explore more</Text>

                    <TextInput
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                        placeholder="Email address"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.fields.identifier && (
                        <Text className="text-red-500 mb-4">
                            {errors.fields.identifier.message}
                        </Text>
                    )}

                    <TextInput
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    {
                      errors.fields.password && (
                        <Text className="text-red-500 mb-4">
                            {errors.fields.password.message}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={onSignInPressed}
                        className='w-full bg-blue-600 rounded-xl p-4 items-center mb-4'
                        disabled={isLoading ? true : false}>
                        {
                            isLoading ? <ActivityIndicator color="white" />
                                :
                                <Text className='text-white font-bold'>Sign In</Text>
                        }
                    </TouchableOpacity>
                    <View className='flex-row justify-center'>
                        <Text className='text-gray-500'>Don't have an account? </Text>
                        <Link href="/sign-up" className='text-blue-600 font-semibold'>Sign Up</Link>
                    </View>
                    <View nativeID='clerk-captcha' />
                </View>
        </ScrollView>
    )
}

export default SignIn