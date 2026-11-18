const BACKEND='https://my-thanh-wedding-301126.nohatte2108.chatgpt.site';
const RECIPIENTS=['nohatte2108@gmail.com','haimypcy888@gmail.com'];

function notification(data){
 const name=String(data.name||'').trim().slice(0,100);
 const kind=data.kind==='wish'?'wish':'rsvp';
 const attendance={yes:'Sẽ tham dự',no:'Không thể tham dự',maybe:'Sẽ xác nhận sau'}[data.attendance]||'Chưa rõ';
 const guests=Number.isInteger(Number(data.guests))?Number(data.guests):1;
 const message=String(data.message||'').trim().slice(0,1500);
 const subject=kind==='wish'?`[Thiệp cưới] Lời chúc từ ${name}`:`[Thiệp cưới] RSVP từ ${name}: ${attendance}`;
 const text=[`Loại: ${kind==='wish'?'Lời chúc':'Xác nhận tham dự'}`,`Người gửi: ${name}`];
 if(kind==='rsvp')text.push(`Trạng thái: ${attendance}`,`Số người: ${attendance==='Sẽ tham dự'?guests:0}`);
 text.push(`Lời nhắn: ${message||'(Không có)'}`,`Thời gian: ${new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'})}`,`Mã gửi: ${String(data.id||'').slice(0,100)}`);
 return {subject,text:text.join('\n')};
}

async function sendNotification(data){
 const user=process.env.GMAIL_USER;
 const pass=process.env.GMAIL_APP_PASSWORD;
 if(!user||!pass){console.error('Mail chưa cấu hình: GMAIL_USER / GMAIL_APP_PASSWORD');return false}
 const {default:nodemailer}=await import('nodemailer');
 const transporter=nodemailer.createTransport({service:'gmail',auth:{user,pass:pass.replace(/\s/g,'')},connectionTimeout:8000,greetingTimeout:8000,socketTimeout:10000});
 const {subject,text}=notification(data);
 await transporter.sendMail({from:`"Thiệp cưới My & Thanh" <${user}>`,to:RECIPIENTS.join(', '),subject,text,disableFileAccess:true,disableUrlAccess:true});
 return true;
}

export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 try{
  const body=JSON.stringify(req.body||{});
  if(body.length>6000)return res.status(413).json({error:'Lời nhắn quá dài.'});
  const upstream=await fetch(`${BACKEND}/api/responses`,{method:'POST',headers:{'Content-Type':'application/json'},body,signal:AbortSignal.timeout(10000)});
  const result=await upstream.json();
  res.setHeader('Cache-Control','no-store');
  if(upstream.ok && !result?.error && !req.body?.website){
   try{await sendNotification(req.body||{})}catch(error){console.error('Không gửi được email thông báo:',error)}
  }
  return res.status(upstream.status).json(result);
 }catch{return res.status(502).json({error:'Chưa gửi được. Bạn vui lòng thử lại sau nhé.'})}
}
