const generateRandomPassword = (secretKey) => {
    return Array(15) //password length
      .fill(
        secretKey
      )
      .map(function (x) {
        const pwd = Math.floor(Math.random() * x.length);
        return x.substring(pwd, pwd + 1);
      })
      .join("");
  };

  module.exports = generateRandomPassword;