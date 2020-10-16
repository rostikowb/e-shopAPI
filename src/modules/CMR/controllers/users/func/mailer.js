import nodemailer from "nodemailer";
import sendmail from "sendmail";


export const sendMail = async (to, pin) => {


    // sendmail()({
    //     from: 'no-reply@localhost',
    //     to: 'rostikowb132@gmail.com',
    //     subject: 'test sendmail',
    //     html: 'Mail of test sendmail ',
    // }, function(err, reply) {
    //     console.log(err && err.stack);
    //     console.dir(reply);
    // });


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'vsivuha.online.repass@gmail.com',
            pass: '71262946367459008qQ/'
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    return await transporter.sendMail({
        from: 'noreply@vsivuha.online.repass',
        to: to,
        subject: "Сброс пароля на vsivuha.online",
        html: `<div style="width: 100%;"><p><span style="color: #000000;">Вставьте код в поле на странице сайта, он активен 20 минут</span></p><br><div><h1 style="border: 2px solid black; padding: 15px; width: 150px; text-align: center;"><strong>${pin}</strong></h1></div><br><p style="text-align: justify; font-size: 12px;"><span style="color: #333333;"><em>Если вы не запрашивали востановление пароля то проигнорируйте это письмо.</em></span></p><p style="text-align: justify; font-size: 12px;"><span style="color: #333333;"><em>Это сообщение составлено машиной, отвечать не нужно.</em></span></p></br>`,


        // attachments: [
        //     {filename: 'greetings.txt', path: '/assets/files/'},
        //     {filename: 'greetings.txt', content: 'Message from file.'},
        //     {path: 'data:text/plain;base64,QmFzZTY0IG1lc3NhZ2U='},
        //     {raw: `
        //   Content-Type: text/plain
        //   Content-Disposition: attachment;
        //
        //   Message from file.
        // `}
        // ]
    });

}

