const BACKEND='https://my-thanh-wedding-301126.nohatte2108.chatgpt.site';
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 try{
  const offset=typeof req.query.offset==='string' && /^\d{1,4}$/.test(req.query.offset)?req.query.offset:'0';
  const upstream=await fetch(`${BACKEND}/api/wishes?offset=${offset}`,{signal:AbortSignal.timeout(10000)});
  const result=await upstream.json();
  res.setHeader('Cache-Control','no-store');
  return res.status(upstream.status).json(result);
 }catch{return res.status(502).json({error:'Chưa tải được lời chúc.'})}
}
