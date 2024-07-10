import conf from '../envConf/conf.js'


class AuthService{
    endpoint;
    constructor(){
        this.endpoint = conf.backendUrl
    }
    async createAccount({firstName,lastName,email,password,Number}){
        try {
            console.log(this.endpoint)
            const userAccount = await fetch(`/${this.endpoint}/users/register`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                }  ,
                body:JSON.stringify({firstName:firstName,lastName:lastName,email:email,password:password,Number:Number})
            })
            if(userAccount.ok){
                return this.login({email,password})
            }
            else return userAccount;
        } catch (error) {
            throw new Error("Error creating account",error)
        }
    }

    async login({email,password}){
        console.log(this.endpoint)
        try {
            return await fetch(`/${this.endpoint}/users/login`,{
                method:"POST",
                body:{email:email,password:password}
            })
        } catch (error) {
            console.log("Service error :: login()",error.message)
        }
    }

    async logout(){
        try{
            await fetch(`${this.endpoint}/users/logout`,{
                method:"POST",
            })
        }
        catch (error) {
            console.log("Service error :: logout()",error.message)
        }
    }

    async getCurrentUser(){
        try{
            const user = await fetch(`${this.endpoint}/users/get-current-user`)
            if(!user.ok)return null
            return await user.json()
        }
        catch (error) {
            console.log("Service error :: getCurrentUser()",error.message)
        }
    }

}

const authService = new AuthService();

export default authService;