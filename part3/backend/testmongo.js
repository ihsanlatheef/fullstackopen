const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.tejkhgo.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");

    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });

    const Note = mongoose.model("Note", noteSchema);

    Note.find({}).then((result) => {
      result.forEach((note) => {
        console.log(note);
      });
      mongoose.connection.close();
    });
    const note = new Note({
      content: "HTML is easy",
      important: true,
    });

    note
      .save()
      .then((result) => {
        console.log("note saved! ", result);
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error saving note:", error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
