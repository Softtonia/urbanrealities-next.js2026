export async function getCountries(token) {
  const res = await fetch('/api/post-property/location/country', { 
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function getStates(countryId, token) {
  const res = await fetch(`/api/post-property/location/state/${countryId}`, { 
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function getCities(stateId, token) {
  const res = await fetch(`/api/post-property/location/city/${stateId}`, { 
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}
