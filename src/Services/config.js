import conf from "../envConf/conf";
import { Client, ID , Databases , Storage , Query} from "appwrite";


export class Service{
    client = new Client();

    databases;
    bucket;

    constructor (){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
        
        this.databases= new Databases(this.client)
        this.bucket = new Storage(this.client) 
    }

    async getAllProducts(){
        try {
            return await this.databases.listDocuments(
                conf.dbId,
                conf.productsId,
                [Query.select(["*"])]
            )
        } catch (error) {
            console.log("Appwrite :: getAllProducts error", error)
        }
    }

    async addToCart({email,productName,productImage,productDescription,productPrice}){
        try {
            return await this.databases.createDocument(
                conf.dbId,
                conf.cartCollectionId,
                ID.unique(),
                {
                    email,
                    productName,
                    productImage,
                    productDescription,
                    productPrice
                }
            )

        } catch (error) {
            throw new Error("cart update failed : " + error.message)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite :: upload file error", error)
            return false
        }
    }

    async getCartItemsByEmail(email){
        try {
            return await this.databases.listDocuments(
                conf.dbId,
                conf.cartCollectionId,
                [ Query.equal("email", String(email))]
            )
        } catch (error) {
            console.log("Appwrite :: getCartItemsByEmail error", error)
        }
    }

    async addProduct({productName,productDescription,productPrice,productImage,email}){
        try {
            return await this.databases.createDocument(
                conf.dbId,
                conf.productsId,
                ID.unique(),
                {
                    productName,
                    productDescription,
                    productPrice,
                    productImage,
                    email
                }
            )
        } catch (error) {
            throw new Error("Product creation failed : " + error.message)
        }
    }

    async getProductByEmail(email){
        try {
            return await this.databases.listDocuments(
                conf.dbId,
                conf.productsId,
                [ Query.equal("email", String(email))]
            )
        } catch (error) {
            console.log("Appwrite :: getProductByEmail error", error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
    }
}

const service = new Service()

export default service;