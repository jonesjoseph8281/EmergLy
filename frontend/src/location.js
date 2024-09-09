const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };
  
  const generateGoogleMapsLink = (latitude, longitude) => {
    return `https://www.google.com/maps/?q=${latitude},${longitude}`;
  };
  
  const sendLocationToServer = async (selectedPeople) => {
    try {
      const currentLocation = await getCurrentLocation();
      const mapsLink = generateGoogleMapsLink(currentLocation.latitude, currentLocation.longitude);
  
      const response = await fetch('/api/sendLocationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedPeople,
          mapsLink
        })
      });
  
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };
  
  // Example usage
  const selectedPeople = [
    { name: 'Jones', email: 'jones@example.com' },
    { name: 'Steffi', email: 'steffi@example.com' }
  ];
  sendLocationToServer(selectedPeople);
  