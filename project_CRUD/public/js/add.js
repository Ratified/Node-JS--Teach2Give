const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector(".title").value;
  const company = document.querySelector(".company").value;
  const priceValue = document.querySelector(".price").value;
  const date = document.querySelector(".date").value;
  const imageUrl = document.querySelector(".imageUrl").value;

  const price = parseInt(priceValue);

  if (!title || !company || !price || !date || !imageUrl) {
    alert("Please fill in all fields");
    return;
  }

  const data = {
    title,
    company,
    price,
    date,
    imageUrl,
  };

  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Product added successfully");
      location.href = "index.html";
    } else {
      const res = await response.json();
      console.log("Server error:", res);
      alert("An error occurred. Please try again");
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("Network error. Please try again");
  }
});