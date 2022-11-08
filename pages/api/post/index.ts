// pages/api/post/index.ts

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
	const { title, content } = req.body;
	// extract the title/content from the request body.

	const session = await getSession({ req });
	//make sure user is authenticated

	// create a post with the title/content data from the request body.
	const result = await prisma.post.create({
		data: {
			title: title,
			content: content,
			author: { connect: { email: session?.user?.email } }
		}
	});
	// return the results as a json
	res.json(result);
}
