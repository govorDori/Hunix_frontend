import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { dataBase } from "./firebaseApp";


//Add data to databases


export const addCar = async (formData) => {
  console.log(formData);

  const collectionRef = collection(dataBase, "Cars")
  const newCar = {...formData, uploadDate:serverTimestamp()}
  await addDoc(collectionRef,newCar)
}


//Postadd
export const addPost=async (formdata)=>{
  const collectionRef=collection(db,'posts')
  const newItem={...formdata,timestamp:serverTimestamp()}
  await addDoc(collectionRef,newItem)
}


//Delete data from databases


export const deleteCar = async (id) => {
  console.log("id: ", id);

  const docRef = doc(dataBase, "Cars", id);
  await deleteDoc(docRef)
}


//Read data from databases


export const readAllBrands = (setBrands) => {
  const collectionRef = collection(dataBase, "Brands")
  const quer = query(collectionRef, orderBy("name", "asc"))
  const unsubscribe = onSnapshot(quer, (snapshot) => {
    setBrands(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  })
  return unsubscribe
}

//Összes autó beolvasása
export const readAllCars = (setCars, selectBrand) => {
  const collectionRef = collection(dataBase, "Cars")
  const quer = selectBrand.length == 0 ? query(collectionRef, orderBy("uploadDate", "desc")) : query(collectionRef, where("brand", "in", selectBrand))
  const unsubscribe = onSnapshot(quer, (snapshot) => {
    setCars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  })
  return unsubscribe
}

//SelectedCarInfo
export const readSelectedCar = async (id, setCar) => {
  const docRef = doc(dataBase, "Cars", id)
  try {
    const docSnap = await getDoc(docRef)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setCar({...snapshot.data(),id:snapshot.id})
    })
    if (docSnap.exists()) {
      setCar({...docSnap.data(), id: docSnap.id})
    } else {
      console.log("Az autó nem található!");
    }
  } catch (error) {
    console.error("Hiba az adat olvasás közben: ", error);
  }
}

//by:nndr
//"Ads" kollekciobol kikéri az összes hírdetést amit megjeleníthetünk
export const readAllAds = async (setAds) => {
  try {
    const querySnapshot = await getDocs(collection(dataBase, "Ads")); //"Ads" kollekció lekérése
    const adsList = [];
    querySnapshot.forEach((doc) => {
      adsList.push({ id: doc.id, ...doc.data() }); // Adatok hozzáadása a listához
    });
    setAds(adsList); // Állapot frissítése
  } catch (error) {
    console.error("Hiba a hirdetések betöltése közben:", error);
  }
};

//Egy adott hirdetés kiolvasása az ads-ból
export const getAds = async () => {
  const adsRef = collection(dataBase, 'Ads'); //'Ads' kollekció
  const adsSnap = await getDocs(adsRef);
  const adsList = adsSnap.docs.map(doc => ({
      id: doc.id, // Hirdetés ID
      ...doc.data() // Hirdetés adatai
  }));
  return adsList;
};

//Az adott hirdetés törlése
export const deletePost=async (id)=>{
  const docRef=doc(dataBase,'Ads',id)
  await deleteDoc(docRef)
}

//Hirdetés frissítése
export const updatePost=async (id,{adName, brand, description, engineSize, horsePower, model, photoURL, price, usage})=>{
  // console.log('crudutility:',id,title,category,story);
   
   const docRef=doc(dataBase,'Ads',id)
   await updateDoc(docRef,{adName, brand, description, engineSize, horsePower, model, photoURL, price, usage})
 }


//Change data in databases


export const changeCarData = async (id, {description, engineSize, fuelType, horsePower, inspectionExpiryDate, mileage, plateNum, price, wear}) => {
  const docRef = doc(dataBase, "Cars", id)
  await updateDoc(docRef, {description, engineSize, fuelType, horsePower, inspectionExpiryDate, mileage, plateNum, price, wear})
}