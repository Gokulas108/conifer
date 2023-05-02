module.exports = {
  getUser: function () {
    const user = sessionStorage.getItem("conifer-user");
    if (!user || user === "undefined") return null;
    else return JSON.parse(user);
  },

  getToken: function () {
    const token = sessionStorage.getItem("conifer-token");
    if (!token || token === "undefined") return null;
    else return token;
  },

  setUserSession: function ({ user, token }) {
    sessionStorage.setItem("conifer-user", JSON.stringify(user));
    sessionStorage.setItem("conifer-token", token);
  },

  resetUserSession: function () {
    sessionStorage.removeItem("conifer-user");
    sessionStorage.removeItem("conifer-token");
  },
};
