import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../utility/UserContext"; // UserContext importálása
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore metódusok importálása
import { useLocation } from "react-router-dom";

export const AddEditPost = () => {
  const { user, db } = useContext(UserContext); // db és user elérése
  const { id } = useParams(); // id ami alapján frissítünk
  const navigate = useNavigate();
  const location = useLocation(); //Megnézhetjük hogy milyen útvonalról érkezett a felhasználó

  // Ellenőrzi, hogy a felhasználó be van-e jelentkezve
  useEffect(() => {
    if (!user) navigate("/"); // Ha nincs bejelentkezve, visszairányítjuk a főoldalra
  }, [user, navigate]);

  // Hirdetés adatok
  const [adName, setAdName] = useState("");
  const [brand, setBrand] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [usage, setUsage] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // Photo URL state

  // Ellenőrizzük, hogy ha az 'id' -t, ha van akkor betöltjük az adatokat azaz frissítünk
  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        try {
          const docRef = doc(db, "Ads", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAdName(data.adName);
            setBrand(data.brand);
            setHorsePower(data.horsePower);
            setEngineSize(data.engineSize);
            setUsage(data.usage);
            setModel(data.model);
            setDescription(data.description);
            setPrice(data.price);
            setPhotoURL(data.photoURL);
          } else {
            console.log("Nincs ilyen hirdetés.");
          }
        } catch (error) {
          console.error("Hiba a hirdetés betöltésekor:", error);
        }
      };

      fetchPostData();
    }
  }, [id, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Képfeltöltés Cloudinaryval történik, itt most egy teszt van csak!!!
    const placeholderURL = "https://via.placeholder.com/150"; // Ide később a Cloudinary URL lesz

    // Hirdetés adatainak előkészítése
    const adData = {
      adName,
      brand,
      horsePower,
      engineSize,
      usage,
      model,
      description,
      price,
      photoURL: placeholderURL, // Ide jön majd az egyedi Cloudinary-url
      createdAt: new Date(),
      userId: user.uid, // A felhasználó ID-ja
    };

    try {
      if (id) {
        // Frissítés (update) ha van 'id'
        const docRef = doc(db, "Ads", id);
        await updateDoc(docRef, adData);
        console.log("Hirdetés sikeresen frissítve!");
      } else {
        // Hirdetés hozzáadása (insert)
        await addDoc(collection(db, "Ads"), adData);
        console.log("Hirdetés sikeresen mentve!");
      }
      navigate("/"); // Hirdetés mentése után a felhasználót visszairányítjuk a főoldalra
    } catch (error) {
      console.error("Hiba a hirdetés mentése közben:", error);
    }
  };

  return (
    <div className="p-3 bg-BaseGreen/60 flex flex-col items-center shadow-md shadow-black/30 rounded-md md:w-8/12 w-max max-w-3xl m-2 mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">{id ? "Hirdetés módosítása" : "Új hirdetés hozzáadása"}</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 gap-2">
          <label className="mr-3">Hirdetés neve:</label>
          <input
            type="text"
            className="border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md"
            value={adName}
            onChange={(e) => setAdName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="mr-3">Fotó a hirdetendő tárgyról:</label>
          <input
            type="file"
            className="p-1 border rounded-md w-30 mx-auto"
            onChange={(e) => setPhotoURL(placeholderURL)} // Placeholder URL beállítása fájl kiválasztáskor
          />
          {photoURL && <img src={photoURL} alt="Photo" className="mt-3 max-w-xs" />}
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Márka"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={horsePower}
            onChange={(e) => setHorsePower(e.target.value)}
            placeholder="Lóerő"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={engineSize}
            onChange={(e) => setEngineSize(e.target.value)}
            placeholder="Hengerűrtartalom (cm^3)"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            placeholder="Állapota"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Modell"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ár"
          />
        </div>

        <div className="mb-4">
          <textarea
            className="border-b w-full h-30 border-BaseGreen outline-0 text-sm p-1 bg-gray-100 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Autó leírása"
          />
        </div>

        <button
          type="submit"
          className="border p-2 rounded-md bg-BaseGreen text-black"
        >
          {id ? "Módosítás" : "Meghirdetem"}
        </button>
      </form>
    </div>
  );
};
