class LoginPage{
    constructor(page){
        this.page=page;

        this.email = page.getByRole("textbox", {name : "Email"});
        this.password = page.getByRole("textbox", {name : "Password"});
        this.loginBtn = page.getByRole("button", {name : "LOGIN"});
    }

    async doLogin(email, password){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}

export default LoginPage;