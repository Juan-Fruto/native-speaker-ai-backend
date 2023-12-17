import "dotenv/config";

export const setVoice = (gender: "male" | "female") => {
  switch(gender){
    case "male":
      return process.env.ELEVEN_LABS_MALE; // Michael voice
    case "female":
      return process.env.ELEVEN_LABS_FEMALE; // Matilda voice
  }
} 