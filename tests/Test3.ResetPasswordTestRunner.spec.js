import ResetPasswordPage from "../pages/ResetPasswordPage";
import {test, expect} from "@playwright/test";
import jsonData from "../Utils/userData.json";
const fs = require('fs');
const baseUrl = "https://gmail.googleapis.com";
const token = process.env.GOOGLE_OAUTH_TOKEN;

test("Reset password",  async ({page, request}) => {
   
    await page.goto("/");
    const password = new ResetPasswordPage(page);
    const latestUser = jsonData[jsonData.length-1];
    await password.ReqResetPassword(latestUser.email);

    //get mail
    await page.waitForTimeout(7000);
    const response = await request.get(baseUrl+"/gmail/v1/users/me/messages", {
        headers: {
            "Accept" : "application/jdson",
            "Authorization" : "Bearer "+ token
        }
    
    })

    const data = await response.json();
    //console.log(data);
    const emailId = data.messages[0].id;
   //read latest email
    const response2 = await request.get(baseUrl+"/gmail/v1/users/me/messages/"+emailId, {
        headers: {
            "Accept" : "application/jdson",
            "Authorization" : "Bearer "+ token
        }
    })

  const fullMail = JSON.stringify(await response2.json());
  //get reset link
  const resetLinkMatch = fullMail.match(/https:\/\/dailyfinance\.roadtocareer\.net\/reset-password\?token=[a-zA-Z0-9]+/);
  if (!resetLinkMatch) throw new Error("Reset link not found.");
  const resetLink = resetLinkMatch[0];
  console.log(resetLink);
 

    //visit reset link and set new password
    await page.goto(resetLink);

    const newPassword = "9999";
    await page.getByRole('textbox', { name: 'New Password' }).fill(newPassword);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(newPassword);
    await page.getByRole('button', { name: 'Reset Password' }).click();
 
    //update password in json file
    latestUser.password = newPassword;
    fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null,2));
    
    // assert confirmation message
    await expect(page.getByText("Password reset successfully")).toBeVisible({timeout:20000}); 
   
   // await page.pause();
   

})
