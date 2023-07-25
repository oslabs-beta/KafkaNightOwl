import { ReactElement, useRef, useState} from "react";

type SidebarProps = {
  serverInput:(serverString: string)=>void;
}

const Sidebar: React.FC<SidebarProps> = ({serverInput}): ReactElement => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formInput, setFormInput] = useState<string>('');
  
  const postPrServer = () =>{
    console.log('from Sidebar.tsx',formInput);
    serverInput(formInput);
  }

  return (
    <>
      <div className="flex flex-col bg-gray-300 h-full">
        <h1 className="mt-8 text-gray-700 mx-4 text text-xl">Kafka<br />NightOwl</h1>
        <div className="mt-12 w-28 flex flex-col items-center">
          <button className="btn btn-primary flex h-12 w-12 text-5xl" onClick={() => dialogRef.current.showModal()}><i className="fa-solid fa-plus fa-2xs"></i></button>
        </div>
        <dialog ref={dialogRef} className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Add A Kafka Server</h3>
            <label htmlFor="prometheus-port" className="py-4 label">Prometheus Port</label>
            <input id="prometheus-port" type="text" placeholder="Type here" className="input input-bordered w-full max-w-s" onChange={e=>setFormInput(e.target.value)} value={formInput}/>
            <div className="modal-action">
              <button className="btn btn-error text-4xl h-12 w-12" onClick={() => dialogRef.current.close()}><i className="fa-solid fa-xmark fa-2xs"></i></button>
              <button className="btn btn-primary text-4xl h-12 w-12"><i className="fa-solid fa-plus fa-2xs" onClick={postPrServer}></i></button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  )
}

export default Sidebar;
