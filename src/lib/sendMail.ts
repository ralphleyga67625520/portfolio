
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    console.log("NO API KEY");

}

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(
    { email, name, msg }: { email: string; name: string; msg: string }
) {
    try {
        const res = await resend.emails.send({
            from: `notification@${process.env.RESEND_DOMAIN}`,
            to: "ayushkgupta19@gmail.com",
            subject: 'New Notification from Portfolio',
            html: `
            <div style="font-family: Arial, sans-serif; color: #222;">
            <h2>New message from ${name} (${email})</h2>
            <p>${msg}</p>
            <br/>
            
            </div>
            `
        });
        if (res.data) {


            return {
                success: true,
                message: "Email sent successfully",
            }
        }
        return {
            success:false,
            message:"Email error"
        }
    } catch (emailError) {
        console.error("Error sending  email", emailError);
        return {
            success: false,
            message: "Failed to send email",
        }
    }
}