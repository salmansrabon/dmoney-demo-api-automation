import axios from "axios";
import dotenv from "dotenv";
import {expect} from "chai";
import storeEnvVariable from "../utils.js";
dotenv.config();

describe("Generate Token", async () => {
  it("User login with valid credential", async () => {
    const requestBody = {
      email: `${process.env.EMAIL}`,
      password: `${process.env.PASSWORD}`,
    };

    const response = await axios.post(
      `${process.env.BASE_URL}/user/login`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    storeEnvVariable("access_token", response.data.token);
  });

  it("Search user by Id", async () => {
    const response = await axios.get(
      `${process.env.BASE_URL}/user/search/id/1`,
      {
        headers: {
          Authorization: process.env.access_token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    expect(response.data.message).to.contains("User found");
  });
});
