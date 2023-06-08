import { useState } from 'react'
import Dropzone from 'react-dropzone'

const DragAndDropFiles = ({ files, handleDrop }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = () => {
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <Dropzone onDrop={handleDrop} accept='image/*' onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className={`dropzone ${isDragging ? 'dragging' : ''}`}>
          <input {...getInputProps()} />
          <p>Glissez-déposez des images ici, ou cliquez pour sélectionner des fichiers</p>
          {files.map((file) => (
            <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
          ))}
        </div>
      )}
    </Dropzone>
  )
}

export default DragAndDropFiles
