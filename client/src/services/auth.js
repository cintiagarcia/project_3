import axios from "axios";

const signup = (
  username,
  password,
  email,
  street,
  number,
  city,
  postalCode,
  country
) => {
  console.log(
    "step1",
    username,
    password,
    email,
    street,
    number,
    city,
    postalCode,
    country
  );
  return axios
    .post("/api/auth/signup", {
      username,
      password,
      email,
      street,
      number,
      city,
      postalCode,
      country,
    })

    .then((response) => {
      console.log("response", response);
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

const login = (username, password) => {
  return axios
    .post("/api/auth/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export { signup, logout, login };
