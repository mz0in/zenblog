import { getServerClient } from "@/lib/server/deprecated/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await getServerClient(req, res);

  const method = req.method;

  if (method === "GET") {
    const { data: invitations, error: invitationsError } = await db
      .from("invitations")
      .select("*");
    // .eq("email", email);

    if (invitations) {
      invitations.forEach(async (invitation) => {
        // await db.from("members").insert({
        //   blog_id: invitation.blog_id,
        //   // user_id: userId,
        //   // role: "MEMBER",
        // });
      });
    }

    if (invitationsError) {
      return res.status(500).json({ error: invitationsError.message });
    }

    return res.status(200).json({
      success: true,
    });
  }
}
