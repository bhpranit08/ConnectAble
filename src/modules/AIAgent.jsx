import React, { useEffect, useMemo, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { jobListings } from '../data/jobListings'

const AIAgent = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hello! I\'m your AI agent. Ask about jobs, communities, or support.' }
    ])
    const [input, setInput] = useState('')
    const [thinking, setThinking] = useState(false)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    const modelName = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash'
    const [userApiKey, setUserApiKey] = useState('')
    const [hasSavedKey, setHasSavedKey] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('VITE_GEMINI_API_KEY') || ''
        if (stored) {
            setUserApiKey(stored)
            setHasSavedKey(true)
        }
    }, [])

    const resolvedKey = apiKey || userApiKey
    const genAI = useMemo(() => {
        try {
            return resolvedKey ? new GoogleGenerativeAI(resolvedKey) : null
        } catch (_e) {
            return null
        }
    }, [resolvedKey])

    const siteData = useMemo(() => ({ jobs: jobListings }), [])

    const onSend = (e) => {
        if (e) e.preventDefault()
        const text = input.trim()
        if (!text || thinking) return
        setMessages(prev => [...prev, { role: 'user', text }])
        setInput('')
        setThinking(true)
        ;(async () => {
            try {
                if (!genAI) {
                    throw new Error('Missing VITE_GEMINI_API_KEY (set in .env or paste below and Save)')
                }
                const prompt = `You are the ConnectAble assistant for an inclusive platform in Nepal.
Answer concisely and prioritize the provided site data when relevant.
When users ask about jobs, filter and summarize from siteData.jobs including title, company, location, type, salary, and key accommodations.
If the request cannot be answered from site data, say so briefly and suggest browsing Jobs.

siteData: ${JSON.stringify(siteData)}

User message: ${text}`
                async function tryModel(name) {
                    const mdl = genAI.getGenerativeModel({ model: name })
                    const res = await mdl.generateContent(prompt)
                    const resp = await res.response
                    return (resp?.text && resp.text()) || ''
                }
                let answer = ''
                try {
                    answer = await tryModel(modelName)
                } catch (primaryErr) {
                    try {
                        answer = await tryModel('gemini-1.5-flash')
                        answer = `${answer}\n\n(Note: primary model '${modelName}' failed; used 'gemini-1.5-flash' fallback.)`
                    } catch (fallbackErr) {
                        throw primaryErr
                    }
                }
                if (!answer) answer = 'Sorry, I could not generate a response.'
                setMessages(prev => [...prev, { role: 'assistant', text: answer }])
            } catch (err) {
                setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${err?.message || 'Failed to reach AI service.'}` }])
            } finally {
                setThinking(false)
            }
        })()
    }

    const saveUserKey = (e) => {
        e.preventDefault()
        const trimmed = userApiKey.trim()
        if (!trimmed) return
        localStorage.setItem('VITE_GEMINI_API_KEY', trimmed)
        setHasSavedKey(true)
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">AI Agent</h1>
                <p className="text-gray-600">Ask questions and get guided help across the app.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 rounded-2xl border border-white/30 shadow-inner p-4 sm:p-5 h-[28rem] overflow-y-auto space-y-3">
                            {messages.map((m, i) => (
                                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                                    <div className={m.role === 'user' ? 'max-w-[85%] gradient-blue text-white px-3 py-2 rounded-xl rounded-br-sm shadow' : 'max-w-[85%] bg-white/90 text-gray-800 px-3 py-2 rounded-xl rounded-bl-sm shadow border border-white/40'}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {thinking && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] bg-white/90 text-gray-800 px-3 py-2 rounded-xl rounded-bl-sm shadow border border-white/40">
                                        <span className="inline-flex items-center gap-2">
                                            <svg className="w-4 h-4 text-indigo-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                                            Thinking...
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <form onSubmit={onSend} className="mt-4 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me about jobs, communities, or support..."
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80"
                            />
                            <button
                                type="submit"
                                disabled={thinking}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow disabled:opacity-60"
                            >
                                Send
                            </button>
                        </form>
                        {!apiKey && (
                            <div className="mt-6 bg-white/80 rounded-xl border border-white/30 p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Set your Gemini API key</h3>
                                <form onSubmit={saveUserKey} className="flex items-center gap-2">
                                    <input
                                        type="password"
                                        value={userApiKey}
                                        onChange={(e) => setUserApiKey(e.target.value)}
                                        placeholder="Paste VITE_GEMINI_API_KEY here"
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                                    >
                                        Save
                                    </button>
                                </form>
                                {hasSavedKey && <p className="text-xs text-gray-500 mt-2">Key saved locally. You can start chatting now.</p>}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="bg-white/80 rounded-2xl border border-white/30 shadow p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Suggested prompts</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Show me remote jobs","What communities can I join?","How do I get support?","Jobs with flexible hours"].map((q, i) => (
                                    <button key={i} onClick={() => { setInput(q); setTimeout(() => onSend(), 0) }} className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm">
                                        {q}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 text-xs text-gray-500">AI replies are for guidance. For details, visit Jobs or Communities.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIAgent


