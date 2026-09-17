const clientId = "sh-cc48fb67-d04a-4f86-b1fd-651fa373e6df";
const secretsToTest = [
  "iB51rR3OX4DWCdCCDzxbYyT16fGIyZHT",
  "iB51rR3OX4DWCdCCDzxbYyT16fGiyZHT",
  "iB51rR30X4DWCdCCDzxbYyT16fGIyZHT",
  "iB51rR30X4DWCdCCDzxbYyT16fGiyZHT",
  "IB51rR3OX4DWCdCCDzxbYyT16fGIyZHT",
  "IB51rR3OX4DWCdCCDzxbYyT16fGiyZHT",
  "lB51rR3OX4DWCdCCDzxbYyT16fGIyZHT",
  "lB51rR3OX4DWCdCCDzxbYyT16fGiyZHT"
];

async function testAuth() {
  for (const secret of secretsToTest) {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: secret
    });
    
    try {
      const res = await fetch('https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      
      if (res.ok) {
        console.log("SUCCESS with secret:", secret);
        return;
      } else {
        console.log("Failed:", secret, await res.text());
      }
    } catch (e) {
      console.log("Network error", e);
    }
  }
}

testAuth();
