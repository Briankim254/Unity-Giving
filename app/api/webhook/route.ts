import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);
  // save the user to the database if the event type is user.created
  if (eventType === "user.created" && evt.data) {
    const {
      id,
      first_name,
      image_url,
      last_name,
      email_addresses,
      primary_email_address_id,
    } = evt.data;
    const primaryEmailObject = email_addresses.find(
      (email) => email.id === primary_email_address_id
    );
    const user = await prisma.user.create({
      data: {
        id: id,
        email:
          primaryEmailObject?.email_address ?? email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        role: "USER",
        imageUrl: image_url,
      },
    });
    console.log("User created:", user?.email ?? "No email found");
    await clerkClient.users.updateUserMetadata(id, {
      // Read only on client, Read / Write on the server
      publicMetadata: {
        role: "USER",
      },
      // Read only on server and Writable on Server
      privateMetadata: {
        role: "USER",
      },
      // Read / Write anywhere
      unsafeMetadata: {
        role: "USER",
      },
    });
    console.log("User with role saved to database and  metadata created ");
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      await prisma.campaign.deleteMany({
        where: {
          user_id: id,
        },
      });
      const user = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      console.log("User deleted:", user?.email ?? "No email found");
    } catch (err) {
      console.error("Error deleting user and campaigns: ", err);
    }
  }
  // if event type is session created check if user exists and update the user metadata
  if (eventType === "session.created" && evt.data) {
    const { user_id } = evt.data;
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      // create a new user if the user does not exist
      // first fetch the user data from clerk
      const clerkUser = await clerkClient.users.getUser(user_id);
      // create the user in the database
      const newUser = await prisma.user.create({
        data: {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          role: "USER",
          imageUrl: clerkUser.imageUrl,
        },
      });
      console.log("User created:", newUser?.email ?? "No email found");
      await clerkClient.users.updateUserMetadata(user_id, {
        // Read only on client, Read / Write on the server
        publicMetadata: {
          role: "USER",
        },
        // Read only on server and Writable on Server
        privateMetadata: {
          role: "USER",
        },
        // Read / Write anywhere
        unsafeMetadata: {
          role: "USER",
        },
      });
      console.log("User with role saved to database and  metadata created ");
    }
    return new Response("", { status: 200 });
  }
}
