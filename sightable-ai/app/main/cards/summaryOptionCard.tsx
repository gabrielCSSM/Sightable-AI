export default function SummaryCard() {
    return(
        <div className="p-1 border border-amber-50 rounded-2xl flex flex-col items-center-safe">
            <h3>THIS IS THE SUMMARY OPTION</h3>
            <hr></hr>
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio repudiandae velit vero eum est soluta, laboriosam saepe mollitia. Minus consectetur quisquam qui neque recusandae assumenda nemo illo quos ipsum. Deserunt.</p>
            <button className="p-2 mt-4 mb-3 border rounded-2 xl bg-blue-500 hover:bg-blue-700" >Go make some summaries!</button>
        </div>
    );
}