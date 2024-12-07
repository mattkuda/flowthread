'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <AuthFormWrapper
            title="Sign in to FlowThread"
            subtitle="Enter your details below"
        >
            <div className="flex justify-end">
                <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-500">
                    Don't have an account? Sign up
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <SocialAuthButtons />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-50 px-2 text-gray-500">or</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Work Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-500"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" className="w-full" size="lg">
                    Log in
                </Button>

                <p className="text-center text-sm text-gray-500">
                    By continuing, you're confirming that you've read and agree to our{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        Terms
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        Privacy policy
                    </Link>
                </p>
            </form>
        </AuthFormWrapper>
    )
}

