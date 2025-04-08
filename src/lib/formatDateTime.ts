const formatDateTime = (dateString:string) => {
    if (!dateString) return ""; // Handle empty values
  
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  
    // Check if the original date string contains time (after "T")
    const hasTime = dateString.includes("T") && dateString.split("T")[1] !== "00:00:00.000Z";
  
    if (hasTime) {
      return formattedDate; // Only return YYYY-MM-DD if time exists
    } else {
      return `${formattedDate}T${getRandomTime()}`; // Append a random time if missing
    }
  };

  // Generate a random time (HH:mm)
const getRandomTime = () => {
    const randomHour = String(Math.floor(Math.random() * 24)).padStart(2, "0");
    const randomMinute = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    return `${randomHour}:${randomMinute}`;
  };

  
  export default formatDateTime;