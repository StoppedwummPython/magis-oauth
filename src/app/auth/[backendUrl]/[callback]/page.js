"use client"

import { use } from "react"

export default function Page({ params }) {
    const a = use(params)
    const perms = ["Read your profile info", "Get your courses", "See other users", "See general school configuration", "Start containers for you", "Read-Write Access to your files"]
    return (
        <div className="container text-center mt-5 border">
            <div>
                <h1><strong>Authenticate using</strong></h1>
                <img src="/MagisLogo.svg" width="20%"/>
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
                <p>Make sure you trust the website that sent you here. (Callback URL: {a.callback})</p>
            </div>
            <div>
                <a href="/" className="btn btn-danger me-2">Cancel</a>
                <a href={a.callback} className="btn btn-primary me-2">Continue and grant access</a>
            </div>
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