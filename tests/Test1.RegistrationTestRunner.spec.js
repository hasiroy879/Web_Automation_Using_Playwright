import {test, expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import fs from 'fs';
import RegistrationPage from "../pages/RegistrationPage.js";
import {generateRandomId} from "../Utils/utils.js";
const baseUrl = "https://gmail.googleapis.com";
const token = process.env.GOOGLE_OAUTH_TOKEN;

test("User Registration and assert congratulations message",  async ({page, request}) => {
    await page.goto("/");
    const reg = new RegistrationPage(page);

    const userModel = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        email : "hasiroy.cse+"+generateRandomId(100,999)+"@gmail.com",
        password : faker.internet.password(),
        phoneNumber : `0130${generateRandomId(1000000,9999999)}`,
        address : faker.location.city()   
    }

    await reg.registerUser(userModel);

    // assert toast message for successfully registration
    const toastLocator = page.locator(".Toastify__toast");
    toastLocator.waitFor({timeout:20000});
    const msg = await toastLocator.textContent();
    expect(msg).toContain("successfully");

    jsonData.push(userModel);
    fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null,2));

    // assert congratulations message via gmail
     await page.waitForTimeout(5000);
    const response = await request.get(baseUrl+"/gmail/v1/users/me/messages", {
        headers: {
            "Accept" : "application/jdson",
            "Authorization" : "Bearer "+ token
        }
    })

    const data = await response.json();
    //console.log(data);
    const emailId = data.messages[0].id;

    const response2 = await request.get(baseUrl+"/gmail/v1/users/me/messages/"+emailId, {
        headers: {
            "Accept" : "application/jdson",
            "Authorization" : "Bearer "+ token
        }
    })

    const res = await response2.json();
    const msg1 = res.snippet;
    expect(msg1).toContain("Welcome to our platform!");
    //await page.pause();
   

})

