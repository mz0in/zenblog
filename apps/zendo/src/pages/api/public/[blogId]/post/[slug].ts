import { getClientClient } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = getClientClient();
    const blogId = req.query.blogId as string;
    const slug = req.query.slug as string;
    const { data, error } = await db
      .from("posts")
      .select(
        "slug, title, content, cover_image, created_at, updated_at, metadata"
      )
      .eq("blog_id", blogId)
      .eq("slug", slug)
      .single();

    if (error) {
      return res.status(500).json({ error: "ERROR TRYING TO RETURN POSTS" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "ERROR TRYING TO RETURN POSTS" });
  }
}
