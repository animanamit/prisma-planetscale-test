import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log("reached handler");
  if (req.method === "POST") {
    return await writeToDb(req, res);
  }
}

async function writeToDb(req, res) {
  const { name, id } = req.body;
  console.log("reached function");
  try {
    const newEntry = await prisma.user.create({
      data: {
        name: "TEST",
      },
    });
    console.log("success!");
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res
      .status(500)
      .json({ error: "Error writing to db", success: false });
  }
}
