

import React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import OpenAI from "openai";
import Link from 'next/link';


interface SentProps{
    text: string;
    bot: boolean;
}

export default function Chat(){

    const [sent, setSent] = React.useState<SentProps[]>([]);
    const [input, setInput] = React.useState<string>("");
    const [end, setEnd] = React.useState<boolean>(false);
    const [botTyping, setBotTyping] = React.useState<boolean>(false);
    const [summary, setSummary] = React.useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const openai = useMemo(
        () =>
          new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
          }),
        []
      );

    const handleSend = async () => {
        if (!input.trim()) return;
    
  
        setSent((prev) => [...prev, { text: input, bot: false }]);
        setInput("");
        setBotTyping(true);
    
        try {
       
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: "You're an expert in puppies, and your name is Puppally. Help the user with their puppy problems, and format the answer as a short, helpful essay. Be nice, SHORT, and assertive in your answer, like a friend who's an expert in puppy blues. Return a paragraph at most." },
              ...sent.map((m) => ({
                role: (m.bot ? "assistant" : "user") as "assistant" | "user",
                content: m.text,
              })),
              { role: "user", content: input },
            ],
          });
    
          const botReply = completion.choices[0]?.message.content || "I didn't understand that.";
    
     
          setSent((prev) => [...prev, { text: botReply, bot: true }]);
        } catch (error) {
          console.error("Error fetching bot response:", error);
          setSent((prev) => [...prev, { text: "Oops! Something went wrong.", bot: true }]);
        }
    
        setBotTyping(false);
      };


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [sent]);

    return (
        <div className={`flex flex-col items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
       
       <div className='flex items-center w-full gap-4 justify-center'>
         <div> <Link href="/"> ← </Link>  </div>
         <h1 className='text-4xl font-bold'> chat with us! </h1>
       </div>
        
        <div className='flex flex-col gap-4 w-full h-50 overflow-y-auto px-4 py-2 space-y-2'>

                {sent.map((s, i) => (
                    <div key={i} className={`flex w-full ${s.bot ? "justify-start" : "justify-end"} gap-1`}>
                        <div className={`p-2 rounded-xl max-w-[75%] ${
                s.bot ? "bg-gray-200 text-stone-900" : "bg-blue-500 text-white"
            }`}>
                            {s.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
        </div>

        {botTyping && (
          <div className="flex w-full justify-start gap-1">
            <div className="p-2 rounded-xl max-w-[75%] bg-gray-200 text-stone-900">
              puppally is thinking...
            </div>
          </div>
        )}

        <div className='flex gap-4 justify-end'>
            <input value={input} onChange={(e) => setInput(e.target.value)} className={`w-full p-2 border-2 text-stone-900 border-gray-200 rounded-2xl`}  placeholder='what did ur puppy do??'/>
            <button onClick={() => {
                handleSend();
            }} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl`}> send </button>
        </div>

        
        </div>
    )
}