import MagicLinkPage from "./_ClientComponents/MagicLink";
export default async function Page({
  searchParams
}:{searchParams:Promise<{token?:string}>}){
  const {token} = await searchParams

  if(!token){
    return <div>Invalid Link. Not token provided.</div>
  }

  return <MagicLinkPage token={token} />
}