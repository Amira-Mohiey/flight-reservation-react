export function seatService() {

  var url ="https://flights-reservation.herokuapp.com/seats";
  return fetch(url, {
    method: "GET"
  }).then(response => {
    return response.json();
  });
}
export function userService() {
  var url = "https://flights-reservation.herokuapp.com/users";
  return fetch(url, {
    method: "GET"
  }).then(response => {
    return response.json();
  });
}
export function reserveService(seat, user) {

  console.log(user,seat)
  var url = "https://flights-reservation.herokuapp.com/seats/"+ seat._id;
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(user),
  }).then(response => {
    return response.json();
  });
}
