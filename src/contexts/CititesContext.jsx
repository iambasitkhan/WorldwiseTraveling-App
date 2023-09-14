import { useReducer } from "react";
import { useContext, useState } from "react";
import { createContext, useEffect } from "react";

const BASE_URL = "http://localhost:8000";

// 1. CREATING CONTEXT.
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.paylaod };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.paylaod };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.paylaod],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.paylaod),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.paylaod };

    default:
      throw new Error("Unknown Action Performed");
  }
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetCities() {
      dispatch({ type: "loading" });
      try {
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        dispatch({ type: "cities/loaded", paylaod: data });
      } catch {
        dispatch({
          type: "rejected",
          paylaod: "There was an error with fetching cities data.",
        });
      }
    }
    fetCities();
  }, []);

  async function getCity(id) {
    if (currentCity.id === Number(id)) return;
    dispatch({ type: "loading" });
    try {
      const resp = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await resp.json();
      dispatch({ type: "city/loaded", paylaod: data });
    } catch {
      dispatch({
        type: "rejected",
        paylaod: "There was an error with fetching City detail.",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const resp = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      dispatch({ type: "city/created", paylaod: newCity });
    } catch {
      dispatch({
        type: "rejected",
        paylaod: "There was an error with Creating new City.",
      });
    }
  }

  async function deletCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", action: id });
    } catch {
      dispatch({
        type: "rejected",
        paylaod: "There was an error with Deleting City.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deletCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context is not in this Scope");

  return context;
}

export { CitiesProvider, useCities };
