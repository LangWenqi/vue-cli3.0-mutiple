let domainsFuc = (env) => {
  let domain, uri = location.href
  console.log(uri.indexOf('new_test_activity'))
  if (uri.indexOf('new_test_activity') > -1) {
    domain = 'https://test.i31.com/AICard'
  } else {
    domain = 'https://aicard.i31.com/AICard'
  }

   //domain='http://192.168.1.98:8081/AICard'

  return {
    domain: domain
  }
}
export default domainsFuc
