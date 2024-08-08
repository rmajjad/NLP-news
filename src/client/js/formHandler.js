import { isValidURL } from "./validateURL";

const handleURLValidation = (value) => {
  const feedback = document.querySelector(".feedback-wrapper");

  const isValid = isValidURL(value);
  feedback.innerHTML = isValid
    ? ""
    : "<p class='feedback-error'>Invalid URL!!</p>";
  return isValid;
};

const setLoading = (show) => {
  const loader = document.querySelector(".loader");
  loader.style.visibility = show ? "visible" : "hidden";
};

const handleError = (show, msg) => {
  const error = document.querySelector(".error-wrapper");
  error.innerHTML = show ? `<p>${msg}</p>` : "";
  error.style.display = show ? "block" : "none";
};

const renderResponse = (data) => {
  const results = document.getElementById("results");

  if (!data || data.error) {
    handleError(true, data?.error || "An error occurred");
    return;
  }

  results.innerHTML = `
    <p class="result-part">Score: <span>${data.score_tag}</span></p>
    <p class="result-part">Agreement: <span>${data.agreement}</span></p>
    <p class="result-part">Subjectivity: <span>${data.subjectivity}</span></p>
    <p class="result-part">Confidence: <span>${data.confidence}</span></p>
    <p class="result-part">Irony: <span>${data.irony}</span></p>
  `;
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const input = document.querySelector("#url-form input");
  const feedback = document.querySelector(".feedback-wrapper");
  feedback.innerHTML = "";
  handleError(false, "");

  if (!handleURLValidation(input.value)) return;

  setLoading(true);
  try {
    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: input.value }),
    });
    const data = await response.json();
    renderResponse(data);
    feedback.innerHTML = "<p class='feedback-success'>Your URL was examined successfully</p>";
  } catch (error) {
    handleError(true, "Failed to examine the URL. Please try again later.");
  } finally {
    setLoading(false);
  }
};

export { handleSubmit };
