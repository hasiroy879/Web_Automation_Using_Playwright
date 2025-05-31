class DashBoard {

    constructor(page){

        this.page = page;
        this.menu = page.getByRole("button",{name : "account of current user"});
        this.profile = page.getByRole("menuitem", {name : "Profile"});
        this.logout = page.getByRole("menuitem", {name : "Logout"});

        this.edit = page.getByRole("button", {name : "EDIT"});
        this.photo = page.getByRole("button", { name: "Choose File" });
        this.upload = page.getByRole("button", {name : "UPLOAD IMAGE"});
        

        this.itemLink = page.getByRole("button" , {name : "Add Cost"});
        this.itemName = page.getByRole("textbox", {name :"Item Name"});
        this.amount = page.getByRole("spinbutton", {name : "Amount"});
        this.remarks = page.getByRole("textbox", {name : "Remarks"});
        this.submitBtn = page.getByRole("button", {name : "Submit"});
     
    
        
    }
        
        async addTwoRandomItem(itemModel){
        await this.itemLink.click({timeout:20000});
        await this.itemName.fill(itemModel.itemName);
        await this.amount.fill(itemModel.amount);
        await this.remarks.fill(itemModel.remarks);
        await this.submitBtn.click();

    }


    async uploadImage(){
        await this.menu.click();
        await this.profile.waitFor({ state: 'visible', timeout: 10_000 });
        await this.profile.click();
        await this.edit.click();
        await this.photo.setInputFiles("C:/Users/User/OneDrive/Desktop/download.jpeg")
        await this.upload.click();
    }

    async userLogout(){

       await this.menu.click();
       await this.logout.click();

    }
}


export default DashBoard;