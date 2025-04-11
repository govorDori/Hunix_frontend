import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../utility/UserContext';

export const Toastify = ({ err, signin, signup, resetPW, update }) => {
  const { setMsg } = useContext(UserContext); // UserContext húzzuk be az üzenetet
  const navigate = useNavigate();

  useEffect(() => {
    if (err) {
      // Ha van hibaüzenet, kiírjuk a toastot
      toast.error(err, { position: "top-left" });
    } else if (signin || signup) {
        //Sikeres regisztrálás / bejelentkezés esetén kiírjuk azt, és a főoldalra irányítjuk a felhasználót
      toast.success(signin || signup, { position: "top-center" });
      setTimeout(() => navigate('/'), 2000);
    } else if (resetPW) {
        //Sikeres jelszó módosítás után főoldalra irányítjuk a felhasználót
      toast.success(resetPW, { position: "top-center" });
      setTimeout(() => navigate('/auth/in'), 2000);
    } else if (update) {
        //Sikeres frissítés után főoldalra irányítjuk a felhasználót
      toast.success(update, { position: "top-center" });
    }
    setMsg({}); // Üzenet ürítés
  }, [err, signin, signup, resetPW, update]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};