class RegistrationPage {

    constructor(page){

        this.page = page;

        this.registrationLink = page.getByRole("link" , {name : "Register"});
        this.firstName = page.getByLabel("First Name");
        this.lastName = page.getByLabel("Last Name");
        this.email = page.getByLabel("Email");
        this.password = page.getByLabel("Password");
        this.phoneNumber = page.getByLabel("Phone Number");
        this.address = page.getByLabel("Address");
        this.gender = page.getByRole("radio");
        this.terms = page.getByRole("checkbox");
        this.registrationBtn = page.getByRole("button", {name : "REGISTER"});
    }

    async registerUser(userModel){
        await this.registrationLink.click();
        await this.firstName.fill(userModel.firstName);
        await this.lastName.fill(userModel.lastName);
        await this.email.fill(userModel.email);
        await this.password.fill(userModel.password);
        await this.phoneNumber.fill(userModel.phoneNumber);
        await this.address.fill(userModel.address);
        await this.gender.first().click();
        await this.terms.click();
        await this.registrationBtn.click();

    }
}


export default RegistrationPage;