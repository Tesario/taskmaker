const { getDb } = require("./db");
const { OAuth2Client } = require("google-auth-library");
const { AuthenticationError } = require("apollo-server-express");
const uuid = require("uuid");

async function isSignIn(token) {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const db = getDb();
    const user = await db.collection("users").findOne({ sub: payload.sub });

    return { signIn: true, user };
  } catch (_) {
    return { signIn: false };
  }
}

async function login(_, { token }) {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const db = getDb();
    const user = await db.collection("users").findOne({ sub: payload.sub });

    if (!user) {
      await db
        .collection("users")
        .insertOne({ ...payload, sub: payload.sub, uuid: uuid.v4() });

      return await db.collection("users").findOne({ sub: payload.sub });
    }

    return user;
  } catch (error) {
    throw new AuthenticationError("Authentication error.");
  }
}

module.exports = { isSignIn, login };
