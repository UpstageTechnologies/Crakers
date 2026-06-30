import { useState } from "react";
import { store } from "../lib/store";

const AddressPage = () => {
  const { currentUser, setCurrentUser } = store();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<any>({});

  // LIVE VALIDATION
  const validateField = (name: string, value: string) => {
    let msg = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          msg = "Only letters allowed";
        } else if (value && value.length < 3) {
          msg = "Min 3 characters required";
        }
        break;

      case "phone":
        if (!/^\d*$/.test(value)) {
          msg = "Only numbers allowed";
        } else if (value && value.length > 10) {
          msg = "Max 10 digits only";
        }
        break;

      case "pincode":
        if (!/^\d*$/.test(value)) {
          msg = "Only numbers allowed";
        } else if (value && value.length > 6) {
          msg = "Max 6 digits only";
        }
        break;

      case "city":
      case "state":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          msg = "Only letters allowed";
        }
        break;
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: msg,
    }));
  };

  // PINCODE AUTO FETCH
  const handlePincode = async (value: string) => {
    const pin = value.replace(/\D/g, "");

    setForm((prev) => ({ ...prev, pincode: pin }));
    validateField("pincode", value);

    if (pin.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${pin}`
        );
        const data = await res.json();

        if (data?.[0]?.Status === "Success") {
          const info = data[0].PostOffice[0];

          setForm((prev) => ({
            ...prev,
            city: info.District,
            state: info.State,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // HANDLE CHANGE
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // FINAL VALIDATION
  const isValid =
    /^[a-zA-Z\s]{3,}$/.test(form.name) &&
    /^\d{10}$/.test(form.phone) &&
    /^\d{6}$/.test(form.pincode) &&
    form.address.trim().length >= 5 &&
    /^[a-zA-Z\s]{2,}$/.test(form.city) &&
    /^[a-zA-Z\s]{2,}$/.test(form.state);

  // SAVE ADDRESS
  const handleSave = () => {
    if (!isValid) {
      setErrors({
        name: !/^[a-zA-Z\s]{3,}$/.test(form.name)
          ? "Enter valid name"
          : "",
        phone: !/^\d{10}$/.test(form.phone)
          ? "Phone must be 10 digits"
          : "",
        pincode: !/^\d{6}$/.test(form.pincode)
          ? "Pincode must be 6 digits"
          : "",
        address: form.address.trim().length < 5
          ? "Enter valid address"
          : "",
        city: !/^[a-zA-Z\s]{2,}$/.test(form.city)
          ? "Enter valid city"
          : "",
        state: !/^[a-zA-Z\s]{2,}$/.test(form.state)
          ? "Enter valid state"
          : "",
      });

      return;
    }

    if (!currentUser) {
      alert("Please login first");
      return;
    }

    setCurrentUser({
      ...currentUser,
      address: form,
    });

    alert("Address saved successfully");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-#f6f6f6">

      <h1 className="text-2xl font-bold mb-6">
        Delivery Address
      </h1>

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-3 w-full mb-1"
      />
      <p className="text-red-500 text-sm">{errors.name}</p>

      {/* PHONE */}
      <input
        name="phone"
        value={form.phone}
        maxLength={10}
        placeholder="Phone Number"
        onChange={handleChange}
        className="border p-3 w-full mb-1"
      />
      <p className="text-red-500 text-sm">{errors.phone}</p>

      {/* PINCODE */}
      <input
        name="pincode"
        value={form.pincode}
        maxLength={6}
        placeholder="Pincode"
        onChange={(e) => handlePincode(e.target.value)}
        className="border p-3 w-full mb-1"
      />
      <p className="text-red-500 text-sm">{errors.pincode}</p>

      {/* CITY */}
      <input
        name="city"
        value={form.city}
        placeholder="City"
        onChange={handleChange}
        className="border p-3 w-full mb-1"
      />
      <p className="text-red-500 text-sm">{errors.city}</p>

      {/* STATE */}
      <input
        name="state"
        value={form.state}
        placeholder="State"
        onChange={handleChange}
        className="border p-3 w-full mb-1"
      />
      <p className="text-red-500 text-sm">{errors.state}</p>

      {/* ADDRESS */}
      <textarea
        name="address"
        value={form.address}
        placeholder="Full Address"
        onChange={handleChange}
        className="border p-3 w-full mb-1"
        rows={4}
      />
      <p className="text-red-500 text-sm">{errors.address}</p>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        disabled={!isValid}
        className={`mt-6 w-full py-3 rounded text-white ${
          isValid
            ? "bg-black"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save Address
      </button>

    </div>
  );
};

export default AddressPage;