import { cookies } from "next/headers";


export async function checkCookies() {
  
  const cookieCheck = cookies();
  const token = (await cookieCheck).get("token");
  if(!token) {
    return <h1> Debug!: Not Logged In.</h1>
  } else {
    return <h1> Debug!: Logged In.</h1>
  }
} 


export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        
        <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">Debug!: THIS IS THE MAIN PAGE</p>
        {checkCookies()}
    </div>
  );
}
