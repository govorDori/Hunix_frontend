import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { dataBase } from "./firebaseApp";





//Add data to databases


export const addCar = async (formData) => {
  console.log(formData);

  const collectionRef = collection(dataBase, "Cars")
  const newCar = {...formData, uploadDate:serverTimestamp()}
  await addDoc(collectionRef,newCar)
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


export const readAllCars = (setCars, selectBrand) => {
  const collectionRef = collection(dataBase, "Cars")
  const quer = selectBrand.length == 0 ? query(collectionRef, orderBy("uploadDate", "desc")) : query(collectionRef, where("brand", "in", selectBrand))
  const unsubscribe = onSnapshot(quer, (snapshot) => {
    setCars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  })
  return unsubscribe
}

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

//export const readGarageCars = (setCars, sel)


//Change data in databases


export const changeCarData = async (id, {description, engineSize, fuelType, horsePower, inspectionExpiryDate, mileage, plateNum, price, wear}) => {
  const docRef = doc(dataBase, "Cars", id)
  await updateDoc(docRef, {description, engineSize, fuelType, horsePower, inspectionExpiryDate, mileage, plateNum, price, wear})
}