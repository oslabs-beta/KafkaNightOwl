import React, { ReactElement, useRef, useState } from 'react'

type AddServerModalProps = {
  updateServer: (serverString: string) => void
}

const AddServerModal: React.FC<AddServerModalProps> = ({updateServer}):ReactElement => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formInput, setFormInput] = useState<string>('');

  const addServer = (e) => {
    e.preventDefault()
    dialogRef.current.showModal()
  }

  return (
    <>
      <button className="btn btn-primary" onClick={(e) => addServer(e)}>Add Server</button>
      <dialog ref={dialogRef} className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Add A Kafka Server</h3>
          <label htmlFor="prometheus-port" className="py-4 label">Prometheus Port</label>
          <input id="prometheus-port" type="text" placeholder="localhost:9090" className="input input-bordered w-full max-w-s" onChange={e=>{setFormInput(e.target.value)}} value={formInput}/>
          <div className="modal-action">
            <button className="btn btn-error text-4xl h-12 w-12" onClick={() => dialogRef.current.close()}><i className="fa-solid fa-xmark fa-2xs"></i></button>
            <button className="btn btn-primary text-4xl h-12 w-12"><i className="fa-solid fa-plus fa-2xs" onClick={() => updateServer(formInput)}></i></button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default AddServerModal