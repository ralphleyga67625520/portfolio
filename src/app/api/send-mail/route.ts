import { sendEmail } from "@/lib/sendMail";


export async function POST(req: Request) {
    try {
        const { name, email, msg } = await req.json();

        if (!name || !email || !msg) {
            return Response.json({
                success: false,
                message: "All fields are required"
            })
        }   
        
        const res = await sendEmail({ name, email, msg })

        if (res.success) {
            console.log(res.message);
        }
        else{
            return Response.json({
                success:false,
                message:"Something went wrong"
            })
        }
        return Response.json({
            success: true,
            message:"Email sent successfully"
        })



    } catch (error) {
        console.error("Error sending mail", error);
        return Response.json({
            success: false,
            message: "Error sending mail"
        },
            {
                status: 500
            }
        )
    }
}