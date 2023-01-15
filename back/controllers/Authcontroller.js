import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import sgMail from '@sendgrid/mail';
import session from 'express-session';
import fs from 'fs';
import { promisify } from 'util';
import multer from 'multer';
import express from 'express';
import sharp from 'sharp';
import path from 'path';
import messages from '../models/messages.js';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import webp from 'webp-converter';


import dotenv from 'dotenv';
import { timeStamp } from 'console';
import { now } from 'mongoose';
dotenv.config();


sgMail.setApiKey('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');
const readFile = promisify(fs.readFile);

//TODO: create another method
// User Management
export async function addOnce(req, res) {
  var hashP;
  const { email, password } = req.body
  let imageF;
  if (req.file) {
    imageF = req.file.filename
  }
  if ( await user.findOne({ email })) {
    res.status(403).send({ message: "User already exist !" })
  }
  else{
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
        preference: req.body.preference,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        imageF: 'aa',
        isVerified: false

      }
   
      user
        .create(userHashed)
        .then(newuser => {
          
          // sgMail.send(mailOptions, (error, result) => {
          //   if (error) return res.status(500).json({ message: error.message });
          //   res.status(200).json({ message: 'welcome Email' + newuser.email + '.' });
          // });
          // newuser.token = token;
          // const token = generateUserToken(newuser)
          // doSendConfirmationEmail(email,token,req.protocol);
        // main(newuser.email);
        confirmAccount(newuser.email)
          res.status(200).json(newuser);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
      
      
    })
  })
}
}
// login user
export async function login(req, res, next) {
  const { email, password } = req.body
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  let em =email
  try {
    const userr = await user.findOne({ email:em })
    if (!userr || userr.isVerified===false) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      let token = jwt.sign({ _id: userr._id }, 'mtar', { expiresIn: '1h' })
      bcrypt.compare(password, userr.password).then(function (result) {
        if (result) {
          // res.header("auth-token",token).send(token);
          req.session.user = userr;
         // console.log(userr)
          req.session.save();
          res.status(200).json({
            message: "Login successful",
            userr, token,
          })

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
export async function loginwithsocial(req,res){
  const { email, firstname,lastname,pseudo } = req.body
let u= await user.findOne({email:email})
if(u)
{
  let token = jwt.sign({ _id: u._id }, 'mtar', { expiresIn: '1h' })
  req.session.user = u;
  // console.log(userr)
   req.session.save();
   res.status(200).json({
     message: "Login successful",
     u, token,
   })
}
else{
  let userHashed = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: "azerty",
    pseudo: req.body.pseudo,
    phone: 0,
    preference: "",
    gender: "default",
    birthdate: Date.now(),
    imageF: 'aa',
    //imageF: req.params.image,
    isVerified: true
    

  }
  
  user
    .create(userHashed)
    .then(newuser => {
      req.session.user = newuser;
  // console.log(userr)
   req.session.save();
   console.log(req.session.user)
      res.status(200).json(newuser);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });

}
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
export function logout(req, res) {
  console.log("logout")
  req.session.destroy();
  
  return res.status(200).json("user logged out");
  
}
export async function deletee(req, res) {
  user
    .findOneAndRemove({"_id":req.params.id})
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export function getAll(req, res) {

  user
    .find({})
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export function getOnce(req, res) {
  user
    .findOne({ "_id": req.params.id })
    .then(doc => {
      res.status(200).json([doc]);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
// Session Management
export function us(req, res) {
  const sessionUser = req.session.user;
  return res.status(200).json([sessionUser]);
}
function generateUserToken(user) {
  return jwt.sign({ user }, 'mtar', { expiresIn: '1h' })
}
// Password Management
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

const app = express();
const port = process.env.PORT;
// async..await is not allowed in global scope, must use a wrapper
export async function main(email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOSTM,
    service: process.env.SERVICE,
    port: process.env.PORTM,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"clothy👻" <Clothyy.app@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: await readFile('./views/welcome.html', 'utf8'), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
var emm
var codeDeReinit


export async function sendOTP(email) {


  // 6 digit code
  let code = Math.floor(100000 + Math.random() * 900000);
  console.log(code)
  //print(code)
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOSTM,
    service: process.env.SERVICE,
    port: process.env.PORTM,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });
    let info = await transporter.sendMail({
      from: '"clothy👻" <mohamedamine.mtar@esprit.tn>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Password change request", // plain text body
      html: `<!doctype html>
      <html lang="en-US">
      
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                         
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                  requested to reset your password</h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                  We cannot simply send you your old password. A unique code to reset your
                                                  password has been generated for you. To reset your password, copy the
                                                  following code in the code field.
                                              </p>
                                              <a href="javascript:void(0);"
                                                  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                `+code+` </a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                         
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>
      
      </html>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return emm = email, codeDeReinit = code
}
export async function forgotPassword(req, res) {
  // const resetCode = req.body.resetCode
  const userr = await user.findOne({ email: req.body.email })
  //console.log(email)
  if (userr) {
    // token creation
    await sendOTP(req.body.email)

    res.status(200).send({
      message: "L'email de reinitialisation a été envoyé a " + userr.email,
    })
  } else {
    res.status(404).send({ message: "User innexistant" })
  }
}
export function testcode(req, res) {
  console.log(emm)
  if (req.body.code === codeDeReinit && req.body.email === emm) {
    res.status(200).send({
      message: "saha ya bouha"
    })
  } else {
    res.status(404).send({ message: "oopsi" })
  }
}
export async function updateProfile (req, res)  {
  const { email, firstname, lastname, birthdate, gender, isVerified ,phone,pseudo} = req.body
let use

  let userr = await user.findOneAndUpdate(
    {"_id":req.params.id}, req.body,
    {
      $set: {
        email,
        firstname,
        lastname,
        birthdate,
        gender,
        phone,
        pseudo,
       // pictureId: req.file.filename,
        isVerified
       
      },
    }

  ).then(req.session.reload(function(err){
    req.session.user.email = email
    req.session.user.firstname =firstname
    req.session.user.lastname = lastname
    req.session.user.birthdate = birthdate
    req.session.user.pseudo =pseudo
    req.session.user.gender = gender
    req.session.user.phone =phone
    
    
    
  }))
  .then(  use = new user(
    { email: email,firstname:firstname ,lastname:lastname,gender:gender,isVerified:isVerified,birthdate:birthdate}
   

  ))
  

  return res.send({ message: "Profile updated successfully", use})
}
export async function confirmAccount(email) {


  
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOSTM,
    service: process.env.SERVICE,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });
    let info = await transporter.sendMail({
      from: '"clothy👻" <Clothyy.app@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Confirm your account", // plain text body
      html: `<!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        /**
         * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
         */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
        /**
         * Avoid browser level font resizing.
         * 1. Windows Mobile
         * 2. iOS / OSX
         */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
        /**
         * Remove extra space added to tables and cells in Outlook.
         */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
        /**
         * Better fluid images in Internet Explorer.
         */
        img {
          -ms-interpolation-mode: bicubic;
        }
        /**
         * Remove blue links for iOS devices.
         */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        /**
         * Fix centering issues in Android 4.4.
         */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        /**
         * Collapse table borders to avoid space between cells.
         */
        table {
          border-collapse: collapse !important;
        }
        a {
          color: #1a82e2;
        }
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
        </style>
      
      </head>
      <body style="background-color: #e9ecef;">
      
        <!-- start preheader -->
        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
      
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
      
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                      <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
      
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
      
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start button -->
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                <a href='https://Cicero-crm.com/api/confirm/`+email+`' target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Comfirm your email</a>

                                </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
      
                <!-- start copy -->
                
                <!-- end copy -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                    <p style="margin: 0;">CLOTHY,<br> M&H</p>
                  </td>
                </tr>
                <!-- end copy -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
      
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start permission -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email because we received a request to add an account . If you didn't request  you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end permission -->
      
                <!-- start unsubscribe -->
                
                <!-- end unsubscribe -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
      
        </table>
        <!-- end body -->
      
      </body>
      </html>` // html body
    });
    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
export async function confirm (req,res)
{
   let email = req.params.email
  
  let use = await user.findOneAndUpdate(
    {email },
    {
      $set: {
            isVerified : true
      },
     
    })
   main(email)
    return res.send({ message: "Your account is verified succesfully",use})
    
}
// export function confirm(req, res) {
//   user
//       .findOneAndUpdate({ "email": req.params.email })
//       .then(doc => {
//           doc.isVerified = true
//       })
//       .catch(err => {
//           res.status(500).json({ error: err });
//       });
// }
export async function changePassword (req,res){
  var newPasswordEncrypted;
  const {  newPassword,password} = req.body
  let email = req.session.user.email
  const userr = await user.findOne({ email })
  bcrypt.compare(password, userr.password).then(async function (result) {
    if (result) {
      
      if (newPassword)
      {
        newPasswordEncrypted = await bcrypt.hash(newPassword, 10)
        let use =   await user.findOneAndUpdate(
          {  email },
          {
            $set: {
              password: newPasswordEncrypted,
            },
          }
        )      
        }
      
      res.status(200).json({
        message: "Login successful",
         userr,newPassword
        
      })

    }


    else res.status(400).json({ message: "Login not succesful" })
  })


}
export async function UpdateImage(req,res){

  
  const userr = await user.findOne({ "email":req.params.email})
  let imageF;
  let i;
  
  if (req.file) {
    imageF = req.file.filename
    //i = imageF.replace(imageF.slice(imageF.indexOf('.')), '.webp')

    const { filename: image } = req.file;
       
         // await sharp(req.file.path)
         // .rotate(90)
        //  //.resize(200, 200)
        //  .jpeg({ quality: 80 })
        //  .toFile(
        //      path.resolve(req.file.destination,'resized',image)
        //  )
         
        // imagemin([req.file.path], {
        //   destination: './uploads/resized',
          
        //   plugins: [
        //     imageminWebp({
        //          quality: 80,
        //       //   ,
        //       //   resize: {
        //       //     width: 1000,
        //       //     height: 0
        //       //   }
        //      rotate : 90
        //     }),
        //   ],
        // }).then(() => {
        //   fs.unlinkSync(req.file.path)
        //   console.log("Images Converted Successfully!!!");
        // });
        // //const result = webp.cwebp(req.file.path,"nodejs_logo.webp","-q 80");
        // console.log(req.file.path)
        // console.log(req.file.filename)
  
    let userr = await user.findOneAndUpdate(
      { _id:req.session.user._id },
      {
        $set: {
          imageF :imageF,
          
          
        },
      }
    ).then(req.session.reload(function(err){
      req.session.user.imageF = req.file.filename
      
    }))

    return res.send({ message: "Photo updated successfully", userr ,imageF})
  } else {
    return res.status(403).send({ message: "Photo should not be empty" })
  }

}
