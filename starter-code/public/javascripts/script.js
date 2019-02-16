window.onload = () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: -23.567173216,
      lng: -46.6623271
    }
  });
  const bounds = new google.maps.LatLngBounds();

  const getPlaces = () => {
    axios.get("/places/api")
      .then(response => {
        placePlaces(response.data.places);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const getPlace = () => {
    axios.get(`/places/api/${idRest}`)
      .then(response => {
        placePlace(response.data.place);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const placePlaces = (rests) => {
    rests.forEach((rest) => {
      const restLocation = {
        lat: rest.location.coordinates[1],
        lng: rest.location.coordinates[0]
      };


      bounds.extend(restLocation);

      new google.maps.Marker({
        position: restLocation,
        map: map,
        title: rest.name
      });

    });
    map.fitBounds(bounds);
  }

  const placePlace = (rest) => {
    const restLocation = {
      lat: rest.location.coordinates[1],
      lng: rest.location.coordinates[0]
    };

    new google.maps.Marker({
      position: restLocation,
      map: map,
      title: rest.name
    });
  }

  (idRest !== 'null') ? getPlace(): getPlaces();

};