// const generateRandomPassword = () => {
//     return Array(15) //password length
//       .fill(
//         "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//       )
//       .map(function (x) {
//         const pwd = Math.floor(Math.random() * x.length);
//         return x.substring(pwd, pwd + 1);
//       })
//       .join("");
//   };

// console.log(generateRandomPassword())


function calculateTimeDifference(arrival, departure) {
  const [arrivalHours, arrivalMinutes] = arrival.split(":").map(Number);
  const [departureHours, departureMinutes] = departure.split(":").map(Number);

  let arrivalTotalMinutes = arrivalHours * 60 + arrivalMinutes;
  let departureTotalMinutes = departureHours * 60 + departureMinutes;

  if (departureTotalMinutes < arrivalTotalMinutes) {
      departureTotalMinutes += 24 * 60; 
  }

  let diffMinutes = departureTotalMinutes - arrivalTotalMinutes;
  let hours = Math.floor(diffMinutes / 60);
  let minutes = diffMinutes % 60;

  return `${hours} h and ${minutes} m`;
}

// Example usage:
console.log(calculateTimeDifference("5:30:00", "23:20:00")); 
console.log(calculateTimeDifference("6:20:00", "8:00:00"));   
console.log(calculateTimeDifference("23:30:00", "2:15:00")); 
console.log(calculateTimeDifference("22:45:00", "1:30:00"));  