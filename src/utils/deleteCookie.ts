export const deleteCookie = (name: string | null): void => {
  console.log(name);
  if (!name) {
    // Handle the case where the token is null or empty
    console.error("Invalid name provided.");
    return;
  }

  try {
    // Set the expiration date for the cookie (e.g., 1 hour from now)
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 60 * 60 * 1000000); // 1 hour

    // Build the cookie string
    const cookieValue = `${name}=${encodeURIComponent(
      name
    )}; expires=${expirationDate.toUTCString()};max-age=0; path=/`;
    // Save the cookie
    document.cookie = cookieValue;
  } catch (error) {
    console.error("Error saving the cookie:", error);
  }
};
