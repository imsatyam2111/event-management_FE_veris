import { useState } from "react";
import { Events, FormModal } from "../components";

function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-1 p-4 lg:p-14 flex-col items-center justify-center bg-white/80 space-y-6">
      <div className="flex flex-row items-center space-x-12">
        <h1 className="text-lg font-semibold text-black/80">
          Event Management App
        </h1>
        <button
          onClick={openModal}
          className="px-2 py-1 text-white text-sm font-normal bg-blue-400 rounded-md"
        >
          Add event
        </button>
      </div>
      <Events />
      <FormModal isVisible={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Home;
