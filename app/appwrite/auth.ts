import { redirect } from "react-router";
import { account, appwriteConfig, database } from "./client";
import { OAuthProvider, Query, ID } from "appwrite";

type GooglePeopleProfile = {
  photos?: Array<{
    url?: string;
    default?: boolean;
  }>;
};

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Token(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`,
    );
  } catch (error) {
    console.log("Error during OAuth2 token creation:", error);
  }
};
export const getUser = async () => {
  try {
    const user = await account.get();

    if (!user) return redirect("/sign-in");
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "accountId", "joinedAt"]),
      ],
    );

    return documents[0];
  } catch (error) {
    console.log("CRITICAL ERROR IN GETUSER:", error);
    console.log(error);
  }
};
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log("logoutUser error:", error);
    return false;
  }
};

export const getGooglePicture = async (): Promise<string | null> => {
  try {
    const session = await account.getSession("current");

    if (!session.providerAccessToken) return null;

    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          Authorization: `Bearer ${session.providerAccessToken}`,
        },
      },
    );

    if (!response.ok) {
      console.log("Error fetching Google profile picture:", response.status);
      return null;
    }

    const profile = (await response.json()) as GooglePeopleProfile;
    const photo =
      profile.photos?.find((photo) => photo.url && !photo.default) ??
      profile.photos?.find((photo) => photo.url);

    return photo?.url ?? null;
  } catch (error) {
    console.log(error, "Error fetching Google profile picture:");
    return null;
  }
};
export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", user.$id)],
    );

    if (documents.length > 0) {
      const existingUser = documents[0];
      if (!existingUser.imageUrl) {
        const imageUrl = await getGooglePicture();
        if (imageUrl) {
          return await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            existingUser.$id,
            { imageUrl },
          );
        }
      }
      return existingUser;
    }

    const imageUrl = await getGooglePicture();

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: imageUrl || "",
        joinedAt: new Date().toISOString(),
      },
    );

    return newUser;
  } catch (error) {
    console.log("storeUserData error:", error);
    return null;
  }
};
export const getExistingUser = async (userId: string) => {
  try {
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", userId)],
    );

    if (documents.length > 0) {
      return documents[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.limit(limit), Query.offset(offset)],
    );

    if (total === 0) return { users: [], total: 0 };
    return { users, total };
  } catch (e) {
    console.log(e, "Error fetching all users");
    return { users: [], total: 0 };
  }
};
