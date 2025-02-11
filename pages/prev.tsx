import Link from 'next/link'

export default function Prev(){
    return (
        <div className={`grid grid-rows-[1fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
        <div className='flex items-center w-full gap-4 justify-center'>
         <div> <Link href="/"> ← </Link>  </div>
         <h1 className='text-4xl font-bold'> previous chats! </h1>
       </div>
        <ul className='flex flex-col gap-4 justify-center items-center'> 
            <li > oops ur dog vomited </li>
            <li> he's biting!!! NO THOR STOP 2 </li>
            <li> aw he's here :) </li>
        </ul>
        </div>
    )
}