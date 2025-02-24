import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Payment successful", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
