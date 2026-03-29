export const sendEmailRoute = async (subject, dataObject) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';
  
  if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
    console.warn("Emails will not send until you generate an Access Key from web3forms.com and add VITE_WEB3FORMS_KEY to your .env file.");
    // We log success false so the UI knows
    return false; 
  }

  const payload = {
    access_key: accessKey,
    subject: subject,
    botcheck: false, // helps prevent spam
    ...dataObject
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    return result.success;
  } catch (err) {
    console.error("Error dispatching email API route:", err);
    return false;
  }
};
