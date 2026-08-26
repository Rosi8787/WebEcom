export function setAuthData(token: string, role: string, userId: string, userName: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token)
        localStorage.setItem("role", role)
        localStorage.setItem("userId", userId)
        localStorage.setItem("userName", userName)
        
        // Also set standard cookies
        document.cookie = `token=${token}; path=/; max-age=86400;`
        document.cookie = `role=${role}; path=/; max-age=86400;`
        document.cookie = `userId=${userId}; path=/; max-age=86400;`
        document.cookie = `userName=${userName}; path=/; max-age=86400;`
    }
}

export function getAuthData() {
    if (typeof window !== "undefined") {
        return {
            token: localStorage.getItem("token"),
            role: localStorage.getItem("role"),
            userId: localStorage.getItem("userId"),
            userName: localStorage.getItem("userName"),
        }
    }
    return { token: null, role: null, userId: null, userName: null }
}

export function clearAuthData() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("userId")
        localStorage.removeItem("userName")
        
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        document.cookie = "userName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    }
}
