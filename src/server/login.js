"use server"
import * as ck from 'cookie'
export async function login(formData, backend) {
    /** @type {string} */
    let mutatedUrl = backend
    if (!mutatedUrl.startsWith("http://") && !mutatedUrl.startsWith("https://")) {
        mutatedUrl = "https://" + mutatedUrl
    }
    // create backendurl
    const url = new URL(mutatedUrl)
    url.protocol = "https:"
    url.pathname = "/api/web/auth/login"
    const res = await fetch(url.href, {
        method: "POST",
        body: JSON.stringify({
            password: formData.get("password"),
            userNameOrMail: formData.get("username")
        }),
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json;charset=utf-8"
        }
    })

    if (!res.ok) {
        throw new Error("Failed to login: " + await res.text())
    }
    let cookie = res.headers.getSetCookie()
    let final = ""
    cookie.forEach(c => {
        final = final + c + ";"
    })
    let a = {}

    a["sessionToken"] = ck.parse(final).sessionToken
    a["authKey"] = ck.parse(final).authKey
    console.log(a)

    const cookies = a
    const data = await res.json()
    return [cookies, data]
}