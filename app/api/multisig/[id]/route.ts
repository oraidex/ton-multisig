import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params || {};
    const url = new URL(req.url);

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Address multisig notfound!" }),
        {
          status: 400,
        }
      );
    }

    const result = await prisma.multisig.findFirst({
      where: {
        address: id,
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

export async function PATCH(req: NextRequest, { params }) {
  try {
    const { name, address, createdBy, importedBy, signers, proposers } =
      await req.json();

    const { id } = params || {};
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Address multisig notfound!" }),
        {
          status: 400,
        }
      );
    }

    const url = new URL(req.url);
    const addressUser = url.searchParams.get("userAddress");

    if (!addressUser) {
      return new NextResponse(
        JSON.stringify({ error: "addressUser is required" }),
        {
          status: 400,
        }
      );
    }

    const updateData: any = {};

    if (name) {
      updateData["name"] = name;
    }
    if (importedBy) {
      updateData["importedBy"] = importedBy;
    }
    if (signers) {
      updateData["signers"] = signers;
    }
    if (proposers) {
      updateData["proposers"] = proposers;
    }

    const result = await prisma.multisig.upsert({
      where: { address: id },
      update: updateData,
      create: {
        ...updateData,
        address: id,
        createdBy: addressUser,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Multisig updated successfully",
        data: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating multisig record: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update multisig" }),
      { status: 500 }
    );
  }
}
