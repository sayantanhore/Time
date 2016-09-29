export class LocationService {
  constructor() {
    this.location = null;
    if (!navigator.geolocation) {
      this.serviceNotAvailable = true;
    }
  }
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    }, (error) => {
      console.log('Location not available', error);
    });
  }
}