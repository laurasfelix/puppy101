/* eslint-disable */
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {

  let audio: HTMLAudioElement | null = null;

  const playAudio = (name:string) => {
    if (!audio || audio.paused) {
      audio = new Audio(`/${name}.mp3`);
      audio.play();
    }
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[1fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
     <div className="flex flex-col items-center justify-center gap-4">
        <Image src="/file.svg" alt="puppy" width={200} height={200} />
        <span className="text-4xl font-bold"> Welcome to Puppally </span>
        <span className="text-2xl"> new puppy home and they're a biter? ask us for help :) </span>
     </div>

      <div className="flex flex-col items-center justify-center gap-8 text-2xl">
        <button onClick={()=>playAudio("bark")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
            <Link href="/chat"> start new chat  </Link>
        </button>

        <button onClick={()=>playAudio("howl")} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-2xl">
            <Link href="/prev"> previous chats  </Link>
        </button>

     </div> 
    </div>
  );
}
