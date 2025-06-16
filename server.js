const express = require("express");
const cors = require("cors");
const { getAnswer } = require("./geminiSetup"); // Import the getAnswer function from geminiSetup.js



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the Todo AI Assistant testing url! It's working fine.");
}
);

todo_status_System_Prompt = `you are an helpful ai assistant that helps users to update their todo priority status. 
            Consider user is the busy person and has a lot of tasks to do.
            you can update priorities from below options:
            urgent_important 
            not_urgent_important 
            urgent_not_important 
            not_urgent_not_important
  
            just return the priority & nothing else. 
            `;


// todo app
app.post("/todo_status", async (req, res) => {
  const { todo } = req.body;

  if (!todo || !todo.text || !todo.id) {
    return res.status(400).json({ error: "Invalid todo format" });
  }
  console.log("Received todo status:", todo);
  const response = await getAnswer([
    {
      role: "system",
      content: todo_status_System_Prompt,
    },

    {
      role: "user",
      content: `What is the priority of my "${todo.text}"?`,
    },
  ]);

  console.log("Response from Gemini:", response);
  
  const todo_response = {
    id: todo.id,
    text: todo.text,
    priority: response.trim(), // Assuming the AI returns a valid priority
    completed: false,
  };
  res.json(todo_response);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
