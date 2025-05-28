import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../utility/UserContext"; // UserContext importálása
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore metódusok importálása
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { uploadFileToAd } from "../utility/uploadFile";
import { BrandContext } from "../utility/BrandContext";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

export const AddEditPost = () => {
  const { user, db } = useContext(UserContext); // db és user elérése
  const { brands } = useContext(BrandContext); //Márkák lekérése
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
  const [isUsageMenuOpen, setIsUsageMenuOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  //Képfeltöltéshez szükséges Formok
  const { register, setValue, formState: { errors }, watch } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
    },
  })

  // Ellenőrizzük, hogy ha az 'id' -t, ha van akkor betöltjük az adatokat azaz frissítünk
  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        try {
          const docRef = doc(db, "Cars", id);
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
            // photoUrl tömb, első elem url-jét használjuk previewhoz
            if (data.photoUrl && data.photoUrl.length > 0) {
              setPhotoPreview(data.photoUrl[0].url);
            }
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

    //ha nincs kép kiválasztva nem lehet hirdetni
    if (!selectedFile) {
      console.error("Nincs fájl kiválasztva.");
      alert("Tölts fel fotót a hirdetendő járművről!")
      return;
    }

    const uploadedPhotoUrl = await uploadFileToAd(selectedFile);

    if (!uploadedPhotoUrl) {
      console.error("Nem sikerült feltölteni a képet.");
      return;
    }

    const adData = {
      adName,
      brand,
      horsePower,
      engineSize,
      usage,
      model,
      description,
      price,
      photoUrl: [uploadedPhotoUrl],  // LISTA formában kell
      createdAt: new Date(),
      userId: user.uid,
    };

    try {
      if (id) {
        const docRef = doc(db, "Cars", id);
        await updateDoc(docRef, adData);
        console.log("Hirdetés frissítve!");
      } else {
        await addDoc(collection(db, "Cars"), adData);
        console.log("Hirdetés mentve!");
      }
      navigate("/");
    } catch (error) {
      console.error("Mentési hiba:", error);
    }
  };

  const toggleMenu = () => {
    setIsBrandMenuOpen(!isBrandMenuOpen);
  };

  const toggleUsageMenu = () => {
    setIsUsageMenuOpen(!isUsageMenuOpen);
  };

  const usageList = ["Kiváló", "Alig használt", "Normál", "Hibás", "Totál kár"]

  return (
    <div className="p-2"> 
      <div className="p-3 bg-BaseGreen/50 border-dotted border-3 border-BaseGreen flex flex-col items-center shadow-md shadow-black/30 rounded-md sm:w-7/12 w-full max-w-3xl m-2 mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">{id ? "Hirdetés módosítása" : "Új hirdetés hozzáadása"}</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 gap-2">
          <label className="mr-3">Hirdetés neve:</label>
          <input
            type="text"
            className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
            value={adName}
            onChange={(e) => setAdName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 block">
          <div>
            <label className="mr-3">Fotó a hirdetendő tárgyról:</label>
          </div>

          <div className="flex items-center justify-center">
             <input
            type="file"
            accept="image/*"
            className="w-30 border p-1 rounded-md border-black"
            {...register("file", {
              required: true,
              validate: (fileList) => {
                if (!fileList.length) return "Legalább 1 képet válassz ki!";
                const file = fileList[0];
                const ext = file.name.split('.').pop().toLowerCase();
                if (!['jpg', 'jpeg', 'png'].includes(ext)) return "Hibás fájltípus";
                if (file.size > 5 * 1024 * 1024) return "Maximum 5MB/fájl";
                return true;
              },
            })}
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFile(file);
              setPhotoPreview(URL.createObjectURL(file));
            }}
          />
          </div>

          {photoPreview && (
            <img
              src={photoPreview}
              alt="preview"
              className="w-max h-32 object-cover rounded-md border mx-auto shadow mt-4"
            />
          )}

        </div>

        <div className="flex flex-wrap justify-center mx-auto ">
          <div className="mb-4 gap-3 justify-center w-max mx-auto">
            <button onClick={toggleMenu} className='p-1.5 text-md break-words rounded-sm bg-BaseGreen w-max font-semibold tracking-wider active:scale-95 text-black shadow-md shadow-black/20 transition-all cursor-pointer text-center flex items-center sm:pl-5 sm:pr-5 pl-2 pr-0'>
              Márkák {isBrandMenuOpen ? <GoTriangleUp className='text-3xl pt-1' /> : <GoTriangleDown className='text-3xl pt-1' />}
            </button>

            <div className={`${isBrandMenuOpen ? 'block' : 'hidden'} absolute text-center mt-1 p-2 mx-auto border border-gray-500 shadow-md shadow-black  bg-BaseGreen rounded-md flex flex-col gap-y-2`}>
              {brands && brands.map((brand, index) => (
                <input
                  type="button"
                  key={brand.name}
                  className='cursor-pointer'
                  value={brand.name}
                  placeholder={brand.name}
                  onClick={(e) => {
                    setBrand(e.target.value)
                    toggleMenu()
                  }} />
              ))}

            </div>
            <div className="border-b w-max mx-auto mt-1 border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md">
              {brand}
            </div>
          </div>

          <div className="mb-4 gap-3 justify-center w-max mx-auto">
            <button onClick={toggleUsageMenu} className='p-1.5 text-md break-words rounded-sm bg-BaseGreen w-max font-semibold tracking-wider active:scale-95 text-black shadow-md shadow-black/20 transition-all cursor-pointer text-center flex items-center sm:pl-5 sm:pr-5 pl-2 pr-0'>
              Állapot {isUsageMenuOpen ? <GoTriangleUp className='text-3xl pt-1' /> : <GoTriangleDown className='text-3xl pt-1' />}
            </button>

            <div className={`${isUsageMenuOpen ? 'block' : 'hidden'} absolute text-center p-2 mx-auto mt-1 border border-gray-500 shadow-md shadow-black  bg-BaseGreen rounded-md flex flex-col gap-y-2`}>
              {usageList.map((usage) => (
                <input
                  type="button"
                  key={usage}
                  className='cursor-pointer'
                  value={usage}
                  placeholder={usage}
                  onClick={(e) => {
                    setUsage(e.target.value)
                    toggleUsageMenu()
                  }} />
              ))}

            </div>
            <div className="border-b w-max mx-auto mt-1 border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md">
              {usage}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-center p-2">
          <div>
            <input
              type="text"
              className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
              value={horsePower}
              onChange={(e) => setHorsePower(e.target.value)}
              placeholder="Lóerő"
              required
            />
          </div>

          <div>
            <input
              type="text"
              className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
              value={engineSize}
              onChange={(e) => setEngineSize(e.target.value)}
              placeholder="Hengerűrtartalom (cm^3)"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3  items-center justify-center p-2">
          <div >
            <input
              type="text"
              className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Modell"
              required
            />
          </div>

          <div>
            <input
              type="text"
              className="border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ár"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <textarea
            className="border-b w-full h-30 border-BaseGreen outline-0 text-sm p-1 bg-gray-100 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Autó leírása"
            required
          />
        </div>

        <button
          type="submit"
          className=" p-2 rounded-md bg-BaseGreen text-black shadow-md shadow-black/30"
        >
          {id ? "Módosítás" : "Meghirdetem"}
        </button>
      </form>
    </div>
    </div>
  );
};
