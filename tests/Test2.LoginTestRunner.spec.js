import {test, expect} from "@playwright/test";
import jsonData from "../Utils/userData.json";
import LoginPage from "../pages/LoginPage";
import DashBoard from "../pages/DashBoard";
import { faker } from '@faker-js/faker';

test("User Login -> Add two random items -> Upload Image -> Logout", async({page}) => {

    // User Login
    await page.goto("/");
    const latestUser = jsonData[jsonData.length-1];
    const login = new LoginPage(page);
    await login.doLogin(latestUser.email, latestUser.password);
    await expect(page.getByText("Dashboard")).toBeVisible({timeout:20000}); 

    //Add two random items
    let itemModel;
    const item = new DashBoard(page);

    for(let i = 0; i < 2; i++) {
    const itemModel = {
        itemName : faker.commerce.productName(),
        amount : faker.finance.amount({ min: 1000, max: 99999 }),
        remarks : faker.lorem.sentence()
    };
    await item.addTwoRandomItem(itemModel);
}
  

    // Assert exactly three rows now visible with table head
    await expect(page.locator("tr")).toHaveCount(3);
 
       
    // Upload profile photo
    const upload = new DashBoard(page);
    await upload.uploadImage();

    //assertion for image uploading
    page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Image uploaded successfully!');
    await dialog.accept();
    })

    // User Logout
    const logout = new DashBoard(page);
    await logout.userLogout();

    //await page.pause();

    
})









