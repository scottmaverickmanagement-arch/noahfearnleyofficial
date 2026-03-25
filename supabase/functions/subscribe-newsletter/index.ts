import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const FROM_EMAIL = "Noah Fearnley <fanclub@fanclub.noahfearnleyofficial.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function getWelcomeHtml(email: string): string {
  return `<div style="background-color: #080C16; font-family: Arial, Helvetica, sans-serif; color: #E2E8F0; width: 100%; padding: 40px 0;">
  <table align="center" style="margin: 0 auto; width: 100%; max-width: 600px; background-color: #0F172A; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
    <tr>
      <td style="background-color: #080C16; background-image: linear-gradient(to bottom, #1E293B, #0F172A); padding: 60px 30px; text-align: center;">
        <h4 style="margin: 0; font-family: Georgia, serif; font-weight: normal; font-size: 13px; letter-spacing: 4px; color: #3B82F6; text-transform: uppercase;">Official Newsletter</h4>
        <h1 style="margin: 20px 0; font-family: Georgia, serif; font-weight: normal; font-size: 38px; line-height: 1.25; color: #F8FAFC;">You're on the list!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #CBD5E1; max-width: 480px; margin: 0 auto 35px auto;">
          Thanks for subscribing to the Noah Fearnley official newsletter. You'll be the first to know about upcoming projects, movie premieres, and exclusive fan events.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 50px 30px; text-align: center; background-color: #151F32;">
        <h2 style="font-family: Georgia, serif; font-weight: normal; font-size: 28px; margin: 0 0 20px 0; color: #F8FAFC;">Stay Connected</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #94A3B8; max-width: 440px; margin: 0 auto 30px auto;">
          In the meantime, feel free to explore the latest news and filmography updates on the official website.
        </p>
        <a href="https://noahfearnleyofficial.com/news" style="background-color: #3B82F6; color: #FFFFFF; padding: 16px 36px; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; text-decoration: none;">Explore Latest News</a>
      </td>
    </tr>
    <tr>
      <td style="background-color: #080C16; padding: 40px 30px; text-align: center; border-top: 1px solid #1E293B;">
        <h4 style="font-family: Georgia, serif; font-weight: normal; margin: 0 0 20px 0; font-size: 18px; letter-spacing: 2px; color: #E2E8F0;">NOAH FEARNLEY</h4>
        <p style="font-size: 12px; color: #64748B; margin: 0 0 15px 0; line-height: 1.5;">You are receiving this email because you subscribed to Noah Fearnley's official newsletter via our website.</p>
        <div style="font-size: 12px; margin-top: 20px;">
          <a href="https://noahfearnleyofficial.com" style="color: #64748B; margin: 0 10px; text-decoration: none;">Website</a> |
          <a href="https://noahfearnleyofficial.com/filmography" style="color: #64748B; margin: 0 10px; text-decoration: none;">Filmography</a> |
          <a href="https://noahfearnleyofficial.com/contact" style="color: #64748B; margin: 0 10px; text-decoration: none;">Contact</a>
        </div>
      </td>
    </tr>
  </table>
</div>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { email } = body;

    console.log(`Received subscription request for: ${email}`);

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase configuration");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 2. Insert into database
    console.log("Inserting email into database...");
    const { error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }]);

    if (dbError) {
      if (dbError.code === '23505') { // Unique constraint violation
        console.log("Email already subscribed.");
        return new Response(JSON.stringify({ success: true, message: "You are already subscribed!" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error(`Database error: ${dbError.message}`);
      return new Response(JSON.stringify({ error: `Database error: ${dbError.message}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Send welcome email via Resend
    if (RESEND_API_KEY) {
      console.log("Sending welcome email...");
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [email],
          subject: "Welcome to the Noah Fearnley Official Newsletter",
          html: getWelcomeHtml(email),
        }),
      });

      if (!emailRes.ok) {
        const errorText = await emailRes.text();
        console.error(`Resend error: ${errorText}`);
      } else {
        console.log("Welcome email sent successfully.");
      }
    } else {
      console.warn("RESEND_API_KEY not found, skipping welcome email.");
    }

    return new Response(JSON.stringify({ success: true, message: "Successfully subscribed!" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(`Unhandled error: ${error.message}`);
    return new Response(JSON.stringify({ error: `Server error: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});