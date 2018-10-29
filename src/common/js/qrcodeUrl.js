import qs from 'qs';
export const qrActivity=(obj={})=>{
  return `https://aicard.i31.com/QRcode/activity/?${qs.stringify(obj)}`
}
