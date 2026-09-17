const clientId = "sh-cc48fb67-d04a-4f86-b1fd-651fa373e6df";
const secret = "iB51rR3OX4DWCdCCDzxBYyT16fGIyZHT";

async function testAuth() {
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
      console.log("SUCCESS!");
    } else {
      console.log("Failed:", await res.text());
    }
  } catch (e) {
    console.log("Network error", e);
  }
}
testAuth();
