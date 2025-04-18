import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const cookieStore = cookies();
    (await cookieStore).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, //1 day xd
    });

    return new Response(JSON.stringify({ message: "Login exitoso" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error setting cookie:", error);
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
}
