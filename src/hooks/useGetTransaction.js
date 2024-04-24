import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import getUserInfo from "./useGetUserInfo";

const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = getUserInfo();
    const [transactionstotal,setTransactionstotal] =useState({balance:0.0, 
        income:0.0,
        expense:0.0
      })

    useEffect(() => {
        if (!userID) {
            console.log('No user ID available, skipping subscription');
            return;
        }

        const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
            const docs = [];
            let totalIncome =0;
            let totalExpense=0; 
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                docs.push({ ...data, id });
                if(data.transactionType=="expense"){
                    totalExpense+=Number(data.transactionAmount)
                }else{
                    totalIncome+=Number(data.transactionAmount)
                }
            });
            setTransactions(docs);
            let balance =totalIncome-totalExpense
 setTransactionstotal({
    balance,
    expense:totalExpense,
    income: totalIncome
 })

        }, error => {
            console.error("Failed to fetch transactions:", error);
        });

  
        return () => unsubscribe();

    }, [userID]); 

    return { transactions,transactionstotal };
};

export default useGetTransactions;
