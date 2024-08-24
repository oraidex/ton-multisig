import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const addressUser = url.searchParams.get("addressUser");

    if (!addressUser) {
      return new NextResponse(
        JSON.stringify({ error: "addressUser is required" }),
        {
          status: 400,
        }
      );
    }

    const result = await prisma.multisig.findMany({
      where: {
        OR: [
          { createdBy: addressUser },
          { importedBy: { contains: addressUser } },
          { signers: { contains: addressUser } },
          { proposers: { contains: addressUser } },
        ],
      },
    });

    return new NextResponse(JSON.stringify({ data: result }), { status: 200 });
  } catch (error) {
    console.log("Error get multisig record: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to get multisig" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, address, createdBy, importedBy, signers, proposers } =
      await req.json();

    const result = await prisma.multisig.create({
      data: {
        name,
        address,
        createdBy,
        importedBy,
        signers,
        proposers,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Multisig added successfully", data: result }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error adding multisig record: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to add multisig" }),
      {
        status: 500,
      }
    );
  }
}

// export async function PATCH(req: NextRequest) {
//   try {
//     const { name, address, createdBy, importedBy, signers, proposers } =
//       await req.json();

//     const result = await prisma.multisig.update({
//       where: { address },
//       data: {
//         name,
//         createdBy,
//         importedBy: JSON.stringify(importedBy),
//         signers: JSON.stringify(signers),
//         proposers: JSON.stringify(proposers),
//       },
//     });

//     return new NextResponse(
//       JSON.stringify({
//         message: "Multisig updated successfully",
//         data: result,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Error updating multisig record: ", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Failed to update multisig" }),
//       { status: 500 }
//     );
//   }
// }
