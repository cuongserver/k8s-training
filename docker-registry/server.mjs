import express from "express";
import fs from "fs-extra";
import https from "https";
import jwt from "jsonwebtoken";
import forge from "node-forge";
import { createHash } from "crypto";
import b32Encode from "base32-encode";

const cert = fs.readFileSync("./cert.pem.crt", "utf-8");
const privateKey = fs.readFileSync("./private-key.pem", "utf-8");
const publicKey = fs.readFileSync("./public-key.pem", "utf-8");
const der = forge.pki.pemToDer(publicKey);
const derLen = der.length();
const bytes = der.getBytes();
const buffer = Buffer.alloc(derLen, bytes, "binary");
const hash = createHash("sha256").update(buffer).digest();
const base32 = b32Encode(hash.subarray(0, 30), "RFC4648");

let kid = "";
for (let i = 0; i < 48; ++i) {
	kid += base32[i];
	if (i % 4 === 3 && i + 1 !== 48) {
		kid += ":";
	}
}

const tokenHeaders = {
	alg: "ES256",
	typ: "JWT",
	kid: kid,
};

console.log("kid: " + kid);

const app = express();
app.get("/", (req, res) => {});

app.get("/auth", (req, res) => {
	res.setHeader("access-control-allow-origin", "*");
	let scopes;
	const { account, scope, client_id, service } = req.query;
	if (scope) scopes = scope.split(":");

	const claimSet = {
		iss: "192.168.2.254",
		sub: account,
		aud: service,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
		nbf: Math.floor(Date.now() / 1000) - 10,
		iat: Math.floor(Date.now() / 1000),
		jti: Math.random().toString(36).substring(7),
		access: [
			{
				type: scope ? scopes[0] : "repository",
				name: scope ? scopes[1] : "*",
				actions: ["pull", "push"],
			},
		],
	};

	const token = jwt.sign(claimSet, privateKey, {
		// algorithm: "RS256",
		algorithm: "ES256",
		keyid: kid,
		header: tokenHeaders,
	});

	res.send({
		token,
	});
});

const server = https.createServer(
	{
		key: privateKey,
		cert: cert,
	},
	app
);

server.listen(5005, () => {
	console.log("application is running at port 5005");
});
