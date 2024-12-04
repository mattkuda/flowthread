'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

interface ReplyResponse {
  variations: string[];
}

export function DemoSection() {
  const [input, setInput] = useState('')
  const [instructions, setInstructions] = useState('')
  const [tone, setTone] = useState('casual')
  const [replyLength, setReplyLength] = useState('medium')
  const [variations, setVariations] = useState('1')
  const [useEmojis, setUseEmojis] = useState(true)
  const [output, setOutput] = useState<string[]>([])
  const [demoUsed, setDemoUsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateReply = async () => {
    if (!input) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generateReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadContext: input,
          instructions: instructions || undefined,
          tone,
          replyLength,
          variations: parseInt(variations),
          useEmojis
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate reply')
      }

      const data: ReplyResponse = await response.json()
      setOutput(data.variations)
      setDemoUsed(true)
    } catch (error) {
      console.error('Error generating reply:', error)
      setOutput(['Sorry, there was an error generating the reply.'])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div id="demo" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Try FlowThread Demo</h2>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <p className="text-center text-blue-600 font-semibold">What's the thread context?</p>
          <Textarea
            placeholder="Paste your thread or message context here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-4"
          />
          <p className="text-center text-blue-600 font-semibold">What do you want the reply to say? (optional)</p>
          <Textarea
            placeholder="The reply should... "
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="mb-4"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal" disabled>Formal</SelectItem>
                  <SelectItem value="humorous" disabled>Humorous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reply Length</Label>
              <RadioGroup
                value={replyLength}
                onValueChange={setReplyLength}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Variations</Label>
              <RadioGroup
                value={variations}
                onValueChange={setVariations}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="one-variation" />
                  <Label htmlFor="one-variation">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="three-variations" />
                  <Label htmlFor="three-variations">3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="emoji-toggle"
                checked={useEmojis}
                onCheckedChange={setUseEmojis}
              />
              <Label htmlFor="emoji-toggle">Use Emojis</Label>
            </div>
          </div>

          <Button
            onClick={handleGenerateReply}
            // disabled={demoUsed || !input || isLoading}
            className="w-full"
          >
            {isLoading ? 'Generating...' : 'Generate Reply'}
          </Button>

          {output.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Replies:</h3>
              {output.map((reply, index) => (
                <p key={index} className="bg-gray-100 p-4 rounded mb-2">
                  {reply}
                </p>
              ))}
              <p className="mt-4 text-center text-blue-600 font-semibold">
                Love this? <a href="/signup" className="underline">Sign up for more options!</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}