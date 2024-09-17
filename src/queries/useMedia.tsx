import { useMutation } from '@tanstack/react-query'
import { mediaAPiRequest } from '@/apiRequests/media'

export const useUploadMediaMutation = () => {
    return useMutation({
        mutationFn: mediaAPiRequest.upload,
    })
}