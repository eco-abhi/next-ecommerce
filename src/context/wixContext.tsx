"use client"

import { createClient, OAuthStrategy } from "@wix/sdk"
import { products, collections } from "@wix/stores"
import { items } from "@wix/data"
import Cookies from 'js-cookie'
import { createContext, ReactNode, useContext } from "react"

// Safer token parsing with fallback
const getRefreshToken = () => {
    try {
        const token = Cookies.get('refreshToken')
        return token ? JSON.parse(token) : {}
    } catch (error) {
        console.error('Error parsing refresh token:', error)
        return {}
    }
}

const wixClient = createClient({
    modules: {
        items,
        collections,
        products,
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
            refreshToken: getRefreshToken(),
            accessToken: { value: "", expiresAt: 0 }
        },
    }),
})

export type WixClient = typeof wixClient

export const WixClientContext = createContext<WixClient>(wixClient)

export const WixClientContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WixClientContext.Provider value={wixClient}>
            {children}
        </WixClientContext.Provider>
    )
}
