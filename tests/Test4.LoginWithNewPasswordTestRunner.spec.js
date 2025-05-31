import {test, expect} from "@playwright/test";
import jsonData from "../Utils/userData.json";;
import LoginPage from "../pages/LoginPage";
test("User Login with reset password", async({page}) => {

    // User Login
    await page.goto("/");
    const latestUser = jsonData[jsonData.length-1];
    const login = new LoginPage(page);
    await login.doLogin(latestUser.email, latestUser.password);

    // assertion for successfully login with new password
    await expect(page.getByText("Dashboard")).toBeVisible({timeout:20000}); 


    await page.pause();

    
})









