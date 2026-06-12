import { NextRequest, NextResponse } from "next/server"
import { createClient }              from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { client_project_id, message } = await req.json()

    if (!client_project_id || !message?.trim()) {
      return NextResponse.json(
        { error: "Project ID and message are required" },
        { status: 400 }
      )
    }

    // Verify the project actually exists before inserting
    const { data: project } = await supabase
      .from("client_projects")
      .select("id")
      .eq("id", client_project_id)
      .single()

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    const { data, error } = await supabase
      .from("feedback")
      .insert({
        client_project_id,
        author:  "client",
        message: message.trim(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: "Failed to save feedback" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, feedback: data })

  } catch (err) {
    console.error("Feedback route error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}