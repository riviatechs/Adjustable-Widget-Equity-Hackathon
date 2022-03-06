import fetch from "node-fetch"
import logger from "pino"

export default async function handler(req, res) {
  const accessToken = await GetExchangeToken()
  const clientID = process.env.ADOBE_CLIENT_ID

  const data = {
    client_id: clientID,
    access_token: accessToken,
  }

  res.status(200).json(data)
}

async function GetExchangeToken() {
  const adobeExchangeJWTURL = process.env.ADOBE_JWT_EXCHANGE_URL
  const clientID = process.env.ADOBE_CLIENT_ID
  const clientSecret = process.env.ADOBE_CLIENT_SECRET
  const jwt = process.env.ADOBE_JWT

  const params = new URLSearchParams()
  params.append("client_id", clientID)
  params.append("client_secret", clientSecret)
  params.append("jwt_token", jwt)

  const resp = await fetch(adobeExchangeJWTURL, {
    method: "POST",
    body: params,
  })

  const data = await resp.json()

  logger().info(data)

  return data.access_token
}
