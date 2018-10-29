
import originAxios from 'axios';
import domainsFuc from './domains'
let setAxios = originAxios.create({
  baseURL:domainsFuc().domain,
  timeout: 10000 // request timeout
});
export default setAxios
