import sendMail from '../helper/mailer.js';
import randomOtp from '../helper/otp.generate.js';
import Otp from '../model/otp.model.js';

// send otp to database
export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;

        // Generate OTP
        const otp = randomOtp();

        // Save OTP to the database
        const otpCreated = new Otp({
            otp: otp
        });
        await otpCreated.save();
        console.log("OTP saved:", otpCreated);

        // Send OTP email only to admin
        if (email === 'infinixhot098123@gmail.com') {
            console.log('Admin detected, sending OTP');

            const msg = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Hi Dear,</h2>
                    <p>Your OTP for account verification is:</p>
                    <h3 style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; display: inline-block;">
                        ${otp}
                    </h3>
                    <p>Please enter this OTP to complete your registration process.</p>
                    <p>If you didn’t request this email, please ignore it.</p>
                    <p>Best regards,<br/>The Bookstore Team</p>
                </div>
            `;

            // Send mail
            await sendMail(email, 'OTP Verification', msg);
            console.log('OTP email sent');
           res.status(200).json({ message: "OTP sent successfully" });
              console.log({ message: "OTP sent successfully" });


        } else {
            console.log('User is not admin, OTP not sent');
        }

        // Schedule OTP removal after 1 minute
        setTimeout(async () => {
            try {
                await Otp.findByIdAndDelete(otpCreated._id);
                console.log("OTP removed after 1 minute");
            } catch (error) {
                console.log("Error removing OTP:", error);
            }
        }, 60000); // 60000 ms = 1 minute

    } catch (error) {
        console.log("Error:", error);
    }
};




// verifyOtp
export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const otpFound = await Otp.findOne({ otp });

        if (!otpFound) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        // Send response first
        res.status(200).json({ message: "OTP verified successfully" });

        // Remove OTP after successful verification
        try {
            await Otp.findByIdAndDelete(otpFound._id);
            console.log("OTP removed after successful verification");
        } catch (error) {
            console.log("Error removing OTP:", error);
        }

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
