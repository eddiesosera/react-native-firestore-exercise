import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

// TODO: Create New List Item 
export const createNewBucketItem = async (item) => {
    try {
        // docRef - is reference to our newly cretaed document
        const docRef = await addDoc(collection(db, "items"), item);
        console.log("Document written with ID: ", docRef.id);
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
        return false
    }

}

// TODP: Get All Items in list
export const getMyBucketList = async (item) => {
    try {
        var allItems = []; //array that we want to return

        // making a custom query to order by or limit to our query of data
        var q = query(collection(db, "items"), orderBy('priority', 'desc'), limit(5))
        // getDocs - Get all docs in the collection
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            allItems.push({ id: doc.id, ...doc.data() })
        });

        // console.log(allItems);
        return allItems

        // cant just use query snapshot as the of items - need to access the .data
    } catch (e) {
        console.error("Error getting document: ", e);
    }

}