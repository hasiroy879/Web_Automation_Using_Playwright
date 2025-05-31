class ResetPasswordPage{
    constructor(page){
        this.page=page;

        //For new password request
        this.resetPasswordLink = page.getByRole("link" , {name : "Reset it here"});
        this.email = page.getByRole("textbox" , {name : "Email"});
        this.resetBtn = page.getByRole("button" , {name : "SEND RESET LINK"});

        //For confirm password
        this.newPass = page.getByRole("text" , {name : "New Password"});
        this.confirmPass = page.getByRole("textbox" , {name : "Confirm Password"});
        this.resetPass = page.getByRole("button" , {name : "RESET PASSWORD"});
    }

    async ReqResetPassword(email){
        await this.resetPasswordLink.click();
        await this.email.fill(email);
        await this.resetBtn.click();
    }

    async resetPassword(newPassword) {
    await this.newPass.fill(newPassword);
    await this.confirmPass.fill(newPassword);
    await this.resetPass.click();
  }

}

export default ResetPasswordPage;