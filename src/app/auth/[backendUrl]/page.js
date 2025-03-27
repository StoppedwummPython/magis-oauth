"use client"

import { use, useState } from "react"
import { login } from "@/server/login"
import { post } from "@/client/utils"
import { useSearchParams } from 'next/navigation'

export default function Page({ params }) {
    const a = use(params)
    const perms = ["Read your profile info", "Get your courses", "See other users", "See general school configuration", "Start containers for you", "Read-Write Access to your files"]
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const sp = useSearchParams()
    return (
        <div className="container text-center mt-5 border">
            <div>
                <h1><strong>Authenticate using</strong></h1>
                <img src="/MagisLogo.svg" width="20%" />
            </div>
            <br /><br />
            <div>
                <h2>You are about to login at {a.backendUrl}</h2>
                <h3>Permissions that will be granted:</h3>
                <ul className="list-group list-group-flush">
                    {perms.map(perm => <li className="list-group-item" key={perm}>{perm}</li>)}
                </ul>
            </div>
            <br /> <br />
            <div>
                <h3>
                    Before clicking continue
                </h3>
                <p>Make sure you trust the website that sent you here. (Callback URL: {sp.get("callback")})</p>
            </div>
            <form className="form" action={async function (e) {
                // e is form data
                const [status, ok, cookies, data] = await login(e, a.backendUrl)
                if (!ok) {
                    if (status === 401) {
                        alert("Wrong username or password")
                    } else {
                        alert("Failed to login: " + status)
                    }
                    return
                }
                let mutatedUrl = sp.get("callback")
                if (!mutatedUrl.startsWith("http://") && !mutatedUrl.startsWith("https://")) {
                    mutatedUrl = "https://" + mutatedUrl
                }
                let url = new URL(mutatedUrl)
                post(url.href, { cookies: JSON.stringify(cookies), data: JSON.stringify(data) }, "POST")
            }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={e => setUsername(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <a href="/" className="btn btn-danger me-2">Cancel</a>
                    <input type="submit" className={password != "" && username != "" ? "btn btn-primary" : "btn btn-primary disabled"} value="Continue" />
                </div>
            </form>
            <br />
            <br />
            <br />
            <p className="text-muted">
                <small>
                    This page is made by Stoppedwumm
                </small>
            </p>
        </div>
    )
}