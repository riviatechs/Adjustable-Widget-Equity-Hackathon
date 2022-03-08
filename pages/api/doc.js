import fetch from "node-fetch"
import logger from "pino"
import jwt from "jsonwebtoken"
import fs from "fs"

export default async function handler(req, res) {
  const accessToken = await GetExchangeToken()
  const clientID = process.env.ADOBE_CLIENT_ID

  const data = {
    client_id: clientID,
    access_token: accessToken,
  }

  console.log(data)

  res.status(200).json(data)
}

async function GetExchangeToken() {
  const adobeExchangeJWTURL = process.env.ADOBE_JWT_EXCHANGE_URL
  const clientID = process.env.ADOBE_CLIENT_ID
  const clientSecret = process.env.ADOBE_CLIENT_SECRET
  const jwtToken = GetJWT()
  console.log(jwtToken)

  console.log("jwtToken")
  console.log(jwtToken)

  const params = new URLSearchParams()
  params.append("client_id", clientID)
  params.append("client_secret", clientSecret)
  params.append("jwt_token", jwtToken)

  const resp = await fetch(adobeExchangeJWTURL, {
    method: "POST",
    body: params,
  })

  const data = await resp.json()

  return data.access_token
}

function GetJWT() {
  const claims = {
    "https://ims-na1.adobelogin.com/s/ent_documentcloud_sdk": true,
    iss: "E8393A6562245BDD0A495FE8@AdobeOrg",
    sub: "E10B339E62245C360A495FE1@techacct.adobe.com",
    aud: "https://ims-na1.adobelogin.com/c/e27ec963d36347d5bf72c693da09cc85",
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  }

  let privateKey
  if (process.env.HOSTED_CLOUD == "true") {
    privateKey = fs.readFileSync("/private/private.key")
  } else {
    privateKey = fs.readFileSync("private.key")
  }

  return jwt.sign(claims, privateKey, {
    algorithm: "RS256",
    noTimestamp: true,
  })
}
