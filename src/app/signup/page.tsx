'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        marketingEmails: false,
        termsAccepted: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <AuthFormWrapper
            title="Get started for free"
            subtitle="No credit card required"
        >
            <div className="flex justify-end">
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                    Already have an account? Log in
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
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Work email"
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

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="marketing"
                                checked={formData.marketingEmails}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, marketingEmails: checked as boolean })
                                }
                            />
                            <label
                                htmlFor="marketing"
                                className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to receive marketing emails and offerings
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={formData.termsAccepted}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, termsAccepted: checked as boolean })
                                }
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree with{' '}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                    Sign up
                </Button>
            </form>
        </AuthFormWrapper>
    )
}

