import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

import {
  type CloudinaryResData,
  type CloudinarySigned,
} from '@/domain/types/services'
import { ImgData } from '@/domain/types/types-ui'
import { notify } from '@/lib/notification'

export default function useFileUpload() {
  const [image, setImage] = useState<ImgData>()
  const [progress, setProgress] = useState(0)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const response = await uploadFile(acceptedFiles[0])
      if (response) {
        const marker = 1024
        let bytes = ((response.bytes || 1) / marker).toFixed(1) + ' KB'

        if (response.bytes && +response.bytes >= marker * marker) {
          bytes = (response.bytes / 1048576).toFixed(1) + ' MB'
        }

        setImage({
          id: response.public_id || '',
          name: response.original_filename || '',
          size: bytes || '',
          url: response.secure_url || '',
        })
      }
    },
  })

  const uploadFile = async (file: File) => {
    try {
      if (!file) return

      const { data: signedData } =
        await axios.get<NetworkResponse<CloudinarySigned>>('/api/cloudinary')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_UPLOAD_API_KEY || '')
      formData.append('timestamp', signedData?.data?.timestamp || '')
      formData.append('signature', signedData?.data?.signature || '')

      const res = await axios.post<CloudinaryResData>(
        process.env.NEXT_PUBLIC_UPLOAD_URL || '',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const percentage = Math.floor((loaded * 100) / (total || 1))

            setProgress(percentage)
          },
        }
      )

      return res.data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const updateImg = useCallback((img: ImgData) => {
    setImage(img)
  }, [])

  const deleteUploadedImg = async (id: string) => {
    let error = ''
    try {
      const response = await axios.delete<NetworkResponse<null>>(
        `/api/cloudinary/${id}`
      )

      if (response.data.success) {
        setImage(undefined)
        setProgress(0)
      }
    } catch (err) {
      console.error(err)
      error = 'Failed to delete image resource due to some error'
    } finally {
      notify(
        error ? error : 'Successfully deleted image',
        error ? 'error' : 'success'
      )
    }
  }

  return {
    progress,
    image,
    updateImg,
    getRootProps,
    getInputProps,
    acceptedFiles,
    deleteUploadedImg,
  }
}
