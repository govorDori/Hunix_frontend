<h1 style="text-align: center;"> HUNIX - Egy megbízható, rugalmas autókereskedés</h1>

<h3 style="text-align: center;">❗ FIGYELEM, az oldal fejlesztés alatt áll, az alább csatolt fotók NEM az oldal végleges verzióját tükrözik ❗</h3>

<h3 style="font-weight: bold; color: #05df72;">Tartalomjegyzék</h3>

1. A projektről
2. Hogyan működik az oldal?
3. Mit használunk?
4. Kik dolgoztak a projekten? 

<h3 style="font-weight: bold; color: #05df72;">A projektről</h3>

A **Hunix** mindenki számára szabadon elérhető, itt felhasználók tölthetik fel eladásra szánt gépjárművüket, böngészhetnek mások által hirdetett autók között kedvükre. A kényelmesebb, személyreszabott keresés érdekében rendelkezésre áll egy márka szerinti szűrés és egy keresőmező, amivel szűkíthető a kör márkán belüli modell szerint is. Ha esetleg több, ízlésének és elvárásainak megfelelő lehetőséget talál, erre az esetre biztosítunk egy gombot, mellyel elmentheti kedvenceit egy külön oldalra. 
**!FONTOS: ezen opciók elérése érdekében regisztráció szükséges (kivétel: böngészés, keresés/szűrés)!**

<h3 style="font-weight: bold; color: #05df72;">Hogyan működik az oldal?</h3>

**Vendég nézet (asztali számítógép és mobil):**

<img src="../Hunix_frontend/public/landingpage.png" style="width: 50%; margin-left: 20px;" alt="Landing Page">
<img src="../Hunix_frontend/public/landingpageMobile.png" style="width: 11.4%;" alt="Landing Page Mobile Mode">

- Jobb felső sarokban található **"Bejelentkezés"** és **"Regisztráció"** gomb (mobilos megtekintés esetén ez a három csíkra való koppintás után látható). Velük interaktálva átkerülünk a megfelelő oldalra.

<img src="../Hunix_frontend/public/login.png" style="width: 13%; margin-left: 20px; margin-top: 10px">
<img src="../Hunix_frontend/public/register.png" style="width: 11.8%; margin-top: 10px">

<p style="font-size: 10px; margin-left: 20px">Elfelejtett jelszó? A fiókhoz tartozó e-mail cím megadásával lehetőség van új jelszó igénylésére.</p>

- A **"Márkák"** lenyíló füllel használhatjuk a szűrőt, ahol számos márka elérhető, vagy a **"Megtekintés"** gombra kattintva az összes hirdetés megjelenik szűrés nélkül.

- A **"Felkapott márkák"** szekció az utoljára közzétett hirdetéstől függ.



<h4 style="font-weight: bold; margin-top: 40px;">Bejelentkezett felhasználó esetén:</h4>

<img src="../Hunix_frontend/public/landingpageLoggedIn.png" style="width: 50%; margin-left: 20px;" alt="Landing Page When Logged In">
<img src="../Hunix_frontend/public/landingpageLoggedInMobile.png" style="width: 11.3%;" alt="Landing Page When Logged In Mobile Mode">

- Miután létrehoztunk egy fiókot, elérhetővé vált négy új menüpont: **"Profil"**, **"Garázs"**, **"Új hirdetés"** és **"Kijelentkezés"** (+ **"Admin panel"**, amihez a fejlesztőknek van hozzáférésük kizárólag)


<img src="../Hunix_frontend/public/adDetails.png" style="width: 20%; margin-left: 20px;" alt="An Ad's Details">

- Középen, egy adott hirdetésre kattintva lehetőségünk van megtekinteni bővebb információt róla.


<img src="../Hunix_frontend/public/myprofile.png" style="width: 30%; margin-left: 20px; margin-top: 15px">

- A **"Profil"** fülre kattintva fiókunk adatait figyelhetjük meg, megváltoztathatjuk profilképünket, **"További beállítások"** lenyitásával pedig felhasználónevünk, telefonszámunk és lakcímünk módosítására is van lehetőség. Ha többé nem kívánunk tagja lenni az oldalnak, profilunkat véglegesen törölhetjük. Jobb oldalt az általunk meghirdetett gépjárműveket tudjuk megtekinteni.

<img src="../Hunix_frontend/public/garage.png" style="width: 29.7%; margin-left: 20px; margin-top: 15px">

- A **"Garázs"** részleg kedvenceinket tárolja.

<img src="../Hunix_frontend/public/newad.png" style="width: 25%; margin-left: 20px; margin-top: 15px">

- **"Új hirdetés hozzáadása"** esetén nevet kell adnunk a hirdetésnek, fotót csatolni az autóról, illetve néhány kötelező paramétert hozzáfűzni (*márka, modell, motor hengerűrtartalma, lóerő, autó állapota, eladási ára és egy leírás az autóról*). 

- A **"Kijelentkezés"**-sel visszakerülünk a főoldalra.


<h3 style="font-weight: bold; color: #05df72;">Mit használunk?</h3>

- **GitHub**: A csapatmunka megvalósítása, verziókezelés érdekében és a feladatok felosztásához elengedhetetlen. Eddig feltöltött előrehaladásunk könnyen átlátható és nyomon követhető.

- **Firebase**: Backend szolgáltatásokhoz használjuk, például felhasználói hitelesítés és adatbáziskezeléshez. Hatékonyan tudjuk tárolni a hirdetéseket és a felhasználói adatokat.

- **React**: A felhasználói felület *React* segítségével született meg, számos komponens létrehozását engedi, hogy sokkal átláthatóbb és tisztább kódolást valósíthassunk meg.

- **Cloudinary**: Az autókról feltöltött képeket *Cloudinary*-n tároljuk, kezeljük, és egyszerre teszi lehetővé a képek átméretezését, előnyös megjelenését. Ez különösen fontos, hiszen egy jól megjelenített kép pozitív első benyomást kelthet számos vásárlóban. 


<h3 style="font-weight: bold; color: #05df72;">Kik dolgoztak a projekten?</h3>

- **Molnár Nándor**: 
    - Design
    - Regisztráció/Bejelentkezés panel
    - Profil adatainak módosítása
    - Saját hirdetés létrehozása és módosítása
    - Garázs-rendszer (hozzáadás/törlés)

- **Várbogyai Ádám**:
    - Profil törlése
    - Profilkép módosítása
    - Cloudinary képkezelés
    - Elfelejtett jelszó esetén új jelszó igénylése
    - crudUtility + BrandContext, CarContext, UserContext komponensek létrehozása

- **Govorkovics Dóra**:
    - GitHub projekt létrehozása/feladatok kiosztása
    - Firebase adatbázis és kollekciók felépítése + előkészítés a használatra
    - Tesztelésre alkalmas környezet előkészítése
    - Tesztek írása a rendszer működésének, stabilitásának és megfelelő adatkezelésének érdekében
    - Markdown fájl készítése