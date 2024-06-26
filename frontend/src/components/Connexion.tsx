import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo_leubeach.webp";
import { useNavigate } from "react-router-dom";
import { getCsrfToken } from "../utils/getCsrfToken";
import { Link } from "react-router-dom";

const Connexion: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // S'assurer que les cookies, y compris le cookie CSRF, sont envoyés avec la requête
    axios.defaults.withCredentials = true;

    try {
      // Récupérer le cookie CSRF avant d'envoyer la requête de connexion
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      // Extrait le token CSRF du cookie pour l'utiliser dans la requête de connexion
      const csrfToken = getCsrfToken();

      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": csrfToken, // Fournir le token CSRF extrait dans les en-têtes de la requête
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      navigate("/accueil");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage("Identifiant incorrecte");
        } else {
          setErrorMessage("Problème de connexion au serveur.");
        }
      } else {
        setErrorMessage("Erreur lors de la connexion.");
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-connexion">
          <div className="container-element-connexion">
            <div className="container-title">
              <h1 className="title-connexion text-2xl font-sans">Connexion</h1>
              <img src={Logo} alt="Logo" />
            </div>

            <div className="container-form-connexion">
              <form onSubmit={handleSubmit}>
                <div className="container-input mb-2">
                  <label className="font-sans">Email</label>
                  <input
                    className="text-black font-sans mt-1 p-4"
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="container-input mb-2">
                  <label className="font-sans">Mot de passe</label>
                  <input
                    className="text-black font-sans mt-1 p-4"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
                <div className="container-connexion-btn">
                  <button type="submit">Connexion</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-6">
          <p className="text-color-1 mr-1">Pas encore inscrit ?</p>
          <p className="text-color-1 hover:text-color-2">
            <Link to="/register">
              cliqué ici <i className="fa-solid fa-house-tsunami"></i>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Connexion;
