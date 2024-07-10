const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId : String(import.meta.env.VITE_PROJECT_ID),
    bucketId : String(import.meta.env.VITE_BUCKET_ID),
    cartCollectionId : String(import.meta.env.VITE_CART_COLLECTION_ID),
    userCollectionId : String(import.meta.env.VITE_USER_COLLECTION_ID),
    dbId : String(import.meta.env.VITE_DB_ID),
    productsId: String(import.meta.env.VITE_PRODUCT_ID)
}

export default conf;