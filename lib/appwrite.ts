import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, Databases, OAuthProvider } from "react-native-appwrite";

export const config = {
    platform: "com.masch.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectUrl = Linking.createURL("/");
        const response = await account.createOAuth2Token(
            OAuthProvider.Google, redirectUrl
        );

        if (!response) {
            throw new Error("Failed to login creating token");
        }

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUrl,
        );

        if (browserResult.type !== "success") {
            throw new Error("Failed to login opening session");
        }

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret");
        const userId = url.searchParams.get("userId");

        if (!secret || !userId) {
            throw new Error("Failed to login getting secret and userId");
        }

        const session = await account.createSession(
            userId, secret
        );

        if (!session) {
            throw new Error("Failed to create a session");
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function logout() {
    try {
        const result = await account.deleteSession("current");
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const result = await account.get();
        if (!result.$id) {
            return null;
        }

        const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.name)}&background=0061FF&color=fff&size=512`;

        return {
            ...result,
            avatar: userAvatar,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}