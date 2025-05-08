import './App.css'
import { FaPlus } from "react-icons/fa6";
import CalenderView from './component/CalenderView';
// import BigCalendar from './component/BigCalendar';
function App() {

  return (
    <div>
      <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-white shadow z-10">
        <h1 className="text-3xl font-bold text-gray-800">Calender</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-red-600 font-semibold rounded hover:bg-red-100 transition">
          <FaPlus />Add Event
        </button>
      </div>

      <div className="pt-20 ">
        <CalenderView />
      </div>
    </div>
  )
}

export default App
