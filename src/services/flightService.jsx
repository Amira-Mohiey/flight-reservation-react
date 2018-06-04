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
  var url = "https://flights-reservation.herokuapp.com/"+ seat._id;
  return fetch(url, {
    method: "PUT"
  }).then(response => {
    return response.json();
  });
}
