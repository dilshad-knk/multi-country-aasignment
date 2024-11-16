import React from "react";
import { ChevronDown } from "lucide-react";
import { useRecoilState } from "recoil";
import { userState } from "../store/atom";
import { countries } from "../data/countries";
import toast from "react-hot-toast";
import instance from "../axios/axios.ts";

export const CountrySelector = () => {
  const [user, setUser] = useRecoilState<any>(userState);
  const isViewer = user?.role === "viewer";

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
  
   

    try {
      const country = e.target.value;
      await instance.put(
        `/api/v1/data/changeCountry/${country}`
      );
      setUser((user) => (user ? { ...user, country } : null));
      toast.success(
        `Country updated to ${countries.find((c) => c.code === country)?.name}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to save country. Please try again.");
    }
  };

  const selectedCountry = countries.find((c) => c.code === user?.country);

  if (isViewer) {
    return (
      <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
        {selectedCountry?.name}
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={user?.country || ""}
        onChange={handleCountryChange}
        className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer pr-10"
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
};
