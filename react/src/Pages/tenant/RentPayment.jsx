import { useState } from "react";
import API from "../../api/tenantApi";

const RentPayment = () => {
  

  const [formData, setFormData] = useState({
  month: "",
  year: new Date().getFullYear(),
  amount: "",
  slip: null,
});

  const handleChange = (e) => {
    if (e.target.name === "slip") {
      setFormData({
        ...formData,
        slip: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("month", formData.month);
    data.append("year", formData.year);
    data.append("amount", formData.amount);
    data.append("slip", formData.slip);

    await API.post("/rents/upload", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Rent Submitted Successfully");

    setFormData({
      month: "",
      year: new Date().getFullYear(),
      amount: "",
      slip: null,
    });

  } catch (error) {
    console.log(error.response?.data || error);
    alert(error.response?.data?.message || "Upload Failed");
  }
};
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6">
          Pay Rent
        </h1>

        <form onSubmit={handleSubmit}>

          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          >
            <option value="">Select Month</option>

            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>

          </select>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <input
            type="file"
            name="slip"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <button
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
          >
            Submit Rent
          </button>

        </form>

      </div>

    </div>
  );
};

export default RentPayment;