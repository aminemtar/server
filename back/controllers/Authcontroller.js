import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import sgMail from '@sendgrid/mail';
import session from 'express-session';

sgMail.setApiKey('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');

//TODO: create another method

export function addOnce(req, res) {
  var hashP;
  // Invoquer la méthode create directement sur le modèle
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      hashP = hash
      let userHashed = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashP,
        pseudo: req.body.pseudo,
        phone: req.body.phone,
        preference: req.body.preference

      }
      user
        .create(userHashed)
        .then(newuser => {
          const mailOptions = {
            to: newuser.email,
            from: "maherhamdii7@gmail.com",
            subject: "Password change request",
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Nouveau modle</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap" rel="stylesheet"><!--<![endif]-->
            <style type="text/css">
            #outlook a {
            padding:0;
            }
            .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
            }
            .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
            }
            [data-ogsb] .es-button {
            border-width:0!important;
            padding:10px 20px 10px 20px!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
            </style>
            </head>
            <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#ffffff"></v:fill>
            </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
            <tr>
            <td valign="top" style="padding:0;Margin:0">
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;border-right:2px solid #333333;border-left:2px solid #333333;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
            <td align="left" style="padding:0;Margin:0">
            <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:598px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="center" style="padding:0;Margin:0;position:relative"><img class="adapt-img" src="https://ahoqez.stripocdn.email/content/guids/bannerImgGuid/images/image16678582137356572.png" alt title width="598" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
            <td align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
            <tr>
            <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="left" style="padding:0;Margin:0;width:560px">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;font-size:0">
            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:35px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Facebook" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/facebook-square-black.png" alt="Fb" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:35px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Twitter" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/twitter-square-black.png" alt="Tw" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:35px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Instagram" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/instagram-square-black.png" alt="Inst" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Youtube" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/youtube-square-black.png" alt="Yt" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            </tr>
            </table></td>
            </tr>
            <tr>
            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">You are receiving this email because your account is verified<br><br></p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            </div>
            </body>
            </html>
            `,

          };
          sgMail.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });
            res.status(200).json({ message: 'welcome Email' + newuser.email + '.' });
          });
          newuser.token = token;
          res.status(200).json(newuser);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });


    })
  })


}
export function loginn(res, req) {
  var username = user.email
  var password = user.password
  user.findOne(email)
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {

          if (err) {
            res.json({
              error: err
            })
          }
          if (result) {
            let token = jwt.sign({ name: user.pseudo }, 'verySecretValue', { expiresIn: '1h' })
            res.json({
              message: "login succesfully",
              token

            })
          } else {
            res.json({
              message: "password does not match"
            })


          }

        })
      }
    })
}
export async function login(req, res, next) {
  const { email, password } = req.body
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const userr = await user.findOne({ email })
    if (!userr) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      let token = jwt.sign({ _id: userr._id }, 'mtar', { expiresIn: '1h' })
      bcrypt.compare(password, userr.password).then(function (result) {
        if (result) {
          res.header("auth-token",token).send(token);
          req.session.user = userr;
          req.session.save();
         // res.status(200).json({
           // message: "Login successful",
           // userr, token,
         // })
          
        }


        else res.status(400).json({ message: "Login not succesful" })
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}
export function logout(req, res) {
  req.session.destroy();
  return res.send("User logged out!");
}
export function us(req, res) {
  const sessionUser = req.session.user;
  return res.send(sessionUser);
}
export function recover(req, res) {
  user.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(401).json({ message: 'the email address' + req.body.email + 'is not associated with any account. Double-check your email address and try again.' })
      user.generatePasswordRest();
      user.save()
        .then(user => {
          let link = "http://" + req.headers.host + "/api/reset/" + user.resetPasswordToken;
          const mailOptions = {
            to: user.email,
            from: "maherhamdii7@gmail.com",
            subject: "Password change request",
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Nouveau modle</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap" rel="stylesheet"><!--<![endif]-->
            <style type="text/css">
            #outlook a {
            padding:0;
            }
            .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
            }
            .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
            }
            [data-ogsb] .es-button {
            border-width:0!important;
            padding:10px 20px 10px 20px!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
            </style>
            </head>
            <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#ffffff"></v:fill>
            </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
            <tr>
            <td valign="top" style="padding:0;Margin:0">
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
            <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;border-right:2px solid #333333;border-left:2px solid #333333;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tr>
            <td align="left" style="padding:0;Margin:0">
            <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:598px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="center" style="padding:0;Margin:0;position:relative"><img class="adapt-img" src="https://ahoqez.stripocdn.email/content/guids/bannerImgGuid/images/image16678582137356572.png" alt title width="598" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
            <td align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
            <tr>
            <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="left" style="padding:0;Margin:0;width:560px">
            <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;font-size:0">
            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:35px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Facebook" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/facebook-square-black.png" alt="Fb" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:35px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Twitter" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/twitter-square-black.png" alt="Tw" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:35px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Instagram" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/instagram-square-black.png" alt="Inst" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#EFEFEF;font-size:12px"><img title="Youtube" src="https://ahoqez.stripocdn.email/content/assets/img/social-icons/square-black/youtube-square-black.png" alt="Yt" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
            </tr>
            </table></td>
            </tr>
            <tr>
            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">You are receiving this email because your account is verified<br><br></p></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table></td>
            </tr>
            </table>
            </div>
            </body>
            </html>
            `,

          };
          sgMail.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });
            res.status(200).json({ message: 'A reset email has been sent to' + user.email + '.' });
          });

        })
        .catch(err => res.status(500).json({ message: err.message }));
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

export function reset(req, res) {
  user.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then((user) => {
      if (!user) return res.status(401).json({ message: 'Password rest token is invalid or has expired.' });
      res.render('reset', { user });
    })
    .catch(err => res.status(500).json({ message: err.message }));
}
export function resetPassword(req, res) {

  user.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then((user) => {
      if (!user) return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save((err) => {
        if (err) return res.status(500).json({ message: err.message });
        const mailOptions = {
          to: user.email,
          from: "maherhamdii7@gmail.com",
          subject: "your password has been changed",
          text: `Hi ${user.firstname} \n
        This is a confirmation that the password for your account ${user.email} has just been changed. \n `
        };
        sgMail.send(mailOptions, (error, result) => {
          if (error) return res.status(500).json({ message: error.message });
          res.status(200).json({ message: 'your password has been updated' });

        });
      });
    });
}
export function patchOnce(req, res) {
  user
    .findOneAndUpdate(req.params.id, req.body)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export async function res(req, res) {
  var newPasswordEncrypted;
  const { email, newPassword } = req.body

  if (newPassword) {
    newPasswordEncrypted = await bcrypt.hash(newPassword, 10)

    let userr = await user.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: newPasswordEncrypted,
        },
      }
    )

    return res.send({ message: "Password updated successfully", userr })
  } else {
    return res.status(403).send({ message: "Password should not be empty" })
  }

}
export async function sendConfirmationEmail(req, res) {


  user.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(401).json({ message: 'the email address' + req.body.email + 'is not associated with any account. Double-check your email address and try again.' })
      user.generatePasswordRest();
      user.save()
        .then(user => {
          let token = generateUserToken(user)
          let link = "http://" + req.headers.host + "/api/confirmation/:" + token;


          const mailOptions = {
            to: user.email,
            from: "maherhamdii7@gmail.com",
            subject: "Password change request",
            html: "<h3>Please confirm your email using this </h3><a href='" +
              "http" + "://" + "localhost" + ":" + "9090" + "/api/confirmation/:" + token +
              "'>Link</a>",

          };
          sgMail.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });
            res.status(200).json({ message: 'email de confirmation a été envoyé a' + user.email + '.' });
          });

        })
        .catch(err => res.status(500).json({ message: err.message }));
    })
    .catch(err => res.status(500).json({ message: err.message }));
}
export async function confirmation(req, res) {
  if (req.params.token) {
    try {
      token = jwt.verify(req.params.token, process.env.JWT_SECRET)
    } catch (e) {
      res.json({
        message:
          "The verification link may have expired, please resend the email.",
      })


    }
  } else {
    return res.render("confirmation.twig", {
      message: "no token",
    })
  }
}
export async function forgotPassword(req, res) {
  const resetCode = req.body.resetCode
  const userr = await user.findOne({ email: req.body.email })

  if (userr) {
    // token creation
    await sendOTP(req.body.email, resetCode)

    res.status(200).send({
      message: "L'email de reinitialisation a été envoyé a " + userr.email,
    })
  } else {
    res.status(404).send({ message: "User innexistant" })
  }
}
function generateUserToken(user) {
  return jwt.sign({ user }, 'mtar', { expiresIn: '1h' })
}
async function doSendConfirmationEmail(email, token, protocol) {
  let port = process.env.PORT || 9090

  sendEmail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Confirm your email",
    html:
      "<h3>Please confirm your email using this </h3><a href='" +
      protocol + "://" + "localhost" + ":" + port + "/api/confirmation/:" + token +
      "'>Link</a>",
  })
} async function sendOTP(email, codeDeReinit) {
  const mailOptions = {
    to: email,
    from: "maherhamdii7@gmail.com",
    subject: "Password change request",
    html: "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : blue'>" +
      codeDeReinit +
      "</b></p>",

  };
  sgMail.send(mailOptions, (error, result) => {
    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json({ message: 'email de confirmation a été envoyé a' + email + '.' });
  });
}
function sendEmail(mailOptions) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
      console.log("Server not ready")
    } else {
      console.log("Server is ready to take our messages")
    }
  })

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}
export async function deletee(req, res) {
  user
    .findOneAndRemove(req.params.id)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}