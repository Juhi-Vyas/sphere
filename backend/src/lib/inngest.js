import { Inngest } from "inngest";

import { connectDB } from "./db.js";

import User from "../models/User.js";

import {
  deleteStreamUser,
  upsertStreamUser,
} from "./stream.js";

export const inngest = new Inngest({
  id: "sphere",
});

// ================================
// USER CREATED
// ================================

const syncUser = inngest.createFunction(

  {
    id: "sync-user",

    triggers: [
      {
        event: "clerk/user.created",
      },
    ],
  },

  async ({ event }) => {

    try {

      await connectDB();

      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
      } = event.data;

      const newUser = {
        clerkId: id,
        email:
          email_addresses[0]?.email_address,
        name:
          `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      };

      // SAVE USER IN DATABASE
      await User.create(newUser);

      // CREATE STREAM USER
      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });

      console.log(
        "✅ User synced successfully"
      );

    } catch (error) {

      console.log(
        "❌ Error syncing user:",
        error.message
      );

    }

  }
);

// ================================
// USER DELETED
// ================================

const deleteUserFromDB =
  inngest.createFunction(

    {
      id: "delete-user",

      triggers: [
        {
          event: "clerk/user.deleted",
        },
      ],
    },

    async ({ event }) => {

      try {

        await connectDB();

        const { id } = event.data;

        // DELETE FROM DATABASE
        await User.deleteOne({
          clerkId: id,
        });

        // DELETE FROM STREAM
        await deleteStreamUser(
          id.toString()
        );

        console.log(
          "✅ User deleted successfully"
        );

      } catch (error) {

        console.log(
          "❌ Error deleting user:",
          error.message
        );

      }

    }
  );

// EXPORT FUNCTIONS
export const functions = [
  syncUser,
  deleteUserFromDB,
];