import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const FROM_EMAIL = "Noah Fearnley Fan Club <fanclub@fanclub.noahfearnleyofficial.com>";
const NOTIFICATION_EMAIL = "fanclub@noahfearnleyofficial.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function getAutoReplyHtml(name: string): string {
  return `<div style="background-color: #080C16; font-family: Arial, Helvetica, sans-serif; color: #E2E8F0; width: 100%; padding: 40px 0;">
  <table align="center" style="margin: 0 auto; width: 100%; max-width: 600px; background-color: #0F172A; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
    <tr>
      <td style="background-color: #080C16; background-image: linear-gradient(to bottom, #1E293B, #0F172A); padding: 60px 30px; text-align: center;">
        <h4 style="margin: 0; font-family: Georgia, serif; font-weight: normal; font-size: 13px; letter-spacing: 4px; color: #3B82F6; text-transform: uppercase;">Official Fan Club</h4>
        <h1 style="margin: 20px 0; font-family: Georgia, serif; font-weight: normal; font-size: 38px; line-height: 1.25; color: #F8FAFC;">Welcome, ${name}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #CBD5E1; max-width: 480px; margin: 0 auto 35px auto;">
          Thank you for your interest in joining the exclusive Noah Fearnley community. Your application is currently being processed by our management team.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 50px 30px; text-align: center; background-color: #151F32;">
        <h2 style="font-family: Georgia, serif; font-weight: normal; font-size: 28px; margin: 0 0 20px 0; color: #F8FAFC;">Next steps for verification</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #94A3B8; max-width: 440px; margin: 0 auto 30px auto;">
          To complete your registration and receive your official Fan Club ID card, exclusive merchandise, and gifts, please reply to this email with the following details:
        </p>
        <table align="center" style="margin: 0 auto 35px auto; text-align: left; background-color: #0F172A; border-radius: 8px; width: 100%; max-width: 400px; border: 1px solid #1E293B;">
          <tr>
            <td style="padding: 25px 30px;">
              <ol style="margin: 0; padding-left: 20px; font-size: 16px; line-height: 2.0; color: #E2E8F0;">
                <li><strong>Your Full Name</strong></li>
                <li><strong>A Recent Photograph</strong> (a clear picture)</li>
                <li><strong>Your Mailing Address</strong></li>
                <li><strong>Your Phone Number</strong></li>
              </ol>
            </td>
          </tr>
        </table>
        <a href="mailto:fanclub@noahfearnleyofficial.com?subject=Fan%20Club%20Verification%20Details" style="background-color: #3B82F6; color: #FFFFFF; padding: 16px 36px; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; text-decoration: none;">Reply Now</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 50px 30px; background-color: #0F172A; border-top: 1px solid #1E293B;">
        <table width="100%" style="border-spacing: 0;">
          <tr>
            <td style="vertical-align: top; padding-right: 20px; width: 45%;">
              <h3 style="font-family: Georgia, serif; font-weight: normal; font-size: 22px; margin: 0 0 15px 0; color: #F8FAFC;">Stay Engaged</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; margin: 0;">Keep following Noah and engaging with his existing and upcoming projects. Your support means everything to us.</p>
            </td>
            <td style="vertical-align: top; padding-left: 20px; border-left: 1px solid #1E293B;">
              <h3 style="font-family: Georgia, serif; font-weight: normal; font-size: 22px; margin: 0 0 15px 0; color: #F8FAFC;">Charity Giving</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; margin: 0 0 15px 0;">Visit the charity section to learn about our causes and donate.</p>
              <a href="https://www.noahfearnleyofficial.com/charity" style="color: #3B82F6; font-weight: bold; font-size: 14px; text-decoration: none;">Visit Charity &rarr;</a>
            </td>
          </tr>
        </table>
        <div style="margin-top: 50px; text-align: center;">
          <table align="center" style="border-spacing: 0; width: 100%;">
            <tr>
              <td style="text-align: center; width: 50%;">
                <h4 style="font-family: Georgia, serif; font-weight: normal; color: #F8FAFC; margin: 0 0 10px 0; font-size: 16px;">Charity Contact</h4>
                <p style="font-size: 14px; color: #94A3B8; margin: 0;"><a href="mailto:charity@noahfearnleyofficial.com" style="color: #3B82F6; text-decoration: none;">charity@noahfearnleyofficial.com</a></p>
              </td>
              <td style="text-align: center; width: 50%; border-left: 1px solid #1E293B;">
                <h4 style="font-family: Georgia, serif; font-weight: normal; color: #F8FAFC; margin: 0 0 10px 0; font-size: 16px;">Direct Contact</h4>
                <p style="font-size: 14px; color: #94A3B8; margin: 0;"><a href="mailto:noah@noahfearnleyofficial.com" style="color: #3B82F6; text-decoration: none;">noah@noahfearnleyofficial.com</a></p>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #080C16; padding: 40px 30px; text-align: center; border-top: 1px solid #1E293B;">
        <h4 style="font-family: Georgia, serif; font-weight: normal; margin: 0 0 20px 0; font-size: 18px; letter-spacing: 2px; color: #E2E8F0;">NOAH FEARNLEY</h4>
        <p style="font-size: 12px; color: #64748B; margin: 0 0 15px 0; line-height: 1.5;">You are receiving this email because you applied to join the Noah Fearnley Fan Club.<br>Please reply directly to this email with your details.</p>
        <div style="font-size: 12px; margin-top: 20px;">
          <a href="https://noahfearnleyofficial.com" style="color: #64748B; margin: 0 10px; text-decoration: none;">Website</a> |
          <a href="https://noahfearnleyofficial.com/fan-club" style="color: #64748B; margin: 0 10px; text-decoration: none;">Fan Club</a> |
          <a href="https://noahfearnleyofficial.com/contact" style="color: #64748B; margin: 0 10px; text-decoration: none;">Contact</a>
        </div>
      </td>
    </tr>
  </table>
</div>`;
}

function getAutoReplyText(name: string): string {
  return `Official Fan Club
Welcome, ${name}!

Thank you for your interest in joining the exclusive Noah Fearnley community. Your application is currently being processed by our management team.

Next steps for verification:
To complete your registration and receive your official Fan Club ID card, exclusive merchandise, and gifts, please reply to this email with the following details:

1. Your Full Name
2. A Recent Photograph (a clear picture)
3. Your Mailing Address
4. Your Phone Number

Stay Engaged
Keep following Noah and engaging with his existing and upcoming projects. Your support means everything to us.

Charity Giving
Visit the charity section to learn about our causes and donate: https://www.noahfearnleyofficial.com/charity

Charity Contact: charity@noahfearnleyofficial.com
Direct Contact: noah@noahfearnleyofficial.com

NOAH FEARNLEY
You are receiving this email because you applied to join the Noah Fearnley Fan Club.
Please reply directly to this email with your details.

Website: https://noahfearnleyofficial.com
Fan Club: https://noahfearnleyofficial.com/fan-club
Contact: https://noahfearnleyofficial.com/contact`;
}

function getNotificationHtml(name: string, email: string): string {
  return `<div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #0F172A; margin-top: 0;">New Fan Club Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p style="color: #666; font-size: 14px;">This person has applied to join the Noah Fearnley Fan Club via the website.</p>
    </div>
  </div>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email } = await req.json();

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "API Key missing in environment" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const autoReplyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "Next Steps: Noah Fearnley Fan Club Application",
        html: getAutoReplyHtml(name),
        text: getAutoReplyText(name),
        reply_to: "fanclub@noahfearnleyofficial.com",
      }),
    });

    if (!autoReplyRes.ok) {
      const errBody = await autoReplyRes.text();
      return new Response(JSON.stringify({ error: `Resend error: ${errBody}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send notification to management
    const notifRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFICATION_EMAIL],
        subject: `New Fan Club Application: ${name}`,
        html: getNotificationHtml(name, email),
      }),
    });

    if (!notifRes.ok) {
      console.error("Resend notification error:", await notifRes.text());
      // Don't fail the request — the fan already got their email
    }

    return new Response(JSON.stringify({ success: true, message: "Application submitted successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Function error: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});