async function fetchLoactions(locations, apiKey) {

    const locationNames = {};

    const fallback = { formatted_address: "Nairobi, Kenya" };

    for (const i in locations) {
        const location = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locations[i].lat},${locations[i].lng}&key=${apiKey}`)
            .then(response => response.json()).catch(e => e);
        locationNames[i] = { name: location.results[0] ? location.results[0] : fallback };
    }

    return locationNames;
}

module.exports = fetchLoactions;