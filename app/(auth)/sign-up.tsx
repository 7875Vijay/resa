import { useAuth, useSignUp } from '@clerk/expo';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, GestureResponderEvent, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUp = () => {
    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn, isLoaded } = useAuth()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const isLoading = fetchStatus === "fetching";

    if (!isLoaded || !signUp) {
        return <ActivityIndicator />;
    }

    if (signUp.status === 'complete' || isSignedIn) {
        return null;
    }

    const onSignUpPressed = async (e: GestureResponderEvent) => {
        e.preventDefault();
        const { error } = await signUp.password({
            emailAddress: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        if (error) {
            alert(error.message)
            return
        }

        if (!error) await signUp.verifications.sendEmailCode()
    }

    const onVerifyPressed = async (e: GestureResponderEvent) => {
        e.preventDefault();
        await signUp.verifications.verifyEmailCode({
            code: code
        })

        if (signUp.status === 'complete') {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl('/');
                    router.replace(url as any)
                }
            });
        }
    }

    const onResendPressed = async (e: GestureResponderEvent) => {
        e.preventDefault();
        await signUp.verifications.sendEmailCode();
    }

    if (signUp.status === "missing_requirements" && signUp.unverifiedFields.includes('email_address') && signUp.missingFields.length === 0) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
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
            </KeyboardAvoidingView>
        );
    }

    return (

        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className='flex-1 px-6 py-12'>
                    <Image source={require("../../assets/images/resalogo.png")}
                        className='w-40 h-20 mb-8'
                        resizeMode='contain'
                    />

                    <Text className="text-3xl font-bold text-gray-800 mb-2">Create account</Text>
                    <Text className="text-gray-500 mb-8">Find your dream home today</Text>

                    <View className="flex-row gap-3 mb-4">
                        <TextInput
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
                            placeholder="First name"
                            placeholderTextColor="#9CA3AF"
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize="words"
                        />
                        

                        <TextInput
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
                            placeholder="Last name"
                            placeholderTextColor="#9CA3AF"
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="words"
                        />
                        
                    </View>
                    <TextInput
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                        placeholder="Email address"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.fields.emailAddress && (
                        <Text className="text-red-500 mb-4">
                            {errors.fields.emailAddress.message}
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
                    {errors.fields.password && (
                        <Text className="text-red-500 mb-4">
                            {errors.fields.password.message}
                        </Text>
                    )}
                    <TouchableOpacity
                        onPress={onSignUpPressed}
                        className='w-full bg-blue-600 rounded-xl p-4 items-center mb-4'
                        disabled={isLoading ? true : false}>
                        {
                            isLoading ? <ActivityIndicator color="white" />
                                :
                                <Text className='text-white font-bold'>Sign Up</Text>
                        }
                    </TouchableOpacity>
                    <View className='flex-row justify-center'>
                        <Text className='text-gray-500'>Already have an account? </Text>
                        <Link href="/sign-in" className='text-blue-600 font-semibold'>Sign In</Link>
                    </View>
                    <View nativeID='clerk-captcha' />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

export default SignUp