export default function ChatBotCard({ available }: { available: boolean }) {
  let divStyle = "";

  if (available) {
    divStyle = "p-1 border border-amber-50 rounded-2xl flex flex-col items-center-safe";
  } else {
    divStyle = "p-1 border blur-sm select-none border-amber-50 rounded-2xl flex flex-col items-center-safe";
  }

  const card = (
    <div className={divStyle}>
      <h3>THIS IS THE CHATBOT OPTION</h3>
      <hr></hr>
      <p className="text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque
        pariatur sapiente voluptas facere quam velit ipsa quasi ipsum quaerat
        eligendi beatae nemo, dolores molestiae expedita est voluptatum neque
        sint?
      </p>
      <button className="p-2 mt-4 mb-3 border rounded-2 xl bg-blue-500 hover:bg-blue-700">
        Go discuss with our Chatbot!
      </button>
    </div>
  );

  return card;
}
